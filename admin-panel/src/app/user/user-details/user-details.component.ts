import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent {
  users: any;
  id: any;
  constructor(
    private userService: UserService,
    private activateRoute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {}

  deleteUser() {
    this.activateRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.userService.deleteUser(this.id).subscribe((data) => {
        this.users = Object.values(data)[0];
        this.route.navigate(['/users']);
      });
    });
  }
}
