import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments';

@Injectable({
  providedIn: 'root',
})
export class VisitsService {
  private apiUrl = environment.backEndUrl;
  constructor(private http: HttpClient) {}

  getAllVisits() {
    return this.http.get(`${this.apiUrl}visits`);
  }
  getVisitById(id: number) {
    const url = `${this.apiUrl}visits/${id}`;
    return this.http.get(url);
  }
  addVisit(id: any) {
    return this.http.post(`${this.apiUrl}visits`, id);
  }

  getVisitsByDate(date: any) {
    const url = `${this.apiUrl}visits-by-date/${date}`;
    return this.http.get(url);
  }

  getVisitsForOneMonth(year: any, month: any, userId: any) {
    const url = `${this.apiUrl}calculate-total-doctors-for-month/${year}/${month}/${userId}`;
    return this.http.get(url);
  }

  getVisitsForOneDay(date: any, userId: any) {
    const url = `${this.apiUrl}visit-date/${date}/user/${userId}`;
    return this.http.get(url);
  }
}
