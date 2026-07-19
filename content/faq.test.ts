import { describe, expect, it } from 'vitest';
import { faqs } from './faq';

describe('faqs', () => {
  it('has unique ids', () => {
    const ids = faqs.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has no empty question/answer pairs', () => {
    for (const faq of faqs) {
      expect(faq.question.length).toBeGreaterThan(0);
      expect(faq.answer.length).toBeGreaterThan(0);
    }
  });

  it('covers the required question topics', () => {
    const combined = faqs.map((f) => `${f.question} ${f.answer}`.toLowerCase()).join(' | ');
    expect(combined).toMatch(/meri|mhasrul/);
    expect(combined).toContain('floor');
    expect(combined).toContain('steam');
    expect(combined).toContain('parking');
  });
});
