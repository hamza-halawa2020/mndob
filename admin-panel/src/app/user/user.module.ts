import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AllDoctorsComponent } from './all-doctors/all-doctors.component';
import { ProfileComponent } from './profile/profile.component';
import { SubNavComponent } from './sub-nav/sub-nav.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';

@NgModule({
  declarations: [
    HomeComponent,
    AllUsersComponent,
    AllDoctorsComponent,
    DoctorDetailsComponent,
    ProfileComponent,
    SubNavComponent,
    UserDetailsComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
})
export class UserModule {}
