import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})

export class TemperatureComponent implements OnInit {

  currentTemperature: number;

  constructor(private weatherService: WeatherService) {}

  measureTemperature(): void {
      this.currentTemperature = this.weatherService.getTemperature();
  }

  ngOnInit(): void {
      setInterval(() => this.measureTemperature(), 10000);
      // Set initial Temperature
      this.measureTemperature();
  }

}
