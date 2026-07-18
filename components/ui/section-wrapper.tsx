import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';

export type SectionVariant = 'dark' | 'darker' | 'light';

const variants: Record<SectionVariant, string> = {
  dark: 'bg-charcoal-900 text-ivory-50',
  darker: 'bg-charcoal-950 text-ivory-50',
  light: 'bg-ivory-50 text-ink-950',
};

type SectionWrapperProps = {
  variant?: SectionVariant;
  /** Set false for full-bleed content (e.g. hero video, maps). */
  contained?: boolean;
  /** Tighter vertical rhythm for secondary sections. */
  compact?: boolean;
} & ComponentPropsWithoutRef<'section'>;

export function SectionWrapper({
  variant = 'dark',
  contained = true,
  compact = false,
  className,
  children,
  ...rest
}: SectionWrapperProps) {
  return (
    <section
      data-variant={variant}
      className={cn(variants[variant], compact ? 'py-section-sm' : 'py-section', className)}
      {...rest}
    >
      {contained ? (
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
