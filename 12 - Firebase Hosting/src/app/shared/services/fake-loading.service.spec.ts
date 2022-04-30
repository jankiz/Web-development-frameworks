import { TestBed } from '@angular/core/testing';

import { FakeLoadingService } from './fake-loading.service';

describe('FakeLoadingService', () => {
  let service: FakeLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
