import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Locks in the WCAG AA guarantees the design system is built on (TRD open item,
 * resolved in Phase 1). Parses the token values straight out of globals.css so
 * the tokens themselves stay the single source of truth.
 */
const css = readFileSync(path.resolve(__dirname, '../../app/globals.css'), 'utf8');

function token(name: string): string {
  const match = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!match) throw new Error(`Token --color-${name} not found in globals.css`);
  return match[1];
}

function luminance(hex: string): number {
  const channel = (i: number) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5);
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const AA_NORMAL = 4.5;

describe('design token contrast (WCAG AA)', () => {
  it('brand gold passes on every dark surface', () => {
    for (const surface of ['charcoal-950', 'charcoal-900', 'charcoal-850', 'charcoal-800']) {
      expect(contrast(token('gold-400'), token(surface))).toBeGreaterThanOrEqual(AA_NORMAL);
    }
  });

  it('deep gold (gold-700) is the text-safe gold on light sections', () => {
    expect(contrast(token('gold-700'), token('ivory-50'))).toBeGreaterThanOrEqual(AA_NORMAL);
  });

  it('primary button text (charcoal on gold) passes', () => {
    expect(contrast(token('charcoal-950'), token('gold-400'))).toBeGreaterThanOrEqual(AA_NORMAL);
  });

  it('body text passes on both section tones', () => {
    expect(contrast(token('ivory-50'), token('charcoal-950'))).toBeGreaterThanOrEqual(AA_NORMAL);
    expect(contrast(token('ink-950'), token('ivory-50'))).toBeGreaterThanOrEqual(AA_NORMAL);
  });

  it('muted text passes on both section tones', () => {
    expect(contrast(token('smoke-400'), token('charcoal-800'))).toBeGreaterThanOrEqual(AA_NORMAL);
    expect(contrast(token('ink-600'), token('ivory-50'))).toBeGreaterThanOrEqual(AA_NORMAL);
  });

  it('documents that bright gold fails on light backgrounds (decorative only)', () => {
    expect(contrast(token('gold-400'), token('ivory-50'))).toBeLessThan(AA_NORMAL);
  });
});
