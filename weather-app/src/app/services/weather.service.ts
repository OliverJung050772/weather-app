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
    const newTemperature = this.getRandomValueBetween(this.temperatureSpan.minTemperature, this.temperatureSpan.maxTemperature);
    this.temperatureHistoryList.push(new Measurement(new Date().getTime(), newTemperature));
    return newTemperature;
  }

  public getPressure(): number {
    const newPressure = this.getRandomValueBetween(this.pressureSpan.minPressure, this.pressureSpan.maxPressure);
    this.pressureHistoryList.push(new Measurement(new Date().getTime(), newPressure));
    return newPressure;
  }

  public getPressureHistory(): Measurement[] {
    return this.pressureHistoryList;
  }

  public getTemperatureHistory(): Measurement[] {
    return this.temperatureHistoryList;
  }


  private getRandomValueBetween(minVal: number, maxVal: number): number {
    return Math.round((maxVal - minVal) * Math.random() + minVal);
  }

}
