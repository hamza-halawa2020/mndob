import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor/doctor.service';

@Component({
  selector: 'app-all-doctors',
  templateUrl: './all-doctors.page.html',
  styleUrls: ['./all-doctors.page.scss'],
})
export class AllDoctorsPage implements OnInit {
  doctors: any;

  constructor(private doctorService: DoctorService) {}


  ngOnInit(): void {
    this.getAllDoctors();
  }

  getAllDoctors() {
    this.doctorService.getAllDoctors().subscribe(
      (data: any) => {
        this.doctors = Object.values(data)[0];
        console.log(this.doctors);
        

        // this.filteredDoctors = this.doctors;
        // this.sortDoctorsByName(); // Sort doctors by name
      },
      (error) => {
        console.log('Error fetching doctors:', error);
      }
    );
  }

}
