import { readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { blogPosts } from '@/content/blog';
import { programs } from '@/content/programs';
import { absoluteUrl } from '@/lib/seo';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';

/**
 * Lives in tests/ rather than next to app/sitemap.ts on purpose: a *.test.ts
 * file anywhere under app/ makes Turbopack's dev-mode route resolution 404
 * every nested route (the production build is unaffected, which makes it a
 * nasty one to spot).
 *
 * Exit criterion from docs/06-build-plan.md Phase 8: "every route present in
 * generated sitemap". Routes are discovered from the filesystem rather than
 * listed by hand, so a new page.tsx that nobody adds to app/sitemap.ts fails
 * this test instead of quietly going unindexed.
 */

/** Routes deliberately kept out of the index (they carry robots: noindex). */
const NOINDEX_ROUTES = ['/styleguide'];

function discoverRoutes(dir: string, prefix = ''): string[] {
  const routes: string[] = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      routes.push(...discoverRoutes(path.join(dir, entry.name), `${prefix}/${entry.name}`));
    } else if (entry.name === 'page.tsx') {
      routes.push(prefix === '' ? '/' : prefix);
    }
  }

  return routes;
}

/** Expands "/programs/[slug]" into one route per content-layer entry. */
function expandDynamicRoute(route: string): string[] {
  if (route === '/programs/[slug]') return programs.map((p) => `/programs/${p.slug}`);
  if (route === '/blog/[slug]') return blogPosts.map((post) => `/blog/${post.slug}`);
  return [route];
}

const expectedRoutes = discoverRoutes(path.resolve(__dirname, '..', 'app'))
  .filter((route) => !NOINDEX_ROUTES.includes(route))
  .flatMap(expandDynamicRoute);

describe('sitemap', () => {
  const entries = sitemap();
  const urls = entries.map((entry) => entry.url);

  it('found the app routes it is meant to compare against', () => {
    expect(expectedRoutes).toContain('/');
    expect(expectedRoutes.length).toBeGreaterThan(10);
  });

  it('contains every indexable route exactly once', () => {
    expect([...urls].sort()).toEqual([...new Set(urls)].sort());

    for (const route of expectedRoutes) {
      expect(urls).toContain(absoluteUrl(route));
    }
  });

  it('contains no extra or noindex URLs', () => {
    expect(urls.sort()).toEqual(expectedRoutes.map(absoluteUrl).sort());

    for (const route of NOINDEX_ROUTES) {
      expect(urls).not.toContain(absoluteUrl(route));
    }
  });

  it('uses absolute URLs, valid priorities, and a lastModified date', () => {
    for (const entry of entries) {
      expect(entry.url.startsWith('https://')).toBe(true);
      expect(entry.priority).toBeGreaterThan(0);
      expect(entry.priority).toBeLessThanOrEqual(1);
      expect(entry.lastModified).toBeInstanceOf(Date);
      expect(Number.isNaN(new Date(entry.lastModified as Date).getTime())).toBe(false);
    }
  });

  it('gives the homepage top priority', () => {
    const home = entries.find((entry) => entry.url === absoluteUrl('/'));
    expect(home?.priority).toBe(1);
  });
});

describe('robots', () => {
  const result = robots();
  const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules;

  it('allows a full crawl for every user agent', () => {
    expect(rules.userAgent).toBe('*');
    expect(rules.allow).toBe('/');
  });

  it('keeps the dev-only styleguide out of the crawl', () => {
    expect(rules.disallow).toBe('/styleguide');
  });

  it('points at the absolute sitemap URL', () => {
    expect(result.sitemap).toBe(absoluteUrl('/sitemap.xml'));
  });
});
