import { Component, OnInit } from '@angular/core';
import { SettingsSidebarService } from '../../services/settings-sidebar.service';

@Component({
  selector: 'app-mainview',
  templateUrl: './mainview.component.html',
  styleUrls: ['./mainview.component.css']
})
export class MainviewComponent implements OnInit {

  public opened: boolean = false;
  public selectedTemperatureUnit: string;
  public temperatureUnits: string[] = [' °C', ' °F'];

  constructor(private settingsSidebarService: SettingsSidebarService) { }

  public toggleSidenav(): void {
    this.opened = !this.opened;
    this.settingsSidebarService.sidebarChanges.next(!this.opened);
  }

  ngOnInit(): void {
  }

}
