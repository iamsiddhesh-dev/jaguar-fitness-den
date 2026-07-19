import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';
import { Ga4Script } from '@/components/analytics/ga4-script';
import { JsonLd } from '@/components/schema/json-ld';
import { buildLocalBusinessSchema } from '@/components/schema/local-business';
import { siteConfig } from '@/content/site-config';
import { ogImage } from '@/lib/seo';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { StickyMobileBar } from '@/components/layout/sticky-mobile-bar';

// display: 'optional' keeps the hero H1 from re-painting on font swap — the
// swap repaint was re-candidating LCP at font-arrival time (~4.7s on
// throttled mobile vs the 2.5s budget). The font is preloaded, so it still
// renders on any reasonable connection; slow first visits get the
// size-adjusted Arial Narrow fallback instead of a late swap.
const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
  display: 'optional',
});

// Not preloaded: Inter styles body copy, not the LCP headline, and its 48KB
// preload was competing with the hero-critical resources on throttled mobile.
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
});

/**
 * Root-level metadata defaults. Per-page titles, descriptions, canonicals, and
 * OG/Twitter blocks come from buildPageMetadata() in each route — what lives
 * here is only what every page shares. No canonical is set at this level on
 * purpose: an inherited canonical would point noindex routes (404, styleguide)
 * at the homepage.
 */
export const metadata: Metadata = {
  // Resolves relative OG image paths to absolute URLs.
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description:
    "Nashik's premium fitness destination — 5,500+ sq ft of international-grade training space in Panchavati.",
  applicationName: siteConfig.name,
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    locale: 'en_IN',
    images: [ogImage],
  },
  twitter: { card: 'summary_large_image', images: [ogImage] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col pb-16 md:pb-0">
        <SiteHeader />
        <div className="flex flex-1 flex-col pt-16 md:pt-20">{children}</div>
        <SiteFooter />
        <StickyMobileBar />
        <Ga4Script />
        {/* Sitewide LocalBusiness/ExerciseGym schema — see docs/05-TRD.md §1. */}
        <JsonLd data={buildLocalBusinessSchema()} />
      </body>
    </html>
  );
}
