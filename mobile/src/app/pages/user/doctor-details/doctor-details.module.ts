import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorDetailsPageRoutingModule } from './doctor-details-routing.module';

import { DoctorDetailsPage } from './doctor-details.page';
import { AddVisitPageModule } from '../add-visit/add-visit.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorDetailsPageRoutingModule,
    AddVisitPageModule
  ],
  declarations: [DoctorDetailsPage]
})
export class DoctorDetailsPageModule {}
