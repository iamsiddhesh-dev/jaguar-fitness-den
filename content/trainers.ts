import type { Trainer } from './types';

/**
 * PLACEHOLDER ROSTER — these are not real trainers. Replace with the actual
 * roster once the owner provides names, roles, and bios. Every entry is
 * flagged with `isPlaceholder: true` so the UI can badge it clearly.
 */
export const trainers: Trainer[] = [
  {
    id: 'placeholder-trainer-1',
    name: '[PLACEHOLDER — Trainer Name]',
    role: 'Head Strength Coach',
    bio: '[PLACEHOLDER — bio pending from owner]',
    isPlaceholder: true,
  },
  {
    id: 'placeholder-trainer-2',
    name: '[PLACEHOLDER — Trainer Name]',
    role: 'Group Fitness Instructor (Zumba/Yoga)',
    bio: '[PLACEHOLDER — bio pending from owner]',
    isPlaceholder: true,
  },
  {
    id: 'placeholder-trainer-3',
    name: '[PLACEHOLDER — Trainer Name]',
    role: 'Personal Trainer & Nutrition Coach',
    bio: '[PLACEHOLDER — bio pending from owner]',
    isPlaceholder: true,
  },
];
