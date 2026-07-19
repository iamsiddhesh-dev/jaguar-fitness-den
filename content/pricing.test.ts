import { describe, expect, it } from 'vitest';
import { addOns, pricingPlans, promoBanner } from './pricing';

describe('pricing', () => {
  it('has the flagship annual plan at ₹18,000', () => {
    const flagship = pricingPlans.find((p) => p.id === 'annual-standard');
    expect(flagship).toBeDefined();
    expect(flagship?.priceInr).toBe(18000);
    expect(flagship?.isPlaceholder).toBe(false);
  });

  it('flags unconfirmed monthly/quarterly tiers as placeholders', () => {
    const unconfirmed = pricingPlans.filter((p) => p.id !== 'annual-standard');
    expect(unconfirmed.length).toBeGreaterThan(0);
    for (const plan of unconfirmed) {
      expect(plan.isPlaceholder).toBe(true);
    }
  });

  it('has a toggleable promo banner at ₹11,999', () => {
    expect(typeof promoBanner.active).toBe('boolean');
    expect(promoBanner.priceInr).toBe(11999);
    expect(promoBanner.originalPriceInr).toBe(18000);
    expect(promoBanner.priceInr).toBeLessThan(promoBanner.originalPriceInr);
  });

  it('has no empty add-on entries', () => {
    expect(addOns.length).toBeGreaterThan(0);
    for (const addOn of addOns) {
      expect(addOn.name.length).toBeGreaterThan(0);
      expect(addOn.description.length).toBeGreaterThan(0);
    }
  });
});
