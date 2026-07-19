/** Average adult reading speed for web prose — the figure most blog estimators use. */
export const WORDS_PER_MINUTE = 220;

/**
 * Word count for an MDX article body. Markdown syntax, JSX tags, and code
 * fences are stripped first so the estimate reflects prose the reader actually
 * reads, not the source characters.
 */
export function countWords(source: string): number {
  const prose = source
    .replace(/```[\s\S]*?```/g, ' ') // fenced code blocks
    .replace(/`[^`]*`/g, ' ') // inline code
    .replace(/^import .*$/gm, ' ') // MDX imports
    .replace(/<[^>]+>/g, ' ') // JSX / HTML tags
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1') // links and images → their label
    .replace(/[#>*_~|-]/g, ' '); // leftover markdown punctuation

  return prose.split(/\s+/).filter((word) => /[\p{L}\p{N}]/u.test(word)).length;
}

/** Whole minutes of reading time, never less than 1. */
export function readingTimeMinutes(source: string): number {
  return Math.max(1, Math.round(countWords(source) / WORDS_PER_MINUTE));
}

/** Display string for the article header and index cards, e.g. "6 min read". */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
