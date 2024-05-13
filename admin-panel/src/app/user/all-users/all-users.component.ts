import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent {
  users: any;
  filteredusers: any;
  selectedCategoryId: any = 'all';
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllusers();
  }

  getAllusers() {
    this.userService.getAllusers().subscribe(
      (data: any) => {
        this.users = Object.values(data)[0];
        this.filteredusers = this.users;
        this.sortusersByName();
      },
      (error) => {
        console.log('Error fetching users:', error);
      }
    );
  }

  filterCategory(event: any) {
    let value = event.target.value;
    if (value == 'all') {
      this.getAllusers();
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
