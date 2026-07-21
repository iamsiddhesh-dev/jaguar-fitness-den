import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CTABand } from '@/components/ui/cta-band';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { siteConfig } from '@/content/site-config';
import { googleMapsDirectionsHref, googleMapsEmbedSrc } from '@/lib/links';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  path: '/location',
  title: 'Directions | Jaguar Fitness Den, Panchavati, Nashik',
  description:
    'Find Jaguar Fitness Den on Floor No. 5, Laxmi Sky Park, Dindori Road, Panchavati, Nashik — directions, parking, and opening hours incl. Sunday.',
});

export default function LocationPage() {
  return (
    <main className="flex-1">
      <SectionWrapper variant="darker">
        <div className="max-w-2xl">
          <Eyebrow>Find Us</Eyebrow>
          <Heading level={1} size="display" className="mt-4">
            Floor 5, Laxmi Sky Park
          </Heading>
          <p className="text-smoke-300 mt-6 font-sans text-base leading-relaxed md:text-lg">
            {siteConfig.address.full}
          </p>
        </div>

        <div className="rounded-card border-ivory-50/8 mt-10 overflow-hidden border">
          <iframe
            title="Jaguar Fitness Den location map"
            src={googleMapsEmbedSrc()}
            className="h-80 w-full md:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button
            href={googleMapsDirectionsHref()}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            Open in Google Maps
          </Button>
          <Button href={`tel:${siteConfig.phones.primary.e164}`} variant="outline" size="lg">
            Call {siteConfig.phones.primary.display}
          </Button>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="dark">
        <div className="grid gap-8 md:grid-cols-3">
          <Card variant="dark">
            <Heading level={2} size="md">
              Getting to Floor 5
            </Heading>
            <p className="text-smoke-400 mt-3 font-sans text-sm leading-relaxed">
              Jaguar Fitness Den is on Floor No. 5 of Laxmi Sky Park (Croma Building), on Dindori
              Road near Jio Petrol Pump. The building has lift access straight to the 5th floor —
              no stairs required.
            </p>
          </Card>
          <Card variant="dark">
            <Heading level={2} size="md">
              Parking
            </Heading>
            <p className="text-smoke-400 mt-3 font-sans text-sm leading-relaxed">
              Ample, safe parking is available for members, along with 24/7 CCTV monitoring across
              the building.
            </p>
          </Card>
          <Card variant="dark">
            <Heading level={2} size="md">
              Coming From Meri or Mhasrul?
            </Heading>
            <p className="text-smoke-400 mt-3 font-sans text-sm leading-relaxed">
              It&rsquo;s a short, direct ride down Dindori Road — see our{' '}
              <a href="/gym-near-meri-mhasrul" className="text-gold-400 hover:underline">
                directions from Meri &amp; Mhasrul
              </a>{' '}
              for exact travel times.
            </p>
          </Card>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="light">
        <div className="max-w-2xl">
          <Eyebrow tone="light">Hours</Eyebrow>
          <Heading level={2} size="xl" className="mt-3">
            Opening Hours
          </Heading>
        </div>
        <dl className="border-ivory-200 mt-8 max-w-md space-y-4 border-t pt-6">
          {siteConfig.hours.spec.map((hours) => (
            <div key={hours.label} className="flex items-center justify-between gap-4">
              <dt className="text-ink-950 font-sans text-sm font-semibold">
                {hours.dayOfWeek.length > 1
                  ? `${hours.dayOfWeek[0]}–${hours.dayOfWeek[hours.dayOfWeek.length - 1]}`
                  : hours.dayOfWeek[0]}
              </dt>
              <dd className="text-ink-600 font-sans text-sm">
                {hours.opens} – {hours.closes}
              </dd>
            </div>
          ))}
        </dl>
      </SectionWrapper>

      <CTABand
        title="Come See It in Person"
        subtitle="Book a free trial and we'll walk you through the facility floor by floor."
      >
        <Button href="/contact" size="lg">
          Book Free Trial
        </Button>
      </CTABand>
    </main>
  );
}
