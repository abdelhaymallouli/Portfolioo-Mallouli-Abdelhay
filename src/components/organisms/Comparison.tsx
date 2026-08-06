import { Container, Section } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { COMPARISON, SITE } from "@/data/content";

/**
 * How this way of working differs from the default.
 *
 * Built as a real `<table>` rather than a CSS grid, because it is tabular
 * data: each row relates two comparable values under a shared dimension, and
 * a screen reader should be able to announce the column a cell belongs to.
 * The visual layout is unusual for a table, but the semantics are exactly
 * right, and `scope` on the row headers is what makes that work.
 *
 * On mobile the table collapses to stacked blocks via `block` display, which
 * loses the header association — so each cell repeats its column label in a
 * `sm:hidden` span rather than leaving the value unlabelled.
 *
 * The left column has to be a fair statement of a choice someone could
 * reasonably make. A strawman here would undermine every claim beside it.
 */
export function Comparison() {
  return (
    <Section id="comparison" tone="subtle">
      <Container>
        <SectionHeading
          eyebrow="Approach"
          title="Where I differ from the default."
          description="Not better in every situation — these are trade-offs, and they cost something. This is where I land and why."
        />

        <div className="mt-16 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Comparison of common industry defaults against {SITE.name}&rsquo;s
              working approach, by dimension
            </caption>

            <thead className="hidden sm:table-header-group">
              <tr className="border-b border-line-strong">
                <th
                  scope="col"
                  className="w-[16%] py-4 pr-6 font-mono text-xs uppercase tracking-[0.12em] text-muted"
                >
                  Dimension
                </th>
                <th
                  scope="col"
                  className="w-[42%] py-4 pr-6 font-mono text-xs uppercase tracking-[0.12em] text-muted"
                >
                  Common default
                </th>
                <th
                  scope="col"
                  className="w-[42%] py-4 font-mono text-xs uppercase tracking-[0.12em] text-muted"
                >
                  How I work
                </th>
              </tr>
            </thead>

            <tbody className="block sm:table-row-group">
              {COMPARISON.map((row, index) => (
                <Reveal
                  key={row.aspect}
                  as="tr"
                  delay={Math.min(index * 0.04, 0.2)}
                  className="block border-b border-line py-6 sm:table-row sm:py-0"
                >
                  <th
                    scope="row"
                    className="block pb-3 text-[0.9375rem] font-medium text-ink sm:table-cell sm:py-7 sm:pr-6 sm:align-top"
                  >
                    {row.aspect}
                  </th>

                  <td className="block pb-3 text-pretty text-[0.9375rem] leading-[1.65] text-muted sm:table-cell sm:py-7 sm:pr-6 sm:align-top">
                    <span className="mb-1 block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted sm:hidden">
                      Common default
                    </span>
                    {row.typical}
                  </td>

                  <td className="block text-pretty text-[0.9375rem] leading-[1.65] text-ink sm:table-cell sm:py-7 sm:align-top">
                    <span className="mb-1 block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted sm:hidden">
                      How I work
                    </span>
                    {row.mine}
                  </td>
                </Reveal>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
}
