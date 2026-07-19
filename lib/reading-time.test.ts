import { describe, expect, it } from 'vitest';
import {
  WORDS_PER_MINUTE,
  countWords,
  formatReadingTime,
  readingTimeMinutes,
} from '@/lib/reading-time';

describe('countWords', () => {
  it('counts plain prose', () => {
    expect(countWords('One two three four five')).toBe(5);
  });

  it('ignores markdown heading and emphasis punctuation', () => {
    expect(countWords('## A heading\n\nSome **bold** and _italic_ words')).toBe(7);
  });

  it('counts a link by its label, not its URL', () => {
    expect(countWords('Read the [pricing page](/pricing) now')).toBe(5);
  });

  it('ignores JSX tags but keeps surrounding prose', () => {
    expect(countWords('Membership costs <InrPrice amount={18000} /> a year')).toBe(4);
  });

  it('ignores fenced and inline code', () => {
    expect(countWords('Before\n\n```\nconst a = 1;\n```\n\nafter `inline` text')).toBe(3);
  });

  it('returns zero for empty input', () => {
    expect(countWords('   \n  ')).toBe(0);
  });
});

describe('readingTimeMinutes', () => {
  it('rounds to the nearest minute at the configured reading speed', () => {
    const words = Array.from({ length: WORDS_PER_MINUTE * 3 }, () => 'word').join(' ');
    expect(readingTimeMinutes(words)).toBe(3);
  });

  it('never returns less than one minute', () => {
    expect(readingTimeMinutes('short')).toBe(1);
    expect(readingTimeMinutes('')).toBe(1);
  });
});

describe('formatReadingTime', () => {
  it('renders the display string', () => {
    expect(formatReadingTime(6)).toBe('6 min read');
  });
});
