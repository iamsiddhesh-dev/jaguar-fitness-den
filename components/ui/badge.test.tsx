import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from '@/components/ui/badge';

describe('Badge', () => {
  it.each([
    ['gold', 'bg-gold-400'],
    ['outline', 'border-gold-400/40'],
    ['neutral', 'text-smoke-300'],
  ] as const)('renders the %s variant', (variant, expectedClass) => {
    render(<Badge variant={variant}>Fully AC</Badge>);
    expect(screen.getByText('Fully AC').className).toContain(expectedClass);
  });
});
