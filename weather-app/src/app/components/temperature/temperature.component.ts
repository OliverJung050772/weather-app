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

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    // TODO get last values from weather-service-history
    this.averageTemperature = 0;
    this.currentTemperature = 0;

    this.weatherService.temperatureChanges.asObservable().subscribe(value => this.currentTemperature = value);

    this.weatherService.temperatureHistoryChanges.asObservable().subscribe(measurements =>
      this.updateAverageTemperature(measurements));
  }

  public measureTemperature(): void {
    this.currentTemperature = this.weatherService.readNewTemperature();
  }

  private updateAverageTemperature(temperatureArray: Measurement[]): void {
    let arraySum = 0;
    temperatureArray.forEach(measurement => arraySum += measurement.measuredValue);
    const arrayLength = temperatureArray.length;
    this.averageTemperature = Math.round(arraySum / arrayLength);
  }

}
