import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-pressure',
  templateUrl: './pressure.component.html',
  styleUrls: ['./pressure.component.css']
})
export class PressureComponent implements OnInit {

  currentPressure: number;

  constructor(private weatherService: WeatherService) { }

  measurePressure(): void {
    this.currentPressure = this.weatherService.getPressure();
  }

  ngOnInit(): void {
    setInterval(() => this.measurePressure(), 5000);
    // set initial pressure-value
    this.measurePressure();
  }

}
