import { TestBed } from '@angular/core/testing';

import { SortBy } from './todopipe.sevice';

describe('SortBy', () => {
  let service: SortBy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortBy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
