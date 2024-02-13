import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDoctorPageRoutingModule } from './add-doctor-routing.module';

import { AddDoctorPage } from './add-doctor.page';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDoctorPageRoutingModule,
    IonicStorageModule.forRoot(), // Add IonicStorageModule.forRoot() here
    ReactiveFormsModule
  ],
  declarations: [AddDoctorPage]
})
export class AddDoctorPageModule {}
