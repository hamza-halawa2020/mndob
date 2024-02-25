import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../services/doctor/doctor.service';
import { AnimationBuilder, style, animate } from '@angular/animations';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.page.html',
  styleUrls: ['./doctor-details.page.scss'],
})
export class DoctorDetailsPage implements OnInit {
  id: any;
  Details: any;
  visitTimes: any[] = [];
  constructor(
    private activateRoute: ActivatedRoute,
    private doctorDetails: DoctorService,
    private animationBuilder: AnimationBuilder

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


  getDoctor() {
    this.activateRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.doctorDetails.getDoctorById(this.id).subscribe((data) => {
        this.Details = Object.values(data)[0];
        console.log(this.Details);
        
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
