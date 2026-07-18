import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders a button element by default', () => {
    render(<Button>Book Free Trial</Button>);
    const button = screen.getByRole('button', { name: 'Book Free Trial' });
    expect(button).toHaveAttribute('type', 'button');
    expect(button.className).toContain('bg-gold-400');
  });

  it('renders a link when href is provided', () => {
    render(<Button href="/contact">Contact</Button>);
    const link = screen.getByRole('link', { name: 'Contact' });
    expect(link).toHaveAttribute('href', '/contact');
  });

  it.each([
    ['outline', 'border-gold-400/60'],
    ['ghost', 'text-smoke-300'],
  ] as const)('applies the %s variant', (variant, expectedClass) => {
    render(<Button variant={variant}>Label</Button>);
    expect(screen.getByRole('button').className).toContain(expectedClass);
  });

  it('supports disabled state', () => {
    render(<Button disabled>Label</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
