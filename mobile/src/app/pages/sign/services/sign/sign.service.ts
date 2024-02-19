import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';

const TOKEN_KEY = 'token';
@Injectable({
  providedIn: 'root',
})
export class SignService {
  private apiUrl = environment.backEndUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage
  ) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  login(userData: any) {
    return this.http.post(`${this.apiUrl}login`, userData, {
      withCredentials: true,
    });
  }

  registerUser(userData: any) {
    return this.http.post(`${this.apiUrl}users`, userData);
  }

  async setToken(token: string) {
    await this.storage.set(TOKEN_KEY, token);
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.getToken();
  }

  async getToken() {
    return await this.storage.get(TOKEN_KEY);
  }

  async logout() {
    await this.storage.remove(TOKEN_KEY);
    // this.storage.clear();
    this.router.navigate(['']);
  }
}
