import { TestBed } from '@angular/core/testing';

import { OffsetLimitService } from './offset-limit.service';

describe('OffsetLimitService', () => {
  let service: OffsetLimitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffsetLimitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
