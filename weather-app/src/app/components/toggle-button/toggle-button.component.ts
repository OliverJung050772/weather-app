import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.css']
})

export class ToggleButtonComponent {

  @Input()
  public opened: boolean;

  @Output()
  public openedChange: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  public toggleSidenav(): void {
    this.opened = !this.opened;
    this.openedChange.emit(this.opened);
  }
}
