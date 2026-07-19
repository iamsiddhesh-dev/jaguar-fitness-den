import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { CTABand } from '@/components/ui/cta-band';
import { Button } from '@/components/ui/button';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { programs } from '@/content/programs';
import { getMediaSlot } from '@/lib/media';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  path: '/programs',
  title: 'Programs | Jaguar Fitness Den, Panchavati, Nashik',
  description:
    'Strength, Functional Training, Zumba, Yoga, Personal Training and Nutrition Coaching — every program at Jaguar Fitness Den, Panchavati, Nashik.',
});

export default function ProgramsIndexPage() {
  return (
    <main className="flex-1">
      <SectionWrapper variant="darker">
        <div className="max-w-2xl">
          <Eyebrow>Programs</Eyebrow>
          <Heading level={1} size="display" className="mt-4">
            Six Ways to Train
          </Heading>
          <p className="text-smoke-300 mt-6 font-sans text-base leading-relaxed md:text-lg">
            Every program runs in its own dedicated space with certified trainers — from heavy
            iron to breath and flexibility work.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => {
            const slot = getMediaSlot(`program-${program.slug}`);
            return (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group block"
              >
                <Card variant="dark" interactive className="h-full overflow-hidden p-0">
                  <div className="relative aspect-3/2">
                    <Image
                      src={slot.placeholderPath}
                      alt={slot.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <Heading level={2} size="md">
                      {program.name}
                    </Heading>
                    <p className="text-smoke-400 mt-2 font-sans text-sm leading-relaxed">
                      {program.tagline}
                    </p>
                    <p className="text-gold-400 mt-4 font-sans text-xs font-semibold tracking-[0.18em] uppercase">
                      View Program →
                    </p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </SectionWrapper>

      <CTABand
        title="Not Sure Where to Start?"
        subtitle="Book a free trial and our trainers will help you pick the right program for your goals."
      >
        <Button href="/contact" size="lg">
          Book Free Trial
        </Button>
      </CTABand>
    </main>
  );
}
