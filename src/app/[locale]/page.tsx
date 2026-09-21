import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "@/components/organisms/Hero";
import { ProjectShowcase } from "@/components/organisms/ProjectShowcase";
import { About } from "@/components/organisms/About";
import { Journey } from "@/components/organisms/Journey";
import { Bento } from "@/components/organisms/Bento";
import { Skills } from "@/components/organisms/Skills";
import { FAQ } from "@/components/organisms/FAQ";

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
