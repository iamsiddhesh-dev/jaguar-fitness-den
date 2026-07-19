import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CTABand } from '@/components/ui/cta-band';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { StatBlock } from '@/components/ui/stat-block';
import { facilities } from '@/content/facilities';
import { programs } from '@/content/programs';
import { getMediaSlot } from '@/lib/media';
import { whatsappHref } from '@/lib/links';

export const metadata: Metadata = {
  title: 'About Jaguar Fitness Den | Premium Gym in Panchavati, Nashik',
  description:
    'Jaguar Fitness Den is a 5,500+ sq ft premium gym in Panchavati, Nashik — international-grade Jaguar Strength equipment, dedicated studios, and elite coaching.',
};

export default function AboutPage() {
  const equipmentImage = getMediaSlot('facilities-strip-equipment');

  return (
    <main className="flex-1">
      <SectionWrapper variant="darker">
        <div className="max-w-2xl">
          <Eyebrow>About Us</Eyebrow>
          <Heading level={1} size="display" className="mt-4">
            The Largest Premium Gym in Panchavati
          </Heading>
          <p className="text-smoke-300 mt-6 font-sans text-base leading-relaxed md:text-lg">
            Jaguar Fitness Den was built on a simple idea: Nashik deserves a fitness destination
            that matches the seriousness of the people who train there. 5,500+ sq ft of
            international-grade equipment, dedicated studios, and recovery space — all on one
            floor at Laxmi Sky Park, Panchavati.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          <StatBlock value={5500} suffix="+" label="Sq ft training space" />
          <StatBlock value={programs.length} label="Signature programs" />
          <StatBlock value={facilities.length} label="Premium amenities" />
          <StatBlock value={17} suffix="+" label="Hours open, Mon–Sat" />
        </div>
      </SectionWrapper>

      <SectionWrapper variant="dark">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="rounded-card border-ivory-50/8 relative aspect-4/3 overflow-hidden border">
            <Image
              src={equipmentImage.placeholderPath}
              alt={equipmentImage.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <Eyebrow>Why Jaguar Strength</Eyebrow>
            <Heading level={2} size="xl" className="mt-3">
              Equipment That Doesn&rsquo;t Cut Corners
            </Heading>
            <p className="text-smoke-400 mt-4 font-sans text-base leading-relaxed">
              We chose international-grade Jaguar Strength commercial machinery because home-gym
              or budget-gym equipment simply doesn&rsquo;t hold up to serious, repeated training —
              the tolerances, the biomechanics, and the durability all matter once you&rsquo;re
              training hard, several times a week.
            </p>
            <p className="text-smoke-400 mt-4 font-sans text-base leading-relaxed">
              That same standard runs through the whole facility: fully air-conditioned interiors,
              dedicated studios for Zumba, Yoga, and Functional Training, and a members&rsquo; app
              that tracks your progress the way a serious training program should.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="light">
        <div className="max-w-2xl">
          <Eyebrow tone="light">Our Team</Eyebrow>
          <Heading level={2} size="xl" className="mt-3">
            Certified, Elite Coaching
          </Heading>
          <p className="text-ink-600 mt-4 font-sans text-base leading-relaxed">
            Every trainer at Jaguar Fitness Den is certified and experienced across strength,
            functional training, group fitness, and nutrition coaching — so whichever program you
            choose, you&rsquo;re coached by someone who knows the discipline in depth.
          </p>
          <div className="mt-8">
            <Button href="/trainers" variant="outline" className="border-gold-700/50 text-gold-700 hover:border-gold-700 hover:bg-gold-700/10">
              Meet the Team
            </Button>
          </div>
        </div>
      </SectionWrapper>

      <CTABand
        title="Come See the Facility"
        subtitle="A free trial is the fastest way to understand the gap between Jaguar Fitness Den and every other gym in the area."
      >
        <Button href="/contact" size="lg">
          Book Free Trial
        </Button>
        <Button
          href={whatsappHref()}
          variant="outline"
          size="lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp Us
        </Button>
      </CTABand>
    </main>
  );
}
