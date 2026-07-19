import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { MediaSlot, Program } from '@/content/types';
import { ProgramDetail } from './program-detail';

/**
 * Scalability proof: ProgramDetail is a pure, data-driven template. This
 * fixture models the site's real 6 programs plus a 7th, never added to
 * content/programs.ts, to prove a new program page comes from a data-file
 * edit alone — no component changes required.
 */
const dummyProgram: Program = {
  slug: 'aqua-fitness',
  name: 'Aqua Fitness',
  tagline: 'Low-impact, high-output training in the water.',
  description: 'A dummy 7th program used only to prove the detail template scales from data.',
  whoItsFor: 'Members who want joint-friendly, resistance-based training.',
  sessionStructure: ['Warm-up', 'Water resistance circuit', 'Cool-down'],
  seo: {
    title: 'Aqua Fitness | Jaguar Fitness Den',
    description: 'Dummy fixture program — not a real offering.',
  },
};

const dummyMedia: MediaSlot = {
  id: 'program-aqua-fitness',
  type: 'image',
  usage: 'Test fixture only',
  placeholderPath: '/images/placeholder/program-strength.jpg',
  alt: 'Fixture image for the scalability test',
};

describe('ProgramDetail', () => {
  it('renders a brand-new program from data alone', () => {
    render(<ProgramDetail program={dummyProgram} media={dummyMedia} />);

    expect(screen.getByRole('heading', { level: 1, name: 'Aqua Fitness' })).toBeInTheDocument();
    expect(screen.getByText(dummyProgram.tagline)).toBeInTheDocument();
    expect(screen.getByText(dummyProgram.description)).toBeInTheDocument();
    expect(screen.getByText(dummyProgram.whoItsFor)).toBeInTheDocument();
    for (const step of dummyProgram.sessionStructure) {
      expect(screen.getByText(step)).toBeInTheDocument();
    }
    expect(
      screen.getByRole('heading', { name: 'Ready to Start Aqua Fitness?' }),
    ).toBeInTheDocument();
  });
});
