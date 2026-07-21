import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { siteConfig } from '@/content/site-config';
import { googleMapsEmbedSrc } from '@/lib/links';

/**
 * Location strip. NAP rule: only the official Google-listing address is
 * published — Meri/Mhasrul appear as locality copy, never as an address.
 */
export function LocationStrip() {
  return (
    <SectionWrapper variant="darker">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Link
          href="/location"
          aria-label="Open Directions to Jaguar Fitness Den"
          className="rounded-card border-ivory-50/8 group relative block aspect-16/10 overflow-hidden border"
        >
          {/*
            A live embed, not a photo: this is a teaser for the real map on
            /location, so pointer events are disabled on the iframe itself —
            the whole card is a single link, not an interactive mini-map.
          */}
          <iframe
            title="Jaguar Fitness Den location map"
            src={googleMapsEmbedSrc()}
            loading="lazy"
            tabIndex={-1}
            aria-hidden="true"
            referrerPolicy="no-referrer-when-downgrade"
            className="pointer-events-none absolute inset-0 h-full w-full grayscale transition-[filter] duration-500 group-hover:grayscale-0"
          />
          <div
            aria-hidden="true"
            className="from-charcoal-950/70 absolute inset-0 bg-linear-to-t via-transparent to-transparent"
          />
          <span className="text-charcoal-950 bg-gold-400 absolute bottom-4 left-4 rounded-full px-4 py-1.5 font-sans text-xs font-semibold tracking-[0.12em] uppercase">
            Open Directions
          </span>
        </Link>

        <div>
          <Eyebrow>Find Us</Eyebrow>
          <Heading level={2} size="xl" className="mt-3">
            Floor 5, Laxmi Sky Park
          </Heading>
          <p className="text-smoke-300 mt-4 font-sans text-sm leading-relaxed">
            {siteConfig.address.full}
          </p>
          <p className="text-smoke-400 mt-4 font-sans text-sm leading-relaxed">
            Coming from Meri or Mhasrul? You&rsquo;re only a short ride away — most members from
            that side reach us in minutes via Dindori Road.
          </p>
          <dl className="border-ivory-50/8 mt-6 space-y-1 border-t pt-5">
            {siteConfig.hours.spec.map((hours) => (
              <div key={hours.label} className="flex gap-2">
                <dt className="sr-only">Opening hours</dt>
                <dd className="text-smoke-300 font-sans text-sm">{hours.label}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8">
            <Button href="/location" variant="outline">
              Get Directions
            </Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
