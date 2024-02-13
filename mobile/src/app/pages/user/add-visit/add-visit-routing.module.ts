import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddVisitPage } from './add-visit.page';

const routes: Routes = [
  {
    path: '',
    component: AddVisitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddVisitPageRoutingModule {}
