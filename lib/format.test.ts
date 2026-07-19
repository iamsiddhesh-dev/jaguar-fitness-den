import { describe, expect, it } from 'vitest';
import { formatInr } from './format';

describe('formatInr', () => {
  it('formats with Indian digit grouping and rupee sign', () => {
    expect(formatInr(18000)).toBe('₹18,000');
    expect(formatInr(11999)).toBe('₹11,999');
    expect(formatInr(1500)).toBe('₹1,500');
  });

  it('uses lakh grouping above 99,999', () => {
    expect(formatInr(150000)).toBe('₹1,50,000');
  });
});
