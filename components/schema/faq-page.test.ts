import { describe, expect, it } from 'vitest';
import { faqs } from '@/content/faq';
import { buildFaqPageSchema } from './faq-page';

interface QuestionNode {
  '@type': string;
  name: string;
  acceptedAnswer: { '@type': string; text: string };
}

describe('buildFaqPageSchema', () => {
  const schema = buildFaqPageSchema(faqs);
  const mainEntity = schema.mainEntity as QuestionNode[];

  it('declares a FAQPage', () => {
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('FAQPage');
  });

  it('marks up every question from the content layer, verbatim', () => {
    expect(mainEntity).toHaveLength(faqs.length);
    expect(faqs.length).toBeGreaterThan(0);

    mainEntity.forEach((node, index) => {
      expect(node['@type']).toBe('Question');
      expect(node.name).toBe(faqs[index].question);
      expect(node.acceptedAnswer).toEqual({
        '@type': 'Answer',
        text: faqs[index].answer,
      });
    });
  });

  it('returns an empty mainEntity for an empty list rather than throwing', () => {
    expect(buildFaqPageSchema([]).mainEntity).toEqual([]);
  });
});
