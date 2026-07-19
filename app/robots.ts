import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

/** Full crawl allowed, minus the dev-only styleguide. Per docs/05-TRD.md §1. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/styleguide',
    },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/').replace(/\/$/, ''),
  };
}
