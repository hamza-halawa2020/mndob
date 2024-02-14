import { Component, Input } from '@angular/core';
import { VisitsService } from '../services/visit/visits.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-visit',
  templateUrl: './add-visit.component.html',
  styleUrls: ['./add-visit.component.css'],
})
export class AddVisitComponent {
  @Input() doctorId: any;
  error: any;
  visitDate: any = {};
  constructor(
    private visitService: VisitsService,
    private datePipe: DatePipe
  ) {}

  addVisit() {
    this.getLocation(); // Call the method to get user's location
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // On success, set the latitude and longitude in the visitDate object
          this.visitDate.latitude = position.coords.latitude;
          this.visitDate.longitude = position.coords.longitude;
          this.saveVisit(); // Once location is obtained, proceed to save the visit
        },
        (error) => {
          console.log('Error getting location:', error);
          this.error = 'Error getting location';
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
      this.error = 'Geolocation is not supported by this browser.';
    }
  }

  saveVisit() {
    // Add doctorId and visit date as you were doing before
    this.visitDate.doctor_id = this.doctorId;
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    this.visitDate.visit_date = formattedDate;

    console.log(this.visitDate);

    // Send the visit data to the service
    this.visitService.addVisit(this.visitDate).subscribe(
      () => {
        this.error = 'success';
      },
      () => {
        this.error = 'error';
      }
    );
  }
}
