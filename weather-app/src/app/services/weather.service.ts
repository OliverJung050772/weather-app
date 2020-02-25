import {Injectable} from '@angular/core';
import { TemperatureSpan } from '../models/temperature-span';
import { PressureSpan } from '../models/pressure-span';


@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  temperatureSpan: TemperatureSpan;
  pressureSpan: PressureSpan;

  constructor() {
    this.temperatureSpan = new TemperatureSpan(20, 40);
    this.pressureSpan = new PressureSpan(1080, 1150);
  }

  public getTemperature(): number {
    return this.getRandomValue(this.temperatureSpan.minTemperature, this.temperatureSpan.maxTemperature);
  }

  public getPressure(): number {
    return this.getRandomValue(this.pressureSpan.minPressure, this.pressureSpan.maxPressure);
  }

  // returns a random-value between minVal and maxVal
  private getRandomValue(minVal: number, maxVal: number): number {
    return Math.round((maxVal - minVal) * Math.random() + minVal);
  }


}
