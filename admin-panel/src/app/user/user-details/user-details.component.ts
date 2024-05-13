import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../services/doctor/doctor.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent {
  users: any;
  id: any;

  filteredusers: any;
  selectedCategoryId: any = 'all';

  constructor(
    private userService: UserService,
    private doctorService: DoctorService,
    private activateRoute: ActivatedRoute,
    private route: Router
  ) {}

  deleteUser() {
    this.activateRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.userService.deleteUser(this.id).subscribe((data) => {
        this.users = Object.values(data)[0];
        this.route.navigate(['/users']);
      });
    });
  }

  getAllDoctors() {
    this.activateRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.doctorService.getAllDoctorsForUser(this.id).subscribe((data) => {
        this.users = Object.values(data)[0];
        console.log('Users in doctors only', this.users);
        this.filteredusers = this.users;
        this.sortusersByName();
      });
    });
  }

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
