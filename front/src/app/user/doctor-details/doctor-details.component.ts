import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../services/doctor/doctor.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css'],
})
export class DoctorDetailsComponent {
  id: any;
  Details: any;
  constructor(
    private activateRoute: ActivatedRoute,
    private doctorDetails: DoctorService
  ) {}


  ngOnInit(): void {
    this.getDoctor();
  }
 showAddVisit = false;

  openAddVisitModal() {
    this.showAddVisit = true;
  }
  getDoctor() {
    this.activateRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.doctorDetails.getDoctorById(this.id).subscribe((data) => {
        this.Details = Object.values(data)[0];
        console.log(this.Details);
      });
    });
  }
}
