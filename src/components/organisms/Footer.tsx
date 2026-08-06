import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { Container } from "@/components/atoms/Container";
import { ButtonLink } from "@/components/atoms/Button";
import { GlowBackdrop } from "@/components/atoms/GlowBackdrop";
import { CopyEmail } from "@/components/molecules/CopyEmail";
import { CONTACT, NAV_LINKS, SITE } from "@/data/content";
import { VISIBLE_PROJECTS } from "@/data/projects";

/** Icon links in the bottom bar. */
const SOCIALS = [
  { label: "GitHub", href: SITE.github, Icon: SiGithub },
  { label: "LinkedIn", href: SITE.linkedin, Icon: FaLinkedin },
  { label: "Email", href: `mailto:${SITE.email}`, Icon: Mail },
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
export function Footer() {
  const year = new Date().getFullYear();

  /* Columns are built from real routes only — no invented Legal pages. */
  const columns = [
    {
      heading: "Navigate",
      links: [
        ...NAV_LINKS.map((link) => ({ label: link.label, href: link.href })),
        { label: "All projects", href: "/projects" },
      ],
    },
    {
      heading: "Projects",
      links: VISIBLE_PROJECTS.map((project) => ({
        label: project.title,
        href: `/projects/${project.slug}`,
      })),
    },
    {
      heading: "Connect",
      links: [
        { label: "GitHub", href: SITE.github },
        { label: "LinkedIn", href: SITE.linkedin },
        { label: "Email", href: `mailto:${SITE.email}` },
        { label: "Résumé", href: SITE.resumeHref },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a]">
      <GlowBackdrop />

      <Container className="relative z-10 pb-10 pt-20">
        {/* ---------------- CTA card ---------------- */}
        <div className="relative flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-4xl border border-white/10 bg-white/5 md:min-h-[28rem]">
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
              <h2 className="text-balance text-[2rem] font-medium leading-[1.1] tracking-tight text-white md:text-[2.75rem] lg:text-[3.5rem] lg:leading-[1.05]">
                {CONTACT.heading}
              </h2>
              <p className="mt-5 max-w-[32rem] text-pretty text-[0.9375rem] leading-[1.7] text-white/60">
                {CONTACT.body}
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-3">
              <ButtonLink
                href={`mailto:${SITE.email}`}
                size="lg"
                /* The default white/20 border disappears on this ground. */
                className="border-white/30"
              >
                Get in touch
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
          aria-label="Footer"
          className="mt-20 grid gap-10 sm:grid-cols-3 sm:gap-8"
        >
          {columns.map((column) => (
            <div key={column.heading}>
              <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-white/50">
                {column.heading}
              </h3>
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
              className="text-[0.9375rem] font-medium tracking-tight text-white"
            >
              {SITE.name}
            </Link>
            <p className="mt-1 text-xs text-white/50">
              © {year} · {SITE.positioning}
            </p>
          </div>

          <ul className="flex items-center gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-white/60 transition-colors duration-200 ease-out hover:border-white/35 hover:text-white"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
