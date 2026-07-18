import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Heading } from '@/components/ui/heading';
import { JaguarDivider } from '@/components/ui/jaguar-divider';

type CTABandProps = {
  title: string;
  subtitle?: string;
  /** Action buttons — rendered centered under the copy. */
  children?: ReactNode;
  className?: string;
};

/** Full-width conversion band: gold-edged dark panel with title, sub-line and CTAs. */
export function CTABand({ title, subtitle, children, className }: CTABandProps) {
  return (
    <section
      className={cn(
        'border-gold-400/25 bg-charcoal-850 text-ivory-50 relative overflow-hidden border-y',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,rgb(217_164_65/0.14),transparent)]"
      />
      <div className="relative mx-auto w-full max-w-4xl px-5 py-16 text-center sm:px-8 md:py-20">
        <JaguarDivider className="mb-6" />
        <Heading level={2} size="xl">
          {title}
        </Heading>
        {subtitle ? (
          <p className="text-smoke-300 mx-auto mt-4 max-w-xl font-sans text-base md:text-lg">
            {subtitle}
          </p>
        ) : null}
        {children ? (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">{children}</div>
        ) : null}
      </div>
    </section>
  );
}
