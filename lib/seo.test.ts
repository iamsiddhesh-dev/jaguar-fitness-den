import { describe, expect, it } from 'vitest';
import { siteConfig } from '@/content/site-config';
import { absoluteUrl, buildPageMetadata, ogImage } from './seo';

describe('absoluteUrl', () => {
  it('resolves the site root', () => {
    expect(absoluteUrl('/')).toBe(`${siteConfig.url}/`);
  });

  it('joins a path without doubling slashes', () => {
    expect(absoluteUrl('/pricing')).toBe(`${siteConfig.url}/pricing`);
    expect(absoluteUrl('pricing')).toBe(`${siteConfig.url}/pricing`);
  });

  it('handles nested paths', () => {
    expect(absoluteUrl('/programs/strength')).toBe(`${siteConfig.url}/programs/strength`);
  });
});

describe('buildPageMetadata', () => {
  const metadata = buildPageMetadata({
    title: 'Test Title',
    description: 'Test description.',
    path: '/facilities',
  });

  it('sets a self-referencing absolute canonical', () => {
    expect(metadata.alternates?.canonical).toBe(`${siteConfig.url}/facilities`);
  });

  it('mirrors title and description into Open Graph and Twitter', () => {
    expect(metadata.openGraph?.title).toBe('Test Title');
    expect(metadata.openGraph?.description).toBe('Test description.');
    expect(metadata.twitter?.title).toBe('Test Title');
    expect(metadata.twitter?.description).toBe('Test description.');
  });

  it('uses a large-image Twitter card with the shared social image', () => {
    expect(metadata.twitter?.card).toBe('summary_large_image');
    expect(JSON.stringify(metadata.twitter?.images)).toContain(ogImage.url);
  });

  it('defaults Open Graph type to website and carries the site name', () => {
    expect(metadata.openGraph).toMatchObject({
      type: 'website',
      siteName: siteConfig.name,
      locale: 'en_IN',
      url: `${siteConfig.url}/facilities`,
    });
  });

  it('supports article metadata for blog posts', () => {
    const article = buildPageMetadata({
      title: 'Post',
      description: 'Body.',
      path: '/blog/example',
      type: 'article',
      publishedTime: '2026-07-19',
    });

    expect(article.openGraph).toMatchObject({ type: 'article', publishedTime: '2026-07-19' });
  });

  it('omits publishedTime when not supplied', () => {
    expect(metadata.openGraph).not.toHaveProperty('publishedTime');
  });

  it('points the social image at an asset with valid share dimensions', () => {
    expect(ogImage.width).toBeGreaterThanOrEqual(1200);
    expect(ogImage.height).toBeGreaterThanOrEqual(630);
    expect(ogImage.alt.length).toBeGreaterThan(0);
  });
});
