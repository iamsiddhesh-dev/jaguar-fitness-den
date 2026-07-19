'use client';

import { trackEvent } from '@/lib/analytics';
import type { ComponentPropsWithoutRef } from 'react';

type TrackedAnchorProps = {
  event: string;
  eventParams?: Record<string, string>;
} & ComponentPropsWithoutRef<'a'>;

/** Plain `<a>` that fires a GA4 event on click, usable from Server Component parents. */
export function TrackedAnchor({ event, eventParams, ...props }: TrackedAnchorProps) {
  return <a {...props} onClick={() => trackEvent(event, eventParams)} />;
}
