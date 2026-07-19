import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { media } from './media';

describe('media', () => {
  it('has unique ids', () => {
    const ids = media.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has no empty entries and paths live under public/images/placeholder/', () => {
    for (const slot of media) {
      expect(slot.usage.length).toBeGreaterThan(0);
      expect(slot.alt.length).toBeGreaterThan(0);
      expect(slot.placeholderPath).toMatch(/^\/images\/placeholder\//);
    }
  });

  it('has every slot logged in MEDIA-TODO.md', () => {
    const todo = readFileSync(path.resolve(__dirname, '../MEDIA-TODO.md'), 'utf8');
    for (const slot of media) {
      expect(todo).toContain(slot.placeholderPath);
    }
  });
});
