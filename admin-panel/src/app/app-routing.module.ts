import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './sign/login/login.component';
import { HomeComponent } from './user/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { unauthGuard } from './guards/unauth.guard';
import { AllDoctorsComponent } from './user/all-doctors/all-doctors.component';
import { DoctorDetailsComponent } from './user/doctor-details/doctor-details.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AllUsersComponent } from './user/all-users/all-users.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: AllUsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/:id',
    component: UserDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'all-doctors',
    component: AllDoctorsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'doctors/:id',
    component: DoctorDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [unauthGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
