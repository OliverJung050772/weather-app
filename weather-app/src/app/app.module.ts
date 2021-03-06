import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/app.component';
import { TemperatureComponent } from './components/temperature/temperature.component';
import { PressureComponent } from './components/pressure/pressure.component';
import { TimeComponent } from './components/time/time.component';
import { MainviewComponent } from './components/mainview/mainview.component';
import { HistoryComponent } from './components/history/history.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { ToFahrenheitPipe } from './pipes/toFahrenheit.pipe';
import { ToInHgPipe } from './pipes/toInHg.pipe';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';

@NgModule({
  declarations: [
    AppComponent,
    TemperatureComponent,
    PressureComponent,
    TimeComponent,
    MainviewComponent,
    HistoryComponent,
    ToFahrenheitPipe,
    ToInHgPipe,
    SidebarComponent,
    ToggleButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatRadioModule,
    FormsModule
  ],
  exports: [
    MatSidenavModule,
    BrowserAnimationsModule,
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
