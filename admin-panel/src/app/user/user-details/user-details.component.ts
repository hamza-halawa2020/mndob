import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../services/doctor/doctor.service';
import { VisitsService } from '../services/visit/visits.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  users: any;
  totalDoctors: any;
  id: any;
  filteredusers: any;
  selectedCategoryId: any = 'all';
  date: any;
  visitDate: any;
  doctorVisited: any;

  visit: any;

  constructor(
    private userService: UserService,
    private doctorService: DoctorService,
    private activateRoute: ActivatedRoute,
    private visitService: VisitsService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getAllDoctors();
  }

  // CRUD Operations

  deleteUser() {
    this.activateRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.userService.deleteUser(this.id).subscribe((data) => {
        this.users = Object.values(data)[0];
        this.route.navigate(['/users']);
      });
    });
  }

  // Data Fetching

  getAllDoctors() {
    this.activateRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.doctorService.getAllDoctorsForUser(this.id).subscribe((data) => {
        this.totalDoctors = data;
        // this.filteredusers = this.users;
        // this.sortusersByName();
      });
    });
  }

  doctorVisitedForOneDay(event: Event) {
    const selectedDate = (event.target as HTMLInputElement).value;
    if (selectedDate) {
      this.date = selectedDate;
      this.activateRoute.params.subscribe((params) => {
        this.id = +params['id'];
        this.visitService
          .getVisitsForOneDay(selectedDate, this.id)
          .subscribe((data) => {
            this.doctorVisited = data;
          });
      });
    }
  }

  visitedDoctorForMonth(event: Event) {
    const selectedDate = (event.target as HTMLInputElement).value;
    if (selectedDate) {
      this.visitDate = selectedDate;
      this.activateRoute.params.subscribe((params) => {
        this.id = +params['id'];
        const [year, month] = this.visitDate.split('-');
        this.visitService
          .getVisitsForOneMonth(year, month, this.id)
          .subscribe((data: any) => {
            this.visit = data;
            console.log('sdfsdfdsf', this.visit);
          });
      });
    }
  }

  // Filtering and Sorting

  filterCategory(event: any) {
    let value = event.target.value;
    if (value == 'all') {
      this.getAllDoctors();
    } else {
      this.getuserById(value);
    }
  }

  sortusersByName() {
    this.filteredusers.sort((a: any, b: any) => {
      const nameA = a.name_ar.toUpperCase();
      const nameB = b.name_ar.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  getuserById(keyWord: number) {
    this.userService.getuserById(keyWord).subscribe((data) => {
      if (data && typeof data === 'object') {
        this.filteredusers = [Object.values(data)[0]];
      } else {
        this.filteredusers = [];
      }
    });
  }
}
