import type { FaqItem } from '@/content/types';

/**
 * FAQPage schema, per docs/05-TRD.md §1. Built from the same content/faq.ts
 * entries the accordion renders, so the marked-up answers always match the
 * visible ones (Google requires that).
 */
export function buildFaqPageSchema(items: FaqItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
