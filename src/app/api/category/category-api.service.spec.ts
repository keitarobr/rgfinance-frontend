import { TestBed } from '@angular/core/testing';

import { CategoryAPIService } from './category-api.service';

describe('CategoryAPIService', () => {
  let service: CategoryAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
