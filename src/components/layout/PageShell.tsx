import type { ReactNode } from "react";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { ScrollProgress } from "@/components/motion/ScrollProgress";

/**
 * Shared chrome for every route: progress bar, nav, main landmark, footer.
 * Keeps the page files focused on their own content.
 */
export function PageShell({
  children,
  /** Only the home page has in-page sections to highlight. */
  trackSections = false,
  /**
   * Whether the page opens on a dark hero the nav can sit transparently over.
   * Only the home page does. Sub-pages start on light canvas, where a
   * transparent bar left the white wordmark and links effectively invisible
   * until the first scroll — so they get the solid pill from the outset.
   */
  darkHero = false,
}: {
  children: ReactNode;
  trackSections?: boolean;
  darkHero?: boolean;
}) {
  return (
    <>
      <ScrollProgress />
      <Navbar trackSections={trackSections} darkHero={darkHero} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
