import { TestBed } from '@angular/core/testing';

import { NutricionService } from './nutricion.service';

describe('Nutricion.ServiceService', () => {
  let service: NutricionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutricionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
