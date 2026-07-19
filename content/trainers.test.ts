import { describe, expect, it } from 'vitest';
import { trainers } from './trainers';

describe('trainers', () => {
  it('has a non-empty placeholder roster, all clearly flagged', () => {
    expect(trainers.length).toBeGreaterThan(0);
    for (const trainer of trainers) {
      expect(trainer.isPlaceholder).toBe(true);
      expect(trainer.name.length).toBeGreaterThan(0);
      expect(trainer.role.length).toBeGreaterThan(0);
    }
  });

  it('has unique ids', () => {
    const ids = trainers.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
