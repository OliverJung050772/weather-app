import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsSidebarService {

  sidebarIsShown: boolean;
  sidebarChanges = new BehaviorSubject<boolean>(false);

  selectedRadioTemperatureUnit: string;
  selectedRadioPressureUnit: string;

  public radioTemperatureUnitChanges = new BehaviorSubject<string>('');
  public radioPressureUnitChanges = new BehaviorSubject<string>('');

  constructor() {
    this.readSettingsLocal();
    this.pushUnitValuesForInitialLoading();
    this.radioTemperatureUnitChanges.asObservable().subscribe(
      unit => {
         this.selectedRadioTemperatureUnit = unit;
         this.saveSettingsLocal();
         console.log(this.selectedRadioTemperatureUnit);
     });
    this.radioPressureUnitChanges.asObservable().subscribe(
      unit => {
         this.selectedRadioPressureUnit = unit;
         this.saveSettingsLocal();
         console.log(this.selectedRadioPressureUnit);
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
