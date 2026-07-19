import type { AddOn, PricingPlan, PromoBanner } from './types';

/** Pricing data. Seeded from docs/00-business-facts.md. Monthly/quarterly tiers are unconfirmed. */
export const pricingPlans: PricingPlan[] = [
  {
    id: 'annual-standard',
    name: 'Annual Membership',
    priceInr: 18000,
    billingPeriod: 'annual',
    isPlaceholder: false,
    description:
      'The flagship membership — full access to all facilities, equipment, and group classes.',
  },
  {
    id: 'monthly-standard',
    name: 'Monthly Membership',
    priceInr: 0,
    billingPeriod: 'monthly',
    isPlaceholder: true,
    description: '[PLACEHOLDER — confirm monthly pricing with owner]',
  },
  {
    id: 'quarterly-standard',
    name: 'Quarterly Membership',
    priceInr: 0,
    billingPeriod: 'quarterly',
    isPlaceholder: true,
    description: '[PLACEHOLDER — confirm quarterly pricing with owner]',
  },
];

/** Toggle `active` to show/hide the promo banner site-wide. */
export const promoBanner: PromoBanner = {
  active: true,
  priceInr: 11999,
  originalPriceInr: 18000,
  label: 'Limited-time annual offer',
  description:
    'Join now during our promotional drive and lock in the annual membership at ₹11,999.',
};

export const addOns: AddOn[] = [
  {
    id: 'personal-training',
    name: 'Personal Training',
    description: 'One-on-one coaching sessions with a certified elite trainer.',
    priceInr: '[PLACEHOLDER]',
  },
  {
    id: 'nutrition-coaching',
    name: 'Nutrition Coaching',
    description: 'Personalized diet planning and ongoing check-ins with our nutrition experts.',
    priceInr: '[PLACEHOLDER]',
  },
  {
    id: 'trial-pass',
    name: 'Trial Pass',
    description: '[PLACEHOLDER — confirm trial policy with owner]',
    priceInr: '[PLACEHOLDER]',
  },
];
