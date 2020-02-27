import { TestBed } from '@angular/core/testing';

import { AccessLevelService } from './access-level.service';

describe('AccessLevelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccessLevelService = TestBed.get(AccessLevelService);
    expect(service).toBeTruthy();
  });
});
