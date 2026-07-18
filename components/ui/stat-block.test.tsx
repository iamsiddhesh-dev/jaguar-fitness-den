import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatBlock } from '@/components/ui/stat-block';

// jsdom has no IntersectionObserver, so the component takes its no-animation
// path and must render the final value immediately (same as SSR/no-JS/reduced motion).
describe('StatBlock', () => {
  it('renders the formatted final value with suffix and label', () => {
    render(<StatBlock value={5500} suffix="+" label="Sq ft of training space" />);
    expect(screen.getAllByText('5,500+').length).toBeGreaterThan(0);
    expect(screen.getByText('Sq ft of training space')).toBeInTheDocument();
  });

  it('exposes the final value to screen readers', () => {
    render(<StatBlock value={6} label="Programs" />);
    const srOnly = screen.getAllByText('6').find((el) => el.className.includes('sr-only'));
    expect(srOnly).toBeDefined();
  });

  it('renders a prefix', () => {
    render(<StatBlock value={18000} prefix="₹" label="Annual membership" />);
    expect(screen.getAllByText('₹18,000').length).toBeGreaterThan(0);
  });
});
