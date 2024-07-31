import { TestBed } from '@angular/core/testing';

import { FavoritesListService } from './favorites-list.service';

describe('FavoritesListService', () => {
  let service: FavoritesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
