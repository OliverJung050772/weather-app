import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  public isCelsius: boolean;
  public isFahrenheit: boolean;
  public isMBar: boolean;
  public isInHg: boolean;

  public selectedTemperatureUnit: string;
  public selectedPressureUnit: string;

  constructor(private settingsService: SettingsService) {
  }

  public onTemperatureUnitChanged(): void {
    this.settingsService.radioTemperatureUnitChanges.next(this.selectedTemperatureUnit);
  }

  public onPressureUnitChanged(): void {
    this.settingsService.radioPressureUnitChanges.next(this.selectedPressureUnit);
  }

  ngOnInit(): void {
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
