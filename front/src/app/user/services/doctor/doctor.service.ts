import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = environment.backEndUrl;
  constructor(
    private http: HttpClient,
  ) {}

  getAllDoctors() {
    return this.http.get(`${this.apiUrl}doctors`);
  }
  addDoctor(doctor: any) {
    return this.http.post(`${this.apiUrl}doctors`, doctor);

  }
}
