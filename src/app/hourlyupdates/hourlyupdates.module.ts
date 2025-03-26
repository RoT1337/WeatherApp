import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HourlyupdatesPageRoutingModule } from './hourlyupdates-routing.module';

import { HourlyupdatesPage } from './hourlyupdates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HourlyupdatesPageRoutingModule
  ],
  declarations: [HourlyupdatesPage]
})
export class HourlyupdatesPageModule {}
