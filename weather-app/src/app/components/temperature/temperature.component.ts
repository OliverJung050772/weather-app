import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Measurement } from '../../models/measurement';
import { SettingsSidebarService } from '../../services/settings-sidebar.service';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {

  currentTemperature: number;
  averageTemperature: number;
  temperatureUnitKey: string;

  constructor(
    private weatherService: WeatherService,
    private settingsSidebarService: SettingsSidebarService) {
  }

  ngOnInit(): void {
    this.currentTemperature = this.weatherService.getLastTemperature();
    this.updateAverageTemperature(this.weatherService.getTemperatureHistory());

    this.weatherService.temperatureChanges.asObservable().subscribe(value => this.currentTemperature = value);
    this.weatherService.temperatureHistoryChanges.asObservable().subscribe(measurements => this.updateAverageTemperature(measurements));

    this.settingsSidebarService.radioTemperatureUnitChanges.asObservable()
      .subscribe(unit => this.temperatureUnitKey = unit);
    this.temperatureUnitKey = this.settingsSidebarService.selectedRadioTemperatureUnit;
  }

  public measureTemperature(): void {
    this.currentTemperature = this.weatherService.readNewTemperature();
  }

  private updateAverageTemperature(temperatureArray: Measurement[]): void {
    if (temperatureArray.length > 0) {
      let arraySum = 0;
      temperatureArray.forEach(measurement => arraySum += measurement.measuredValue);
      const arrayLength = temperatureArray.length;
      this.averageTemperature = parseFloat((arraySum / arrayLength).toFixed(1));
    } else {
      this.averageTemperature = 0;
    }
  }

}
