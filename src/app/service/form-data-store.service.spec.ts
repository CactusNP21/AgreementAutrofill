import { TestBed } from '@angular/core/testing';

import { FormDataStoreService } from './form-data-store.service';

describe('FormDataStoreService', () => {
  let service: FormDataStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDataStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
