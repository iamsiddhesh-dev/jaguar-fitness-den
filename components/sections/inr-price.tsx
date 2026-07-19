import { formatInrDigits } from '@/lib/format';

/**
 * ₹ + digit-grouped amount for text styled with the brand webfonts. The ₹
 * glyph (U+20B9) lives in the latin-ext font subset; rendering it through
 * Oswald/Inter forces ~110KB of extra font downloads that blow the mobile
 * LCP budget, so the sign renders in a system font instead — visually
 * indistinguishable at currency-symbol size (see formatInrDigits).
 */
export function InrPrice({ amount }: { amount: number }) {
  return (
    <>
      <span className="font-[Arial,sans-serif]">₹</span>
      {formatInrDigits(amount)}
    </>
  );
}
