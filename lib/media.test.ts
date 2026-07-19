import { describe, expect, it } from 'vitest';
import { getMediaSlot } from './media';

describe('getMediaSlot', () => {
  it('returns the slot for a known id', () => {
    const slot = getMediaSlot('home-hero-poster');
    expect(slot.placeholderPath).toBe('/images/placeholder/home-hero-poster.jpg');
    expect(slot.alt).not.toBe('');
  });

  it('throws on an unknown id so a typo fails the build', () => {
    expect(() => getMediaSlot('no-such-slot')).toThrow(/no-such-slot/);
  });
});
