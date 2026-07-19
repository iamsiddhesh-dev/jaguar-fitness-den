import type { Metadata } from 'next';
import { siteConfig } from '@/content/site-config';

/**
 * Shared metadata builder. Every route calls buildPageMetadata() so that the
 * canonical URL, Open Graph block, and Twitter card are constructed the same
 * way from the same source — per docs/05-TRD.md §1 ("canonical tag on every
 * page", "Open Graph + Twitter card meta on every page").
 *
 * Titles/descriptions themselves stay in the page (or in the content layer for
 * data-driven routes) — this file only assembles them.
 */

/** Default social-share image. 1600×900 satisfies the 1200×630 minimum. */
export const ogImage = {
  url: '/images/placeholder/home-hero-poster.jpg',
  width: 1600,
  height: 900,
  alt: 'The training floor at Jaguar Fitness Den, Panchavati, Nashik',
} as const;

/** Joins a site-relative path onto siteConfig.url, with no duplicate slashes. */
export function absoluteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, '');
  if (path === '/' || path === '') return `${base}/`;
  return `${base}/${path.replace(/^\//, '')}`;
}

export interface PageMetadataInput {
  title: string;
  description: string;
  /** Site-relative route, e.g. "/pricing". The canonical is built from this. */
  path: string;
  /** Open Graph type — articles (blog posts) differ from the site default. */
  type?: 'website' | 'article';
  /** Extra Open Graph article fields, only meaningful when type === 'article'. */
  publishedTime?: string;
}

export function buildPageMetadata({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const images = [
    { url: ogImage.url, width: ogImage.width, height: ogImage.height, alt: ogImage.alt },
  ];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: 'en_IN',
      images,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  };
}
