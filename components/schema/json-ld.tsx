/**
 * Renders a JSON-LD block. The schema objects themselves are built by the pure
 * functions in this folder, so they stay unit-testable without React.
 *
 * `<` is escaped so a stray "</script>" inside any content string can never
 * close the tag early.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
