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
  providers: [DatePipe]
})
export class UserDetailsComponent implements OnInit {
  users: any;
  totalDoctors: any;
  id: any;
  filteredUsers: any;
  selectedCategoryId: string = 'all';
  date: any;
  visitDate: any;
  doctorVisited: any;
  visit: any;
  visitsByDay: any;
  daysOff: any[] = [];

  constructor(
    private userService: UserService,
    private doctorService: DoctorService,
    private activateRoute: ActivatedRoute,
    private visitService: VisitsService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.getAllDoctors();
    });
  }

  // CRUD Operations
  deleteUser() {
    this.userService.deleteUser(this.id).subscribe(
      data => {
        this.users = Object.values(data)[0];
        this.router.navigate(['/users']);
      },
      error => {
        console.error('Error deleting user:', error);
      }
    );
  }

  // Data Fetching
  getAllDoctors() {
    this.doctorService.getAllDoctorsForUser(this.id).subscribe(
      data => {
        this.totalDoctors = Object.values(data)[0];
      },
      error => {
        console.error('Error fetching doctors:', error);
      }
    );
  }

  doctorVisitedForOneDay(event: Event) {
    const selectedDate = (event.target as HTMLInputElement).value;
    if (selectedDate) {
      this.date = selectedDate;
      this.visitService.getVisitsForOneDay(selectedDate, this.id).subscribe(
        data => {
          this.doctorVisited = data;
        },
        error => {
          console.error('Error fetching visits for one day:', error);
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
        data => {
          this.visit = data;
          this.determineDaysOff(year, month);
        },
        error => {
          console.error('Error fetching visits for one month:', error);
        }
      );
    }
  }

  determineDaysOff(year: string, month: string) {
    const numberOfDays = new Date(parseInt(year), parseInt(month), 0).getDate();
    const visitedDates = this.visit.map((v: any) => this.datePipe.transform(v.date, 'yyyy-MM-dd'));
    this.daysOff = [];

    for (let day = 1; day <= numberOfDays; day++) {
      const dateStr = `${year}-${month.padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      if (!visitedDates.includes(dateStr)) {
        const dayOfWeek = new Date(dateStr).toLocaleString('en-US', { weekday: 'long' });
        this.daysOff.push({ date: dateStr, day: dayOfWeek });
      }
    }
  }

  // Filtering and Sorting
  filterCategory(event: any) {
    const value = event.target.value;
    if (value === 'all') {
      this.getAllDoctors();
    } else {
      this.getUserById(value);
    }
  }

  sortUsersByName() {
    this.filteredUsers.sort((a: any, b: any) => {
      const nameA = a.name_ar.toUpperCase();
      const nameB = b.name_ar.toUpperCase();
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    });
  }

  getUserById(keyWord: number) {
    this.userService.getuserById(keyWord).subscribe(
      data => {
        this.filteredUsers = data && typeof data === 'object' ? [Object.values(data)[0]] : [];
      },
      error => {
        console.error('Error fetching user by ID:', error);
      }
    );
  }
}
