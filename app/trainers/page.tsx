import type { Metadata } from 'next';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CTABand } from '@/components/ui/cta-band';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { trainers } from '@/content/trainers';
import { getMediaSlot } from '@/lib/media';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  path: '/trainers',
  title: 'Trainers | Jaguar Fitness Den, Panchavati, Nashik',
  description:
    'Meet the certified coaching team at Jaguar Fitness Den — strength, group fitness, personal training and nutrition coaching in Panchavati, Nashik.',
});

const trainerImageSlots = ['trainer-1', 'trainer-2', 'trainer-3'];

export default function TrainersPage() {
  return (
    <main className="flex-1">
      <SectionWrapper variant="darker">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <Eyebrow>Our Team</Eyebrow>
            <Heading level={1} size="display" className="mt-4">
              Certified, Elite Coaching
            </Heading>
            <p className="text-smoke-300 mt-6 font-sans text-base leading-relaxed md:text-lg">
              Every trainer at Jaguar Fitness Den is certified across their discipline — strength,
              group fitness, personal training, and nutrition.
            </p>
          </div>
          <Badge variant="outline">Placeholder roster — full team bios coming soon</Badge>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trainers.map((trainer, index) => {
            const slot = getMediaSlot(trainerImageSlots[index % trainerImageSlots.length]);
            return (
              <Card key={trainer.id} variant="dark" className="h-full overflow-hidden p-0">
                <div className="relative aspect-3/4">
                  <Image
                    src={slot.placeholderPath}
                    alt={slot.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <Badge variant="neutral" className="mb-3">
                    Placeholder
                  </Badge>
                  <Heading level={2} size="md">
                    {trainer.name}
                  </Heading>
                  <p className="text-gold-400 mt-1 font-sans text-xs font-semibold tracking-[0.14em] uppercase">
                    {trainer.role}
                  </p>
                  <p className="text-smoke-400 mt-3 font-sans text-sm leading-relaxed">
                    {trainer.bio}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </SectionWrapper>

      <CTABand
        title="Train With Our Coaches"
        subtitle="Book a free trial and see how a certified trainer shapes your program from day one."
      >
        <Button href="/contact" size="lg">
          Book Free Trial
        </Button>
      </CTABand>
    </main>
  );
}
