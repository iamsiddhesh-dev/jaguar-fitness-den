import type { BlogPost } from './types';

/**
 * Blog post registry. Metadata lives here (typed, testable); the article body
 * for each entry is content/blog/<slug>.mdx, loaded by app/blog/[slug]/page.tsx.
 *
 * Adding an article = one entry here + one .mdx file. No component changes.
 *
 * Titles carry no rupee glyph on purpose — an article H1 is a plausible LCP
 * element, and U+20B9 in webfont-styled text pulls the latin-ext subsets.
 * Prices belong in the body via <InrPrice />.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: 'best-gym-in-panchavati-what-an-annual-membership-buys',
    title: 'Best Gym in Panchavati: What an Annual Membership Actually Buys You',
    excerpt:
      'A line-by-line look at what a premium annual membership in Panchavati covers — floor space, equipment, recovery, coaching — and how to judge whether any gym is worth its price.',
    publishedAt: '2026-07-19',
    author: 'Jaguar Fitness Den',
    tags: ['Panchavati', 'Membership', 'Value'],
    relatedPrograms: ['strength', 'personal-training', 'nutrition-coaching'],
    seo: {
      title: 'Best Gym in Panchavati, Nashik — What a Membership Buys',
      description:
        'What a ₹18,000 annual gym membership in Panchavati, Nashik really includes: 5,500+ sq ft, Jaguar Strength equipment, steam rooms and coached classes.',
    },
  },
  {
    slug: 'gym-options-near-meri-and-mhasrul-compared',
    title: 'Gym Options Near Meri & Mhasrul, Compared',
    excerpt:
      'Most gyms on the Meri and Mhasrul side fall into three types. Here is an honest comparison of what each one gives you — and when a ten-minute ride is the better trade.',
    publishedAt: '2026-07-19',
    author: 'Jaguar Fitness Den',
    tags: ['Meri', 'Mhasrul', 'Comparison'],
    relatedPrograms: ['strength', 'functional', 'zumba'],
    seo: {
      title: 'Gym Options Near Meri & Mhasrul, Nashik — Compared',
      description:
        'Comparing gym options near Meri and Mhasrul, Nashik: budget setups, class studios and full premium facilities — what each costs you in equipment and space.',
    },
  },
  {
    slug: 'beginner-strength-training-first-eight-weeks',
    title: 'Your First Eight Weeks of Strength Training: A Beginner Plan',
    excerpt:
      'A realistic eight-week on-ramp for a complete beginner — how many days, which lifts, how much weight, and the mistakes that quietly stall most first-timers.',
    publishedAt: '2026-07-19',
    author: 'Jaguar Fitness Den',
    tags: ['Strength', 'Beginners', 'Training'],
    relatedPrograms: ['strength', 'personal-training', 'yoga'],
    seo: {
      title: 'Beginner Strength Training Plan — First 8 Weeks, Nashik',
      description:
        'A beginner strength training plan for your first eight weeks in a Nashik gym: session structure, the five core lifts, progression, and mistakes to avoid.',
    },
  },
];
