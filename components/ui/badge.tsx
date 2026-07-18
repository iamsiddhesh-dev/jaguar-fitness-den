import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';

export type BadgeVariant = 'gold' | 'outline' | 'neutral';

const variants: Record<BadgeVariant, string> = {
  gold: 'bg-gold-400 text-charcoal-950',
  outline: 'border border-gold-400/40 text-gold-300',
  neutral: 'bg-ivory-50/10 text-smoke-300',
};

type BadgeProps = {
  variant?: BadgeVariant;
} & ComponentPropsWithoutRef<'span'>;

export function Badge({ variant = 'gold', className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 font-sans text-xs font-semibold tracking-[0.08em] uppercase',
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
