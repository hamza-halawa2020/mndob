import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitRateComponent } from './visit-rate.component';

describe('VisitRateComponent', () => {
  let component: VisitRateComponent;
  let fixture: ComponentFixture<VisitRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitRateComponent]
    });
    fixture = TestBed.createComponent(VisitRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
