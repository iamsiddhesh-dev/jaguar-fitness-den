import { siteConfig } from '@/content/site-config';
import { absoluteUrl, ogImage } from '@/lib/seo';

/**
 * ExerciseGym / LocalBusiness schema, per docs/05-TRD.md §1.
 *
 * NAP RULE: every address, phone, and hours value here is read from
 * content/site-config.ts — the same source the footer and Location page use —
 * so the schema can never drift from the Google Business Profile listing. The
 * Meri/Mhasrul locality is a content-only SEO target and is deliberately absent
 * from this schema (including areaServed), since a second locality in
 * structured data reads as a conflicting address.
 *
 * Review / AggregateRating are intentionally omitted: no verifiable review data
 * exists yet, and fabricated ratings are a manual-action risk.
 */

const GEO_PLACEHOLDER = '[PLACEHOLDER]';

/** True once real coordinates have been pulled from the Maps listing. */
export function hasResolvedGeo(): boolean {
  return (
    siteConfig.geo.latitude !== GEO_PLACEHOLDER && siteConfig.geo.longitude !== GEO_PLACEHOLDER
  );
}

export function buildLocalBusinessSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': ['ExerciseGym', 'LocalBusiness'],
    '@id': `${absoluteUrl('/')}#gym`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.tagline,
    url: absoluteUrl('/'),
    image: absoluteUrl(ogImage.url),
    telephone: [siteConfig.phones.primary.e164, siteConfig.phones.secondary.e164],
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    // Omitted entirely while the coordinates are placeholders — a geo block
    // with fake numbers would put the pin in the wrong place.
    ...(hasResolvedGeo()
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: siteConfig.geo.latitude,
            longitude: siteConfig.geo.longitude,
          },
        }
      : {}),
    openingHoursSpecification: siteConfig.hours.spec.map((entry) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: entry.dayOfWeek.map((day) => `https://schema.org/${day}`),
      opens: entry.opens,
      closes: entry.closes,
    })),
    sameAs: [
      siteConfig.social.instagram,
      `https://www.google.com/search?kgmid=${siteConfig.googleKgmid}`,
    ],
  };
}
