import { describe, expect, it } from 'vitest';
import { galleryItems } from './gallery';
import { media } from './media';

describe('galleryItems', () => {
  it('has unique ids', () => {
    const ids = galleryItems.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has no empty captions', () => {
    for (const item of galleryItems) {
      expect(item.caption.length).toBeGreaterThan(0);
    }
  });

  it('every mediaId resolves to a real media slot', () => {
    const mediaIds = new Set(media.map((slot) => slot.id));
    for (const item of galleryItems) {
      expect(mediaIds.has(item.mediaId)).toBe(true);
    }
  });

  it('includes both facility and transformation categories', () => {
    const categories = new Set(galleryItems.map((item) => item.category));
    expect(categories.has('facility')).toBe(true);
    expect(categories.has('transformation')).toBe(true);
  });
});
