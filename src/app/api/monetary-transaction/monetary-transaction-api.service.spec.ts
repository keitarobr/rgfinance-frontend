import { TestBed } from '@angular/core/testing';

import { MonetaryTransactionApiService } from './monetary-transaction-api.service';

describe('MonetaryTransactionApiService', () => {
  let service: MonetaryTransactionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonetaryTransactionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
