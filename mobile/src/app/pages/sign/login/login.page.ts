import { Component, OnInit } from '@angular/core';
import { SignService } from '../services/sign/sign.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formSubmitted: boolean = false;
  error: any;

  constructor(private router: Router, private signService: SignService) {}

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
  });

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  ngOnInit() {}

  async login() {
    if (this.loginForm.valid) {
      this.formSubmitted = true;
      this.signService.login(this.loginForm.value).subscribe(
        (res: any) => {
          this.signService.setToken(res.token);
          this.error = 'success login';
          this.loginForm.reset();
          this.router.navigate(['']);
          // console.log('this.loginForm.value', this.loginForm.value);
          // console.log('res.token', res.token);
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
