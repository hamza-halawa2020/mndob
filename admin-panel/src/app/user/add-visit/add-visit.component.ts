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
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.visitDate.latitude = position.coords.latitude;
          this.visitDate.longitude = position.coords.longitude;
          this.saveVisit();
        },
        (error) => {
          // console.log('Error getting location:', error);
          this.error = 'Error getting location';
        }
      );
    } else {
      // console.log('Geolocation is not supported by this browser.');
      this.error = 'Geolocation is not supported by this browser.';
    }
  }

  saveVisit() {
    this.visitDate.doctor_id = this.doctorId;
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    this.visitDate.visit_date = formattedDate;

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
