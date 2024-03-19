import { TestBed } from '@angular/core/testing';

import { BuchstabenwortwertConverterService } from './buchstabenwortwert-converter.service';

describe('BuchstabenwortwertConverterService', () => {
  let service: BuchstabenwortwertConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuchstabenwortwertConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('abc should return 123', () => {
    expect(service.convertStringToNumbers("abc", false)).toEqual([1, 2, 3]);
  });

  it('cDE should return 345', () => {
    expect(service.convertStringToNumbers("cDE", false)).toEqual([3, 4, 5]);
  });
  it('cDE abc should return 3450123', () => {
    expect(service.convertStringToNumbers("cDE abc", false)).toEqual([3, 4, 5, 0, 1, 2, 3]);
  });

  it('a%/<b should return 10002', () => {
    expect(service.convertStringToNumbers("a%/<b", false)).toEqual([1, 0, 0, 0, 2]);
  });

  it('äöüß should return 27,28,29,30', () => {
    expect(service.convertStringToNumbers("äöüß", false)).toEqual([27, 28, 29, 30]);
  });

  it('inverted äöüß should return 0000', () => {
    expect(service.convertStringToNumbers("äöüß", true)).toEqual([0, 0, 0, 0]);
  });

  it('inverted abc xyz should return correct', () => {
    expect(service.convertStringToNumbers("abc xyz", true)).toEqual([26, 25, 24, 0, 3, 2, 1]);
  });
});
