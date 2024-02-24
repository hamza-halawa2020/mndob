import { Component, OnInit } from '@angular/core';
import { SignService } from '../../sign/services/sign/sign.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.page.html',
  styleUrls: ['./navbar.page.scss'],
})
export class NavbarPage implements OnInit {
  isLoggedIn: boolean = false; // Initially assuming user is not logged in

  constructor(private authService: SignService) {}
  ngOnInit() {
    // Call checkLoginStatus when the component initializes
    this.checkLoginStatus();
  }

  async checkLoginStatus() {
    try {
      // Assuming your AuthService has a method to check login status asynchronously
      this.isLoggedIn = await this.authService.isLoggedIn();
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  }

  async logout() {
    try {
      // Call your authentication service logout method asynchronously
      await this.authService.logout(); 
      this.isLoggedIn = false; // Update the isLoggedIn property after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
}