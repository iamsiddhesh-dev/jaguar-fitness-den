'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

type Slide = {
  src: string;
  alt: string;
  /** Short caption shown over the slide, e.g. "Workout Tracker". */
  label: string;
};

type MemberAppCarouselProps = {
  slides: Slide[];
  /** Milliseconds between auto-advances. */
  intervalMs?: number;
};

/**
 * Auto-advancing screenshot carousel for the phone-frame mock. Pauses on
 * hover/focus and holds on the first slide when the user prefers reduced
 * motion (same convention as HeroVideo).
 */
export function MemberAppCarousel({ slides, intervalMs = 3200 }: MemberAppCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches || paused || slides.length <= 1) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [paused, slides.length, intervalMs]);

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="flex h-full w-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.src} className="relative h-full w-full shrink-0">
            <Image src={slide.src} alt={slide.alt} fill sizes="260px" className="object-cover" />
          </div>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="from-charcoal-950/85 absolute inset-x-0 bottom-0 bg-linear-to-t to-transparent pt-10 pb-2"
      />

      <p
        aria-live="polite"
        className="text-ivory-50 absolute inset-x-0 bottom-6 text-center font-sans text-xs font-semibold tracking-[0.1em] uppercase"
      >
        {slides[index]?.label}
      </p>

      <div
        className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5"
        role="tablist"
        aria-label="App screenshots"
      >
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show screenshot ${i + 1} of ${slides.length}: ${slide.label}`}
            onClick={() => setIndex(i)}
            className={cn(
              'h-1.5 w-1.5 cursor-pointer rounded-full transition-colors',
              i === index ? 'bg-gold-400' : 'bg-ivory-50/40',
            )}
          />
        ))}
      </div>
    </div>
  );
}
