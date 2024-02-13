import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class SignService {
  private apiUrl = environment.backEndUrl;
  
  constructor(
    private http: HttpClient,
    private router: Router,
    // private storage: Storage
  ) {
    // this.initStorage();
  }

  // private async initStorage() {
  //   await this.storage.create();
  // }

  login(userData: any) {
    return this.http.post(`${this.apiUrl}login`, userData, {
      withCredentials: true,
    });
  }

  registerUser(userData: any) {
    return this.http.post(`${this.apiUrl}users`, userData);
  }

  async setToken(token: string) {
    // await this.storage.set('token', token); // Ensure to wait for the operation to complete
  }

  getToken() {
    // return this.storage.get('token');
  }

  async setRole(role: string) {
    // await this.storage.set('role', role); // Ensure to wait for the operation to complete
  }

  getRole() {
    // return this.storage.get('role');
  }

  async isLoggedIn() {
    // const token = await this.getToken(); // Wait for the token retrieval
    // return !!token;
  }

  async isAdmin() {
    // const role = await this.getRole(); // Wait for the role retrieval
    // return role === 'manager';
  }

  async logout() {
    // await this.storage.clear(); // Ensure to wait for the operation to complete
    this.router.navigate(['']);
  }
}
