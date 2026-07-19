/** Primary site navigation — order matches the sitemap in docs/02-ux-design.md §3. */
export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Facilities', href: '/facilities' },
  { label: 'Programs', href: '/programs' },
  { label: 'Trainers', href: '/trainers' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Location', href: '/location' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

/** Subset shown in the footer quick-links column. */
export const footerQuickLinks: NavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Facilities', href: '/facilities' },
  { label: 'Programs', href: '/programs' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'Gym Near Meri & Mhasrul', href: '/gym-near-meri-mhasrul' },
];

/** Routes that exist but live outside the primary nav (e.g. SEO landing pages). */
export const additionalRoutes: NavLink[] = [
  { label: 'Gym Near Meri & Mhasrul', href: '/gym-near-meri-mhasrul' },
];
