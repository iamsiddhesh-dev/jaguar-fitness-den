import { cn } from '@/lib/cn';

type WordmarkSize = 'sm' | 'md' | 'lg';

const jaguarSizes: Record<WordmarkSize, string> = {
  sm: 'text-2xl',
  md: 'text-4xl',
  lg: 'text-6xl',
};

const subSizes: Record<WordmarkSize, string> = {
  sm: 'text-[0.5rem]',
  md: 'text-[0.65rem]',
  lg: 'text-xs',
};

type WordmarkProps = {
  size?: WordmarkSize;
  /** `dark` = for dark surfaces; `light` = for light surfaces (AA-safe deep gold). */
  tone?: 'dark' | 'light';
  className?: string;
};

/**
 * Typographic wordmark treatment — placeholder until the real logo exists
 * (tracked in MEDIA-TODO.md). "JAGUAR" heavy condensed, "FITNESS DEN" as a
 * letterspaced gold sub-line between hairlines.
 */
export function Wordmark({ size = 'md', tone = 'dark', className }: WordmarkProps) {
  const gold = tone === 'dark' ? 'text-gold-400' : 'text-gold-700';
  const rule = tone === 'dark' ? 'bg-gold-400/40' : 'bg-gold-700/40';
  return (
    <span
      role="img"
      aria-label="Jaguar Fitness Den"
      className={cn('inline-flex flex-col items-center', className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          'font-display leading-none font-semibold tracking-[0.08em] uppercase',
          jaguarSizes[size],
        )}
      >
        Jaguar
      </span>
      <span aria-hidden="true" className="mt-1 flex w-full items-center gap-2">
        <span className={cn('h-px flex-1', rule)} />
        <span
          className={cn(
            'font-sans font-semibold tracking-[0.42em] whitespace-nowrap uppercase',
            subSizes[size],
            gold,
          )}
        >
          Fitness Den
        </span>
        <span className={cn('h-px flex-1', rule)} />
      </span>
    </span>
  );
}
