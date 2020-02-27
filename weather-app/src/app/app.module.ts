import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import { TemperatureComponent } from './components/temperature/temperature.component';
import { PressureComponent } from './components/pressure/pressure.component';
import { TimeComponent } from './components/time/time.component';
import { MainviewComponent } from './components/mainview/mainview.component';
import { HistoryComponent } from './components/history/history.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    TemperatureComponent,
    PressureComponent,
    TimeComponent,
    MainviewComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
