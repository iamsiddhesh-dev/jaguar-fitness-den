import { media } from '@/content/media';
import type { MediaSlot } from '@/content/types';

/**
 * Look up a media slot by id. Throws on unknown ids so a typo fails the
 * static build instead of silently rendering a broken image.
 */
export function getMediaSlot(id: string): MediaSlot {
  const slot = media.find((entry) => entry.id === id);
  if (!slot) {
    throw new Error(`Unknown media slot "${id}" — add it to content/media.ts and MEDIA-TODO.md`);
  }
  return slot;
}
