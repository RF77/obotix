import { TestBed } from '@angular/core/testing';

import { CoordinateConverterService } from './coordinate-converter.service';

describe('CoordinateConverterService', () => {
  let service: CoordinateConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoordinateConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('parse normal coordinates', () => {
  //   console.info(service.parse("N47 28.455 E8 23.123"));
  //   expect(service.parse("N47 28.455 E8 23.123")).toEqual("2");
  // });
});
