import { TestBed } from '@angular/core/testing';
import { PricingPlans } from './pricing-plans';

describe('PricingPlans', () => {
  let service: PricingPlans;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PricingPlans);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
