import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/app/environments';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = environment.backEndUrl;
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}
  login(userData: any) {
    return this.http.post(`${this.apiUrl}login`, userData, {
      withCredentials: true,
    });
  }

  updateME(userId: string, userData: any) {
    return this.http.put(`${this.apiUrl}users/${userId}`, userData);
  }
  
  getUserData() {
    return this.http.get(`${this.apiUrl}users`);
  }

  registerUser(userData: any) {
    return this.http.post(`${this.apiUrl}users`, userData);
  }

  setTokenInCookie(token: string) {
    this.cookieService.set('token', token);
  }
  getTokenFromCookie(): any {
    return this.cookieService.get('token');
  }
  setRoleInCookie(role: string) {
    this.cookieService.set('role', role);
  }
  getRoleFromCookie() {
    return this.cookieService.get('role');
  }

  isLoggedIn() {
    return this.getTokenFromCookie();
  }

  isAdmin() {
    return this.getRoleFromCookie() === 'manager';
  }

  logout() {
    this.cookieService.deleteAll();
    this.router.navigate(['']);
  }
}
