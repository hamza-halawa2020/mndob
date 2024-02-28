import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../services/doctor/doctor.service';
import { AnimationBuilder, style, animate } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { VisitService } from '../services/visit/visit.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.page.html',
  styleUrls: ['./doctor-details.page.scss'],
})
export class DoctorDetailsPage implements OnInit {
  id: any;
  Details: any;
  visitTimes: any[] = [];
  formSubmitted: boolean = false;
  error: any;
  visitDate: any = {};

  constructor(
    private activateRoute: ActivatedRoute,
    private visitService: VisitService,
    private doctorDetails: DoctorService,
    private animationBuilder: AnimationBuilder,
    private geolocation: Geolocation
  ) {}

  ngOnInit(): void {
    this.getDoctor();
    this.animateForm();
  }

  animateForm() {
    const animation = this.animationBuilder.build([
      style({ transform: 'translateY(-50px)', opacity: 0 }),
      animate('500ms ease', style({ transform: 'translateY(0)', opacity: 1 })),
    ]);

    const element = document.querySelector('.doctor-details');
    if (element) {
      const player = animation.create(element);
      player.play();
    }
  }

  submitForm = new FormGroup({
    visit_date: new FormControl('', [Validators.required]),
  });
  get visit_date(): FormControl {
    return this.submitForm.get('visit_date') as FormControl;
  }
  addVisit() {
    this.getLocation();
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then(
      (position) => {
        this.visitDate.latitude = position.coords.latitude;
        this.visitDate.longitude = position.coords.longitude;
        this.visitDate.doctor_id = this.id;
        this.saveVisit();
      },
      (error) => {
        console.log('Error getting location:', error);
        this.error = 'Error getting location';
      }
    );
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
      });
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
  }
}
