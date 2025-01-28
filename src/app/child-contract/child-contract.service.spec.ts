import { TestBed } from '@angular/core/testing';

import { ChildContractService } from './child-contract.service';

describe('ChildContractService', () => {
  let service: ChildContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChildContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
