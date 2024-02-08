import { Component, Input } from '@angular/core';
import { VisitsService } from '../services/visit/visits.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-visit',
  templateUrl: './add-visit.component.html',
  styleUrls: ['./add-visit.component.css']
})
export class AddVisitComponent {
  @Input() doctorId: any;
  error: any;
  visitDate: any = {};
  constructor(
    private visitService: VisitsService,
    private datePipe: DatePipe
  ) {}
  addVisit() {
    this.visitDate.doctor_id = this.doctorId; 
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    this.visitDate.visit_date = formattedDate;
    this.visitService.addVisit(this.visitDate).subscribe(
      () => {
        this.error = 'success';
        // console.log(this.visitDate);
      },
      () => {
        this.error = 'error';
        // console.log(this.visitDate);
      }
    );
  }
}