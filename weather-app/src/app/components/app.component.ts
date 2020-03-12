import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../services/settings.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Weather App';

  public selectedTemperatureUnit: string;
  public selectedPressureUnit: string;
  public opened = false;
  public mode = new FormControl('over');

  public isCelsius: boolean;
  public isFahrenheit: boolean;
  public isMBar: boolean;
  public isInHg: boolean;

  constructor(private settingsService: SettingsService) {
  }

  public onTemperatureUnitChanged(): void {
    this.settingsService.radioTemperatureUnitChanges.next(this.selectedTemperatureUnit);
  }

  public onPressureUnitChanged(): void {
    this.settingsService.radioPressureUnitChanges.next(this.selectedPressureUnit);
  }

  public toggleSidenav(): void {
    this.opened = !this.opened;
    this.settingsService.getsidebarChanges.next(!this.opened);
  }

  ngOnInit(): void {
    this.opened = this.settingsService.sidebarIsShown;
    this.selectedTemperatureUnit = this.settingsService.selectedRadioTemperatureUnit;
    this.selectedPressureUnit = this.settingsService.selectedRadioPressureUnit;
    if (this.selectedTemperatureUnit === 'celsius') {
      this.isCelsius = true;
    } else {
      this.isFahrenheit = true;
    }
    if (this.selectedPressureUnit === 'mbar') {
      this.isMBar = true;
    } else {
      this.isInHg = true;
    }
  }
}
