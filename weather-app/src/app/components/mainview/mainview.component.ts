import { Component, OnInit } from '@angular/core';
import { SettingsSidebarService } from '../../services/settings-sidebar.service';

@Component({
  selector: 'app-mainview',
  templateUrl: './mainview.component.html',
  styleUrls: ['./mainview.component.css']
})
export class MainviewComponent implements OnInit {

  public opened: boolean = false;
  public selectedTemperatureUnit: string = 'celsius';
  public selectedPressureUnit: string = 'mbar';

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

  }

}
