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
  dateTime: Date;

  private readonly dateChangedSubject = new Subject<Date>();

  constructor(private settingsSidebarService: SettingsSidebarService) {
  }

  ngOnInit(): void {
    // set initial Date & time
    this.dateTime = new Date();
    setInterval(() => this.dateChangedSubject.next(new Date()), 1000);

    this.dateChangedSubject.asObservable().subscribe(dateObj => this.dateTime = dateObj);
  }

}
