import { TestBed } from '@angular/core/testing';

import { ButtonsStateService } from './buttons-state';

describe('ButtonsState', () => {
  let service: ButtonsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ButtonsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
