import { Component } from '@angular/core';
import { DoctorService } from '../services/doctor/doctor.service';
import { VisitsService } from '../services/visit/visits.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  totalDoctorsCount: any;
  totalVisitsCount: any;
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
  //   getAllVisits() {
  //     this.visitsService.getAllVisits().subscribe(
  //       (response: any) => {
  //         const visits = response.data;
  //         if (Array.isArray(visits)) {
  //           const filteredVisits = this.filterVisits(visits);
  //           this.totalVisitsCount = filteredVisits.length;
  //           console.log(this.totalVisitsCount);
  //         } else {
  //           console.error('Invalid response format:', response);
  //         }
  //       },
  //       (error) => {
  //         console.error('Error fetching visits:', error);
  //       }
  //     );
  //   }

  //   filterVisits(visits: any[]): any[] {
  //     const filteredVisits: any[] = [];
  //     const visitedDoctorsByMonth = new Map();

  //     visits.forEach((visit) => {
  //       const doctorId = visit.doctor_id;
  //       const visitDate = new Date(visit.visit_date);
  //       const monthYearKey = `${visitDate.getFullYear()}-${
  //         visitDate.getMonth() + 1
  //       }`;

  //       if (!visitedDoctorsByMonth.has(monthYearKey)) {
  //         visitedDoctorsByMonth.set(monthYearKey, new Set());
  //         visitedDoctorsByMonth.get(monthYearKey).add(doctorId);
  //         filteredVisits.push(visit);
  //       } else {
  //         if (!visitedDoctorsByMonth.get(monthYearKey).has(doctorId)) {
  //           visitedDoctorsByMonth.get(monthYearKey).add(doctorId);
  //           filteredVisits.push(visit);
  //         }
  //       }
  //     });

  //     return filteredVisits;
  //   }
  // }
  visitsByMonthArray: any;

  // getAllVisits() {
  //   this.visitsService.getAllVisits().subscribe(
  //     (response: any) => {
  //       const visits = response.data;
  //       if (Array.isArray(visits)) {
  //         const visitsByMonth = this.aggregateVisitsByMonth(visits);
  //         console.log('visitsByMonth', visitsByMonth);
  //       } else {
  //         console.error('Invalid response format:', response);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching visits:', error);
  //     }
  //   );
  // }
  getAllVisits() {
    this.visitsService.getAllVisits().subscribe(
      (response: any) => {
        const visits = response.data;
        if (Array.isArray(visits)) {
          this.visitsByMonthArray = this.aggregateVisitsByMonth(visits);
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching visits:', error);
      }
    );
  }

  aggregateVisitsByMonth(visits: any[]): Map<string, number> {
    const visitsByMonth = new Map<string, number>();

    visits.forEach((visit) => {
      const visitDate = new Date(visit.visit_date);
      const monthYearKey = `${visitDate.getFullYear()}-${
        visitDate.getMonth() + 1
      }`;
      const currentCount = visitsByMonth.get(monthYearKey) || 0;
      visitsByMonth.set(monthYearKey, currentCount + 1);
    });

    return visitsByMonth;
  }
}
