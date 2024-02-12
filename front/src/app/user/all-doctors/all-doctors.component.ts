import { Component } from '@angular/core';
import { DoctorService } from '../services/doctor/doctor.service';
import { normalize } from '@angular/common';
@Component({
  selector: 'app-all-doctors',
  templateUrl: './all-doctors.component.html',
  styleUrls: ['./all-doctors.component.css'],
})
export class AllDoctorsComponent {
  doctors: any;
  filteredDoctors: any;
  searchTerm: string = '';

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.getAllDoctors();
  }

  getAllDoctors() {
    this.doctorService.getAllDoctors().subscribe(
      (data: any) => {
        this.doctors = Object.values(data)[0];
        this.filteredDoctors = this.doctors;
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
  filterDoctors() {
    this.filteredDoctors = this.searchTerm
      ? this.doctors.filter((doctor: any) =>
          this.matchesSearchTerm(doctor)
        )
      : this.doctors;
  }

  // Helper function to check if the doctor matches the search term
  matchesSearchTerm(doctor: any): boolean {
    const normalizedSearchTerm = normalize(this.searchTerm, 'NFKD').toLowerCase();
    const normalizedNameEn = normalize(doctor.doctor.name_en, 'NFKD').toLowerCase();
    const normalizedNameEr = normalize(doctor.doctor.name_er, 'NFKD').toLowerCase();
    const normalizedGovName = normalize(doctor.doctor.gov_name_en, 'NFKD').toLowerCase();
    const normalizedId = normalize(doctor.doctor.id.toString(), 'NFKD').toLowerCase();
    const normalizedClass = normalize(doctor.doctor.class, 'NFKD').toLowerCase();

    return (
      normalizedNameEn.includes(normalizedSearchTerm) ||
      normalizedNameEr.includes(normalizedSearchTerm) ||
      normalizedGovName.includes(normalizedSearchTerm) ||
      normalizedId.includes(normalizedSearchTerm) ||
      normalizedClass.includes(normalizedSearchTerm)
    );
  }
}