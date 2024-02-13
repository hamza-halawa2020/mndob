import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitRatePage } from './visit-rate.page';

const routes: Routes = [
  {
    path: '',
    component: VisitRatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitRatePageRoutingModule {}
