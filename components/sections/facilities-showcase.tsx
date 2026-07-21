import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { facilities } from '@/content/facilities';
import { getMediaSlot } from '@/lib/media';

const showcaseImages = [
  { slotId: 'facilities-strip-equipment', caption: 'Jaguar Strength Equipment' },
  { slotId: 'facilities-strip-group-studio', caption: 'Dedicated Group-Class Studios' },
  { slotId: 'facilities-strip-lockers', caption: 'Locker Facilities' },
];

/** The premium differentiators as a visual strip — links to /facilities. */
export function FacilitiesShowcase() {
  return (
    <SectionWrapper variant="darker">
      <div className="max-w-2xl">
        <Eyebrow>The Facility</Eyebrow>
        <Heading level={2} size="xl" className="mt-3">
          Built Like No Other Gym in Nashik
        </Heading>
        <p className="text-smoke-400 mt-4 font-sans text-base leading-relaxed">
          Steam rooms, a members&rsquo; lounge, dedicated class studios, and a fully air-conditioned
          floor of international-grade equipment — this is what premium actually looks like.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {showcaseImages.map(({ slotId, caption }) => {
          const slot = getMediaSlot(slotId);
          return (
            <figure
              key={slotId}
              className="rounded-card border-gold-400/20 group relative aspect-4/3 overflow-hidden border shadow-[0_20px_50px_-24px_rgb(217_164_65/0.3)]"
            >
              <Image
                src={slot.placeholderPath}
                alt={slot.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="from-charcoal-950/85 absolute inset-0 bg-linear-to-t to-transparent"
              />
              <figcaption className="text-ivory-50 font-display absolute bottom-3 left-4 text-sm font-medium tracking-[0.14em] uppercase">
                {caption}
              </figcaption>
            </figure>
          );
        })}
      </div>

      <ul className="mt-8 flex flex-wrap gap-2.5">
        {facilities.map((facility) => (
          <li key={facility.id}>
            <Badge variant="neutral" className="hover:bg-ivory-50/15 gap-2 py-1.5 transition-colors">
              <span aria-hidden="true" className="bg-smoke-300 h-1 w-1 shrink-0 rounded-full" />
              {facility.name}
            </Badge>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <Button href="/facilities" variant="outline">
          Explore All Facilities
        </Button>
      </div>
    </SectionWrapper>
  );
}
