import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {Measurement} from '../../models/measurement';
import {Subject} from "rxjs";

@Component({
  selector: 'app-pressure',
  templateUrl: './pressure.component.html',
  styleUrls: ['./pressure.component.css']
})
export class PressureComponent implements OnInit {

  currentPressure: number;
  pressureTrendSymbol: string;
  pressureTrendText: string;
  measurements: Measurement[] = [];
  startTime: number;
  private readonly measureInterval: number = 5000;
  private readonly trendInterval: number = 30000;
  private readonly pressureChangeSubject = new Subject<number>();
  private readonly pressureTrendSubject = new Subject<Measurement[]>();

  constructor(private weatherService: WeatherService) {
  }

  public measurePressure(): void {
    this.pressureChangeSubject.next(this.weatherService.getPressure());
  }

  private differentBetweenLastPressureValues(valuesArray: Measurement[]): number {
    if (valuesArray.length >= 2 ) {
      return valuesArray[valuesArray.length - 1].pressureValue - valuesArray[valuesArray.length - 2].pressureValue;
    } else {
      return 0;
    }
  }

  private calculatePressureChangeOfInterval(valuesArray: Measurement[]): number {
    if (valuesArray.length > 2) {
      const inIntervalArray: Measurement[] = [];
      const timeSpan = valuesArray[valuesArray.length - 1].timeStamp - this.trendInterval;
      valuesArray.forEach( item => {
        if (item.timeStamp >= timeSpan) {
          inIntervalArray.push(item);
        }
      });
      const deltaPressure = inIntervalArray[inIntervalArray.length - 1].pressureValue - inIntervalArray[0].pressureValue;
      const deltaTime = inIntervalArray[inIntervalArray.length - 1].timeStamp - inIntervalArray[0].timeStamp;
      return  (deltaPressure / deltaTime) * 10000;
    } else {
      return 0;
    }
  }

  ngOnInit(): void {
    // set initial pressure-value
    this.currentPressure = this.weatherService.getPressure();
    this.startTime = new Date().getTime();
    this.measurements.push(new Measurement(new Date().getTime(), this.currentPressure));
    setInterval(() => this.measurePressure(), this.measureInterval);

    this.pressureChangeSubject.asObservable().subscribe(value => {
      this.currentPressure = value;
      this.measurements.push(new Measurement(new Date().getTime(), value));
      this.pressureTrendSubject.next(this.measurements);
    });

    this.pressureTrendSubject.asObservable().subscribe(valuesArray => {
      const deltaPressure = this.differentBetweenLastPressureValues(valuesArray);
      if (Math.abs(deltaPressure) >= 4) {
        console.log(deltaPressure + ' at ' + valuesArray[valuesArray.length - 1].timeStamp);
        const pitchPressure = this.calculatePressureChangeOfInterval(valuesArray);
        console.log('Steigung: ' + pitchPressure);
        if (Math.abs(pitchPressure) >= 10) {
          if (pitchPressure > 0) {
            this.pressureTrendText = 'rising';
            this.pressureTrendSymbol = '↑';
          } else {
            this.pressureTrendText = 'falling';
            this.pressureTrendSymbol = '↓';
          }
        }
      } else {
        this.pressureTrendText = 'stable';
        this.pressureTrendSymbol = '→';
      }
    });
  }

}

/*
if (new Date().getTime() > this.startTime + this.trendInterval && valuesArray.length > 6) {
        // if the over all time is greater than the measure-interval
        if (valuesArray[valuesArray.length - 1].timeStamp - this.trendInterval >= valuesArray[0].timeStamp) {
          // get the last index included in the interval
          let isInInterval = true;
          let currentIndex = valuesArray.length - 1;
          let lastIndex: number;
          while (isInInterval === true) {
            if (valuesArray[currentIndex - 1].timeStamp < valuesArray[currentIndex].timeStamp - this.trendInterval) {
              lastIndex = currentIndex;
              isInInterval = false;
            }
            currentIndex--;
          }
          // calculate the sum from last to current index
          valuesArray.splice(0, lastIndex - 1);
          let arraySum = 0;
          valuesArray.forEach(item => arraySum = arraySum + item.pressureValue);
          const valuesArrayAverage = arraySum / valuesArray.length;
          const deltaPressure = valuesArray[currentIndex].pressureValue - valuesArray[currentIndex - 1].pressureValue;
          if (Math.abs(valuesArrayAverage - valuesArray[lastIndex].pressureValue) >= 10 && Math.abs(deltaPressure) >= 4) {
            if (deltaPressure > 0) {
              this.pressureTrendText = 'rising';
              this.pressureTrendSymbol = '↑';
            } else {
              this.pressureTrendText = 'falling';
              this.pressureTrendSymbol = '↓';
            }
          } else {
            this.pressureTrendText = 'stable';
            this.pressureTrendSymbol = '→';
          }
        }
      }

 */
