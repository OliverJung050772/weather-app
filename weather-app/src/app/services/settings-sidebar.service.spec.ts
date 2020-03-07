import { TestBed } from '@angular/core/testing';

import { SettingsSidebarService } from './settings-sidebar.service';

describe('SettingsSidebarService', () => {
  let service: SettingsSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
