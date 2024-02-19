import { Component, OnInit } from '@angular/core';
import { GovernatesService } from '../../user/services/governates/governates.service';
import { SignService } from '../services/sign/sign.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  formSubmitted: boolean = false;
  error: any;
  governorates: any;

  constructor(
    private gov: GovernatesService,
    private signService: SignService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getGovernorates();
  }

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
    name_en: new FormControl('', [Validators.required]),
    name_ar: new FormControl('', [Validators.required]),
    gov_id: new FormControl('', [Validators.required]),

  });

  get name_en(): FormControl {
    return this.loginForm.get('name_en') as FormControl;
  }
  get name_ar(): FormControl {
    return this.loginForm.get('name_ar') as FormControl;
  }
  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
  get gov_id(): FormControl {
    return this.loginForm.get('gov_id') as FormControl;
  }

  getGovernorates() {
    this.gov.getGovernorates().subscribe((data) => {
      this.governorates = Object.values(data)[0];
      // console.log('governorates', this.governorates);
    });
  }
  async login() {
    if (this.loginForm.valid) {
      this.formSubmitted = true;
      this.signService.registerUser(this.loginForm.value).subscribe(
        () => {
          this.error = 'success registeration';
          this.loginForm.reset();
          this.router.navigate(['login']);
        },
        (error) => {
          this.error = error.message;
        }
      );
    } else {
      this.error = 'Form is invalid. Please fill all the required fields.';
    }
  }
}
