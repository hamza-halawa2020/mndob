import { Component, OnInit } from '@angular/core';
import { GovernatesService } from '../services/governates/governates.service';

@Component({
  selector: 'app-visit-rate',
  templateUrl: './visit-rate.page.html',
  styleUrls: ['./visit-rate.page.scss'],
})
export class VisitRatePage implements OnInit {
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
