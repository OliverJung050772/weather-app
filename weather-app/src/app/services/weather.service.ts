import {Injectable} from '@angular/core';
import {TemperatureSpan} from '../models/temperature-span';
import {PressureSpan} from '../models/pressure-span';
import {Measurement} from '../models/measurement';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  temperatureSpan: TemperatureSpan;
  pressureSpan: PressureSpan;

  public temperatureChanges = new Subject<number>();
  public pressureChanges = new Subject<number>();
  public temperatureHistoryChanges = new Subject<Measurement[]>();
  public pressureHistoryChanges = new Subject<Measurement[]>();

  private readonly measureTemperatureInterval = 7000;
  private readonly measurePressureInterval =  5000;

  private pressureHistory: Measurement[] = [];
  private temperatureHistory: Measurement[] = [];

  constructor() {
    this.temperatureSpan = new TemperatureSpan(-20, 40);
    this.pressureSpan = new PressureSpan(1080, 1150);
    this.startMeasurements();
  }

  public getPressureHistory(): Measurement[] {
    return this.pressureHistory;
  }

  public getTemperatureHistory(): Measurement[] {
    return this.temperatureHistory;
  }

  public readNewTemperature(): number {
    const newTemperature = this.getRandomValueBetween(this.temperatureSpan.minTemperature, this.temperatureSpan.maxTemperature);
    const newMeasurement = new Measurement(new Date().getTime(), newTemperature);
    this.temperatureHistory.push(newMeasurement);
    this.temperatureChanges.next(newTemperature);
    this.temperatureHistoryChanges.next(this.temperatureHistory);
    return newTemperature;
  }

  public readNewPressure(): number {
    const newPressure = this.getRandomValueBetween(this.pressureSpan.minPressure, this.pressureSpan.maxPressure);
    const newMeasurement = new Measurement(new Date().getTime(), newPressure);
    this.pressureHistory.push(newMeasurement);
    this.pressureChanges.next(newPressure);
    this.pressureHistoryChanges.next(this.pressureHistory);
    return newPressure;
  }

  private getRandomValueBetween(minVal: number, maxVal: number): number {
    return Math.round((maxVal - minVal) * Math.random() + minVal);
  }

  private startMeasurements(): void {
    setInterval(() => this.readNewTemperature(), this.measureTemperatureInterval);
    setInterval(() => this.readNewPressure(), this.measurePressureInterval);
  }

}
