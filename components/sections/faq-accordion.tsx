import type { FaqItem } from '@/content/types';

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-200 group-open:rotate-180"
    >
      <path
        d="M5 9l7 7 7-7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Native <details>/<summary> accordion — accessible and interactive with no client JS. */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-ivory-50/8 divide-y border-t border-b border-ivory-50/8">
      {items.map((item) => (
        <details key={item.id} className="group py-5">
          <summary className="text-ivory-50 flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-medium uppercase tracking-wide marker:content-none">
            {item.question}
            <ChevronIcon />
          </summary>
          <p className="text-smoke-400 mt-4 font-sans text-sm leading-relaxed">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
