import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../services/doctor/doctor.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VisitsService } from '../services/visit/visits.service';
import { GovernatesService } from '../services/governates/governates.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css'],
})
export class DoctorDetailsComponent {
  id: any;
  Details: any;
  visitTimes: any[] = [];
  formSubmitted: boolean = false;
  error: any;
  rateError: any;
  visitDate: any = {};
  governorates: any;
  errorUpdate: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private doctorDetails: DoctorService,
    private gov: GovernatesService
  ) {}

  ngOnInit(): void {
    this.getDoctor();
    this.getGovernorates();
  }

  getGovernorates() {
    this.gov.getGovernorates().subscribe((data) => {
      this.governorates = Object.values(data)[0];
      console.log(this.governorates);
    });
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
