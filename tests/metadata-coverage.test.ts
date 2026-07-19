import { readdirSync } from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { describe, expect, it } from 'vitest';
import { blogPosts } from '@/content/blog';
import { programs } from '@/content/programs';
import { absoluteUrl } from '@/lib/seo';

import * as aboutPage from '@/app/about/page';
import * as blogIndexPage from '@/app/blog/page';
import * as blogPostPage from '@/app/blog/[slug]/page';
import * as contactPage from '@/app/contact/page';
import * as facilitiesPage from '@/app/facilities/page';
import * as faqPage from '@/app/faq/page';
import * as galleryPage from '@/app/gallery/page';
import * as homePage from '@/app/page';
import * as localityPage from '@/app/gym-near-meri-mhasrul/page';
import * as locationPage from '@/app/location/page';
import * as notFoundPage from '@/app/not-found';
import * as pricingPage from '@/app/pricing/page';
import * as programDetailPage from '@/app/programs/[slug]/page';
import * as programsPage from '@/app/programs/page';
import * as styleguidePage from '@/app/styleguide/page';
import * as trainersPage from '@/app/trainers/page';

/**
 * Kept out of app/ deliberately — see the note in tests/seo-routes.test.ts.
 *
 * "No page missing title/description" from docs/06-build-plan.md Phase 8, plus
 * the on-page rules in docs/05-TRD.md §1 (unique title/description carrying a
 * local keyword, self-referencing canonical, OG + Twitter on every page).
 *
 * The module map below is checked against the filesystem first, so adding a
 * route without adding it here fails the suite rather than shipping a page with
 * no metadata.
 */

/** Every route module, keyed by route. Dynamic routes hold the template. */
const routeModules: Record<string, unknown> = {
  '/': homePage,
  '/about': aboutPage,
  '/blog': blogIndexPage,
  '/blog/[slug]': blogPostPage,
  '/contact': contactPage,
  '/facilities': facilitiesPage,
  '/faq': faqPage,
  '/gallery': galleryPage,
  '/gym-near-meri-mhasrul': localityPage,
  '/location': locationPage,
  '/pricing': pricingPage,
  '/programs': programsPage,
  '/programs/[slug]': programDetailPage,
  '/styleguide': styleguidePage,
  '/trainers': trainersPage,
};

/** Dev-only or error routes: noindex, and exempt from the SEO copy rules. */
const NOINDEX_ROUTES = ['/styleguide'];

const LOCAL_KEYWORDS = ['panchavati', 'nashik', 'meri', 'mhasrul', 'dindori'];

/** Practical SERP limits — TRD says ~60/~155; a little headroom either way. */
const TITLE_MAX = 65;
const DESCRIPTION_MAX = 160;
const DESCRIPTION_MIN = 70;

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

type MetadataModule = {
  metadata?: Metadata;
  generateMetadata?: (props: { params: Promise<{ slug: string }> }) => Promise<Metadata>;
};

async function metadataFor(route: string, slug?: string): Promise<Metadata> {
  const mod = routeModules[route] as MetadataModule | undefined;
  if (!mod) throw new Error(`no module registered for ${route}`);

  if (slug !== undefined) {
    if (!mod.generateMetadata) throw new Error(`${route} has no generateMetadata`);
    return mod.generateMetadata({ params: Promise.resolve({ slug }) });
  }

  if (!mod.metadata) throw new Error(`${route} has no metadata export`);
  return mod.metadata;
}

/** Every concrete, indexable URL and the metadata it should produce. */
const indexableRoutes: { route: string; path: string; slug?: string }[] = Object.keys(routeModules)
  .filter((route) => !NOINDEX_ROUTES.includes(route))
  .flatMap((route) => {
    if (route === '/programs/[slug]') {
      return programs.map((p) => ({ route, path: `/programs/${p.slug}`, slug: p.slug }));
    }
    if (route === '/blog/[slug]') {
      return blogPosts.map((post) => ({ route, path: `/blog/${post.slug}`, slug: post.slug }));
    }
    return [{ route, path: route }];
  });

describe('metadata coverage', () => {
  it('registers every page.tsx route in this test', () => {
    expect(discoverRoutes(path.resolve(__dirname, '..', 'app')).sort()).toEqual(
      Object.keys(routeModules).sort(),
    );
  });

  describe.each(indexableRoutes)('$path', ({ route, path: routePath, slug }) => {
    it('has a title and description', async () => {
      const metadata = await metadataFor(route, slug);

      expect(typeof metadata.title).toBe('string');
      expect((metadata.title as string).length).toBeGreaterThan(0);
      expect((metadata.title as string).length).toBeLessThanOrEqual(TITLE_MAX);

      expect(typeof metadata.description).toBe('string');
      expect((metadata.description as string).length).toBeGreaterThanOrEqual(DESCRIPTION_MIN);
      expect((metadata.description as string).length).toBeLessThanOrEqual(DESCRIPTION_MAX);
    });

    it('carries a local keyword in the title and description', async () => {
      const metadata = await metadataFor(route, slug);
      const title = (metadata.title as string).toLowerCase();
      const description = (metadata.description as string).toLowerCase();

      expect(LOCAL_KEYWORDS.some((keyword) => title.includes(keyword))).toBe(true);
      expect(LOCAL_KEYWORDS.some((keyword) => description.includes(keyword))).toBe(true);
    });

    it('has a self-referencing canonical', async () => {
      const metadata = await metadataFor(route, slug);
      expect(metadata.alternates?.canonical).toBe(absoluteUrl(routePath));
    });

    it('has Open Graph and Twitter card metadata', async () => {
      const metadata = await metadataFor(route, slug);

      expect(metadata.openGraph?.title).toBe(metadata.title);
      expect(metadata.openGraph?.description).toBe(metadata.description);
      expect(JSON.stringify(metadata.openGraph?.images)).toContain('/images/');
      expect(metadata.twitter?.card).toBe('summary_large_image');
      expect(metadata.twitter?.title).toBe(metadata.title);
    });
  });

  it('gives every indexable route a unique title and description', async () => {
    const metadata = await Promise.all(
      indexableRoutes.map((entry) => metadataFor(entry.route, entry.slug)),
    );

    const titles = metadata.map((item) => item.title);
    const descriptions = metadata.map((item) => item.description);

    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it('keeps dev-only and error routes out of the index', () => {
    const styleguide = (styleguidePage as MetadataModule).metadata;
    const notFound = (notFoundPage as MetadataModule).metadata;

    expect(styleguide?.robots).toMatchObject({ index: false });
    expect(notFound?.robots).toMatchObject({ index: false });
  });
});
