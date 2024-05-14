import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl = environment.backEndUrl;
  constructor(private http: HttpClient) {}

  getAllDoctors() {
    return this.http.get(`${this.apiUrl}doctors`);
  }
  getAllDoctorsForUser($userId: any) {
    const url = `${this.apiUrl}total-doctors/${$userId}`;
    return this.http.get(url);
  }
  
  getDoctorById(doctorId: number) {
    const url = `${this.apiUrl}doctors/${doctorId}`;
    return this.http.get(url);
  }
  delete(doctor: any) {
    return this.http.delete(`${this.apiUrl}doctors/${doctor}`);
  }
}
