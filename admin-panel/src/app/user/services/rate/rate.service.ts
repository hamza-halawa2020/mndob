import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments';

@Injectable({
  providedIn: 'root'
})
export class RateService {



  private apiUrl = environment.backEndUrl;
  constructor(private http: HttpClient) {}


  delete(id: any) {
    return this.http.delete(`${this.apiUrl}rates/${id}`);
  }

}
