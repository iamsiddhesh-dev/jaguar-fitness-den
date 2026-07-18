import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';

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
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
