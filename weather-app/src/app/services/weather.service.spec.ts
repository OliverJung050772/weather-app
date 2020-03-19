import { TestBed } from '@angular/core/testing';

import { WeatherService } from '../services/weather.service';

describe('RandomService', () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });

});
