import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainview',
  templateUrl: './mainview.component.html',
  styleUrls: ['./mainview.component.css']
})
export class MainviewComponent implements OnInit {

  public opened: boolean = false;

  constructor() { }

  public toggleSidenav(): void {
    this.opened = !this.opened;
  }

  ngOnInit(): void {
  }

}
