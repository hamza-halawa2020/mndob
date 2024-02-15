import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GovernatesService } from '../services/governates/governates.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.page.html',
  styleUrls: ['./add-doctor.page.scss'],
})
export class AddDoctorPage implements OnInit {
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
