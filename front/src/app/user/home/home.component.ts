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
  visitsByMonthArray: any;
  visits: any[] = [];
  doctorsVisitedToday: any;
  visitsByDoctorAndWeek: any;
  visitsByDay: any;
  noVisitsByDay: any;
  visitsByMonthArrayThreeMonths: any;
  selectedDate: any;
  doctorVisitsInSelectedDate: any;
  nameOfDoctorVisitsInSelectedDate: any;
  startDate: any;
  endDate: any;
  selectedMonth: string = new Date().toISOString().substring(0, 7);

  constructor(
    private doctorsService: DoctorService,
    private visitsService: VisitsService
  ) {
    this.selectedDate = new Date().toISOString().substring(0, 10);
  }

  ngOnInit(): void {
    this.getAllDoctors();
    this.getAllVisits();
    this.getVisitsCount(this.selectedDate);
    
    
  }
  //Total Doctors
  getAllDoctors() {
    this.doctorsService.getAllDoctors().subscribe((count) => {
      this.totalDoctorsCount = Object.values(count)[0].length;
    });
  }

  //Doctors Visited
  getVisitsCount(selectedDate: any): void {
    this.visitsService.getVisitsByDate(selectedDate).subscribe((data) => {
      this.doctorVisitsInSelectedDate = Object.values(data)[0].length;
      this.nameOfDoctorVisitsInSelectedDate = Object.values(data);
      // console.log('nameOfDoctorVisitsInSelectedDate',this.nameOfDoctorVisitsInSelectedDate);
      
      
    });
  }
  onDateChange(): void {
    this.getVisitsCount(this.selectedDate);
  }

  //Total Doctors
  //Doctors Visited Today
  getAllVisits() {
    const today = new Date().toISOString().slice(0, 10);

    this.visitsService.getAllVisits().subscribe(
      (response) => {
        this.visits = Object.values(response)[0];
        const visitsToday = this.visits.filter(
          (visit: { visit_date: string }) =>
            visit.visit_date.slice(0, 10) === today
        );
        const uniqueDoctorsVisitedToday = new Set(
          visitsToday.map((visit: { doctor_id: any }) => visit.doctor_id)
        );
        const doctorsVisitedTodayCount = uniqueDoctorsVisitedToday.size;
        this.doctorsVisitedToday = doctorsVisitedTodayCount;

      },
      (error) => {
        console.error('Error fetching visits:', error);
      }
    );
  }

  aggregateVisitsByMonth(visits: any[], startDate: Date, endDate: Date) {
    const visitsByMonth: {
      key: string;
      numberOfVisits: number;
      uniqueDoctors: number;
    }[] = [];

    for (
      let currentMonth = new Date(startDate);
      currentMonth <= endDate;
      currentMonth.setMonth(currentMonth.getMonth() + 1)
    ) {
      const monthStartDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1
      );
      const monthEndDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
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
      visitsByMonth.push({
        key: monthYearKey,
        numberOfVisits: visitsInMonth.length,
        uniqueDoctors: uniqueDoctorsSet.size,
      });
    }

    return visitsByMonth;
  }

  onMonthChange() {
    this.visitsByMonthArray = this.aggregateVisitsByMonth(
      this.visits,
      new Date(this.startDate),
      new Date(this.endDate)
    );
  }

  onMonthChangeeeeeee() {
    const startDate = new Date(this.selectedMonth + '-01');
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0
    );
    this.visitsByDay = this.aggregateVisitsByDay(
      this.visits,
      startDate,
      endDate
    );
    this.noVisitsByDay = this.aggregateNoVisitsByDay(
      this.visits,
      startDate,
      endDate
    );
  }

  aggregateVisitsByDay(visits: any[], startDate: Date, endDate: Date) {
    const visitsByDay: { date: string; numberOfVisits: number }[] = [];

    const visitsInMonth = visits.filter((visit) => {
      const visitDate = new Date(visit.visit_date);
      return visitDate >= startDate && visitDate <= endDate;
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

    visitsByDay.sort((a, b) => {
      const dateA = new Date(b.date);
      const dateB = new Date(a.date);
      return dateA.getTime() - dateB.getTime();
    });

    return visitsByDay;
  }

  aggregateNoVisitsByDay(visits: any[], startDate: Date, endDate: Date) {
    const visitsByDay: { date: string; day: string; numberOfVisits: number }[] =
      [];
    const visitDates = new Set<string>();

    visits.forEach((visit) => {
      const visitDate = new Date(visit.visit_date).toLocaleDateString();
      visitDates.add(visitDate);
    });

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateKey = currentDate.toLocaleDateString();
      const dayName = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
      });
      if (!visitDates.has(dateKey)) {
        visitsByDay.push({ date: dateKey, day: dayName, numberOfVisits: 0 });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return visitsByDay;
  }
}
