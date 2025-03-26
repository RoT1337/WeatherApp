import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyforecastsPageRoutingModule } from './dailyforecasts-routing.module';

import { DailyforecastsPage } from './dailyforecasts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyforecastsPageRoutingModule
  ],
  declarations: [DailyforecastsPage]
})
export class DailyforecastsPageModule {}
