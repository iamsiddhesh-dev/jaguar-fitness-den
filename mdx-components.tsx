import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import { InrPrice } from '@/components/sections/inr-price';
import { Heading } from '@/components/ui/heading';

/**
 * Global MDX element map — blog article bodies render on a dark section, so the
 * styles here mirror the dark-surface tokens used across components/sections.
 *
 * `InrPrice` is exposed as a component so article copy can write
 * `<InrPrice amount={18000} />` instead of a literal rupee glyph: U+20B9 lives in
 * the latin-ext webfont subset and pulling it into webfont-styled prose costs
 * ~110KB of extra font downloads (see components/sections/inr-price.tsx).
 */

function Anchor({ href = '', ...rest }: ComponentPropsWithoutRef<'a'>) {
  const classes =
    'text-gold-300 underline decoration-gold-400/40 underline-offset-4 transition-colors hover:text-gold-200 hover:decoration-gold-300';

  if (href.startsWith('/')) {
    return <Link href={href} className={classes} {...rest} />;
  }

  return <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest} />;
}

const components: MDXComponents = {
  h2: (props) => (
    <Heading level={2} size="lg" className="text-ivory-50 mt-14 mb-4 first:mt-0" {...props} />
  ),
  h3: (props) => <Heading level={3} size="md" className="text-ivory-50 mt-10 mb-3" {...props} />,
  p: (props) => (
    <p className="text-smoke-300 mt-5 font-sans text-base leading-relaxed" {...props} />
  ),
  ul: (props) => (
    <ul className="text-smoke-300 mt-5 flex list-disc flex-col gap-2 pl-5 font-sans" {...props} />
  ),
  ol: (props) => (
    <ol
      className="text-smoke-300 mt-5 flex list-decimal flex-col gap-2 pl-5 font-sans"
      {...props}
    />
  ),
  li: (props) => <li className="text-base leading-relaxed" {...props} />,
  strong: (props) => <strong className="text-ivory-50 font-semibold" {...props} />,
  em: (props) => <em className="italic" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-gold-400/50 text-smoke-300 mt-8 border-l-2 pl-5 font-sans text-base leading-relaxed italic"
      {...props}
    />
  ),
  hr: () => <hr className="border-ivory-50/10 my-12" />,
  a: Anchor,
  InrPrice,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
