import { Component, OnInit } from '@angular/core';
import { GovernatesService } from '../../user/services/governates/governates.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  constructor(private gov: GovernatesService) {}
  governorates: any;

  ngOnInit() {
    this.getGovernorates();
  }

  getGovernorates() {
    this.gov.getGovernorates().subscribe((data) => {
      this.governorates = Object.values(data)[0];
      // console.log('governorates', this.governorates);
    });
  }
}
