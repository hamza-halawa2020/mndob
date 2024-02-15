import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddVisitPageRoutingModule } from './add-visit-routing.module';

import { AddVisitPage } from './add-visit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddVisitPageRoutingModule
  ],
  exports:[AddVisitPage],
  declarations: [AddVisitPage]
})
export class AddVisitPageModule {}
