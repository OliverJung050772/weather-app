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

  private readonly measureInterval: number = 5000;
  private readonly trendInterval: number = 30000;
  private readonly pressureChangeSubject = new Subject<number>();
  private readonly pressureTrendSubject = new Subject<Measurement[]>();

  constructor(private weatherService: WeatherService) {
  }

  public measurePressure(): void {
    this.pressureChangeSubject.next(this.weatherService.getPressure());
  }

  private updatePressureTrending(valuesArray: Measurement[]): void {
    const deltaPressure = this.differentBetweenLastPressureValues(valuesArray);
    const pitchPressure = this.calculatePressureChangeOfInterval(valuesArray);
    console.log(deltaPressure + ' at ' + valuesArray[valuesArray.length - 1].timeStamp);
    console.log('pressurePitch: ' + Number.parseFloat(pitchPressure.toString()).toPrecision(4));
    if ((Math.abs(deltaPressure) >= 4) && (Math.abs(pitchPressure) >= 10)) {
      if (pitchPressure > 0) {
        this.setTrendValuesInView('↑', 'rising');
      } else {
        this.setTrendValuesInView('↓', 'falling');
      }
    } else {
      this.setTrendValuesInView('→', 'stable');
    }
  }

  private differentBetweenLastPressureValues(valuesArray: Measurement[]): number {
    if (valuesArray.length >= 2) {
      return valuesArray[valuesArray.length - 1].measuredValue - valuesArray[valuesArray.length - 2].measuredValue;
    } else {
      return 0;
    }
  }

  private calculatePressureChangeOfInterval(valuesArray: Measurement[]): number {
    if (valuesArray.length > 2) {
      const inIntervalArray: number[] = [];
      const timeSpan = valuesArray[valuesArray.length - 1].timeStamp - this.trendInterval;
      valuesArray.forEach(item => {
        if (item.timeStamp >= timeSpan) {
          inIntervalArray.push(item.measuredValue);
        }
      });
      const deltaPressure = inIntervalArray[inIntervalArray.length - 1] - inIntervalArray[0];
      const deltaTime = this.trendInterval / 10000;
      return deltaPressure / deltaTime;
    } else {
      return 0;
    }
  }

  private setTrendValuesInView(trendIcon: string, trendWord: string): void {
    this.pressureTrendSymbol = trendIcon;
    this.pressureTrendText = trendWord;
  }

  ngOnInit(): void {
    // set initial pressure-value
    this.currentPressure = this.weatherService.getPressure();
    this.measurements.push(new Measurement(new Date().getTime(), this.currentPressure));

    setInterval(() => this.measurePressure(), this.measureInterval);

    this.pressureChangeSubject.asObservable().subscribe(value => {
      this.currentPressure = value;
      const newMeasurement = new Measurement(new Date().getTime(), value);
      this.measurements.push(newMeasurement);
      this.weatherService.addToPressureHistoryList(newMeasurement);
      this.pressureTrendSubject.next(this.measurements);
    });

    this.pressureTrendSubject.asObservable().subscribe(valuesArray =>
      this.updatePressureTrending(valuesArray));
  }

}
