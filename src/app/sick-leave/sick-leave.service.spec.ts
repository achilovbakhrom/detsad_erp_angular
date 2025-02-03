import { TestBed } from '@angular/core/testing';

import { SickLeaveService } from './sick-leave.service';

describe('SickLeaveService', () => {
  let service: SickLeaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SickLeaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
