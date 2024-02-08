import { Component } from '@angular/core';
import { DoctorService } from '../services/doctor/doctor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  totalDoctorsCount: any;
  totalUsersCount: any;

  constructor(private doctorsService: DoctorService) { }

  ngOnInit(): void {
    this.fetchCounts();
  }

  fetchCounts(): void {
    this.doctorsService.getAllDoctors().subscribe(count => {
      this.totalDoctorsCount = Object.values(count)[0];
      // console.log(this.totalDoctorsCount);
    });
  }
}