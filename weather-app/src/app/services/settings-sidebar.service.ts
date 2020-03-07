import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsSidebarService {

  sidebarIsShown: boolean;
  sidebarChanges = new BehaviorSubject<boolean>(false);

  constructor() { }
  
}
