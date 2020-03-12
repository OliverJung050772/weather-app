import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
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
    private settingsService: SettingsService,
    private route: ActivatedRoute) { }

  public toggleSidenav(): void {
    this.opened = !this.opened;
    this.settingsService.getsidebarChanges.next(!this.opened);
  }

  public onTemperatureUnitChanged(): void {
    this.settingsService.radioTemperatureUnitChanges.next(this.selectedTemperatureUnit);
  }

  public onPressureUnitChanged(): void {
    this.settingsService.radioPressureUnitChanges.next(this.selectedPressureUnit);
  }

  ngOnInit(): void {
    this.pathParamName = this.route.snapshot.params.name;
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
