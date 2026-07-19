import { readFileSync } from 'node:fs';
import path from 'node:path';
import { blogPosts } from '@/content/blog';
import type { BlogPost } from '@/content/types';
import { formatReadingTime, readingTimeMinutes } from '@/lib/reading-time';

/** Absolute path to an article body. */
export function postSourcePath(slug: string): string {
  return path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`);
}

/** Posts newest-first — the order the blog index renders them in. */
export function sortedPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/**
 * Reading time read off the raw .mdx source. Every blog route is statically
 * generated (see `dynamicParams = false`), so this filesystem read only ever
 * runs at build time.
 */
export function getReadingTime(slug: string): string {
  const source = readFileSync(postSourcePath(slug), 'utf8');
  return formatReadingTime(readingTimeMinutes(source));
}

/** "19 July 2026" — matches the site's plain-English date style. */
export function formatPublishedDate(isoDate: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${isoDate}T00:00:00Z`));
}
