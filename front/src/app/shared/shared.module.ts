import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterLink } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, NotFoundComponent],
  exports: [NavbarComponent, FooterComponent],
  imports: [CommonModule, RouterLink],
})
export class SharedModule {}
