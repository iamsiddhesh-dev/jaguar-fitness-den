'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

const formatter = new Intl.NumberFormat('en-IN');

type StatBlockProps = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
};

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/**
 * Big gold stat with a count-up that plays once when scrolled into view.
 * Renders the final value on the server (SEO/no-JS) and skips the animation
 * for reduced-motion users or environments without IntersectionObserver.
 */
export function StatBlock({
  value,
  label,
  prefix = '',
  suffix = '',
  durationMs = 1500,
  className,
}: StatBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          setDisplayValue(Math.round(easeOutCubic(progress) * value));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        setDisplayValue(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs]);

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <p className="font-display text-gold-400 text-4xl font-semibold md:text-5xl">
        <span aria-hidden="true">
          {prefix}
          {formatter.format(displayValue)}
          {suffix}
        </span>
        <span className="sr-only">
          {prefix}
          {formatter.format(value)}
          {suffix}
        </span>
      </p>
      <p className="text-smoke-400 mt-2 font-sans text-xs font-medium tracking-[0.2em] uppercase">
        {label}
      </p>
    </div>
  );
}
