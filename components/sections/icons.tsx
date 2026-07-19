/** Tiny decorative icons shared by the Home sections. */

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path
        d="M8 12.5l2.7 2.7L16.5 9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" className={className}>
      <path
        d="M10 1.7l2.5 5.2 5.7.7-4.2 3.9 1.1 5.6L10 14.3l-5.1 2.8 1.1-5.6L1.8 7.6l5.7-.7L10 1.7Z"
        fill="currentColor"
      />
    </svg>
  );
}
