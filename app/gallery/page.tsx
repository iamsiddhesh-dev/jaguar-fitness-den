import type { Metadata } from 'next';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CTABand } from '@/components/ui/cta-band';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { galleryItems } from '@/content/gallery';
import { getMediaSlot } from '@/lib/media';

export const metadata: Metadata = {
  title: 'Gallery | Jaguar Fitness Den, Panchavati, Nashik',
  description:
    'See the training floor, studios, and member transformations at Jaguar Fitness Den, Panchavati, Nashik.',
};

export default function GalleryPage() {
  const facilityShots = galleryItems.filter((item) => item.category === 'facility');
  const transformations = galleryItems.filter((item) => item.category === 'transformation');

  return (
    <main className="flex-1">
      <SectionWrapper variant="darker">
        <div className="max-w-2xl">
          <Eyebrow>Gallery</Eyebrow>
          <Heading level={1} size="display" className="mt-4">
            See the Facility
          </Heading>
          <p className="text-smoke-300 mt-6 font-sans text-base leading-relaxed md:text-lg">
            A look at the training floor, studios, and the results members are training for.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {facilityShots.map((item) => {
            const slot = getMediaSlot(item.mediaId);
            return (
              <figure
                key={item.id}
                className="rounded-card border-ivory-50/8 relative aspect-4/3 overflow-hidden border"
              >
                <Image
                  src={slot.placeholderPath}
                  alt={slot.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
                <figcaption className="from-charcoal-950/85 text-ivory-50 absolute inset-x-0 bottom-0 bg-linear-to-t px-4 py-3 font-sans text-xs tracking-[0.08em] uppercase">
                  {item.caption}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </SectionWrapper>

      <SectionWrapper variant="dark">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <Eyebrow>Results</Eyebrow>
            <Heading level={2} size="xl" className="mt-3">
              Transformations
            </Heading>
          </div>
          <Badge variant="outline">Sample media — real member results coming soon</Badge>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {transformations.map((item) => {
            const slot = getMediaSlot(item.mediaId);
            return (
              <figure
                key={item.id}
                className="rounded-card border-ivory-50/8 relative aspect-3/4 overflow-hidden border"
              >
                <Image
                  src={slot.placeholderPath}
                  alt={slot.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
                <figcaption className="from-charcoal-950/85 text-ivory-50 absolute inset-x-0 bottom-0 bg-linear-to-t px-4 py-3 font-sans text-xs tracking-[0.08em] uppercase">
                  {item.caption}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </SectionWrapper>

      <CTABand
        title="Be the Next Transformation"
        subtitle="Book a free trial and start the program that gets you there."
      >
        <Button href="/contact" size="lg">
          Book Free Trial
        </Button>
      </CTABand>
    </main>
  );
}
