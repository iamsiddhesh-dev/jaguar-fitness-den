import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { StickyMobileBar } from '@/components/layout/sticky-mobile-bar';

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
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
