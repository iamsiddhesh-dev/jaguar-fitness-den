import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Blog articles are `.mdx` files under content/blog/, imported dynamically by
  // app/blog/[slug]/page.tsx — the extra extensions keep the MDX loader wired in.
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

// No remark/rehype plugins: article bodies are plain markdown, and Turbopack can
// only take serializable (string-named) plugins — keeping the list empty avoids
// a webpack-only build path.
const withMDX = createMDX({});

export default withMDX(nextConfig);
