import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisitRatePage } from './visit-rate.page';

describe('VisitRatePage', () => {
  let component: VisitRatePage;
  let fixture: ComponentFixture<VisitRatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VisitRatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
