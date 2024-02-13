import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllDoctorsPage } from './all-doctors.page';

const routes: Routes = [
  {
    path: '',
    component: AllDoctorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllDoctorsPageRoutingModule {}
