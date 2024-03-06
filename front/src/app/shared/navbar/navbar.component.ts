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

  ngOnInit(): void {
    this.toggleNavar();
  }

  toggleNavar() {
    const documentClickHandler = (event: any) => {
      const element = document.querySelector('.navbar-collapse');
      if (element && element.classList.contains('show') && !element.contains(event.target)) 
      {
        element.classList.remove('show');
        document.removeEventListener('click', documentClickHandler);
      }
      document.addEventListener('click', documentClickHandler);
    };
    this.router.events.subscribe((event: any) => {
      if (event) {
        const element = document.querySelector('.navbar-collapse');
        if (element && element.classList.contains('show')) {
          element.classList.remove('show');
        }
      }
      document.addEventListener('click', documentClickHandler);
    });
    
  }








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
