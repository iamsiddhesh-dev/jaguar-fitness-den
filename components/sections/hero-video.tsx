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
 * iOS Safari has a further quirk on top of that, specific to a genuinely
 * cold page load (confirmed by testing: works fine once the video is already
 * cached from a prior visit, or after a client-side route change — it's the
 * very first fetch-from-network case that fails). It appears to require the
 * intent to play be registered close to load time, not merely once enough
 * data has arrived — waiting passively for `canplay` before ever calling
 * `play()` is too late. So `attempt()` (and an explicit `load()`, since
 * `preload="auto"` alone wasn't reliably kicking off the fetch) both fire
 * unconditionally on mount, in addition to — not instead of — the
 * `canplay` listener and the gesture listeners below. Gesture listeners stay
 * as a further backup for autoplay being refused for another reason (Data
 * Saver, battery saver, a low media engagement score) — until any of these
 * succeed the poster stays visible, so the worst case degrades to the
 * static-image hero. Still never the LCP element: this mounts post-hydration
 * via effect, so the poster `<Image>` in hero.tsx is what paints first
 * (docs/05-TRD.md LCP budget).
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
    let played = false;

    const attempt = () => {
      if (played) return;
      video.play().then(
        () => {
          played = true;
        },
        () => {},
      );
    };

    // Fire immediately regardless of readyState — don't wait passively for
    // canplay before registering play intent (see comment above).
    video.load();
    attempt();
    video.addEventListener('canplay', attempt);

    // Always on, not just wired in after a play() rejection: iOS Safari can
    // leave the video at readyState 0 forever with canplay never firing at
    // all, so there may be no rejection to react to in the first place.
    // `load()` gives it an explicit nudge to start fetching before retrying.
    const gestureAttempt = () => {
      if (played) return;
      // Only force a reload if it's truly stalled at square one — if
      // readyState is already past 0 the browser has started fetching on
      // its own (the normal Chrome/Android path), and reloading here would
      // abort a `play()` that's already in flight rather than help anything.
      if (video.readyState === 0) video.load();
      attempt();
    };
    window.addEventListener('touchstart', gestureAttempt, { once: true, passive: true });
    window.addEventListener('pointerdown', gestureAttempt, { once: true });
    window.addEventListener('scroll', gestureAttempt, { once: true, passive: true });

    return () => {
      video.removeEventListener('canplay', attempt);
      window.removeEventListener('touchstart', gestureAttempt);
      window.removeEventListener('pointerdown', gestureAttempt);
      window.removeEventListener('scroll', gestureAttempt);
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
