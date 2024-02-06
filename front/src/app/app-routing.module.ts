import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './sign/login/login.component';
import { SignupComponent } from './sign/signup/signup.component';
import { HomeComponent } from './user/home/home.component';
import { AddDoctorComponent } from './user/add-doctor/add-doctor.component';
import { AuthGuard } from './guards/auth.guard';
import { unauthGuard } from './guards/unauth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],


  },
  {
    path: 'add-doctor',
    component: AddDoctorComponent,
    canActivate: [AuthGuard],


  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [unauthGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [unauthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
