import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments';

@Injectable({
  providedIn: 'root',
})
export class GovernatesService {
  private apiUrl = environment.backEndUrlApi;
  constructor(private http: HttpClient) {}

  getGovernorates() {
    return this.http.get(`${this.apiUrl}governates`);
  }
}
