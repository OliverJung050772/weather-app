import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {

  temperature: number;

  constructor() { }

  onMeasureClick(): void {
    this.temperature = Math.round(60 * Math.random() - 20);
  }

  ngOnInit(): void {
    this.temperature = 0;
  }

}
