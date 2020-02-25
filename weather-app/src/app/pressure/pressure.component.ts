import { Component, OnInit } from '@angular/core';
import { RandomService } from '../random.service';

@Component({
  selector: 'app-pressure',
  templateUrl: './pressure.component.html',
  styleUrls: ['./pressure.component.css']
})
export class PressureComponent implements OnInit {

  pressure: number;

  readonly pressureSpan = {
    minPressure: 1080,
    maxPressure: 1150
  };

  constructor(private randomService: RandomService) { }

  measurePressure(): void {
    this.pressure = this.randomService.getRandomValue(this.pressureSpan.minPressure, this.pressureSpan.maxPressure);
  }

  ngOnInit(): void {
    setInterval(() => this.measurePressure(), 5000);
    // set initial pressure-value
    this.measurePressure();
  }

}
