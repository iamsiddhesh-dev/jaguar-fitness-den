import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CTABand } from '@/components/ui/cta-band';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { TrackedButton } from '@/components/ui/tracked-button';
import type { MediaSlot, Program } from '@/content/types';
import { ANALYTICS_EVENTS } from '@/lib/analytics';
import { CheckIcon } from './icons';

type ProgramDetailProps = {
  program: Program;
  media: MediaSlot;
};

/**
 * Pure, data-driven program detail template — takes its program and media as
 * props (rather than looking them up itself) so it can render any `Program`
 * the data layer produces, proving the route scales from data alone.
 */
export function ProgramDetail({ program, media }: ProgramDetailProps) {
  return (
    <main className="flex-1">
      <SectionWrapper variant="darker">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Program</Eyebrow>
            <Heading level={1} size="display" className="mt-4">
              {program.name}
            </Heading>
            <p className="text-smoke-300 mt-6 font-sans text-base leading-relaxed md:text-lg">
              {program.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <TrackedButton
                href="/contact"
                size="lg"
                event={ANALYTICS_EVENTS.TRIAL_CTA_CLICK}
                eventParams={{ cta_location: `program_detail_${program.slug}` }}
              >
                Book Free Trial
              </TrackedButton>
              <Button href="/pricing" variant="outline" size="lg">
                View Pricing
              </Button>
            </div>
          </div>
          <div className="rounded-card border-ivory-50/8 relative aspect-4/3 overflow-hidden border">
            <Image
              src={media.placeholderPath}
              alt={media.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="dark">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Heading level={2} size="xl">
              What This Program Is
            </Heading>
            <p className="text-smoke-400 mt-4 font-sans text-base leading-relaxed">
              {program.description}
            </p>
            <Heading level={3} size="md" className="mt-8">
              Who It&rsquo;s For
            </Heading>
            <p className="text-smoke-400 mt-3 font-sans text-base leading-relaxed">
              {program.whoItsFor}
            </p>
          </div>

          <Card variant="dark">
            <Heading level={3} size="md">
              Session Structure
            </Heading>
            <ul className="mt-5 space-y-3">
              {program.sessionStructure.map((step) => (
                <li key={step} className="flex items-start gap-3">
                  <CheckIcon className="text-gold-400 mt-0.5 shrink-0" />
                  <span className="text-smoke-300 font-sans text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </SectionWrapper>

      <CTABand
        title={`Ready to Start ${program.name}?`}
        subtitle="Book a free trial and train with certified, elite coaches on international-grade equipment."
      >
        <TrackedButton
          href="/contact"
          size="lg"
          event={ANALYTICS_EVENTS.TRIAL_CTA_CLICK}
          eventParams={{ cta_location: `program_detail_${program.slug}_band` }}
        >
          Book Free Trial
        </TrackedButton>
        <Button href="/programs" variant="outline" size="lg">
          Explore All Programs
        </Button>
      </CTABand>
    </main>
  );
}
