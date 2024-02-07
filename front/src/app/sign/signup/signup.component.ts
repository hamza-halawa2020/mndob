import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/sign.service';
import { GovernatesService } from 'src/app/user/services/governates/governates.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  formSubmitted: boolean = false;
  governorates: any;
  error: any;

  constructor(
    private router: Router,
    private auth: LoginService,
    private gov: GovernatesService
  ) {}

  ngOnInit(): void {
    this.getGovernorates();
  }

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    name_en: new FormControl('', [Validators.required]),
    name_ar: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
    gov_id: new FormControl('', [Validators.required]),
  });
  get name_en(): FormControl {
    return this.loginForm.get('name_en') as FormControl;
  }
  get name_ar(): FormControl {
    return this.loginForm.get('name_ar') as FormControl;
  }
  get Email(): FormControl {
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

  loginSubmitted() {
    if (this.loginForm.valid) {
      this.formSubmitted = true;
      this.auth.registerUser(this.loginForm.value).subscribe(
        () => {
          this.error = 'success registeration';
          this.loginForm.reset();
          this.router.navigate(['login']);
        },
        () => {
          this.error = "can't signup";
        }
      );
    } else {
      this.error = 'Form is invalid. Please fill all the required fields.';
    }
  }
}
