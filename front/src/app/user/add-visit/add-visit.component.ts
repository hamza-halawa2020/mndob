import { Component } from '@angular/core';

@Component({
  selector: 'app-add-visit',
  templateUrl: './add-visit.component.html',
  styleUrls: ['./add-visit.component.css']
})
export class AddVisitComponent {

  userId: any;
  doctorId: any ;
  visitDate?: any ;

  addVisit() {
    console.log('User ID:', this.userId);
    console.log('Doctor ID:', this.doctorId);
    console.log('Visit Date:', this.visitDate);
    // this.userId = null;
    // this.doctorId = null;
    // this.visitDate = null;
  }
}