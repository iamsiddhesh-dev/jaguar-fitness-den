import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { siteConfig } from '@/content/site-config';
import { getMediaSlot } from '@/lib/media';

/**
 * Location strip. NAP rule: only the official Google-listing address is
 * published — Meri/Mhasrul appear as locality copy, never as an address.
 */
export function LocationStrip() {
  const mapImage = getMediaSlot('location-strip');

  return (
    <SectionWrapper variant="darker">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Link
          href="/location"
          aria-label="Open Directions to Jaguar Fitness Den"
          className="rounded-card border-ivory-50/8 group relative block aspect-16/10 overflow-hidden border"
        >
          <Image
            src={mapImage.placeholderPath}
            alt={mapImage.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
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
