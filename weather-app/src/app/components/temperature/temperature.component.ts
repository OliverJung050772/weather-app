import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {Subject} from 'rxjs';
import {Measurement} from "../../models/measurement";

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {

  currentTemperature: number;
  averageTemperature: number;
  // TODO doppelte Datenhaltung
  private readonly  measureInterval = 7000;
  private readonly averageTemperatureSubject = new Subject<Measurement[]>();
  private readonly actualTemperatureSubject = new Subject<number>();

  constructor(private weatherService: WeatherService) {
  }

  public measureTemperature(): void {
    const newTemperature = this.weatherService.getTemperature();
    this.averageTemperatureSubject.next(this.weatherService.getTemperatureHistory());
    this.actualTemperatureSubject.next(newTemperature);
  }

  private updateAverageTemperature(temperatureArray: Measurement[]): void {
    let arraySum = 0;
    temperatureArray.forEach(measurement => arraySum += measurement.measuredValue);
    const arrayLength = temperatureArray.length;
    this.averageTemperature = Math.round(arraySum / arrayLength);
  }

  ngOnInit(): void {
    // Set initial Temperature
    this.averageTemperature = 0;
    this.currentTemperature = this.weatherService.getTemperature();

    const interval = setInterval(() => this.measureTemperature(), this.measureInterval);

    this.averageTemperatureSubject.asObservable().subscribe((array) => this.updateAverageTemperature(array));

    this.actualTemperatureSubject.asObservable().subscribe(value => {
      this.currentTemperature = value;
    });
  }

}
