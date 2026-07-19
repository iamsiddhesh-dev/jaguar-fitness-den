import { describe, expect, it } from 'vitest';
import { facilities } from './facilities';

describe('facilities', () => {
  it('has no empty entries', () => {
    for (const facility of facilities) {
      expect(facility.id.length).toBeGreaterThan(0);
      expect(facility.name.length).toBeGreaterThan(0);
      expect(facility.description.length).toBeGreaterThan(0);
    }
  });

  it('has unique ids', () => {
    const ids = facilities.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('covers every facility called out in the business facts', () => {
    const names = facilities.map((f) => f.name.toLowerCase()).join(' | ');
    for (const keyword of [
      'steam',
      'lounge',
      'locker',
      'app',
      'parking',
      'cctv',
      'jaguar strength',
    ]) {
      expect(names).toContain(keyword);
    }
  });
});
