import { cn } from '@/lib/cn';

type JaguarDividerProps = {
  className?: string;
};

/**
 * Geometric jaguar-rosette section divider — broken gold rings echoing a
 * jaguar's spot clusters, flanked by hairlines. Purely decorative.
 */
export function JaguarDivider({ className }: JaguarDividerProps) {
  return (
    <svg
      viewBox="0 0 260 24"
      width="260"
      height="24"
      aria-hidden="true"
      className={cn('text-gold-400 mx-auto block', className)}
      fill="none"
    >
      <line x1="0" y1="12" x2="66" y2="12" stroke="currentColor" strokeOpacity="0.25" />
      <line x1="194" y1="12" x2="260" y2="12" stroke="currentColor" strokeOpacity="0.25" />

      {/* outer rosettes */}
      <g opacity="0.35">
        <circle
          cx="82"
          cy="12"
          r="3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          pathLength="36"
          strokeDasharray="8 4"
          transform="rotate(40 82 12)"
        />
        <circle
          cx="178"
          cy="12"
          r="3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          pathLength="36"
          strokeDasharray="8 4"
          transform="rotate(-25 178 12)"
        />
      </g>

      {/* mid rosettes */}
      <g opacity="0.65">
        <circle
          cx="104"
          cy="12"
          r="5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          pathLength="36"
          strokeDasharray="8 4"
          transform="rotate(15 104 12)"
        />
        <circle
          cx="156"
          cy="12"
          r="5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          pathLength="36"
          strokeDasharray="8 4"
          transform="rotate(-50 156 12)"
        />
      </g>

      {/* center rosette */}
      <circle
        cx="130"
        cy="12"
        r="7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        pathLength="36"
        strokeDasharray="8 4"
        transform="rotate(-8 130 12)"
      />
      <circle cx="130" cy="12" r="1.8" fill="currentColor" />
    </svg>
  );
}
