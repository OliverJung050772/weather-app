import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Measurement} from '../../models/measurement';
import {WeatherService} from '../../services/weather.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  dataSourceName: string;
  // TODO: Barometric Pressure History, Temperature History
  title: string;
  measurementSource: Measurement[] = [];

  constructor(private route: ActivatedRoute, private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.dataSourceName = this.route.snapshot.params.name;
    this.title = this.dataSourceName + '-history';
    if (this.dataSourceName === 'pressure') {
      this.measurementSource = this.weatherService.getPressureHistoryList();
    } else {
      this.measurementSource = this.weatherService.getTemperatureHistoryList();
    }
  }

}
