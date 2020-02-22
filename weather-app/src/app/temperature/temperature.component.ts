import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})

export class TemperatureComponent implements OnInit {

  temperature: number;
  pressure: number;

  readonly tempSpan = {
      minTemp: -20,
      maxTemp: 40
  };

  readonly pressSpan = {
      minPress: 1080,
      maxPress: 1150
  };

  constructor() { }

  getRandomValue(minVal: number, maxVal: number): number {
      return Math.round((maxVal - minVal) * Math.random() + minVal);
  }

  onMeasureTemperatureClick(): void {
      this.temperature = this.getRandomValue(this.tempSpan.minTemp, this.tempSpan.maxTemp);
  }

  onMeasurePressureClick(): void {
      this.pressure = this.getRandomValue(this.pressSpan.minPress, this.pressSpan.maxPress);
  }

  ngOnInit(): void {
      setInterval(() => this.onMeasureTemperatureClick(), 60000);
      // Set initial values
      this.onMeasurePressureClick();
      this.onMeasureTemperatureClick();
  }

}
