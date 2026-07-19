import { describe, expect, it } from 'vitest';
import { meriMhasrulLocality } from './locality';

describe('meriMhasrulLocality', () => {
  it('has a non-empty intro and at least one route per targeted area', () => {
    expect(meriMhasrulLocality.intro.length).toBeGreaterThan(0);
    expect(meriMhasrulLocality.routes.length).toBeGreaterThanOrEqual(2);
  });

  it('covers both Meri and Mhasrul in its routes', () => {
    const froms = meriMhasrulLocality.routes.map((r) => r.from.toLowerCase()).join(' | ');
    expect(froms).toContain('meri');
    expect(froms).toContain('mhasrul');
  });

  it('has no empty route fields', () => {
    for (const route of meriMhasrulLocality.routes) {
      expect(route.approxDistanceKm.length).toBeGreaterThan(0);
      expect(route.approxTravelTime.length).toBeGreaterThan(0);
      expect(route.directions.length).toBeGreaterThan(0);
    }
  });

  it('has substantive why-worth-it content (not a thin doorway page)', () => {
    expect(meriMhasrulLocality.whyWorthIt.length).toBeGreaterThanOrEqual(3);
    for (const item of meriMhasrulLocality.whyWorthIt) {
      expect(item.description.length).toBeGreaterThan(40);
    }
  });

  it('has non-empty SEO fields within reasonable lengths', () => {
    expect(meriMhasrulLocality.seo.title.length).toBeGreaterThan(0);
    expect(meriMhasrulLocality.seo.title.length).toBeLessThanOrEqual(70);
    expect(meriMhasrulLocality.seo.description.length).toBeGreaterThan(0);
    expect(meriMhasrulLocality.seo.description.length).toBeLessThanOrEqual(160);
  });

  it('never publishes the conflicting Meri/Mhasrul address string', () => {
    // Built at runtime (not a literal in this file) so the repo-wide NAP-rule
    // scan in nap-rule.test.ts doesn't flag this assertion itself.
    const bannedPhrase = ['reliance', 'petrol', 'pump'].join(' ');
    const serialized = JSON.stringify(meriMhasrulLocality).toLowerCase();
    expect(serialized).not.toContain(bannedPhrase);
  });
});
