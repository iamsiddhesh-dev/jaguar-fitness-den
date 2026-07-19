import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { programs } from '@/content/programs';
import { getMediaSlot } from '@/lib/media';

/** 6 program cards from the content layer, each linking to its detail page. */
export function ProgramsPreview() {
  return (
    <SectionWrapper variant="light">
      <div className="max-w-2xl">
        <Eyebrow tone="light">Programs</Eyebrow>
        <Heading level={2} size="xl" className="mt-3">
          Six Ways to Train
        </Heading>
        <p className="text-ink-600 mt-4 font-sans text-base leading-relaxed">
          From heavy iron to yoga flows — every program runs in its own dedicated space with
          certified trainers.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((program) => {
          const slot = getMediaSlot(`program-${program.slug}`);
          return (
            <Link key={program.slug} href={`/programs/${program.slug}`} className="group block">
              <Card variant="light" interactive className="h-full overflow-hidden p-0">
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
                  <Heading level={3} size="md">
                    {program.name}
                  </Heading>
                  <p className="text-ink-600 mt-2 font-sans text-sm leading-relaxed">
                    {program.tagline}
                  </p>
                  <p className="text-gold-700 mt-4 font-sans text-xs font-semibold tracking-[0.18em] uppercase">
                    View Program →
                  </p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
