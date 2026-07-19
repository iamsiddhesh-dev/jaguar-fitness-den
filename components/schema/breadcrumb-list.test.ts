import { describe, expect, it } from 'vitest';
import { siteConfig } from '@/content/site-config';
import { buildBreadcrumbListSchema } from './breadcrumb-list';

describe('buildBreadcrumbListSchema', () => {
  const schema = buildBreadcrumbListSchema([
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    { name: 'Strength Training', path: '/programs/strength' },
  ]);

  it('declares a BreadcrumbList', () => {
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('BreadcrumbList');
  });

  it('numbers positions from 1 and resolves items to absolute URLs', () => {
    expect(schema.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Programs',
        item: `${siteConfig.url}/programs`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Strength Training',
        item: `${siteConfig.url}/programs/strength`,
      },
    ]);
  });
});
