import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Measurement} from '../../models/measurement';
import {WeatherService} from '../../services/weather.service';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit {

  public dataSourceName: string;
  public unitPressureKey: string;
  public unitTemperatureKey: string;
  public title: string;
  public measurementSource: Measurement[] = [];

  constructor(private route: ActivatedRoute,
              private weatherService: WeatherService,
              private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.dataSourceName = this.route.snapshot.params.name;
    if (this.dataSourceName === 'pressure') {
      this.measurementSource = this.weatherService.getPressureHistory();
      this.title = 'Barometic Pressure History';
      this.weatherService.pressureHistoryChanges.asObservable().subscribe(measurements =>
        this.measurementSource = this.sortMeasurementsDesc(measurements));
      this.settingsService.radioPressureUnitChanges.asObservable()
        .subscribe(unit => this.unitPressureKey = unit);
    } else {
      this.measurementSource = this.weatherService.getTemperatureHistory();
      this.title = 'Temperature History';
      this.weatherService.temperatureHistoryChanges.asObservable()
        .subscribe(measurements => this.measurementSource = this.sortMeasurementsDesc(measurements));
      this.settingsService.radioTemperatureUnitChanges.asObservable()
        .subscribe(unit => this.unitTemperatureKey = unit);
    }
    this.unitTemperatureKey = this.settingsService.selectedRadioTemperatureUnit;
    this.unitPressureKey = this.settingsService.selectedRadioPressureUnit;
  }

  private sortMeasurementsDesc(measurements: Measurement[]): Measurement[] {
    const sortedData = measurements.sort((a, b) => b.timeStamp - a.timeStamp);
    return sortedData;
  }

}
