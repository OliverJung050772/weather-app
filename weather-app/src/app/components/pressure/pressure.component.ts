import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {Subject} from "rxjs";

@Component({
  selector: 'app-pressure',
  templateUrl: './pressure.component.html',
  styleUrls: ['./pressure.component.css']
})
export class PressureComponent implements OnInit {

  currentPressure: number;
  currentHourlyPressure: number;
  pressureTrendSymbol: string;
  pressureTrendText: string;
  private readonly intervalShort: number = 5000;
  private readonly intervalLong: number = 15000;
  private readonly pressureChangeSubject = new Subject<number>();
  private readonly pressureTrendChangeSubject = new Subject<number>();

  constructor(private weatherService: WeatherService) {
  }

  public measurePressure(): void {
    this.pressureChangeSubject.next(this.weatherService.getPressure());
  }

  private measurePressureOfHours(): void {
    this.pressureTrendChangeSubject.next(this.weatherService.getPressure());
  }

  private showPressureTrend(newPressure: number): void {
    const deltaPressure = newPressure - this.currentHourlyPressure;
    const timeSpan = this.intervalLong / (1000 * 6);
    if (Math.abs(deltaPressure) >= 4 && Math.abs(deltaPressure) / timeSpan >= 10) {
      if (deltaPressure > 0) {
        this.pressureTrendText = 'rising';
        this.pressureTrendSymbol = '↑';
      } else {
        this.pressureTrendText = 'falling';
        this.pressureTrendSymbol = '↓';
      }
    } else {
      this.pressureTrendText = 'stable';
      this.pressureTrendSymbol = '→';
    }
    this.currentHourlyPressure = newPressure;
  }

  ngOnInit(): void {
    // set initial pressure-value
    this.currentPressure = this.weatherService.getPressure();
    setInterval(() => this.measurePressure(), this.intervalShort);
    setInterval(() => this.measurePressureOfHours(), this.intervalLong);
    this.pressureChangeSubject.asObservable().subscribe( value => this.currentPressure = value);
    this.pressureTrendChangeSubject.asObservable().subscribe(value => this.showPressureTrend(value));
  }

}
