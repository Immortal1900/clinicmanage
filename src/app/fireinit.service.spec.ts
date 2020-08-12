import { TestBed } from '@angular/core/testing';

import { FireinitService } from './fireinit.service';

describe('FireinitService', () => {
  let service: FireinitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireinitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
