import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../services/doctor/doctor.service';
import { VisitsService } from '../services/visit/visits.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  providers: [DatePipe],
})
export class UserDetailsComponent implements OnInit {
  users: any;
  totalDoctors: any;
  id: any;
  filteredUsers: any;
  date: any;
  visitDate: any;
  doctorVisited: any;
  visit: any;
  vitiedDaysAndOff: any;
  selectedMonth: any;
  selectedYear: any;
  months = [
    { name: 'January', value: '01' },
    { name: 'February', value: '02' },
    { name: 'March', value: '03' },
    { name: 'April', value: '04' },
    { name: 'May', value: '05' },
    { name: 'June', value: '06' },
    { name: 'July', value: '07' },
    { name: 'August', value: '08' },
    { name: 'September', value: '09' },
    { name: 'October', value: '10' },
    { name: 'November', value: '11' },
    { name: 'December', value: '12' },
  ];
  years: number[] = [];
  AllDoctorWithVisit: any;

  constructor(
    private userService: UserService,
    private doctorService: DoctorService,
    private activateRoute: ActivatedRoute,
    private visitService: VisitsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.getAllDoctors();
    });

    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 10; year--) {
      this.years.push(year);
    }
    this.selectedMonth = this.months[0].value;
    this.selectedYear = currentYear;
  }

  deleteUser() {
    this.userService.deleteUser(this.id).subscribe(
      (data) => {
        this.users = Object.values(data)[0];
        this.router.navigate(['/users']);
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  getAllDoctors() {
    this.doctorService.getAllDoctorsForUser(this.id).subscribe(
      (data) => {
        this.totalDoctors = Object.values(data)[0];
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }

  doctorVisitedForOneDay(event: Event) {
    const selectedDate = (event.target as HTMLInputElement).value;
    if (selectedDate) {
      this.date = selectedDate;
      this.visitService.getVisitsForOneDay(selectedDate, this.id).subscribe(
        (data) => {
          this.doctorVisited = data;
        },
        (error) => {
          console.error('Error fetching visits for one day:', error);
        }
      );
    }
  }

  fetchDoctorsWithVisits() {
    const year = this.selectedYear.toString();
    const month = this.selectedMonth;
    const userId = this.id;
    this.visitService.getAllDoctorsWithVisits(year, month, userId).subscribe(
      (data: any) => {
        this.AllDoctorWithVisit = Object.values(data);
      },
      (error: any) => {
        console.error('Error fetching visits for the month:', error);
      }
    );
  }

  visitsAndOff(event: Event) {
    const selectedDate = (event.target as HTMLInputElement).value;
    if (selectedDate) {
      const [year, month] = selectedDate.split('-');
      this.visitService.getVisitsAndOff(year, month, this.id).subscribe(
        (data) => {
          // this.vitiedDaysAndOff = data;
        this.vitiedDaysAndOff = Object.values(data);

          console.log(this.vitiedDaysAndOff);
        },
        (error) => {
          console.error('Error fetching visits for the month:', error);
        }
      );
    }
  }

  visitedDoctorForMonth(event: Event) {
    const selectedDate = (event.target as HTMLInputElement).value;
    if (selectedDate) {
      this.visitDate = selectedDate;
      const [year, month] = this.visitDate.split('-');
      this.visitService.getVisitsForOneMonth(year, month, this.id).subscribe(
        (data) => {
          this.visit = data;
        },

        (error) => {
          console.error('Error fetching visits for one month:', error);
        }
      );
    }
  }

  getUserById(keyWord: number) {
    this.userService.getuserById(keyWord).subscribe(
      (data) => {
        this.filteredUsers =
          data && typeof data === 'object' ? [Object.values(data)[0]] : [];
      },
      (error) => {
        console.error('Error fetching user by ID:', error);
      }
    );
  }
}
