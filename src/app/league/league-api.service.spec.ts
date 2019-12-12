import { TestBed } from '@angular/core/testing';

import { LeagueApiService } from './league-api.service';

describe('LeagueApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeagueApiService = TestBed.get(LeagueApiService);
    expect(service).toBeTruthy();
  });
});
