import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GovernatesService } from '../services/governates/governates.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css'],
})
export class AddDoctorComponent {
  formSubmitted: boolean = false;
  governorates: any;
  auth: any;
  constructor(private router: Router, private gov: GovernatesService) {}

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
      // console.log('governorates', this.governorates);
    });
  }
  getClass() {
    this.gov.getGovernorates().subscribe((data) => {
      this.governorates = Object.values(data)[0];
      // console.log('governorates', this.governorates);
    });
  }

  loginSubmitted() {
    if (this.loginForm.valid) {
      this.formSubmitted = true;
      console.log('loginForm',this.loginForm);
      
      // this.auth.registerUser(this.loginForm.value).subscribe({
      //   next: (res: any) => {
      //     console.log('success registeration');
      //     this.loginForm.reset();
      //     this.router.navigate(['login']);
      //   },
      //   error: () => {
      //     console.log("can't signup", this.loginForm.value);
      //   },
      // });
    } else {
      console.log('Form is invalid. Please fill all the required fields.');
    }
  }
}
