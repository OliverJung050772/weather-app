import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})

export class TemperatureComponent implements OnInit {

  currentTemperature: number;
  averageTemperature: number;

  measuredTemperatures: number[] = [];
  private readonly subject = new Subject<number[]>();

  constructor(private weatherService: WeatherService) {
  }

  measureTemperature(): void {
    this.currentTemperature = this.weatherService.getTemperature();
    this.measuredTemperatures.push(this.currentTemperature);
    this.subject.next(this.measuredTemperatures);
  }

  ngOnInit(): void {
    setInterval(() => this.measureTemperature(), 10000);
    // Set initial Temperature
    this.averageTemperature = 0;
    this.measureTemperature();
    this.subject.asObservable().subscribe((array) => {
        const arraySum = array.reduce((a, b) => a + b, 0);
        const arrayLength = array.length;
        this.averageTemperature = Math.round(arraySum / arrayLength);
    });
  }

}
