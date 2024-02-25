import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../services/doctor/doctor.service';
import { VisitRateService } from '../services/visit-rate/visit-rate.service';
import { AnimationBuilder, style, animate } from '@angular/animations';

@Component({
  selector: 'app-visit-rate',
  templateUrl: './visit-rate.page.html',
  styleUrls: ['./visit-rate.page.scss'],
})
export class VisitRatePage implements OnInit {
  formSubmitted: boolean = false;
  allDoctors: any;
  error: any;
  constructor(
    private doctor: DoctorService,
    private visitRate: VisitRateService,
    private animationBuilder: AnimationBuilder

  ) {}

  ngOnInit(): void {
    this.getAllDoctors();
    this.animateForm();

  }

  animateForm() {
    const animation = this.animationBuilder.build([
      style({ transform: 'translateY(-50px)', opacity: 0 }), 
      animate('500ms ease', style({ transform: 'translateY(0)', opacity: 1 })), 
    ]);

    const element = document.querySelector('.visit-rate');
    if (element) {
      const player = animation.create(element);
      player.play();
    }
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
      this.allDoctors.sort((a:any, b: any) => a.doctor.name_ar.localeCompare(b.doctor.name_ar));

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
          // this.loginForm.reset();
          // this.loginForm.get('visit_rate_min')!.setValue('');
          this.loginForm.get('visit_rate_min')!.reset();
          this.loginForm.get('doctor_id')!.reset();
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
