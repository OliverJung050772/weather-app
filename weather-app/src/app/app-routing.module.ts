import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainviewComponent} from './components/mainview/mainview.component';
import {TemperatureComponent} from './components/temperature/temperature.component';

const routes: Routes = [
  { path: '', component: MainviewComponent},
  { path: 'main', component: MainviewComponent },
  { path: 'history/:name', component: MainviewComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
