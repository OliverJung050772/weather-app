import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { PressureComponent } from './pressure/pressure.component';

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
