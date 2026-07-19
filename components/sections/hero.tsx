import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { siteConfig } from '@/content/site-config';
import { getMediaSlot } from '@/lib/media';
import { HeroVideo } from './hero-video';

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
      <path
        d="M5 9l7 7 7-7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Full-bleed hero. Bleeds under the transparent fixed header by cancelling
 * the layout's pt-16 md:pt-20 offset with a matching negative margin.
 */
export function Hero() {
  const poster = getMediaSlot('home-hero-poster');
  const video = getMediaSlot('home-hero-video');

  return (
    <section
      id="hero"
      aria-label="Jaguar Fitness Den — Nashik's premium fitness destination"
      className="bg-charcoal-950 relative -mt-16 flex min-h-svh flex-col justify-end overflow-hidden md:-mt-20"
    >
      <Image
        src={poster.placeholderPath}
        alt={poster.alt}
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      <HeroVideo src={video.placeholderPath} poster={poster.placeholderPath} />
      <div
        aria-hidden="true"
        className="from-charcoal-950 via-charcoal-950/55 to-charcoal-950/30 absolute inset-0 bg-linear-to-t"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-40 pb-24 sm:px-8 md:pb-28">
        <Eyebrow>Panchavati · Dindori Road · Nashik</Eyebrow>
        <Heading level={1} size="display" className="mt-4 max-w-3xl">
          Nashik&rsquo;s <span className="text-gold-gradient">Premium</span> Fitness Destination
        </Heading>
        <p className="text-smoke-300 mt-6 max-w-xl font-sans text-base leading-relaxed md:text-lg">
          5,500+ sq ft of international-grade training space at Laxmi Sky Park, Dindori Road,
          Panchavati — built for people who take results seriously.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/contact" size="lg">
            Book Free Trial
          </Button>
          <Button href={`tel:${siteConfig.phones.primary.e164}`} variant="outline" size="lg">
            Call Now
          </Button>
        </div>
      </div>

      <a
        href="#stats"
        aria-label="Scroll to gym highlights"
        className="text-smoke-400 hover:text-gold-400 absolute bottom-4 left-1/2 hidden -translate-x-1/2 transition-colors md:block"
      >
        {/* Bounce on an inner span so the anchor's own box stays stable (clickable mid-animation). */}
        <span className="block animate-bounce">
          <ChevronDownIcon />
        </span>
      </a>
    </section>
  );
}
