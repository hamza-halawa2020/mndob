import { Component } from '@angular/core';
import { GovernatesService } from '../services/governates/governates.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/sign/service/sign.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  formSubmitted: boolean = false;
  error: any;
  myProfile: any;
  userId: any;
  constructor(private user: LoginService) {}

  ngOnInit(): void {
    this.getUserData();
  }

  loginForm = new FormGroup({
    name_en: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl(''),
    name_ar: new FormControl('', [Validators.required]),
  });
  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
  get name_en(): FormControl {
    return this.loginForm.get('name_en') as FormControl;
  }
  get name_ar(): FormControl {
    return this.loginForm.get('name_ar') as FormControl;
  }

  getUserData() {
    this.user.profile().subscribe((data) => {
      this.myProfile = Object.values(data)[0];

      this.userId = this.myProfile.id;

      this.loginForm.patchValue({
        name_en: this.myProfile.name_en,
        email: this.myProfile.email,
        name_ar: this.myProfile.name_ar,
      });
    });
  }

  loginSubmitted() {
    if (this.loginForm.valid) {
      this.formSubmitted = true;
      this.user.updateME(this.userId, this.loginForm.value).subscribe(
        () => {
          this.error = 'updated';
        },
        () => {
          this.error = 'Error ';
        }
      );
    } else {
      this.error = 'Error ';
    }
  }
}
