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
  visitTimes: any[] = [];
  constructor(
    private activateRoute: ActivatedRoute,
    private doctorDetails: DoctorService
  ) {}

  ngOnInit(): void {
    this.getDoctor();
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
