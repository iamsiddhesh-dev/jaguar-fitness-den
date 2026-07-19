import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { blogPosts } from './blog';
import { programs } from './programs';

const bodyDir = path.join(__dirname, 'blog');

function readBody(slug: string): string {
  return readFileSync(path.join(bodyDir, `${slug}.mdx`), 'utf8');
}

describe('blog posts', () => {
  it('seeds at least the planned articles', () => {
    expect(blogPosts.length).toBeGreaterThanOrEqual(2);
  });

  it('has unique slugs', () => {
    const slugs = blogPosts.map((post) => post.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('uses url-safe slugs', () => {
    for (const post of blogPosts) {
      expect(post.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it('fills every metadata and SEO field', () => {
    for (const post of blogPosts) {
      expect(post.title.length).toBeGreaterThan(0);
      expect(post.excerpt.length).toBeGreaterThan(0);
      expect(post.author.length).toBeGreaterThan(0);
      expect(post.tags.length).toBeGreaterThan(0);
      expect(post.seo.title.length).toBeGreaterThan(0);
      expect(post.seo.description.length).toBeGreaterThan(0);
      expect(post.seo.description.length).toBeLessThanOrEqual(165);
    }
  });

  it('dates every post as an ISO day', () => {
    for (const post of blogPosts) {
      expect(post.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(post.publishedAt))).toBe(false);
    }
  });

  it('only references program slugs that exist', () => {
    const programSlugs = new Set(programs.map((program) => program.slug));
    for (const post of blogPosts) {
      for (const slug of post.relatedPrograms) {
        expect(programSlugs.has(slug)).toBe(true);
      }
    }
  });

  it('keeps the rupee glyph out of rendered metadata', () => {
    // Titles and excerpts render in the brand webfonts; U+20B9 lives in the
    // latin-ext subset and pulling it in costs ~110KB. Prices go in the article
    // body via <InrPrice />. SEO descriptions are exempt — they never render.
    for (const post of blogPosts) {
      expect(post.title).not.toContain('₹');
      expect(post.excerpt).not.toContain('₹');
    }
  });
});

describe('blog article bodies', () => {
  it('has an .mdx body for every registered post', () => {
    for (const post of blogPosts) {
      expect(existsSync(path.join(bodyDir, `${post.slug}.mdx`))).toBe(true);
    }
  });

  it('has no orphaned .mdx file without a registry entry', () => {
    const slugs = new Set(blogPosts.map((post) => post.slug));
    const files = readdirSync(bodyDir).filter((file) => file.endsWith('.mdx'));
    const orphans = files.filter((file) => !slugs.has(file.replace(/\.mdx$/, '')));
    expect(orphans).toEqual([]);
  });

  it('renders prices through InrPrice rather than a literal rupee glyph', () => {
    for (const post of blogPosts) {
      expect(readBody(post.slug)).not.toContain('₹');
    }
  });

  it('links to at least one internal page', () => {
    for (const post of blogPosts) {
      expect(readBody(post.slug)).toMatch(/\]\(\/[a-z]/);
    }
  });

  it('links to each of its declared related programs', () => {
    for (const post of blogPosts) {
      const body = readBody(post.slug);
      for (const slug of post.relatedPrograms) {
        expect(body).toContain(`/programs/${slug}`);
      }
    }
  });

  it('starts with prose, not a top-level heading (the page renders the H1)', () => {
    for (const post of blogPosts) {
      expect(readBody(post.slug)).not.toMatch(/^# /m);
    }
  });
});
