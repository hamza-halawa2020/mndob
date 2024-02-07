import { TestBed } from '@angular/core/testing';

import { VisitRateService } from './visit-rate.service';

describe('VisitRateService', () => {
  let service: VisitRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
