import { Component, OnInit } from '@angular/core';
import { GovernatesService } from '../services/governates/governates.service';
import { SignService } from '../../sign/services/sign/sign.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  formSubmitted: boolean = false;
  governorates: any;
  error: any;
  myProfile: any;
  userId: any;
  constructor(private gov: GovernatesService, private user: SignService) {}

  ngOnInit(): void {
    this.getGovernorates();
    this.getUserData();
  }

  loginForm = new FormGroup({
    name_en: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl(''),
    name_ar: new FormControl('', [Validators.required]),
    gov_id: new FormControl('', [Validators.required]),
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

  get gov_id(): FormControl {
    return this.loginForm.get('gov_id') as FormControl;
  }

  getGovernorates() {
    this.gov.getGovernorates().subscribe((data) => {
      this.governorates = Object.values(data)[0];
      this.governorates.sort((a: any, b: any) =>
        a.name_ar.localeCompare(b.name_ar)
      );
    });
  }

  getUserData() {
    this.user.getUserData().subscribe((data) => {
      this.myProfile = Object.values(data)[0];
      this.userId = this.myProfile.id;
      // console.log('myProfile', this.myProfile);
      // console.log('userId', this.userId);

      this.loginForm.patchValue({
        name_en: this.myProfile.name_en,
        email: this.myProfile.email,
        name_ar: this.myProfile.name_ar,
        gov_id: this.myProfile.gov_id,
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
