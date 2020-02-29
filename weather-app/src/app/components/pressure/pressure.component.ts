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

  private readonly trendInterval: number = 30000;

  private readonly pressureTrendSubject = new Subject<Measurement[]>();

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.currentPressure = this.weatherService.getLastPressure();
    this.updatePressureTrend(this.weatherService.getPressureHistory());

    this.weatherService.pressureChanges.asObservable().subscribe(value => this.currentPressure = value);

    this.weatherService.pressureHistoryChanges.asObservable().subscribe( measurements =>
      this.updatePressureTrend(measurements));
  }

  public measurePressure(): void {
    this.currentPressure = this.weatherService.readNewPressure();
  }

  private updatePressureTrend(valuesArray: Measurement[]): void {
    const deltaPressure = this.differentBetweenLastPressureValues(valuesArray);
    const pitchPressure = this.calculatePressureChangeOfInterval(valuesArray);
    if (valuesArray.length < 1) {
      this.setTrendValuesInView('⊗', 'none');
      return;
    }
    if (Math.abs(deltaPressure) < 4) {
      this.setTrendValuesInView('→', 'stable');
      return;
    }
    if (Math.abs(pitchPressure) < 10) {
      this.setTrendValuesInView('→', 'stable');
      return;
    }
    if (pitchPressure > 0) {
      this.setTrendValuesInView('↑', 'rising');
    } else {
      this.setTrendValuesInView('↓', 'falling');
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

}
