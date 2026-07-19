declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const ANALYTICS_EVENTS = {
  FORM_SUBMIT: 'form_submit',
  CALL_CLICK: 'call_click',
  WHATSAPP_CLICK: 'whatsapp_click',
  TRIAL_CTA_CLICK: 'trial_cta_click',
} as const;

/** No-ops when gtag hasn't loaded (GA4 ID unset, script blocked, or SSR). */
export function trackEvent(name: string, params?: Record<string, string>): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}
