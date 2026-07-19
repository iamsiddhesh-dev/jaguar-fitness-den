import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * NAP RULE: the site's published address must exactly match the Google
 * Business Profile (Panchavati / Laxmi Sky Park). The Meri/Mhasrul locality
 * is targeted through page copy (e.g. FAQ answers) referencing the area by
 * name, but the specific conflicting landmark address — "Reliance Petrol
 * Pump" — must never appear anywhere under content/ or app/ (including blog
 * article bodies), since that would read as a second, contradictory business
 * address.
 */
function collectSourceFiles(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectSourceFiles(fullPath));
    } else if (/\.(tsx?|mdx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

describe('NAP rule', () => {
  it('no file under content/ or app/ contains the Meri/Mhasrul conflicting address', () => {
    const root = path.resolve(__dirname, '..');
    const selfPath = path.resolve(__filename);
    const files = [
      ...collectSourceFiles(path.join(root, 'content')),
      ...collectSourceFiles(path.join(root, 'app')),
    ].filter((file) => file !== selfPath);

    expect(files.length).toBeGreaterThan(0);

    const offenders: string[] = [];
    for (const file of files) {
      const contents = readFileSync(file, 'utf8').toLowerCase();
      if (contents.includes('reliance petrol pump')) {
        offenders.push(path.relative(root, file));
      }
    }

    expect(offenders).toEqual([]);
  });
});
