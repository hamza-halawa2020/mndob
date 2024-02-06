import { Component } from '@angular/core';
import { DoctorService } from '../services/doctor/doctor.service';

@Component({
  selector: 'app-all-doctors',
  templateUrl: './all-doctors.component.html',
  styleUrls: ['./all-doctors.component.css'],
})
export class AllDoctorsComponent {
  doctors: any;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.getAllDoctors();
  }

  getAllDoctors() {
    this.doctorService.getAllDoctors().subscribe(
      (data: any) => {
        this.doctors = Object.values(data)[0];
        console.log('doctors',this.doctors);
        
      },
      (error) => {
        console.log('Error fetching doctors:', error);
      }
    );
  }
}
