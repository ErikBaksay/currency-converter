import { TestBed } from '@angular/core/testing';

import { SavedConversionsService } from './saved-conversions.service';

describe('SavedConversionsService', () => {
  let service: SavedConversionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedConversionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
