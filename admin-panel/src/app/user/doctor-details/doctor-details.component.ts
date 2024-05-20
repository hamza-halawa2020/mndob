import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../services/doctor/doctor.service';
import { GovernatesService } from '../services/governates/governates.service';
import { VisitsService } from '../services/visit/visits.service';
import { RateService } from '../services/rate/rate.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css'],
})
export class DoctorDetailsComponent {
  id: any;
  Details: any;
  governorates: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private doctorDetails: DoctorService,
    private visitDetails: VisitsService,
    private rateDetails: RateService,
    private gov: GovernatesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDoctor();
    this.getGovernorates();
  }

  getGovernorates() {
    this.gov.getGovernorates().subscribe((data) => {
      this.governorates = Object.values(data)[0];
    });
  }

  getDoctor() {
    this.activateRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.doctorDetails.getDoctorById(this.id).subscribe((data) => {
        this.Details = Object.values(data)[0];
      });
    });
  }
  deleteDoctor() {
    this.activateRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.doctorDetails.delete(this.id).subscribe((data) => {
        this.Details = Object.values(data)[0];
        this.router.navigate(['/all-doctors']);
      });
    });
  }

  deleteVisit(visitId: number) {
    this.visitDetails.delete(visitId).subscribe(
      () => {
        this.getDoctor();
      },
      (error) => {
        console.error('Error deleting visit:', error);
      }
    );
  }
  deleteRate(rateId: number) {
    this.rateDetails.delete(rateId).subscribe(
      () => {
        this.getDoctor();
      },
      (error) => {
        console.error('Error deleting visit:', error);
      }
    );
  }
}
