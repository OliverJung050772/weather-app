import { Component, OnInit } from '@angular/core';
import { RandomService } from '../random.service';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})

export class TemperatureComponent implements OnInit {

  temperature: number;

  readonly temperatureSpan = {
      minTemperature: -20,
      maxTemperature: 40
  };

  constructor(private randomService: RandomService) {}

  measureTemperature(): void {
      this.temperature = this.randomService.getRandomValue(this.temperatureSpan.minTemperature, this.temperatureSpan.maxTemperature);
  }

  ngOnInit(): void {
      setInterval(() => this.measureTemperature(), 10000);
      // Set initial Temperature
      this.measureTemperature();
  }

}


