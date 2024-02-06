import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/sign/service/sign.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private authService:LoginService ,
    private router: Router
  ) {}


  isLoggedIn(): boolean {
    return !!this.authService.isLoggedIn();
  }
  isAdmin() {
    return this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
  }
}
