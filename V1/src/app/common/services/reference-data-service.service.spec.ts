import { TestBed } from '@angular/core/testing';

import { ReferenceDataServiceService } from './reference-data-service.service';

describe('ReferenceDataServiceService', () => {
  let service: ReferenceDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferenceDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
