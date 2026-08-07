"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/atoms/Container";
import { ButtonLink } from "@/components/atoms/Button";
import { useActiveSection } from "@/hooks/useActiveSection";
import { NAV_LINKS, SECTION_IDS, SITE } from "@/data/content";

/**
 * Floating navigation.
 *
 * The bar detaches from the viewport edge and rides as a rounded dark pill
 * inset from both sides. That inset is what makes it read as an object over
 * the page rather than a browser chrome bar welded to the top.
 *
 * At rest it is transparent so the hero shows through; past 8px of scroll it
 * gains a dark translucent fill and a blur. The dark ground is deliberate —
 * it separates the nav from a page that is otherwise entirely light, and it
 * lets the yellow CTA marker sit at full saturation without competing with
 * anything around it.
 */
export function Navbar({ trackSections = false }: { trackSections?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [passedHero, setPassedHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  const activeSection = useActiveSection(trackSections ? SECTION_IDS : []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      setPassedHero(window.scrollY > window.innerHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide navbar and show scroll-to-top when the footer is in view
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Closing on navigation is handled by the links themselves, not by an
  // effect watching `pathname`: most nav links are hash links to the current
  // page, which never change `pathname`, so an effect would miss them.
  const closeMenu = () => setMenuOpen(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
    {/* Scroll-to-top FAB */}
    <AnimatePresence>
      {passedHero && (
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lift transition-all duration-200 hover:scale-110 hover:shadow-xl"
        >
          <ArrowUp className="h-5 w-5 text-ink" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>

    <AnimatePresence>
    {!nearFooter && (
    <motion.header
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: nearFooter ? 0 : 1, y: nearFooter ? -80 : 0 }}
      exit={{ opacity: 0, y: -80 }}
      transition={{ duration: 0.35, ease: [0, 0, 0.2, 1] }}
      className="fixed inset-x-0 top-4 z-50 mx-auto w-full lg:max-w-[calc(100%-4rem)]">
      <Container>
        <div
          className={cn(
            "rounded-xl transition-all duration-300 ease-out",
            /*
             * Fully transparent at rest: the hero panel behind it is already
             * dark, so a fill here would read as a second box stacked on the
             * first. It only materialises once the page has scrolled past
             * the hero onto the light sections.
             */
            scrolled || menuOpen
              ? "border border-white/10 bg-black/80 backdrop-blur-lg"
              : "border border-transparent",
          )}
        >
          <div className="flex h-16 items-center justify-between gap-8 px-4 sm:px-5">
            {/* Wordmark */}
            <Link
              href="/"
              onClick={closeMenu}
              className="shrink-0 text-body font-medium tracking-tight text-white"
            >
              {SITE.name}
            </Link>

            {/* Desktop nav */}
            <nav
              aria-label="Primary"
              className="hidden items-baseline gap-2 md:flex"
            >
              {NAV_LINKS.map((link) => {
                const active = trackSections && activeSection === link.id;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "relative px-3 py-2 text-sm font-medium transition-colors duration-200",
                      active ? "text-white" : "text-white/70 hover:text-white",
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-primary"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              {/*
               * Straight to mail rather than to an in-page anchor: the
               * contact section was merged into the footer, so `#contact` no
               * longer exists as a scroll target.
               */}
              <ButtonLink
                href={`mailto:${SITE.email}`}
                size="sm"
                className="hidden sm:inline-flex"
              >
                Get in touch
              </ButtonLink>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="-mr-1 grid h-10 w-10 place-items-center rounded-lg text-white transition-colors duration-200 hover:bg-white/10 md:hidden"
              >
                {menuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile sheet — lives inside the pill so it shares the rounding. */}
          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                id="mobile-nav"
                aria-label="Mobile"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
                className="overflow-hidden md:hidden"
              >
                <div className="flex flex-col px-4 pb-4 sm:px-5">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className="border-t border-white/10 py-3.5 text-sm text-white/70 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/projects"
                    onClick={closeMenu}
                    className="border-t border-white/10 py-3.5 text-sm text-white/70 transition-colors duration-200 hover:text-white"
                  >
                    All projects
                  </Link>
                  <ButtonLink
                    href={SITE.resumeHref}
                    variant="secondary"
                    size="md"
                    className="mt-4 w-full"
                    onClick={closeMenu}
                  >
                    Download résumé
                  </ButtonLink>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </motion.header>
    )}
    </AnimatePresence>
    </>
  );
}
