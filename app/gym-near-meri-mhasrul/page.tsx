import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CTABand } from '@/components/ui/cta-band';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { meriMhasrulLocality } from '@/content/locality';
import { siteConfig } from '@/content/site-config';
import { whatsappHref } from '@/lib/links';

export const metadata: Metadata = {
  title: meriMhasrulLocality.seo.title,
  description: meriMhasrulLocality.seo.description,
};

export default function GymNearMeriMhasrulPage() {
  return (
    <main className="flex-1">
      <SectionWrapper variant="darker">
        <div className="max-w-2xl">
          <Eyebrow>Meri &amp; Mhasrul</Eyebrow>
          <Heading level={1} size="display" className="mt-4">
            A Premium Gym Closer Than You Think
          </Heading>
          <p className="text-smoke-300 mt-6 font-sans text-base leading-relaxed md:text-lg">
            {meriMhasrulLocality.intro}
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="dark">
        <Eyebrow>Getting Here</Eyebrow>
        <Heading level={2} size="xl" className="mt-3">
          Directions &amp; Travel Time
        </Heading>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {meriMhasrulLocality.routes.map((route) => (
            <Card key={route.from} variant="dark">
              <Heading level={3} size="md">
                From {route.from}
              </Heading>
              <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
                <div className="flex items-baseline gap-1.5">
                  <dt className="text-smoke-500 font-sans text-xs uppercase tracking-[0.1em]">
                    Distance
                  </dt>
                  <dd className="text-gold-400 font-sans text-sm font-semibold">
                    {route.approxDistanceKm}
                  </dd>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <dt className="text-smoke-500 font-sans text-xs uppercase tracking-[0.1em]">
                    Travel time
                  </dt>
                  <dd className="text-gold-400 font-sans text-sm font-semibold">
                    {route.approxTravelTime}
                  </dd>
                </div>
              </dl>
              <p className="text-smoke-400 mt-4 font-sans text-sm leading-relaxed">
                {route.directions}
              </p>
            </Card>
          ))}
        </div>
        <p className="text-smoke-500 mt-6 font-sans text-xs">
          Distances and travel times are rider estimates for normal daytime traffic, not exact
          measurements.
        </p>
      </SectionWrapper>

      <SectionWrapper variant="light">
        <Eyebrow tone="light">Why Worth the Trip</Eyebrow>
        <Heading level={2} size="xl" className="mt-3">
          What You&rsquo;re Riding Toward
        </Heading>
        <p className="text-ink-600 mt-4 max-w-2xl font-sans text-base leading-relaxed">
          Most gyms on the Meri and Mhasrul side of the city are compact, budget setups. A short
          ride down Dindori Road gets you a genuinely different tier of facility.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {meriMhasrulLocality.whyWorthIt.map((item) => (
            <Card key={item.title} variant="light" className="h-full">
              <Heading level={3} size="md">
                {item.title}
              </Heading>
              <p className="text-ink-600 mt-2 font-sans text-sm leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper variant="darker">
        <Eyebrow>Where We Are</Eyebrow>
        <Heading level={2} size="xl" className="mt-3">
          Floor 5, Laxmi Sky Park, Panchavati
        </Heading>
        <p className="text-smoke-400 mt-4 max-w-2xl font-sans text-sm leading-relaxed">
          {siteConfig.address.full}
        </p>
        <div className="mt-6">
          <Button href="/location" variant="outline">
            Full Directions &amp; Map
          </Button>
        </div>
      </SectionWrapper>

      <CTABand
        title="Make the Short Ride Count"
        subtitle="Book a free trial and see the facility for yourself — no commitment, just a serious workout."
      >
        <Button href="/contact" size="lg">
          Book Free Trial
        </Button>
        <Button
          href={whatsappHref()}
          variant="outline"
          size="lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp Us
        </Button>
      </CTABand>
    </main>
  );
}
