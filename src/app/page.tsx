import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "@/components/organisms/Hero";
import { ProjectShowcase } from "@/components/organisms/ProjectShowcase";
import { About } from "@/components/organisms/About";
import { Journey } from "@/components/organisms/Journey";
import { Bento } from "@/components/organisms/Bento";
import { Philosophy } from "@/components/organisms/Philosophy";
import { Skills } from "@/components/organisms/Skills";
import { FAQ } from "@/components/organisms/FAQ";

/**
 * Home.
 *
 * Every section answers exactly one question a hiring reader is actually
 * asking, in the order they ask it:
 *
 *   Who is this?          Hero
 *   Can they build?       ProjectShowcase
 *   Who are they really?  About
 *   How did they get here? Journey
 *   What's the evidence?  Bento
 *   How do they think?    Philosophy
 *   What do they use?     Skills
 *   The obvious questions FAQ
 *   How do I reach them?  Footer (carries the contact CTA)
 *
 * Work comes before biography on purpose. A reviewer opens a portfolio to see
 * what was built; making them read two prose sections first spends attention
 * before it has been earned.
 *
 * Four sections were cut here — Services, Process, Comparison and Highlight.
 * All four were written for a client buying an agency's time, not for someone
 * deciding whether to interview. The case studies already demonstrate process
 * and trade-offs far better than a list of them claimed to.
 *
 * Tone alternates canvas/subtle so no two banded sections touch.
 */
export default function Home() {
  return (
    <PageShell trackSections darkHero>
      <Hero />
      <ProjectShowcase />
      <About />
      <Journey />
      <Bento />
      <Philosophy />
      <Skills />
      <FAQ />
    </PageShell>
  );
}
