import type { MetadataRoute } from 'next';
import { blogPosts } from '@/content/blog';
import { programs } from '@/content/programs';
import { absoluteUrl } from '@/lib/seo';

/**
 * Sitemap, per docs/05-TRD.md §1. Program and blog URLs are derived from the
 * content layer, so adding an entry there puts the new page in the sitemap
 * without touching this file.
 *
 * /styleguide is excluded on purpose — it is a dev-only component test bed and
 * carries robots: noindex.
 */

type SitemapEntry = MetadataRoute.Sitemap[number];

const staticRoutes: {
  path: string;
  changeFrequency: SitemapEntry['changeFrequency'];
  priority: number;
}[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/facilities', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/programs', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/trainers', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/pricing', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/gallery', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/location', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/gym-near-meri-mhasrul', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...programs.map((program) => ({
      url: absoluteUrl(`/programs/${program.slug}`),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...blogPosts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
