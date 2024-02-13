import { Component } from '@angular/core';
import { SignService } from './pages/sign/services/sign/sign.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private authService:SignService) {}

  ngOnInit() {}

}
