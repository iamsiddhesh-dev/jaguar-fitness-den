import { absoluteUrl } from '@/lib/seo';

export interface Breadcrumb {
  name: string;
  /** Site-relative path, e.g. "/programs/strength". */
  path: string;
}

/**
 * BreadcrumbList schema for nested pages (program and blog detail), per
 * docs/05-TRD.md §1. Callers pass the trail starting at Home.
 */
export function buildBreadcrumbListSchema(trail: Breadcrumb[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
