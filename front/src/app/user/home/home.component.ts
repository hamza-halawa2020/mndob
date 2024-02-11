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
  doctorsVisitedToday: any;
  visitsByDoctorAndWeek: any;
  visitsByDay: any;
  noVisitsByDay: any;
  visitsByMonthArrayThreeMonths: any;
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
    });
  }

  //Total Doctors
  //Doctors Visited Today
  getAllVisits() {
    const today = new Date().toISOString().slice(0, 10);

    this.visitsService.getAllVisits().subscribe(
      (response: any) => {
        this.visits = Object.values(response)[0];
        this.visitsByMonthArray = this.aggregateVisitsByMonth(this.visits);
        this.visitsByMonthArrayThreeMonths = this.aggregateVisitsByLast3Months(
          this.visits
        );
        const visitsToday = this.visits.filter(
          (visit: { visit_date: string }) =>
            visit.visit_date.slice(0, 10) === today
        );
        const uniqueDoctorsVisitedToday = new Set(
          visitsToday.map((visit: { doctor_id: any }) => visit.doctor_id)
        );
        const doctorsVisitedTodayCount = uniqueDoctorsVisitedToday.size;
        this.doctorsVisitedToday = doctorsVisitedTodayCount;

        this.visitsByDay = this.aggregateVisitsByDay(this.visits);
        this.noVisitsByDay = this.aggregateNoVisitsByDay(this.visits);
      },
      (error) => {
        console.error('Error fetching visits:', error);
      }
    );
  }

  //Days Off (No Visits)
  aggregateNoVisitsByDay(visits: any[]) {
    const visitsByDay: { date: string; numberOfVisits: number }[] = [];
    const endDate = new Date();
    const startDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      
    );
    const visitCounts = new Map<string, number>();
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      visitCounts.set(currentDate.toLocaleDateString(), 0);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    visits.forEach((visit) => {
      const visitDate = new Date(visit.visit_date).toLocaleDateString();
      if (visitCounts.has(visitDate)) {
        visitCounts.set(visitDate, visitCounts.get(visitDate)! + 1);
      }
    });
    visitCounts.forEach((numberOfVisits, date) => {
      if (numberOfVisits === 0) {
        visitsByDay.push({ date, numberOfVisits });
      }
    });
    visitsByDay.sort((a, b) => {
      const dateA = new Date(b.date);
      const dateB = new Date(a.date);
      return dateA.getTime() - dateB.getTime();
    });
    return visitsByDay;
  }

  //Visited Doctor every Month Last 3 Months
  aggregateVisitsByMonth(visits: any[]) {
    const visitsByMonth: { key: string; value: number }[] = [];

    const currentDate = new Date();
    const firstDayOfCurrentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    for (let i = 0; i < 5; i++) {
      const monthStartDate = new Date(
        firstDayOfCurrentMonth.getFullYear(),
        firstDayOfCurrentMonth.getMonth() - i,
        1
      );
      const monthEndDate = new Date(
        firstDayOfCurrentMonth.getFullYear(),
        firstDayOfCurrentMonth.getMonth() - i + 1,
        0
      );

      const visitsInMonth = visits.filter((visit) => {
        const visitDate = new Date(visit.visit_date);
        return visitDate >= monthStartDate && visitDate <= monthEndDate;
      });

      const uniqueDoctorsSet = new Set<number>();
      visitsInMonth.forEach((visit) => {
        uniqueDoctorsSet.add(visit.doctor_id);
      });

      const monthYearKey = `${monthStartDate.getFullYear()}-${
        monthStartDate.getMonth() + 1
      }`;
      visitsByMonth.push({ key: monthYearKey, value: uniqueDoctorsSet.size });
    }

    return visitsByMonth;
  }

  //All Visited Doctors Last 3 Months
  aggregateVisitsByLast3Months(visits: any[]) {
    const visitsByMonthArray: any[] = [];

    const currentDate = new Date();
    const firstDayOfCurrentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    for (let i = 0; i < 5; i++) {
      const monthStartDate = new Date(
        firstDayOfCurrentMonth.getFullYear(),
        firstDayOfCurrentMonth.getMonth() - i,
        1
      );
      const monthEndDate = new Date(
        firstDayOfCurrentMonth.getFullYear(),
        firstDayOfCurrentMonth.getMonth() - i + 1,
        0
      );

      const visitsInMonth = visits.filter((visit) => {
        const visitDate = new Date(visit.visit_date);
        return visitDate >= monthStartDate && visitDate <= monthEndDate;
      });

      const monthYearKey = `${
        monthStartDate.getMonth() + 1
      }/${monthStartDate.getFullYear()}`;
      visitsByMonthArray.push({
        month: monthYearKey,
        numberOfVisits: visitsInMonth.length,
      });
    }

    return visitsByMonthArray;
  }

  //Visited Doctors by Day current month
  aggregateVisitsByDay(visits: any[]) {
    const visitsByDay: { date: string; numberOfVisits: number }[] = [];

    const currentDate = new Date();
    const firstDayOfCurrentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    for (let i = 0; i < 1; i++) {
      const monthStartDate = new Date(
        firstDayOfCurrentMonth.getFullYear(),
        firstDayOfCurrentMonth.getMonth() - i,
        1
      );
      const monthEndDate = new Date(
        firstDayOfCurrentMonth.getFullYear(),
        firstDayOfCurrentMonth.getMonth() - i + 1,
        0
      );

      const visitsInMonth = visits.filter((visit) => {
        const visitDate = new Date(visit.visit_date);
        return visitDate >= monthStartDate && visitDate <= monthEndDate;
      });

      const groupedVisits = visitsInMonth.reduce((acc, visit) => {
        const visitDate = new Date(visit.visit_date).toLocaleDateString();

        if (!acc[visitDate]) {
          acc[visitDate] = 0;
        }

        acc[visitDate]++;

        return acc;
      }, {});

      for (const date in groupedVisits) {
        if (Object.prototype.hasOwnProperty.call(groupedVisits, date)) {
          visitsByDay.push({ date, numberOfVisits: groupedVisits[date] });
        }
      }
    }
    visitsByDay.sort((a, b) => {
      const dateA = new Date(b.date);
      const dateB = new Date(a.date);
      return dateA.getTime() - dateB.getTime();
    });
    return visitsByDay;
  }
}
