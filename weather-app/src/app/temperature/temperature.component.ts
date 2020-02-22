import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})

export class TemperatureComponent implements OnInit {

  temperature: number;
  pressure: number;

  constructor() { }

  onMeasureTemperatureClick(): void {
    this.temperature = Math.round(60 * Math.random() - 20);
  }

  onMeasurePressureClick(): void {
    this.pressure = Math.round(70 * Math.random() + 1080);
  }

  ngOnInit(): void {
    this.temperature = 0;
    this.pressure = 0;
  }

}
