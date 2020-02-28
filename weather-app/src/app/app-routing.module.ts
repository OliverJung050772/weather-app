import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { MainviewComponent} from './components/mainview/mainview.component';
import {HistoryComponent} from './components/history/history.component';


// TODO default route ?
const routes: Routes = [
  { path: 'main', component: MainviewComponent },
  { path: 'history/:name', component: HistoryComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
