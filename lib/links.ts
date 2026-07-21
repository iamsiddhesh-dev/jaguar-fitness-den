import { siteConfig } from '@/content/site-config';

/** WhatsApp deep link with the prefilled enquiry message from site-config. */
export function whatsappHref(): string {
  return `https://wa.me/${siteConfig.whatsapp.e164.replace('+', '')}?text=${encodeURIComponent(
    siteConfig.whatsapp.defaultMessage,
  )}`;
}

/**
 * Business name + address, not address alone: the address text includes
 * "(Croma Building)" as a landmark reference, and a bare-address search lets
 * Google Maps match that to the actual Croma store listing next door instead
 * of pinpointing the gym. Leading with the business name makes this an
 * unambiguous named-entity search — verified against the live Jaguar Fitness
 * Den Google Business listing.
 */
export function googleMapsQuery(): string {
  return `${siteConfig.name}, ${siteConfig.address.full}`;
}

/** Embeddable iframe src showing the same resolved location. */
export function googleMapsEmbedSrc(): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(googleMapsQuery())}&output=embed`;
}

/** Deep link to the full Google Maps result (opens the app on mobile). */
export function googleMapsDirectionsHref(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(googleMapsQuery())}`;
}
