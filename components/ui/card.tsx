import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';

export type CardVariant = 'dark' | 'light';

const variants: Record<CardVariant, string> = {
  dark: 'border-ivory-50/8 bg-charcoal-800 text-ivory-50',
  light: 'border-ivory-200 bg-white text-ink-950 shadow-sm',
};

type CardProps = {
  variant?: CardVariant;
  /** Adds hover lift + gold border glow for clickable cards. */
  interactive?: boolean;
} & ComponentPropsWithoutRef<'div'>;

export function Card({
  variant = 'dark',
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-card border p-6',
        variants[variant],
        interactive &&
          'hover:border-gold-400/40 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgb(0_0_0/0.5)]',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
