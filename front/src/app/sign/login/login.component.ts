import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/sign.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formSubmitted: boolean = false;
  constructor(private router: Router,private auth:LoginService) {}

  ngOnInit(): void {}

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

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  loginSubmitted() {
    if (this.loginForm.valid) {
      this.formSubmitted = true;
      this.auth.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          this.auth.setRoleInCookie(res.role);
          this.auth.setTokenInCookie(res.token);
          console.log('success login');

          this.loginForm.reset();
          this.router.navigate(['']);
        },
        error: () => {
          console.log("can't login");
        },
      });
    } else {
      console.log('Form is invalid. Please fill all the required fields.');
    }
  }
}
