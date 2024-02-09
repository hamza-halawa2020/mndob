import { Component } from '@angular/core';
import { DoctorService } from '../services/doctor/doctor.service';
import { VisitsService } from '../services/visit/visits.service';
import { MapType } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  totalDoctorsCount: any;
  visitsByMonthArray: any;
  visits: any;

  constructor(
    private doctorsService: DoctorService,
    private visitsService: VisitsService
  ) {}

  ngOnInit(): void {
    this.getAllDoctors();
    this.getAllVisits();
  }

  getAllDoctors() {
    this.doctorsService.getAllDoctors().subscribe((count) => {
      this.totalDoctorsCount = Object.values(count)[0].length;
      // console.log(this.totalDoctorsCount);
    });
  }

  getAllVisits() {
    this.visitsService.getAllVisits().subscribe(
      (response: any) => {
        this.visits = Object.values(response)[0];
        console.log('visits', this.visits);

        this.visitsByMonthArray = this.aggregateVisitsByMonth(this.visits);
        console.log('visitsByMonthArray', this.visitsByMonthArray);
      },
      (error) => {
        console.error('Error fetching visits:', error);
      }
    );
  }

  aggregateVisitsByMonth(visits: any[]) {
    const visitsByMonth: { key: string; value: number }[] = [];

    visits.forEach((visit) => {
      const visitDate = new Date(visit.visit_date);
      const monthYearKey = `${visitDate.getFullYear()}-${
        visitDate.getMonth() + 1
      }`;
      const existingIndex = visitsByMonth.findIndex(
        (item) => item.key === monthYearKey
      );
      if (existingIndex !== -1) {
        visitsByMonth[existingIndex].value++;
      } else {
        visitsByMonth.push({ key: monthYearKey, value: 1 });
      }
    });

    return visitsByMonth;
  }
}
