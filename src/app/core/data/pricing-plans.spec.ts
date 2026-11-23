import { describe, it, expect } from 'vitest';
import { PRICING_PLANS } from './pricing-plans';

describe('PRICING_PLANS', () => {
  it('should contain three pricing plans', () => {
    expect(PRICING_PLANS).toHaveLength(3);
  });

  it('should have the correct plan rates', () => {
    expect(PRICING_PLANS.map(plan => plan.rateInBasisPoints))
      .toEqual([150, 120, 100]);
  });
});