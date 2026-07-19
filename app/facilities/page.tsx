import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CTABand } from '@/components/ui/cta-band';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { facilities } from '@/content/facilities';
import { cn } from '@/lib/cn';
import { getMediaSlot } from '@/lib/media';

export const metadata: Metadata = {
  title: 'Facilities | Jaguar Fitness Den, Panchavati, Nashik',
  description:
    'Steam rooms, a members’ lounge, dedicated class studios, and international-grade Jaguar Strength equipment — explore every facility at Jaguar Fitness Den, Panchavati.',
};

const featured = [
  {
    facilityId: 'jaguar-strength-equipment',
    slotId: 'facilities-strip-equipment',
    reverse: false,
  },
  {
    facilityId: 'steam-room',
    slotId: 'facilities-strip-steam-room',
    reverse: true,
  },
  {
    facilityId: 'lounge',
    slotId: 'facilities-strip-lounge',
    reverse: false,
  },
] as const;

const featuredIds = new Set<string>(featured.map((f) => f.facilityId));

export default function FacilitiesPage() {
  const remaining = facilities.filter((facility) => !featuredIds.has(facility.id));

  return (
    <main className="flex-1">
      <SectionWrapper variant="darker">
        <div className="max-w-2xl">
          <Eyebrow>The Facility</Eyebrow>
          <Heading level={1} size="display" className="mt-4">
            Every Amenity, Built Premium
          </Heading>
          <p className="text-smoke-300 mt-6 font-sans text-base leading-relaxed md:text-lg">
            5,500+ sq ft across one dedicated floor — this is what separates Jaguar Fitness Den
            from every budget gym in Nashik.
          </p>
        </div>
      </SectionWrapper>

      {featured.map(({ facilityId, slotId, reverse }) => {
        const facility = facilities.find((f) => f.id === facilityId);
        if (!facility) throw new Error(`Missing facility "${facilityId}" in content/facilities.ts`);
        const slot = getMediaSlot(slotId);

        return (
          <SectionWrapper key={facility.id} variant="dark">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div
                className={cn(
                  'rounded-card border-ivory-50/8 relative aspect-4/3 overflow-hidden border',
                  reverse && 'md:order-2',
                )}
              >
                <Image
                  src={slot.placeholderPath}
                  alt={slot.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <Heading level={2} size="xl">
                  {facility.name}
                </Heading>
                <p className="text-smoke-400 mt-4 font-sans text-base leading-relaxed">
                  {facility.description}
                </p>
              </div>
            </div>
          </SectionWrapper>
        );
      })}

      <SectionWrapper variant="light">
        <div className="max-w-2xl">
          <Eyebrow tone="light">More Included</Eyebrow>
          <Heading level={2} size="xl" className="mt-3">
            Everything Else in Your Membership
          </Heading>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {remaining.map((facility) => (
            <Card key={facility.id} variant="light" className="h-full">
              <Heading level={3} size="md">
                {facility.name}
              </Heading>
              <p className="text-ink-600 mt-2 font-sans text-sm leading-relaxed">
                {facility.description}
              </p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      <CTABand
        title="See the Facility for Yourself"
        subtitle="Book a free trial and walk the floor — steam rooms, studios, and equipment included."
      >
        <Button href="/contact" size="lg">
          Book Free Trial
        </Button>
        <Button href="/pricing" variant="outline" size="lg">
          View Membership
        </Button>
      </CTABand>
    </main>
  );
}
