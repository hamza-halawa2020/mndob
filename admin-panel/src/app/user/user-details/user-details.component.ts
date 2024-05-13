import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent {
  users: any;
  id: any;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.deleteUser();
  }

  deleteUser() {
    this.userService.deleteUser(this.id).subscribe(
      (data: any) => {
        this.id = Object.values(data)[0];
        console.log(this.id);
      },
      (error) => {
        console.log('Error fetching users:', error);
      }
    );
  }
}
