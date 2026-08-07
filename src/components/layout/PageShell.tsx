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
}: {
  children: ReactNode;
  trackSections?: boolean;
}) {
  return (
    <>
      <ScrollProgress />
      <Navbar trackSections={trackSections} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
