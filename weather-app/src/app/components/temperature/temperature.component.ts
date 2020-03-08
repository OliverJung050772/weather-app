import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Subject } from 'rxjs';
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
  temperatureUnitKey: string = 'celsius';

  buttonsDisplayed: boolean = true;

  constructor(
    private weatherService: WeatherService,
    private settingsSidebarService: SettingsSidebarService) {
  }

  ngOnInit(): void {
    this.currentTemperature = this.weatherService.getLastTemperature();
    this.updateAverageTemperature(this.weatherService.getTemperatureHistory());

    this.weatherService.temperatureChanges.asObservable().subscribe(value => this.currentTemperature = value);
    this.weatherService.temperatureHistoryChanges.asObservable().subscribe(measurements => this.updateAverageTemperature(measurements));

    this.settingsSidebarService.sidebarChanges.asObservable().subscribe(
      isShown => this.buttonsDisplayed = isShown
    );
    this.setButtonsToVisible(true);

    this.settingsSidebarService.radioTemperatureUnitChanges.asObservable()
      .subscribe(unit => this.temperatureUnitKey = unit);
    this.settingsSidebarService.radioTemperatureUnitChanges.next('fahrenh');
    this.settingsSidebarService.radioTemperatureUnitChanges.next('celsius');
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

  private setButtonsToVisible(areVisible: boolean): void {
    this.buttonsDisplayed = areVisible;
  }

}
