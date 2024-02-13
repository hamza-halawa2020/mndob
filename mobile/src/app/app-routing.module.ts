import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'add-doctor',
    loadChildren: () => import('./pages/user/add-doctor/add-doctor.module').then( m => m.AddDoctorPageModule)
  },
  {
    path: 'add-visit',
    loadChildren: () => import('./pages/user/add-visit/add-visit.module').then( m => m.AddVisitPageModule)
  },
  {
    path: 'all-doctors',
    loadChildren: () => import('./pages/user/all-doctors/all-doctors.module').then( m => m.AllDoctorsPageModule)
  },
  {
    path: 'doctor-details',
    loadChildren: () => import('./pages/user/doctor-details/doctor-details.module').then( m => m.DoctorDetailsPageModule)
  },
  {
    path: 'visit-rate',
    loadChildren: () => import('./pages/user/visit-rate/visit-rate.module').then( m => m.VisitRatePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/sign/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/sign/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/user/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'navbar',
    loadChildren: () => import('./pages/shared/navbar/navbar.module').then( m => m.NavbarPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
