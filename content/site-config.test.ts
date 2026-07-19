import { describe, expect, it } from 'vitest';
import { siteConfig } from './site-config';

describe('siteConfig', () => {
  it('has the Panchavati/Laxmi Sky Park address as the only NAP', () => {
    expect(siteConfig.address.full).toContain('Laxmi Sky Park');
    expect(siteConfig.address.full).toContain('Panchavati');
    expect(siteConfig.address.full.toLowerCase()).not.toContain('mhasrul');
    expect(siteConfig.address.full.toLowerCase()).not.toContain('reliance');
  });

  it('formats both phone numbers as valid E.164 and matching display strings', () => {
    for (const phone of [siteConfig.phones.primary, siteConfig.phones.secondary]) {
      expect(phone.e164).toMatch(/^\+91\d{10}$/);
      expect(phone.display).toMatch(/^\+91 \d{5} \d{5}$/);
      expect(phone.display.replace(/\s/g, '')).toBe(phone.e164);
    }
  });

  it('has two distinct phone numbers', () => {
    expect(siteConfig.phones.primary.e164).not.toBe(siteConfig.phones.secondary.e164);
  });

  it('has a valid whatsapp number and non-empty default message', () => {
    expect(siteConfig.whatsapp.e164).toMatch(/^\+91\d{10}$/);
    expect(siteConfig.whatsapp.defaultMessage.length).toBeGreaterThan(0);
  });

  it('defines valid opening hours covering all 7 days exactly once', () => {
    const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const seenDays = new Set<string>();

    for (const entry of siteConfig.hours.spec) {
      expect(entry.opens).toMatch(timeFormat);
      expect(entry.closes).toMatch(timeFormat);
      expect(entry.opens < entry.closes).toBe(true);
      expect(entry.label.length).toBeGreaterThan(0);

      for (const day of entry.dayOfWeek) {
        expect(seenDays.has(day)).toBe(false);
        seenDays.add(day);
      }
    }

    expect(seenDays.size).toBe(7);
  });

  it('has a valid Instagram URL', () => {
    expect(siteConfig.social.instagram).toMatch(/^https:\/\/www\.instagram\.com\//);
  });

  it('has real geo-coordinates within Nashik, Maharashtra', () => {
    const latitude = Number(siteConfig.geo.latitude);
    const longitude = Number(siteConfig.geo.longitude);
    expect(latitude).toBeGreaterThan(19.9);
    expect(latitude).toBeLessThan(20.1);
    expect(longitude).toBeGreaterThan(73.7);
    expect(longitude).toBeLessThan(73.9);
  });
});
