import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitRateService {
  private apiUrl = environment.backEndUrl;
  constructor(
    private http: HttpClient,
  ) {}

  getAllVisitRates() {
    return this.http.get(`${this.apiUrl}visit_rates`);
  }
  getVisitRateById(id: number) {
    const url = `${this.apiUrl}visit_rates/${id}`;
    return this.http.get(url);
  }
  addVisitRate(id: any) {
    return this.http.post(`${this.apiUrl}visit_rates`, id);
  }
}