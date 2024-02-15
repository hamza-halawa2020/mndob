import { Component, Input, OnInit } from '@angular/core';
import { GovernatesService } from '../services/governates/governates.service';

@Component({
  selector: 'app-add-visit',
  templateUrl: './add-visit.page.html',
  styleUrls: ['./add-visit.page.scss'],
})
export class AddVisitPage implements OnInit {
  constructor(private gov: GovernatesService) {}
  @Input() doctorId: any;
  ngOnInit() {
  }


}
