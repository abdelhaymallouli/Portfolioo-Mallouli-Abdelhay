import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { localeAlternates, routing } from "@/i18n/routing";
import { VISIBLE_PROJECTS } from "@/data/projects";

const ProjectGrid = dynamic(() =>
  import("@/components/organisms/ProjectGrid").then((mod) => mod.ProjectGrid),
);

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localeAlternates("/projects", locale),
  };
}

/** /projects — searchable archive. */
export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("projects");

  return (
    <PageShell>
      <PageHeader>
        {/* `as="h1"` — this block is the page title, not a section heading. */}
        <SectionHeading
          as="h1"
          eyebrow={t("count", { count: VISIBLE_PROJECTS.length })}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-16">
          <ProjectGrid />
        </div>
      </PageHeader>
    </PageShell>
  );
}
