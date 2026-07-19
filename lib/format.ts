const inr = new Intl.NumberFormat('en-IN');

/** Formats a rupee amount with Indian digit grouping, e.g. 18000 → "₹18,000". */
export function formatInr(amount: number): string {
  return `₹${inr.format(amount)}`;
}

/**
 * Digit-grouped amount without the ₹ sign, e.g. 18000 → "18,000".
 * For server-rendered prices: the ₹ glyph (U+20B9) lives in the latin-ext
 * font subset, and putting it in webfont-styled SSR text forces an extra
 * ~110KB of font downloads that blow the mobile LCP budget. Render the sign
 * separately in a system font (see PricingTeaser) and append these digits.
 */
export function formatInrDigits(amount: number): string {
  return inr.format(amount);
}
