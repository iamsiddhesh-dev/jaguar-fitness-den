// Shared types for the typed content layer. Seeded from docs/00-business-facts.md.

export type DayOfWeek =
  'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface OpeningHoursSpec {
  dayOfWeek: DayOfWeek[];
  opens: string; // 24h "HH:MM"
  closes: string; // 24h "HH:MM"
  /** Human-readable summary for footer/contact copy, e.g. "Mon–Sat, 5:00 AM – 10:30 PM". */
  label: string;
}

export interface Phone {
  /** E.164 format, used for tel: links and schema.org telephone. */
  e164: string;
  /** Human-readable display format, e.g. "+91 89834 10511". */
  display: string;
}

export interface Seo {
  title: string;
  description: string;
}

export interface Program {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  whoItsFor: string;
  sessionStructure: string[];
  seo: Seo;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceInr: number;
  billingPeriod: 'annual' | 'monthly' | 'quarterly';
  isPlaceholder: boolean;
  description: string;
}

export interface PromoBanner {
  active: boolean;
  priceInr: number;
  originalPriceInr: number;
  label: string;
  description: string;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  priceInr: number | '[PLACEHOLDER]';
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  bio: string;
  isPlaceholder: true;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'location' | 'facilities' | 'pricing' | 'general';
}

export type MediaType = 'image' | 'video';

export interface MediaSlot {
  id: string;
  type: MediaType;
  /** Where this slot is used in the UI, e.g. "Home hero background loop". */
  usage: string;
  placeholderPath: string;
  alt: string;
}

export interface GalleryItem {
  id: string;
  /** Media slot id, looked up via getMediaSlot(). */
  mediaId: string;
  caption: string;
  category: 'facility' | 'transformation';
}

export interface BlogPost {
  /** Matches the filename of the article body: content/blog/<slug>.mdx */
  slug: string;
  title: string;
  /** One-line summary shown on the blog index card. */
  excerpt: string;
  /** ISO date, "YYYY-MM-DD". */
  publishedAt: string;
  author: string;
  tags: string[];
  /** Program slugs the article links to — surfaced as "Related programs". */
  relatedPrograms: string[];
  seo: Seo;
}

export interface TravelRoute {
  /** Starting landmark/locality, e.g. "Meri" or "Mhasrul". */
  from: string;
  approxDistanceKm: string;
  approxTravelTime: string;
  directions: string;
}

export interface LocalityContent {
  slug: string;
  areaName: string;
  intro: string;
  routes: TravelRoute[];
  whyWorthIt: { title: string; description: string }[];
  seo: Seo;
}
