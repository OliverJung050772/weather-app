import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsSidebarService {

  sidebarIsShown: boolean;
  sidebarChanges = new BehaviorSubject<boolean>(false);

  selectedRadioTemperatureUnit: string = 'celsius';
  selectedRadioPressureUnit: string = 'mbar';

  public radioTemperatureUnitChanges = new BehaviorSubject<string>('');
  public radioPressureUnitChanges = new BehaviorSubject<string>('');

  constructor() {
    this.radioTemperatureUnitChanges.asObservable().subscribe(
      unit => {
         this.selectedRadioTemperatureUnit = unit;
         console.log(this.selectedRadioTemperatureUnit);
     });
    this.radioPressureUnitChanges.asObservable().subscribe(
      unit => {
         this.selectedRadioPressureUnit = unit;
         console.log(this.selectedRadioPressureUnit);
     });
  }

}
