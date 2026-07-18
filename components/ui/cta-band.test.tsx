import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '@/components/ui/button';
import { CTABand } from '@/components/ui/cta-band';

describe('CTABand', () => {
  it('renders title, subtitle and actions', () => {
    render(
      <CTABand title="Start Training Today" subtitle="First session is on us.">
        <Button href="/contact">Book Free Trial</Button>
      </CTABand>,
    );
    expect(
      screen.getByRole('heading', { level: 2, name: 'Start Training Today' }),
    ).toBeInTheDocument();
    expect(screen.getByText('First session is on us.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Book Free Trial' })).toHaveAttribute(
      'href',
      '/contact',
    );
  });

  it('omits subtitle and actions when not provided', () => {
    const { container } = render(<CTABand title="Start Training Today" />);
    expect(container.querySelectorAll('p')).toHaveLength(0);
  });
});
