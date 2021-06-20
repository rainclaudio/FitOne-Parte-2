import { TestBed } from '@angular/core/testing';

import { NutricionPlanService } from './nutricion-plan.service';

describe('NutricionPlanService', () => {
  let service: NutricionPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutricionPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
