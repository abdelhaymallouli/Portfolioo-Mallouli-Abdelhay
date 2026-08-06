import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ProjectGrid } from "@/components/organisms/ProjectGrid";
import { VISIBLE_PROJECTS } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A full archive of engineering work, filterable by technology and category, with a case study behind each build.",
};

/** /projects — searchable archive. */
export default function ProjectsPage() {
  return (
    <PageShell>
      <PageHeader>
        <SectionHeading
          eyebrow={`${VISIBLE_PROJECTS.length} projects`}
          title="Everything I've built."
          description="Filter by category or search across technologies. Each project links to a full case study."
        />

        <div className="mt-16">
          <ProjectGrid />
        </div>
      </PageHeader>
    </PageShell>
  );
}
