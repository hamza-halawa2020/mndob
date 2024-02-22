import { GovernatesService } from './../services/governates/governates.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../services/doctor/doctor.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.page.html',
  styleUrls: ['./add-doctor.page.scss'],
})
export class AddDoctorPage implements OnInit {
  formSubmitted: boolean = false;
  governorates: any;
  error: any;

  constructor(private gov: GovernatesService, private doctor: DoctorService) {}

  ngOnInit(): void {
    this.getGovernorates();
  }

  loginForm = new FormGroup({
    name_en: new FormControl('', [Validators.required]),
    name_ar: new FormControl('', [Validators.required]),
    gov_id: new FormControl('', [Validators.required]),
    class: new FormControl('', [Validators.required]),
  });
  get name_en(): FormControl {
    return this.loginForm.get('name_en') as FormControl;
  }
  get name_ar(): FormControl {
    return this.loginForm.get('name_ar') as FormControl;
  }

  get gov_id(): FormControl {
    return this.loginForm.get('gov_id') as FormControl;
  }
  get class(): FormControl {
    return this.loginForm.get('class') as FormControl;
  }
  getGovernorates() {
    this.gov.getGovernorates().subscribe((data) => {
      this.governorates = Object.values(data)[0];
      this.governorates.sort((a:any, b: any) => a.name_en.localeCompare(b.name_en));

      console.log('governorates', this.governorates);
    });
  }

  loginSubmitted() {
    if (this.loginForm.valid) {
      this.formSubmitted = true;
      this.doctor.addDoctor(this.loginForm.value).subscribe(
        () => {
          this.loginForm.reset();
          this.error = 'done';
        },
        () => {
          this.error = 'Error doctors';
        }
      );
    } else {
      this.error = 'Error doctors';
    }
  }
}
