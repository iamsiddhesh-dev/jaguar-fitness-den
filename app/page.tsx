import type { Metadata } from 'next';
import { FacilitiesShowcase } from '@/components/sections/facilities-showcase';
import { FinalCta } from '@/components/sections/final-cta';
import { Hero } from '@/components/sections/hero';
import { LocationStrip } from '@/components/sections/location-strip';
import { MemberAppHighlight } from '@/components/sections/member-app-highlight';
import { PricingTeaser } from '@/components/sections/pricing-teaser';
import { ProgramsPreview } from '@/components/sections/programs-preview';
import { ReviewsStrip } from '@/components/sections/reviews-strip';
import { StatsBar } from '@/components/sections/stats-bar';
import { TransformationsTeaser } from '@/components/sections/transformations-teaser';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  path: '/',
  title: 'Premium Gym in Panchavati, Nashik | Jaguar Fitness Den',
  description:
    '5,500+ sq ft luxury gym at Laxmi Sky Park, Dindori Road, Panchavati — Jaguar Strength equipment, steam rooms and group studios. Minutes from Meri & Mhasrul.',
});

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <StatsBar />
      <FacilitiesShowcase />
      <ProgramsPreview />
      <MemberAppHighlight />
      <TransformationsTeaser />
      <ReviewsStrip />
      <PricingTeaser />
      <LocationStrip />
      <FinalCta />
    </main>
  );
}
