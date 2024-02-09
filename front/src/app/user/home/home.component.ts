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

    const uniqueVisitsMap = new Map<string, Set<number>>();

    visits.forEach((visit) => {
      const visitDate = new Date(visit.visit_date);
      const monthYearKey = `${visitDate.getFullYear()}-${
        visitDate.getMonth() + 1
      }`;

      // Create a unique key for each month
      if (!uniqueVisitsMap.has(monthYearKey)) {
        uniqueVisitsMap.set(monthYearKey, new Set<number>());
      }

      // Add doctor ID to the set for this month
      uniqueVisitsMap.get(monthYearKey)!.add(visit.doctor_id);
    });

    // Calculate the count of unique doctors for each month
    uniqueVisitsMap.forEach((doctorSet, monthYearKey) => {
      visitsByMonth.push({ key: monthYearKey, value: doctorSet.size });
    });

    return visitsByMonth;
  }
}
