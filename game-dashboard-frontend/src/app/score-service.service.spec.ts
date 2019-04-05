import { TestBed } from '@angular/core/testing';

import { ScoreServiceService } from './score-service.service';

describe('ScoreServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScoreServiceService = TestBed.get(ScoreServiceService);
    expect(service).toBeTruthy();
  });
});
