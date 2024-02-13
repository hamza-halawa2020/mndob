import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllDoctorsPageRoutingModule } from './all-doctors-routing.module';

import { AllDoctorsPage } from './all-doctors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllDoctorsPageRoutingModule
  ],
  declarations: [AllDoctorsPage]
})
export class AllDoctorsPageModule {}
