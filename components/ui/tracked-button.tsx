'use client';

import { trackEvent } from '@/lib/analytics';
import { Button, type ButtonSize, type ButtonVariant } from './button';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type TrackedButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: ReactNode;
  /** GA4 event name — use ANALYTICS_EVENTS from lib/analytics. */
  event: string;
  eventParams?: Record<string, string>;
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onClick'> &
  Pick<ComponentPropsWithoutRef<'a'>, 'target' | 'rel'>;

/**
 * Button that fires a GA4 event on click, usable from Server Component
 * parents — `event`/`eventParams` are plain strings/objects (serializable
 * across the server/client boundary), unlike a raw onClick closure.
 */
export function TrackedButton({ event, eventParams, ...props }: TrackedButtonProps) {
  return <Button {...props} onClick={() => trackEvent(event, eventParams)} />;
}
