import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Blog articles are `.mdx` files under content/blog/, imported dynamically by
  // app/blog/[slug]/page.tsx — the extra extensions keep the MDX loader wired in.
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  // Dev-only: the dev server blocks cross-origin requests for `/_next/*` assets
  // from any origin other than the one it was started on (localhost). Testing on
  // a real phone over the LAN hits the machine's IP instead, so every client JS
  // chunk was refused — the page server-rendered fine but never hydrated, which
  // looks exactly like "interactive things silently don't work". Private LAN
  // ranges only; this has no effect on production builds.
  allowedDevOrigins: ['192.168.1.101', '192.168.1.*', '10.0.0.*', '172.16.0.*'],

  // Hides the floating dev-mode route indicator badge. Dev-only — compile and
  // runtime errors still surface regardless, and this has no effect on prod.
  devIndicators: false,
};

// No remark/rehype plugins: article bodies are plain markdown, and Turbopack can
// only take serializable (string-named) plugins — keeping the list empty avoids
// a webpack-only build path.
const withMDX = createMDX({});

export default withMDX(nextConfig);
