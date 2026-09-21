import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import { routing } from "@/i18n/routing";
import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "@/components/organisms/Hero";
import { ProjectShowcase } from "@/components/organisms/ProjectShowcase";
import { About } from "@/components/organisms/About";
import { FAQ } from "@/components/organisms/FAQ";

const Journey = dynamic(() =>
  import("@/components/organisms/Journey").then((mod) => mod.Journey),
);
const Bento = dynamic(() =>
  import("@/components/organisms/Bento").then((mod) => mod.Bento),
);
const Skills = dynamic(() =>
  import("@/components/organisms/Skills").then((mod) => mod.Skills),
);

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell trackSections darkHero>
      <Hero />
      <ProjectShowcase />
      <About />
      <Journey />
      <Bento />
      <Skills />
      <FAQ />
    </PageShell>
  );
}
