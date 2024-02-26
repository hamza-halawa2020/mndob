import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AllDoctorsComponent } from './all-doctors/all-doctors.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { VisitRateComponent } from './visit-rate/visit-rate.component';
import { AddVisitComponent } from './add-visit/add-visit.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    HomeComponent,
    AddDoctorComponent,
    AllDoctorsComponent,
    DoctorDetailsComponent,
    VisitRateComponent,
    AddVisitComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FormsModule 
  ]
})
export class UserModule { }
