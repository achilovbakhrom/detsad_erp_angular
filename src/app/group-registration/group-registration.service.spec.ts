import { TestBed } from '@angular/core/testing';

import { GroupRegistrationService } from './group-registration.service';

describe('GroupRegistrationService', () => {
  let service: GroupRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
