import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  dateTimeObject: Date;

  private readonly dateChangedSubject = new Subject<Date>();

  constructor() {
  }

  ngOnInit(): void {
    // set initial Date & time
    this.dateTimeObject = new Date();
    setInterval(() => this.dateChangedSubject.next(new Date()), 1000);

    this.dateChangedSubject.asObservable().subscribe(dateObj => this.dateTimeObject = dateObj);
  }

}

