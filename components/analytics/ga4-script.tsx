import Script from 'next/script';

const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

/**
 * Loaded `afterInteractive` so gtag.js never competes with hero-critical
 * resources for the LCP budget (see app/layout.tsx font-loading notes).
 * Renders nothing when the measurement ID env var is unset.
 */
export function Ga4Script() {
  if (!GA4_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
