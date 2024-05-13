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
    private visitService: VisitsService,
    private gov: GovernatesService
  ) {}

  ngOnInit(): void {
    this.getDoctor();
    this.getGovernorates();
  }

  loginForm = new FormGroup({
    name_en: new FormControl('', [Validators.required]),
    name_ar: new FormControl('', [Validators.required]),
    gov_id: new FormControl('', [Validators.required]),
    class: new FormControl('', [Validators.required]),
  });
  get name_en(): FormControl {
    return this.loginForm.get('name_en') as FormControl;
  }
  get name_ar(): FormControl {
    return this.loginForm.get('name_ar') as FormControl;
  }

  get gov_id(): FormControl {
    return this.loginForm.get('gov_id') as FormControl;
  }
  get class(): FormControl {
    return this.loginForm.get('class') as FormControl;
  }
  getGovernorates() {
    this.gov.getGovernorates().subscribe((data) => {
      this.governorates = Object.values(data)[0];
      this.governorates.sort((a: any, b: any) =>
        a.name_ar.localeCompare(b.name_ar)
      );
    });
  }

  loginSubmitted() {
    if (this.loginForm.valid) {
      this.formSubmitted = true;
      this.doctorDetails
        .updateDoctorByID(this.id, this.loginForm.value)
        .subscribe(
          () => {
            // this.loginForm.reset();
            this.errorUpdate = 'done';
          },
          () => {
            this.errorUpdate = 'Error doctors';
          }
        );
    } else {
      this.errorUpdate = 'Error doctors';
    }
  }

  submitForm = new FormGroup({
    visit_date: new FormControl('', [Validators.required]),
  });

  get visit_date(): FormControl {
    return this.submitForm.get('visit_date') as FormControl;
  }

  visitRateForm = new FormGroup({
    visit_rate_min: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[1-9]$/),
    ]),
    month: new FormControl(new Date().getMonth() + 1, [Validators.required]),
  });
  get visit_rate_min(): FormControl {
    return this.visitRateForm.get('visit_rate_min') as FormControl;
  }
  get month(): FormControl {
    return this.month.get('month') as FormControl;
  }

  saveRate() {
    if (this.visitRateForm.valid) {
      this.formSubmitted = true;

      const currentYear = new Date().getFullYear();

      const visitData = {
        ...this.visitRateForm.value,
        doctor_id: this.id,
        year: currentYear,
      };
    } else {
      this.rateError = 'Form is invalid. Please fill all the required fields.';
    }
  }

  addVisit() {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.visitDate.latitude = position.coords.latitude;
          this.visitDate.longitude = position.coords.longitude;
          this.visitDate.doctor_id = this.id;
          this.saveVisit();
        },
        () => {
          this.error = 'Error getting location';
        }
      );
    } else {
      this.error = 'Geolocation is not supported by this browser.';
    }
  }

  saveVisit() {
    if (this.submitForm.valid) {
      this.formSubmitted = true;

      const visitData = {
        ...this.submitForm.value,
        ...this.visitDate,
      };
      this.visitService.addVisit(visitData).subscribe(
        () => {
          this.error = 'success';
        },
        () => {
          this.error = 'error';
        }
      );
    } else {
      this.error = 'Form is invalid. Please fill all the required fields.';
    }
  }

  getDoctor() {
    this.activateRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.doctorDetails.getDoctorById(this.id).subscribe((data) => {
        this.Details = Object.values(data)[0];
        this.extractVisitTimes();
        this.sortVisits();
        this.loginForm.patchValue({
          name_en: this.Details.doctor.name_en,
          name_ar: this.Details.doctor.name_ar,
          gov_id: this.Details.doctor.gov_id,
          class: this.Details.doctor.class,
        });
      });
    });
  }

  sortVisits() {
    this.sortVisits = this.Details.doctor.visiting.sort((a: any, b: any) => {
      return (
        new Date(b.visit_date).getTime() - new Date(a.visit_date).getTime()
      );
    });
  }

  extractVisitTimes() {
    const visitTimesMap: {
      [key: string]: { visitTimes: string[]; count: number };
    } = {};

    this.Details.doctor.visiting.forEach((visit: any) => {
      const month = new Date(visit.visit_date).getMonth() + 1;
      const year = new Date(visit.visit_date).getFullYear();
      const monthYear = `${month}/${year}`;

      if (!visitTimesMap[monthYear]) {
        visitTimesMap[monthYear] = { visitTimes: [], count: 0 };
      }

      visitTimesMap[monthYear].visitTimes.push(visit.visit_date);
      visitTimesMap[monthYear].count++;
    });

    this.visitTimes = Object.keys(visitTimesMap).map((key) => ({
      monthYear: key,
      visitTimes: visitTimesMap[key].visitTimes,
      count: visitTimesMap[key].count,
    }));

    this.visitTimes.sort((a, b) => {
      const dateA = new Date(a.monthYear);
      const dateB = new Date(b.monthYear);
      return dateB.getTime() - dateA.getTime();
    });
  }
}
