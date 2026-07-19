import type { OpeningHoursSpec, Phone } from './types';

/**
 * Single source of truth for NAP (name/address/phone), hours, and socials.
 * Seeded from docs/00-business-facts.md. Every page and schema block must
 * pull from here — never hardcode these facts elsewhere.
 *
 * NAP RULE: the address below must exactly match the Google Business Profile
 * (Floor No. 5, Laxmi Sky Park, Panchavati). The Meri/Mhasrul locality is
 * targeted through page copy and the dedicated locality landing page only —
 * never through a second address here.
 */

export const siteConfig = {
  name: 'Jaguar Fitness Den',
  legalName: 'Jaguar Fitness Den',
  tagline: 'Premium unisex fitness in Panchavati, Nashik',
  url: 'https://jaguarfitnessden.in',

  address: {
    streetAddress:
      'Floor No. 5, Laxmi Sky Park (Croma Building), Dindori Road, Near Jio Petrol Pump',
    addressLocality: 'Panchavati, Sneha Nagar, Nashik',
    addressRegion: 'Maharashtra',
    postalCode: '422004',
    addressCountry: 'IN',
    full: 'Floor No. 5, Laxmi Sky Park (Croma Building), Dindori Road, Near Jio Petrol Pump, Panchavati, Sneha Nagar, Nashik, Maharashtra 422004',
  },

  /** Decoded from the Google Maps Plus Code "2RM3+W7 Nashik, Maharashtra". */
  geo: {
    latitude: '20.034813',
    longitude: '73.803187',
  },

  phones: {
    primary: { e164: '+918983410511', display: '+91 89834 10511' } satisfies Phone,
    secondary: { e164: '+919158689789', display: '+91 91586 89789' } satisfies Phone,
  },

  /** WhatsApp deep links use the primary phone number. */
  whatsapp: {
    e164: '+918983410511',
    display: '+91 89834 10511',
    defaultMessage: "Hi Jaguar Fitness Den, I'd like to know more about membership.",
  },

  hours: {
    label: 'Mon–Sat, 5:00 AM – 10:30 PM · Sun, 8:00 AM – 2:00 PM',
    spec: [
      {
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '05:00',
        closes: '22:30',
        label: 'Mon–Sat, 5:00 AM – 10:30 PM',
      },
      {
        dayOfWeek: ['Sunday'],
        opens: '08:00',
        closes: '14:00',
        label: 'Sun, 8:00 AM – 2:00 PM',
      },
    ] satisfies OpeningHoursSpec[],
  },

  social: {
    instagram: 'https://www.instagram.com/jaguarfitnessden_nashik',
    justdial: 'Above Croma Showroom Panchavati',
  },

  /** Google Business Profile knowledge graph ID — listing exists, needs to be claimed. */
  googleKgmid: '/g/11yh2mdsqd',
} as const;
