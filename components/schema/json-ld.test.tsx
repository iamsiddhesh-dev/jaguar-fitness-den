import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { JsonLd } from './json-ld';

function renderScript(data: object): HTMLScriptElement {
  const { container } = render(<JsonLd data={data} />);
  const script = container.querySelector('script[type="application/ld+json"]');
  if (!script) throw new Error('no JSON-LD script rendered');
  return script as HTMLScriptElement;
}

describe('JsonLd', () => {
  it('renders a parseable application/ld+json block', () => {
    const data = { '@context': 'https://schema.org', '@type': 'Thing', name: 'Test' };
    expect(JSON.parse(renderScript(data).innerHTML)).toEqual(data);
  });

  it('escapes < so content strings cannot close the script tag early', () => {
    const script = renderScript({ name: '</script><img src=x>' });

    expect(script.innerHTML).not.toContain('</script>');
    expect(JSON.parse(script.innerHTML)).toEqual({ name: '</script><img src=x>' });
  });
});
