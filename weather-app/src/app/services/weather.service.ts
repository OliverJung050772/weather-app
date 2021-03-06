import {Injectable} from '@angular/core';
import {TemperatureSpan} from '../models/temperature-span';
import {PressureSpan} from '../models/pressure-span';
import {Measurement} from '../models/measurement';
import {BehaviorSubject, Subject} from 'rxjs';
import {WeatherApiService} from './weather-api.service';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  public temperatureChanges = new Subject<number>();
  public pressureChanges = new Subject<number>();
  public temperatureHistoryChanges = new BehaviorSubject<Measurement[]>([]);
  public pressureHistoryChanges = new BehaviorSubject<Measurement[]>([]);

  private readonly measureTemperatureInterval = 60000;
  private readonly measurePressureInterval = 40000;
  private readonly temperatureSpan: TemperatureSpan;
  private readonly pressureSpan: PressureSpan;

  private pressureHistory: Measurement[] = [];
  private temperatureHistory: Measurement[] = [];

  constructor(private weatherApiService: WeatherApiService) {
    this.temperatureSpan = new TemperatureSpan(-20, 40);
    this.pressureSpan = new PressureSpan(1080, 1150);
    this.integrateHistoricTemperaturesFromApi();
    this.integrateHistoricPressuresFromApi();
    this.startMeasurements();
  }

  public getPressureHistory(): Measurement[] {
    return this.pressureHistory;
  }

  public getTemperatureHistory(): Measurement[] {
    return this.temperatureHistory;
  }

  public getLastTemperature(): number {
    const lastValue = (this.temperatureHistory.length > 0) ?
      this.temperatureHistory[0].measuredValue : 0
    return lastValue;
  }

  public getLastPressure(): number {
    const lastValue = (this.pressureHistory.length > 0) ?
      this.pressureHistory[0].measuredValue : 0
    return lastValue;
  }

  public readNewTemperature(): number {
    const newTemperature = parseFloat(this.getRandomValueBetween(this.temperatureSpan.minTemperature,
      this.temperatureSpan.maxTemperature).toFixed(1));
    const newMeasurement = new Measurement(new Date().getTime(), newTemperature);
    this.weatherApiService.sendNewTemperatureToApi(newMeasurement)
      .subscribe(value => console.log('Saved: [T]: ' + value));
    this.temperatureHistory.push(newMeasurement);
    this.temperatureChanges.next(newTemperature);
    this.temperatureHistoryChanges.next(this.temperatureHistory);
    return newTemperature;
  }

  public readNewPressure(): number {
    const newPressure = Math.round(this.getRandomValueBetween(this.pressureSpan.minPressure, this.pressureSpan.maxPressure));
    const newMeasurement = new Measurement(new Date().getTime(), newPressure);
    this.weatherApiService.sendNewPressureToApi(newMeasurement)
      .subscribe(value => console.log('Saved [P]: ' + value));
    this.pressureHistory.push(newMeasurement);
    this.pressureChanges.next(newPressure);
    this.pressureHistoryChanges.next(this.pressureHistory);
    return newPressure;
  }

  private getRandomValueBetween(minVal: number, maxVal: number): number {
    return ((maxVal - minVal) * Math.random() + minVal);
  }

  private startMeasurements(): void {
    setInterval(() => this.readNewTemperature(), this.measureTemperatureInterval);
    setInterval(() => this.readNewPressure(), this.measurePressureInterval);
  }

  private integrateHistoricTemperaturesFromApi(): void {
    this.weatherApiService.getTemperatures().subscribe(measurements => {
      this.temperatureHistory = this.temperatureHistory.concat(measurements);
      this.temperatureHistoryChanges.next(this.temperatureHistory);
    });
  }

  private integrateHistoricPressuresFromApi(): void {
    this.weatherApiService.getPressures().subscribe(measurements => {
      this.pressureHistory = this.pressureHistory.concat(measurements);
      this.pressureHistoryChanges.next(this.pressureHistory);
    });
  }

}
