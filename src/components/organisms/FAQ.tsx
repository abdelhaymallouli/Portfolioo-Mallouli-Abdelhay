import { getTranslations } from "next-intl/server";
import { ChevronDown } from "lucide-react";
import { Container, Section } from "@/components/atoms/Container";
import { Card } from "@/components/atoms/Card";
import { ButtonLink } from "@/components/atoms/Button";
import { Reveal } from "@/components/motion/Reveal";
import { FAQ as FAQ_ITEMS, SITE } from "@/data/content";

/**
 * Frequently asked questions.
 *
 * Two columns at `lg`: the heading and a contact card on the left, the
 * accordion on the right. The split does real work — it stops a long list of
 * questions from reading as a wall, and it puts a way to ask something *not*
 * on the list directly beside the list itself.
 *
 * The left column is sticky so that card stays in view while the questions
 * scroll past. Below `lg` the columns stack and stickiness is dropped, since
 * pinning on a phone would eat the viewport.
 *
 * Built on native `<details>`/`<summary>` rather than a JS accordion. That
 * buys keyboard operation, screen-reader semantics and in-page find for free,
 * and ships no client JavaScript. The chevron rotates via CSS on `[open]`;
 * there is no height animation, because animating `height: auto` correctly
 * would require exactly the JS this approach avoids.
 */
export async function FAQ() {
  const t = await getTranslations("faq");

  return (
    <Section id="faq">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ---------------- Left: heading + ask ---------------- */}
          <div className="flex flex-col gap-10 lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <div>
                <h2 className="max-w-[16ch] text-balance text-display-sm font-medium tracking-tight text-ink sm:text-display-md lg:text-display-lg">
                  {t("title")}
                </h2>
                <p className="mt-4 text-pretty text-lead text-secondary">
                  {t("emailPrompt")}{" "}
                  {/*
                   * `accent-hover`, not `accent`, as the resting colour:
                   * #447e68 measures 4.12:1 on the canvas and fails AA for
                   * body text, while #36624f clears it at 6.05:1. The accent
                   * proper is fine as a fill or a focus ring — just not as
                   * small text on this ground.
                   */}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-accent-hover underline underline-offset-4 transition-colors duration-200 ease-out hover:text-ink"
                  >
                    {SITE.email}
                  </a>
                  .
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <Card className="w-full p-6 sm:p-7 lg:max-w-lg">
                <p className="text-title font-medium tracking-tight text-ink">
                  {t("hiringTitle")}
                </p>
                <p className="mt-3 text-pretty text-body text-secondary">
                  {t("hiringBody")}
                </p>
                <div className="mt-6">
                  <ButtonLink href={`mailto:${SITE.email}`}>
                    {t("getInTouch")}
                  </ButtonLink>
                </div>
              </Card>
            </Reveal>
          </div>

          {/* ---------------- Right: accordion ---------------- */}
          <div>
            {FAQ_ITEMS.map((item, index) => (
              <Reveal key={item.question} delay={Math.min(index * 0.04, 0.2)}>
                <details className="group border-b border-line">
                  {/*
                   * `<summary>` must be the FIRST CHILD of `<details>` — the
                   * spec is strict about it. Wrapping it in an `<h3>` demotes
                   * it to an ordinary child, at which point the browser
                   * renders its own default summary instead: a native
                   * disclosure triangle reading "Details", with none of these
                   * styles applied.
                   *
                   * So the heading goes *inside* the summary. The question
                   * still lands in the document outline, and there is still
                   * exactly one tab stop, because `<summary>` is the control.
                   */}
                  <summary
                    className={[
                      // Removes the default triangle in every engine.
                      "flex cursor-pointer list-none items-start justify-between gap-6 py-7",
                      "transition-colors duration-200 ease-out hover:text-accent-hover",
                      "[&::-webkit-details-marker]:hidden",
                    ].join(" ")}
                  >
                    <h3 className="text-pretty text-lead font-medium tracking-[-0.01em]">
                      {item.question}
                    </h3>
                    <ChevronDown
                      aria-hidden="true"
                      className="mt-1 h-5 w-5 shrink-0 text-muted transition-transform duration-200 ease-out group-open:rotate-180"
                    />
                  </summary>

                  <p className="-mt-1 pb-7 text-pretty text-body leading-[1.7] text-secondary">
                    {item.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
