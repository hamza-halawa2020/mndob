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
        // console.log('doctors',this.doctors);
        
      },
      (error) => {
        console.log('Error fetching doctors:', error);
      }
    );
  }

  getNewestVisitRate(visitRates: any[]): any {
    if (visitRates.length === 0) {
      return null;
    }
    visitRates.sort((a, b) => {
      const yearDiff = parseInt(b.year) - parseInt(a.year);
      if (yearDiff !== 0) {
        return yearDiff;
      }
      return parseInt(b.month) - parseInt(a.month);
    });
    return visitRates[0];
  }

}
