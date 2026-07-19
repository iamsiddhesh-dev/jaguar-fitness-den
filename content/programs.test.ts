import { describe, expect, it } from 'vitest';
import { programs } from './programs';

describe('programs', () => {
  it('has exactly the 6 required programs', () => {
    expect(programs).toHaveLength(6);
  });

  it('has unique slugs', () => {
    const slugs = programs.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has kebab-case slugs', () => {
    for (const program of programs) {
      expect(program.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('has no empty core fields', () => {
    for (const program of programs) {
      expect(program.name.length).toBeGreaterThan(0);
      expect(program.tagline.length).toBeGreaterThan(0);
      expect(program.description.length).toBeGreaterThan(0);
      expect(program.whoItsFor.length).toBeGreaterThan(0);
      expect(program.sessionStructure.length).toBeGreaterThan(0);
    }
  });

  it('has no empty SEO title/description on any program', () => {
    for (const program of programs) {
      expect(program.seo.title.length).toBeGreaterThan(0);
      expect(program.seo.description.length).toBeGreaterThan(0);
    }
  });

  it('keeps SEO titles and descriptions within reasonable search-result lengths', () => {
    for (const program of programs) {
      expect(program.seo.title.length).toBeLessThanOrEqual(70);
      expect(program.seo.description.length).toBeLessThanOrEqual(160);
    }
  });
});
