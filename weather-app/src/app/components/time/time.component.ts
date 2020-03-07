import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import { SettingsSidebarService } from '../../services/settings-sidebar.service';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  // TODO find better name :)
  dateTimeObject: Date;
  sidebarDisplayed: boolean = false;

  private readonly dateChangedSubject = new Subject<Date>();

  constructor(private settingsSidebarService: SettingsSidebarService) {
  }

  ngOnInit(): void {
    // set initial Date & time
    this.dateTimeObject = new Date();
    setInterval(() => this.dateChangedSubject.next(new Date()), 1000);

    this.dateChangedSubject.asObservable().subscribe(dateObj => this.dateTimeObject = dateObj);
    this.settingsSidebarService.sidebarChanges.asObservable().subscribe(
      isVisible => this.sidebarDisplayed = isVisible
    );
    this.sidebarDisplayed = true;
  }

}
