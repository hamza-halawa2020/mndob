import { TestBed } from '@angular/core/testing';

import { GovernatesService } from './governates.service';

describe('GovernatesService', () => {
  let service: GovernatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GovernatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
