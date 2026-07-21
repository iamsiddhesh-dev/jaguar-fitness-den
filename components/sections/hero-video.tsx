'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type HeroVideoProps = {
  src: string;
  poster: string;
};

/**
 * Hero background loop, layered over the always-rendered poster image.
 * Plays on every viewport (mobile and desktop) with a plain full-bleed
 * `object-cover` crop — the source clip (`public/videos/home-hero-loop-v2.mp4`)
 * has its top watermark band cropped out at the file level (see the sibling
 * poster asset for the same treatment), so there's no baked-in logo to
 * collide with the real nav regardless of how tightly a given viewport
 * crops it.
 *
 * Playback is driven entirely from JS — note there is deliberately no
 * `autoPlay` prop on the element. React assigns `muted` as a DOM property
 * rather than an HTML attribute, so an `autoPlay` element can be inserted
 * and evaluated by the browser while it still looks unmuted, and mobile
 * Chromium refuses autoplay outright at that point. Instead the callback ref
 * below sets `muted` the instant the node exists, and we call `play()`
 * ourselves once `canplay` fires. Calling it earlier rejects with AbortError
 * (and would abort a native autoplay attempt), leaving the video parked at
 * t=0 behind the poster.
 *
 * If `play()` is still refused (Data Saver, battery saver, or a low media
 * engagement score will all do it), we retry on the first user gesture
 * rather than giving up — until then the poster stays visible, so the worst
 * case degrades to the static-image hero. Still never the LCP element: this
 * mounts post-hydration via effect, so the poster `<Image>` in hero.tsx is
 * what paints first (docs/05-TRD.md LCP budget).
 */
export function HeroVideo({ src, poster }: HeroVideoProps) {
  const [enabled, setEnabled] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Callback ref: sets `muted` as soon as the node is created, before the
  // browser has any chance to judge it as an unmuted autoplay candidate.
  const attachVideo = useCallback((node: HTMLVideoElement | null) => {
    if (node) node.muted = true;
    videoRef.current = node;
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(!reducedMotion.matches);
    update();
    reducedMotion.addEventListener('change', update);
    return () => reducedMotion.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!enabled || !video) return;

    video.muted = true;
    let cancelled = false;

    const attempt = () => {
      if (cancelled) return;
      video.play().catch(() => {
        // Retry on the first user gesture, which always satisfies the
        // autoplay policy.
        window.addEventListener('pointerdown', attempt, { once: true });
        window.addEventListener('touchstart', attempt, { once: true });
        window.addEventListener('scroll', attempt, { once: true, passive: true });
      });
    };

    if (video.readyState >= 3) attempt();
    else video.addEventListener('canplay', attempt, { once: true });

    return () => {
      cancelled = true;
      video.removeEventListener('canplay', attempt);
      window.removeEventListener('pointerdown', attempt);
      window.removeEventListener('touchstart', attempt);
      window.removeEventListener('scroll', attempt);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <video
      ref={attachVideo}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
