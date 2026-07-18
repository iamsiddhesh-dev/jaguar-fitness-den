import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from '@/components/ui/card';

describe('Card', () => {
  it('renders a dark surface card by default', () => {
    render(<Card>Steam rooms</Card>);
    expect(screen.getByText('Steam rooms').className).toContain('bg-charcoal-800');
  });

  it('renders the light variant', () => {
    render(<Card variant="light">Steam rooms</Card>);
    expect(screen.getByText('Steam rooms').className).toContain('bg-white');
  });

  it('adds hover treatment when interactive', () => {
    render(<Card interactive>Steam rooms</Card>);
    expect(screen.getByText('Steam rooms').className).toContain('hover:-translate-y-1');
  });
});
