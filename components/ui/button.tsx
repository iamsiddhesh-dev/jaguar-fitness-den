import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-btn font-sans font-semibold tracking-[0.12em] uppercase transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-gold-400 text-charcoal-950 hover:bg-gold-300 active:bg-gold-500',
  // Gold-on-dark only passes AA on charcoal surfaces — use `primary` or `ghost` on light sections.
  outline:
    'border border-gold-400/60 text-gold-300 hover:border-gold-400 hover:bg-gold-400/10 active:bg-gold-400/20',
  ghost: 'text-smoke-300 hover:bg-ivory-50/10 hover:text-ivory-50 active:bg-ivory-50/15',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-xs',
  md: 'h-11 px-6 text-sm',
  lg: 'h-13 px-8 text-sm',
};

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Renders a Next.js link styled as a button. */
  href?: string;
  children: ReactNode;
  /** Fires on click for both the `<a>` (href set) and `<button>` render paths. */
  onClick?: () => void;
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onClick'> &
  Pick<ComponentPropsWithoutRef<'a'>, 'target' | 'rel'>;

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  className,
  children,
  target,
  rel,
  type = 'button',
  onClick,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} target={target} rel={rel} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
