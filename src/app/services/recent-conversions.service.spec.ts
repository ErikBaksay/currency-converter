import { TestBed } from '@angular/core/testing';

import { RecentConversionsService } from './recent-conversions.service';

describe('RecentConversionsService', () => {
  let service: RecentConversionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentConversionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
