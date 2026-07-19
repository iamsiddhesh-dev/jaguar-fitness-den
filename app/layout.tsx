import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';
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

export const metadata: Metadata = {
  title: 'Jaguar Fitness Den',
  description:
    "Nashik's premium fitness destination — 5,500+ sq ft of international-grade training space in Panchavati.",
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
      </body>
    </html>
  );
}
