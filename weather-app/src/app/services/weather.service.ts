import {Injectable} from '@angular/core';
import {TemperatureSpan} from '../models/temperature-span';
import {PressureSpan} from '../models/pressure-span';
import {Measurement} from '../models/measurement';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  temperatureSpan: TemperatureSpan;
  pressureSpan: PressureSpan;

  private pressureHistoryList: Measurement[] = [];
  private temperatureHistoryList: Measurement[] = [];

  constructor() {
    this.temperatureSpan = new TemperatureSpan(-20, 40);
    this.pressureSpan = new PressureSpan(1080, 1150);
  }

  public getTemperature(): number {
    return this.getRandomValueBetween(this.temperatureSpan.minTemperature, this.temperatureSpan.maxTemperature);
  }

  public getPressure(): number {
    return this.getRandomValueBetween(this.pressureSpan.minPressure, this.pressureSpan.maxPressure);
  }

  public getPressureHistoryList(): Measurement[] {
    return this.pressureHistoryList;
  }

  public getTemperatureHistoryList(): Measurement[] {
    return this.temperatureHistoryList;
  }

  public addToPressureHistoryList(measurement: Measurement) {
    this.pressureHistoryList.push(measurement);
  }

  public addToTemperatureHistoryList(measurement: Measurement) {
    this.temperatureHistoryList.push(measurement);
  }

  private getRandomValueBetween(minVal: number, maxVal: number): number {
    return Math.round((maxVal - minVal) * Math.random() + minVal);
  }

}
