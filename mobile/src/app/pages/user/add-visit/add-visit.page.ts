import { Component, Input, OnInit } from '@angular/core';
import { VisitService } from '../services/visit/visit.service';
import { DatePipe } from '@angular/common';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-add-visit',
  templateUrl: './add-visit.page.html',
  styleUrls: ['./add-visit.page.scss'],
})
export class AddVisitPage implements OnInit {
  @Input() doctorId: any;
  error: any;
  visitDate: any = {};

  constructor(
    private visitService: VisitService,
    private datePipe: DatePipe,
    private geolocation: Geolocation
  ) {}
  ngOnInit(): void {}

  addVisit() {
    this.getLocation();
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then(
      (position) => {
        this.visitDate.latitude = position.coords.latitude;
        this.visitDate.longitude = position.coords.longitude;
        this.saveVisit();
      },
      () => {
        this.error = 'Error getting location';
      }
    );
  }

  saveVisit() {
    this.visitDate.doctor_id = this.doctorId;
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    this.visitDate.visit_date = formattedDate;

    this.visitService.addVisit(this.visitDate).subscribe(
      () => {
        this.error = 'success';
      },
      () => {
        this.error = 'error';
      }
    );
  }
}
