import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.page.html',
  styleUrls: ['./add-doctor.page.scss'],
})
export class AddDoctorPage implements OnInit {
  formSubmitted: boolean = false;
  governorates: any;
  error: any;
  loginForm!: FormGroup ;
  gov: any;
  doctor: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    // private gov: GovernatesService,
    // private doctor: DoctorService,
    private storage: Storage // Inject Ionic storage service
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getGovernorates();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      name_en: ['', [Validators.required]],
      name_ar: ['', [Validators.required]],
      gov_id: ['', [Validators.required]],
      class: ['', [Validators.required]],
    });
  }

  get name_en() {
    return this.loginForm.get('name_en');
  }

  get name_ar() {
    return this.loginForm.get('name_ar');
  }

  get gov_id() {
    return this.loginForm.get('gov_id');
  }

  get class() {
    return this.loginForm.get('class');
  }

  getGovernorates() {
    // this.gov.getGovernorates().subscribe((data) => {
    //   this.governorates = Object.values(data)[0];
    // });
  }

  loginSubmitted() {
    if (this.loginForm.valid) {
      this.formSubmitted = true;
      // this.doctor.addDoctor(this.loginForm.value).subscribe(
      //   () => {
      //     this.loginForm.reset();
      //     this.error = 'done';
      //   },
      //   () => {
      //     this.error = 'Error doctors';
      //   }
      // );
    } else {
      this.error = 'Error doctors';
    }
  }
}