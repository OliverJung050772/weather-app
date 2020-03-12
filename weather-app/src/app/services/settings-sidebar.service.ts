import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsSidebarService {

  public sidebarIsShown: boolean;
  public getsidebarChanges = new BehaviorSubject<boolean>(false);

  public selectedRadioTemperatureUnit: string;
  public selectedRadioPressureUnit: string;

  public radioTemperatureUnitChanges = new BehaviorSubject<string>('');
  public radioPressureUnitChanges = new BehaviorSubject<string>('');

  constructor() {
    this.readSettingsLocal();
    this.pushUnitValuesForInitialLoading();
    this.radioTemperatureUnitChanges.asObservable().subscribe(
      unit => {
         this.selectedRadioTemperatureUnit = unit;
         this.saveSettingsLocal();
     });
    this.radioPressureUnitChanges.asObservable().subscribe(
      unit => {
         this.selectedRadioPressureUnit = unit;
         this.saveSettingsLocal();;
     });
  }

  public saveSettingsLocal(): void {
    localStorage.setItem('temperatureUnit', this.selectedRadioTemperatureUnit);
    localStorage.setItem('pressureUnit', this.selectedRadioPressureUnit);
  }

  public readSettingsLocal(): void {
    const temperatureUnit = localStorage.getItem('temperatureUnit');
    this.selectedRadioTemperatureUnit = temperatureUnit ? temperatureUnit : 'celsius';
    const pressureUnit = localStorage.getItem('pressureUnit');
    this.selectedRadioPressureUnit = pressureUnit ? pressureUnit : 'mbar';
  }

  /* this method seems to be necessary to display the complete pressure- & temperature- components!
  *  I really don't like it ... :-( */
  private pushUnitValuesForInitialLoading(): void {
    this.radioTemperatureUnitChanges.next(this.selectedRadioTemperatureUnit);
    this.radioPressureUnitChanges.next(this.selectedRadioPressureUnit);
  }

}
