import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Eyebrow, Heading } from '@/components/ui/heading';

describe('Heading', () => {
  it('renders an h2 by default', () => {
    render(<Heading>Facilities</Heading>);
    expect(screen.getByRole('heading', { level: 2, name: 'Facilities' })).toBeInTheDocument();
  });

  it('renders the requested semantic level', () => {
    render(
      <Heading level={1} size="display">
        Premium Fitness
      </Heading>,
    );
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.className).toContain('text-display');
  });

  it('applies the gold gradient when accent is set', () => {
    render(<Heading accent>Gold</Heading>);
    expect(screen.getByRole('heading').className).toContain('text-gold-gradient');
  });
});

describe('Eyebrow', () => {
  it('uses bright gold on dark and deep gold on light', () => {
    const { rerender } = render(<Eyebrow>Why Jaguar</Eyebrow>);
    expect(screen.getByText('Why Jaguar').className).toContain('text-gold-400');

    rerender(<Eyebrow tone="light">Why Jaguar</Eyebrow>);
    expect(screen.getByText('Why Jaguar').className).toContain('text-gold-700');
  });
});
