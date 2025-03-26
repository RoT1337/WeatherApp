import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HourlyupdatesPage } from './hourlyupdates.page';

const routes: Routes = [
  {
    path: '',
    component: HourlyupdatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HourlyupdatesPageRoutingModule {}
