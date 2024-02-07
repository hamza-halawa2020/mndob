import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AllDoctorsComponent } from './all-doctors/all-doctors.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';



@NgModule({
  declarations: [
    HomeComponent,
    AddDoctorComponent,
    AllDoctorsComponent,
    DoctorDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ]
})
export class UserModule { }
