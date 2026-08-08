import { getTranslations } from "next-intl/server";
import { ArrowUpRight, Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { ButtonLink } from "@/components/atoms/Button";
import { GlowBackdrop } from "@/components/atoms/GlowBackdrop";
import { CopyEmail } from "@/components/molecules/CopyEmail";
import { CONTACT, NAV_LINKS, SITE } from "@/data/content";

/**
 * Icon links in the bottom bar. `key` selects the sr-only label from the
 * catalogue — GitHub and LinkedIn are proper nouns and identical in both
 * locales, but "Email" is not.
 */
const SOCIALS = [
  { key: "github", href: SITE.github, Icon: SiGithub },
  { key: "linkedin", href: SITE.linkedin, Icon: FaLinkedin },
  { key: "email", href: `mailto:${SITE.email}`, Icon: Mail },
] as const;

/**
 * Site footer — the closing statement, not just a sitemap.
 *
 * This absorbed the standalone Contact section. Both were dark, and both
 * asked for the same thing; stacking them meant the page ended on the same
 * note twice. Merging puts the ask inside the card at the top of the footer,
 * which is where a reader who scrolled this far already expects it.
 *
 * Because `PageShell` renders this on every route, the CTA now closes the
 * case studies and the archive too — not just the home page.
 *
 * Colour is constrained by contrast on the two grounds here: `white/50`
 * measures 5.29:1 on the panel and 5.24:1 on the card, both passing AA, while
 * `white/40` drops to 3.77:1 and fails. Muted text floors at 50%.
 */
export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const year = new Date().getFullYear();

  const columns = [
    {
      heading: t("navigate"),
      links: [
        ...NAV_LINKS.map((link) => ({
          label: tNav(link.id),
          href: link.href,
        })),
        { label: t("allProjects"), href: "/projects" },
      ],
    },
    {
      heading: t("sections"),
      links: [
        { label: t("evidence"), href: "/#credentials" },
        { label: t("journey"), href: "/#journey" },
        { label: t("philosophy"), href: "/#philosophy" },
        { label: t("faq"), href: "/#faq" },
      ],
    },
    {
      heading: t("connect"),
      links: [
        { label: t("github"), href: SITE.github },
        { label: t("linkedin"), href: SITE.linkedin },
        { label: t("email"), href: `mailto:${SITE.email}` },
        { label: t("resume"), href: SITE.resumeHref },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-surface-dark">
      <GlowBackdrop />

      <Container className="relative z-10 pb-10 pt-20">
        {/* ---------------- CTA card ---------------- */}
        <div className="relative flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 md:min-h-[28rem]">
          {/*
           * Ghost wordmark, anchored to the bottom of the card and clipped by
           * it. Decorative — the name is already in the DOM below — so it is
           * hidden rather than announced a second time.
           */}
          <span
            aria-hidden="true"
            className="watermark-invert pointer-events-none absolute inset-x-0 bottom-0 translate-y-[18%] select-none whitespace-nowrap text-center text-[clamp(3.5rem,15vw,18.75rem)]"
          >
            {SITE.name.split(" ")[0]}
          </span>

          <div className="relative z-10 flex flex-col gap-8 p-6 sm:p-10 md:flex-row md:items-start md:justify-between md:p-14">
            <div className="max-w-[34rem]">
              <SectionHeading
                tone="dark"
                title={CONTACT.heading}
                description={CONTACT.body}
              />
            </div>

            <div className="flex shrink-0 flex-col items-start gap-3">
              <ButtonLink
                href={`mailto:${SITE.email}`}
                size="lg"
                /* The default white/20 border disappears on this ground. */
                className="border-white/25"
              >
                {t("getInTouch")}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                  aria-hidden="true"
                />
              </ButtonLink>

              <CopyEmail email={SITE.email} tone="dark" />
            </div>
          </div>
        </div>

        {/* ---------------- Link columns ---------------- */}
        <nav
          aria-label={t("label")}
          className="mt-20 grid gap-10 sm:grid-cols-3 sm:gap-8"
        >
          {columns.map((column) => (
            <div key={column.heading}>
              <Eyebrow as="h3" tone="dark">
                {column.heading}
              </Eyebrow>
              <ul className="mt-5 flex flex-col gap-3.5">
                {column.links.map((link) => {
                  const external = link.href.startsWith("http");
                  const plain =
                    external || link.href.startsWith("mailto:") ||
                    link.href.endsWith(".pdf");

                  const className =
                    "text-sm text-white/80 transition-colors duration-200 ease-out hover:text-white";

                  return (
                    <li key={link.label}>
                      {/*
                       * `next/link` prefetches, which is wasted on a mailto,
                       * an external URL or a static PDF — those render as
                       * plain anchors.
                       */}
                      {plain ? (
                        <a
                          href={link.href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noopener noreferrer" : undefined}
                          className={className}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className={className}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* ---------------- Bottom bar ---------------- */}
        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between md:gap-0">
          <div>
            <Link
              href="/"
              className="text-body font-medium tracking-tight text-white"
            >
              {SITE.name}
            </Link>
            <p className="mt-1 text-xs text-white/50">
              © {year} · {SITE.positioning}
            </p>
          </div>

          <ul className="flex items-center gap-3">
            {SOCIALS.map(({ key, href, Icon }) => (
              <li key={key}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-white/60 transition-colors duration-200 ease-out hover:border-white/40 hover:text-white"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">{t(key)}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
