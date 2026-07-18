import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SectionWrapper } from '@/components/ui/section-wrapper';

describe('SectionWrapper', () => {
  it('renders a dark section by default with contained children', () => {
    render(
      <SectionWrapper aria-label="Programs">
        <p>Content</p>
      </SectionWrapper>,
    );
    const section = screen.getByRole('region', { name: 'Programs' });
    expect(section).toHaveAttribute('data-variant', 'dark');
    expect(section.className).toContain('bg-charcoal-900');
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders the light variant', () => {
    render(
      <SectionWrapper variant="light" aria-label="Reviews">
        <p>Content</p>
      </SectionWrapper>,
    );
    const section = screen.getByRole('region', { name: 'Reviews' });
    expect(section).toHaveAttribute('data-variant', 'light');
    expect(section.className).toContain('bg-ivory-50');
  });

  it('skips the container when contained is false', () => {
    const { container } = render(
      <SectionWrapper contained={false}>
        <p>Bleed</p>
      </SectionWrapper>,
    );
    expect(container.querySelector('.max-w-6xl')).toBeNull();
  });
});
