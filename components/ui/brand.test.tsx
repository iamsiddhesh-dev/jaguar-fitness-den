import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { JaguarDivider } from '@/components/ui/jaguar-divider';
import { Wordmark } from '@/components/ui/wordmark';

describe('JaguarDivider', () => {
  it('is hidden from assistive tech', () => {
    const { container } = render(<JaguarDivider />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('Wordmark', () => {
  it('exposes the full brand name as one accessible label', () => {
    render(<Wordmark />);
    expect(screen.getByLabelText('Jaguar Fitness Den')).toBeInTheDocument();
  });

  it('uses AA-safe deep gold on light surfaces', () => {
    const { container } = render(<Wordmark tone="light" />);
    expect(container.innerHTML).toContain('text-gold-700');
    expect(container.innerHTML).not.toContain('text-gold-400');
  });
});
