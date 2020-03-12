import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public mode = new FormControl('over');
  public opened = false;

  constructor() {
  }

  ngOnInit(): void {
  }
}
