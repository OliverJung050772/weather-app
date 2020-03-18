import { TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';

describe('SettingsSidebarService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsService);
  });

  /* test saveSettingsLocal() method **/
  it('should save unit-settings to localStorage', () => {
    // Arrange
    service.selectedRadioPressureUnit = 'mbar';
    service.selectedRadioTemperatureUnit = 'celsius';
    // Act
    service.saveSettingsLocal();
    const readTemperatureUnit = localStorage.getItem('temperatureUnit');
    const readPressureUnit = localStorage.getItem('pressureUnit');
    // Assert
    expect(readTemperatureUnit).toBe('celsius');
    expect(readPressureUnit).toBe('mbar');
  });

  /* test readSettingsLocal() method **/
  it('should read unit-settings from localStorage', () => {
    // Arrange
    localStorage.setItem('temperatureUnit', 'fahrenh');
    localStorage.setItem('pressureUnit', 'inhg');
    // Act
    service.readSettingsLocal();
    // Assert
    expect(service.selectedRadioTemperatureUnit).toBe('fahrenh');
    expect(service.selectedRadioPressureUnit).toBe('inhg');
  });

});
