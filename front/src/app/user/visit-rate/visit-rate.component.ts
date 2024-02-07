import { Component } from '@angular/core';
import { DoctorService } from '../services/doctor/doctor.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VisitRateService } from '../services/visit_rate/visit-rate.service';

@Component({
  selector: 'app-visit-rate',
  templateUrl: './visit-rate.component.html',
  styleUrls: ['./visit-rate.component.css'],
})
export class VisitRateComponent {
  formSubmitted: boolean = false;
  allDoctors: any;
  error: any;
  constructor(
    private doctor: DoctorService,
    private visitRate: VisitRateService
  ) {}

  ngOnInit(): void {
    this.getAllDoctors();
  }

  loginForm = new FormGroup({
    visit_rate_min: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]$/)]),
    doctor_id: new FormControl('', [Validators.required]),
    month: new FormControl(new Date().getMonth() + 1, [Validators.required]),
    year: new FormControl(this.getYearRange()[0], [Validators.required]),
  });
  get visit_rate_min(): FormControl {
    return this.loginForm.get('visit_rate_min') as FormControl;
  }
  get doctor_id(): FormControl {
    return this.loginForm.get('doctor_id') as FormControl;
  }
  get month(): FormControl {
    return this.loginForm.get('month') as FormControl;
  }
  get year(): FormControl {
    return this.loginForm.get('year') as FormControl;
  }
  getAllDoctors() {
    this.doctor.getAllDoctors().subscribe((data) => {
      this.allDoctors = Object.values(data)[0];
      // console.log('allDoctors', this.allDoctors);
    });
  }

  getYearRange(): number[] {
    const currentYear = new Date().getFullYear();
    const yearRange = [];
    for (let i = currentYear; i >= currentYear - 5; i--) {
      yearRange.push(i);
    }
    return yearRange;
  }

  loginSubmitted() {
    if (this.loginForm.valid) {
      this.formSubmitted = true;
      this.visitRate.addVisitRate(this.loginForm.value).subscribe(
        () => {
          this.loginForm.reset();
          this.error = 'done';
        },
        () => {
          this.error = 'Error doctors';
        }
      );
    } else {
      this.error = 'Error doctors';
    }
  }
}
