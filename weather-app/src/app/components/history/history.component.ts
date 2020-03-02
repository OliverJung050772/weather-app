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
  unitMeasurement: string;
  title: string;
  measurementSource: Measurement[] = [];

  constructor(private route: ActivatedRoute, private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.dataSourceName = this.route.snapshot.params.name;
    if (this.dataSourceName === 'pressure') {
      this.measurementSource = this.weatherService.getPressureHistory();
      this.title = 'barometic ' + this.dataSourceName + ' history';
      this.unitMeasurement = ' mBar';
      this.measurementSource = [];
      this.weatherService.pressureHistoryChanges.asObservable().subscribe(measurements =>
        this.measurementSource = this.sortMeasurementsDesc(measurements));
    } else {
      this.measurementSource = this.weatherService.getTemperatureHistory();
      this.title = this.dataSourceName + ' history';
      this.unitMeasurement = ' °C';
      this.measurementSource = [];
      this.weatherService.temperatureHistoryChanges.asObservable()
        .subscribe(measurements => this.measurementSource = this.sortMeasurementsDesc(measurements));
    }
  }

  private sortMeasurementsDesc(measurements: Measurement[]): Measurement[] {
    const sortedData = measurements.sort((a, b) => b.timeStamp - a.timeStamp);
    return sortedData;
  }

}
