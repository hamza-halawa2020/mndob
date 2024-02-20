import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllDoctorsPageRoutingModule } from './all-doctors-routing.module';

import { AllDoctorsPage } from './all-doctors.page';
import { AddVisitPage } from '../add-visit/add-visit.page';
import { AddVisitPageModule } from '../add-visit/add-visit.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllDoctorsPageRoutingModule,
    AddVisitPageModule,
  ],
  declarations: [AllDoctorsPage]
})
export class AllDoctorsPageModule {}
