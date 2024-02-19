import { Component, OnInit } from '@angular/core';
import { SignService } from '../../sign/services/sign/sign.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.page.html',
  styleUrls: ['./navbar.page.scss'],
})
export class NavbarPage implements OnInit {
  constructor(private authService: SignService) {}
  ngOnInit(): void {}

  isLoggedIn(): boolean {
    return !!this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
