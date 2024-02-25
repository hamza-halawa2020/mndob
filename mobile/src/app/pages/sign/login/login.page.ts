import { Component, OnInit } from '@angular/core';
import { SignService } from '../services/sign/sign.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationBuilder, style, animate } from '@angular/animations';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formSubmitted: boolean = false;
  error: any;

  constructor(
    private router: Router,
    private signService: SignService,
    private animationBuilder: AnimationBuilder
  ) {}

  ngOnInit() {
    this.animateForm();
  }

  animateForm() {
    const animation = this.animationBuilder.build([
      style({ transform: 'translateY(-50px)', opacity: 0 }), 
      animate('500ms ease', style({ transform: 'translateY(0)', opacity: 1 })), 
    ]);

    const element = document.querySelector('.login-card');
    if (element) {
      const player = animation.create(element);
      player.play();
    }
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
  });

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

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
