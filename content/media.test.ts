import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { media } from './media';

describe('media', () => {
  it('has unique ids', () => {
    const ids = media.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has no empty entries and every path is absolute', () => {
    for (const slot of media) {
      expect(slot.usage.length).toBeGreaterThan(0);
      expect(slot.alt.length).toBeGreaterThan(0);
      expect(slot.placeholderPath).toMatch(/^\//);
    }
  });

  // Slots still under /images/placeholder/ are dummy assets — MEDIA-TODO.md
  // is the checklist of what's left to replace, so every one of those must
  // be logged there. Slots pointing elsewhere are already-resolved real
  // assets and are intentionally exempt — see MEDIA-TODO.md's own header.
  it('has every still-placeholder slot logged in MEDIA-TODO.md', () => {
    const todo = readFileSync(path.resolve(__dirname, '../MEDIA-TODO.md'), 'utf8');
    const stillPlaceholder = media.filter((slot) =>
      slot.placeholderPath.startsWith('/images/placeholder/'),
    );
    for (const slot of stillPlaceholder) {
      expect(todo).toContain(slot.placeholderPath);
    }
  });
});
