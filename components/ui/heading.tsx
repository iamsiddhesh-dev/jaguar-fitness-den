import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { cn } from '@/lib/cn';

export type HeadingLevel = 1 | 2 | 3 | 4;
export type HeadingSize = 'display' | 'xl' | 'lg' | 'md';

const sizes: Record<HeadingSize, string> = {
  display: 'text-display font-semibold',
  xl: 'text-display-sm font-semibold',
  lg: 'text-title font-medium',
  md: 'text-title-sm font-medium',
};

type HeadingProps = {
  /** Semantic heading level (h1–h4) — independent of visual size. */
  level?: HeadingLevel;
  size?: HeadingSize;
  /** Gold foil treatment — key headlines only. */
  accent?: boolean;
} & ComponentPropsWithoutRef<'h2'>;

export function Heading({
  level = 2,
  size = 'lg',
  accent = false,
  className,
  children,
  ...rest
}: HeadingProps) {
  const Tag = `h${level}` as ElementType;
  return (
    <Tag
      className={cn(
        'font-display uppercase',
        sizes[size],
        accent && 'text-gold-gradient',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

type EyebrowProps = {
  /** `dark` sections use bright gold; `light` sections need the AA-safe deep gold. */
  tone?: 'dark' | 'light';
} & ComponentPropsWithoutRef<'p'>;

/** Small gold overline that introduces a section heading. */
export function Eyebrow({ tone = 'dark', className, children, ...rest }: EyebrowProps) {
  return (
    <p
      className={cn(
        'font-sans text-xs font-semibold tracking-[0.3em] uppercase',
        tone === 'dark' ? 'text-gold-400' : 'text-gold-700',
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  );
}
