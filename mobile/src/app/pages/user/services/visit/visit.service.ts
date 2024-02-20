import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
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
}
