import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitRatePageRoutingModule } from './visit-rate-routing.module';

import { VisitRatePage } from './visit-rate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitRatePageRoutingModule
  ],
  declarations: [VisitRatePage]
})
export class VisitRatePageModule {}
