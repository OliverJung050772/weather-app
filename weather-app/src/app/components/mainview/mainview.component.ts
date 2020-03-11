import { Component, OnInit } from '@angular/core';
import { SettingsSidebarService } from '../../services/settings-sidebar.service';
import { FormControl} from '@angular/forms';

@Component({
  selector: 'app-mainview',
  templateUrl: './mainview.component.html',
  styleUrls: ['./mainview.component.css']
})
export class MainviewComponent implements OnInit {

  public opened = false;
  public mode = new FormControl('over');
  public selectedTemperatureUnit: string;
  public selectedPressureUnit: string;
  public isCelsius: boolean;
  public isFahrenheit: boolean;
  public isMBar: boolean;
  public isInHg: boolean;

  constructor(private settingsSidebarService: SettingsSidebarService) { }

  public toggleSidenav(): void {
    this.opened = !this.opened;
    this.settingsSidebarService.sidebarChanges.next(!this.opened);
  }

  public onTemperatureUnitChanged(): void {
    this.settingsSidebarService.radioTemperatureUnitChanges.next(this.selectedTemperatureUnit);
  }

  public onPressureUnitChanged(): void {
    this.settingsSidebarService.radioPressureUnitChanges.next(this.selectedPressureUnit);
  }

  ngOnInit(): void {
    this.selectedTemperatureUnit = this.settingsSidebarService.selectedRadioTemperatureUnit;
    this.selectedPressureUnit = this.settingsSidebarService.selectedRadioPressureUnit;
    if (this.selectedTemperatureUnit === 'celsius') {
      this.isCelsius = true;
      this.isFahrenheit = false;
    } else {
      this.isCelsius = false;
      this.isFahrenheit = true;
    }
    if (this.selectedPressureUnit === 'mbar') {
      this.isMBar = true;
      this.isInHg = false;
    } else {
      this.isMBar = false;
      this.isInHg = true;
    }
  }

}
