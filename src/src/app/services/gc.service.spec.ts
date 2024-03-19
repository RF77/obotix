import { TestBed } from '@angular/core/testing';

import { GcService } from './gc.service';

describe('GcService', () => {
  let service: GcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
