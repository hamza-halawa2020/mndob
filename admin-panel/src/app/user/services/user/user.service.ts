import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.backEndUrl;
  constructor(private http: HttpClient) {}

  getAllusers() {
    return this.http.get(`${this.apiUrl}users`);
  }
  getuserById(userId: number) {
    const url = `${this.apiUrl}users/${userId}`;
    return this.http.get(url);
  }
  adduser(user: any) {
    return this.http.post(`${this.apiUrl}users`, user);
  }
  updateuserByID(id: string, data: any) {
    return this.http.put(`${this.apiUrl}users/${id}`, data);
  }
  
  deleteUser(userId: string) {
    return this.http.delete(`${this.apiUrl}users/${userId}`);
  }
}
