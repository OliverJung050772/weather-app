import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {Measurement} from '../../models/measurement';
import {Subject} from 'rxjs';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-pressure',
  templateUrl: './pressure.component.html',
  styleUrls: ['./pressure.component.css']
})

export class PressureComponent implements OnInit {

  public currentPressure: number;
  public pressureTrendSymbol: string;
  public pressureTrendText: string;
  public pressureUnitKey: string;

  private readonly trendInterval: number = 30000;

  constructor(
    private weatherService: WeatherService,
    private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.currentPressure = this.weatherService.getLastPressure();
    this.updatePressureTrend(this.weatherService.getPressureHistory());

    this.weatherService.pressureChanges.asObservable().subscribe(value => this.currentPressure = value);
    this.weatherService.pressureHistoryChanges.asObservable()
      .subscribe( measurements => this.updatePressureTrend(measurements));

    this.settingsService.radioPressureUnitChanges.asObservable()
      .subscribe(unit => this.pressureUnitKey = unit);
    this.pressureUnitKey = this.settingsService.selectedRadioPressureUnit;
  }

  public measurePressure(): void {
    this.currentPressure = this.weatherService.readNewPressure();
  }

  private updatePressureTrend(valuesArray: Measurement[]): void {
    const deltaPressure = this.differentBetweenLastPressureValues(valuesArray);
    const pressureChangeRate = this.calculatePressureChangeOfInterval(valuesArray);
    if (valuesArray.length < 1) {
      this.setTrendValuesInView('⊗', 'none');
      return;
    }
    if (Math.abs(deltaPressure) < 4) {
      this.setTrendValuesInView('→', 'stable');
      return;
    }
    if (Math.abs(pressureChangeRate) < 10) {
      this.setTrendValuesInView('→', 'stable');
      return;
    }
    if (pressureChangeRate > 0) {
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
