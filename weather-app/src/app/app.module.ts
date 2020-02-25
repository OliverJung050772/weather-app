import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import { TemperatureComponent } from './components/temperature/temperature.component';
import { PressureComponent } from './components/pressure/pressure.component';

@NgModule({
  declarations: [
    AppComponent,
    TemperatureComponent,
    PressureComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
