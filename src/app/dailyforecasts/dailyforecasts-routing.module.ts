import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyforecastsPage } from './dailyforecasts.page';

const routes: Routes = [
  {
    path: '',
    component: DailyforecastsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyforecastsPageRoutingModule {}
