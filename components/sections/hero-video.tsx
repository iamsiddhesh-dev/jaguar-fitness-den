'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

type HeroVideoProps = {
  src: string;
  poster: string;
};

/**
 * Hero background loop, layered over the always-rendered poster image.
 * Mounts only on desktop-width viewports with motion allowed, so mobile
 * never downloads the video and the poster stays the LCP element
 * (docs/02-ux-design.md §4).
 */
export function HeroVideo({ src, poster }: HeroVideoProps) {
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(desktop.matches && !reducedMotion.matches);
    update();
    desktop.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);
    return () => {
      desktop.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
    };
  }, []);

  if (!enabled) return null;

  return (
    <video
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
      className={cn(
        'absolute inset-0 h-full w-full object-cover transition-opacity duration-700',
        playing ? 'opacity-100' : 'opacity-0',
      )}
    />
  );
}
