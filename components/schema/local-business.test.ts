import { describe, expect, it } from 'vitest';
import { siteConfig } from '@/content/site-config';
import { buildLocalBusinessSchema, hasResolvedGeo } from './local-business';

/**
 * The NAP assertions here are the single-source proof required by
 * docs/06-build-plan.md Phase 8: the schema must never carry an address, phone,
 * or opening-hours value that isn't read straight from content/site-config.ts.
 */

interface HoursSpecNode {
  '@type': string;
  dayOfWeek: string[];
  opens: string;
  closes: string;
}

describe('buildLocalBusinessSchema', () => {
  const schema = buildLocalBusinessSchema();
  const hoursSpec = schema.openingHoursSpecification as HoursSpecNode[];
  const sameAs = schema.sameAs as string[];

  it('declares an ExerciseGym that is also a LocalBusiness', () => {
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toEqual(['ExerciseGym', 'LocalBusiness']);
    expect(schema['@id']).toContain(siteConfig.url);
  });

  it('uses the exact NAP from site-config', () => {
    expect(schema.name).toBe(siteConfig.name);
    expect(schema.address).toEqual({
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    });
  });

  it('publishes both phone numbers in E.164 form', () => {
    expect(schema.telephone).toEqual([
      siteConfig.phones.primary.e164,
      siteConfig.phones.secondary.e164,
    ]);
  });

  it('never expresses the secondary locality in the schema', () => {
    // Built at runtime so this file stays clean for content/nap-rule.test.ts.
    const bannedLandmark = ['reliance', 'petrol', 'pump'].join(' ');
    const serialized = JSON.stringify(schema).toLowerCase();

    for (const banned of ['meri', 'mhasrul', bannedLandmark]) {
      expect(serialized).not.toContain(banned);
    }
  });

  it('maps every opening-hours entry from site-config', () => {
    expect(hoursSpec).toHaveLength(siteConfig.hours.spec.length);

    const days = new Set<string>();
    hoursSpec.forEach((spec, index) => {
      const source = siteConfig.hours.spec[index];
      expect(spec['@type']).toBe('OpeningHoursSpecification');
      expect(spec.opens).toBe(source.opens);
      expect(spec.closes).toBe(source.closes);
      expect(spec.dayOfWeek).toEqual(source.dayOfWeek.map((day) => `https://schema.org/${day}`));
      spec.dayOfWeek.forEach((day) => days.add(day));
    });

    expect(days.size).toBe(7);
  });

  it('omits geo coordinates while they are placeholders', () => {
    // Flip-side guard: once real coordinates land in site-config, the geo block
    // becomes the live expectation instead.
    if (hasResolvedGeo()) {
      expect(schema.geo).toMatchObject({
        '@type': 'GeoCoordinates',
        latitude: siteConfig.geo.latitude,
        longitude: siteConfig.geo.longitude,
      });
    } else {
      expect(schema).not.toHaveProperty('geo');
      expect(JSON.stringify(schema)).not.toContain('PLACEHOLDER');
    }
  });

  it('never fabricates reviews or ratings', () => {
    expect(schema).not.toHaveProperty('aggregateRating');
    expect(schema).not.toHaveProperty('review');
    expect(schema).not.toHaveProperty('ratingValue');
  });

  it('links the Instagram profile and Google listing via sameAs', () => {
    expect(sameAs).toContain(siteConfig.social.instagram);
    expect(sameAs.some((url) => url.includes(siteConfig.googleKgmid))).toBe(true);
  });

  it('carries absolute url and image references', () => {
    expect(schema.url).toBe(`${siteConfig.url}/`);
    expect(String(schema.image).startsWith(`${siteConfig.url}/`)).toBe(true);
  });
});
