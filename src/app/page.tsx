import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "@/components/organisms/Hero";
import { ProjectShowcase } from "@/components/organisms/ProjectShowcase";
import { Highlight } from "@/components/organisms/Highlight";
import { Services } from "@/components/organisms/Services";
import { Bento } from "@/components/organisms/Bento";
import { About } from "@/components/organisms/About";
import { Process } from "@/components/organisms/Process";
import { Comparison } from "@/components/organisms/Comparison";
import { Philosophy } from "@/components/organisms/Philosophy";
import { Journey } from "@/components/organisms/Journey";
import { Skills } from "@/components/organisms/Skills";
import { FAQ } from "@/components/organisms/FAQ";

/**
 * Home.
 *
 * Order is deliberate: work first, because that's what a reviewer came for.
 * The showcase grid is the hook — imagery before prose — and `Work` supplies
 * the written detail for anyone who wants it.
 *
 * `Highlight` is a deliberate beat of stillness between the four dense case
 * studies and the six service cards; without it the two heavy sections
 * collide and neither lands.
 *
 * From there it narrows: what I sell (Services), the evidence behind it
 * (Bento — figures, languages, certifications and stack in one grid), who I
 * am (About), how I work (Process, Comparison, Philosophy), what I've shipped
 * (Journey, Skills), then the questions a first call would otherwise open
 * with.
 *
 * Tone alternates canvas/subtle down the page so no two banded sections ever
 * touch — three in a row read as one undifferentiated block.
 */
export default function Home() {
  return (
    <PageShell trackSections>
      <Hero />
      <ProjectShowcase />
      <Highlight />
      <Services />
      <Bento />
      <About />
      <Process />
      <Comparison />
      <Philosophy />
      <Journey />
      <Skills />
      <FAQ />
    </PageShell>
  );
}
