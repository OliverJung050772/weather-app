import { Component, OnInit } from '@angular/core';
import { SettingsSidebarService } from '../../services/settings-sidebar.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl} from '@angular/forms';

@Component({
  selector: 'app-mainview',
  templateUrl: './mainview.component.html',
  styleUrls: ['./mainview.component.css']
})
export class MainviewComponent implements OnInit {
  // [x: string]: any;

  public opened = false;
  public mode = new FormControl('over');
  public selectedTemperatureUnit: string;
  public selectedPressureUnit: string;
  public isCelsius: boolean;
  public isFahrenheit: boolean;
  public isMBar: boolean;
  public isInHg: boolean;
  public pathParamName: string;

  constructor(
    private settingsSidebarService: SettingsSidebarService,
    private route: ActivatedRoute) { }

  public toggleSidenav(): void {
    this.opened = !this.opened;
    this.settingsSidebarService.getsidebarChanges.next(!this.opened);
  }

  public onTemperatureUnitChanged(): void {
    this.settingsSidebarService.radioTemperatureUnitChanges.next(this.selectedTemperatureUnit);
  }

  public onPressureUnitChanged(): void {
    this.settingsSidebarService.radioPressureUnitChanges.next(this.selectedPressureUnit);
  }

  ngOnInit(): void {
    this.pathParamName = this.route.snapshot.params.name;
    this.selectedTemperatureUnit = this.settingsSidebarService.selectedRadioTemperatureUnit;
    this.selectedPressureUnit = this.settingsSidebarService.selectedRadioPressureUnit;
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
