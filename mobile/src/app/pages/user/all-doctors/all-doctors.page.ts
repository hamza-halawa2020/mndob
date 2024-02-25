import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor/doctor.service';
import { AnimationBuilder, style, animate } from '@angular/animations';

@Component({
  selector: 'app-all-doctors',
  templateUrl: './all-doctors.page.html',
  styleUrls: ['./all-doctors.page.scss'],
})
export class AllDoctorsPage implements OnInit {
  doctors: any;
  filteredDoctors: any;
  searchTerm: string = '';
  selectedCategoryId: any = 'all';

  constructor(private doctorService: DoctorService,
    private animationBuilder: AnimationBuilder
    ) {}

  ngOnInit(): void {
    this.getAllDoctors();
    this.animateForm();

  }

  
  animateForm() {
    const animation = this.animationBuilder.build([
      style({ transform: 'translateY(-50px)', opacity: 0 }), 
      animate('500ms ease', style({ transform: 'translateY(0)', opacity: 1 })), 
    ]);

    const element = document.querySelector('.allDcotors');
    if (element) {
      const player = animation.create(element);
      player.play();
    }
  }


  getAllDoctors() {
    this.doctorService.getAllDoctors().subscribe(
      (data: any) => {
        this.doctors = Object.values(data)[0];
        this.filteredDoctors = this.doctors;
        this.sortDoctorsByName(); // Sort doctors by name
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

  filterCategory(event: any) {
    let value = event.target.value;
    if (value == 'all') {
      this.getAllDoctors();
    } else {
      this.getDoctorById(value);
    }
  }

  sortDoctorsByName() {
    this.filteredDoctors.sort((a: any, b: any) => {
      const nameA = a.doctor.name_ar.toUpperCase();
      const nameB = b.doctor.name_ar.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  getDoctorById(keyWord: number) {
    this.doctorService.getDoctorById(keyWord).subscribe((data) => {
      if (data && typeof data === 'object') {
        this.filteredDoctors = [Object.values(data)[0]];
      } else {
        this.filteredDoctors = [];
      }
    });
  }

  filterDoctors() {
    const searchTerm = this.searchTerm ? this.searchTerm.trim() : '';
    this.filteredDoctors = searchTerm
      ? this.doctors.filter(
          (doctor: any) =>
            doctor.doctor.name_en
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            doctor.doctor.name_ar
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            doctor.doctor.gov_name_en
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            doctor.doctor.id.toString().includes(searchTerm.toLowerCase()) ||
            doctor.doctor.class.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : this.doctors;
  }
}
