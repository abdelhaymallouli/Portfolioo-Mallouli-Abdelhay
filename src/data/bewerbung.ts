export type Lang = "en" | "de";

export interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface VaultItem {
  title: string;
  type: string;
  file: string;
  description: string;
}

export interface BewerbungContent {
  hero: {
    greeting: string;
    pitch: string;
    cvButton: string;
    videoAction: string;
  };
  bento: {
    techTitle: string;
    techDescription: string;
    languageTitle: string;
    languageDescription: string;
    languageLevel: string;
    problemTitle: string;
    problemDescription: string;
  };
  timeline: {
    title: string;
    items: TimelineItem[];
  };
  vault: {
    title: string;
    items: VaultItem[];
  };
}

export const bewerbungData: Record<Lang, BewerbungContent> = {
  en: {
    hero: {
      greeting: "Hi {company} Team, I'm Abdelhay.",
      pitch:
        "I am a dedicated Full-Stack Engineer specializing in React, Next.js, and modern backend architectures. I am actively seeking an Ausbildung (Apprenticeship) in Germany to combine my practical engineering experience with world-class German structured learning.",
      cvButton: "Download Full CV (PDF)",
      videoAction: "Watch Intro Video",
    },
    bento: {
      techTitle: "Current Stack",
      techDescription: "Production-ready expertise in modern web technologies.",
      languageTitle: "German Language",
      languageDescription:
        "Actively studying towards B2 certification to ensure seamless integration into a German working environment.",
      languageLevel: "B1/B2 In Progress",
      problemTitle: "Problem-Solving Mindset",
      problemDescription:
        "I don't just write code; I design systems. Whether it's reducing an administrative time-loss gap by 70% or architecting N-Tier backends, I focus on the 'Why' before the 'How'.",
    },
    timeline: {
      title: "My Journey",
      items: [
        {
          year: "2023 - 2025",
          title: "Full Stack Development Diploma",
          subtitle: "OFPPT - Solicode, Tangier",
          description:
            "Intensive training in Web and Mobile engineering, Agile methodologies, and enterprise-grade application architecture.",
        },
        {
          year: "2024",
          title: "Blog Solicode - Flagship Project",
          subtitle: "Lead Developer",
          description:
            "Engineered a centralized content platform transitioning from a robust Laravel N-Tier back-end to a RESTful API across a 7-sprint roadmap.",
        },
        {
          year: "2022 - 2023",
          title: "Baccalaureate in Physics Sciences",
          subtitle: "Ministry of National Education",
          description:
            "Graduated with honors. Developed a strong foundation in analytical problem solving and scientific methodologies.",
        },
      ],
    },
    vault: {
      title: "Document Vault",
      items: [
        {
          title: "Full Stack Diploma",
          type: "Education",
          file: "/certificates/Certificate_Solicode_Tangier_Recated.pdf",
          description: "Official OFPPT Solicode Degree",
        },
        {
          title: "Curriculum Vitae",
          type: "Resume",
          file: "/cv/Abdelhay_Mallouli_CV.pdf",
          description: "Detailed professional history",
        },
      ],
    },
  },
  de: {
    hero: {
      greeting: "Hallo {company} Team, ich bin Abdelhay.",
      pitch:
        "Ich bin ein engagierter Full-Stack-Entwickler mit Spezialisierung auf React, Next.js und moderne Backend-Architekturen. Ich suche aktiv nach einer Ausbildung als Fachinformatiker in Deutschland, um meine praktische Erfahrung mit dem erstklassigen deutschen dualen System zu verbinden.",
      cvButton: "Lebenslauf herunterladen",
      videoAction: "Intro-Video ansehen",
    },
    bento: {
      techTitle: "Technologie-Stack",
      techDescription: "Praxiserprobte Expertise in modernen Web-Technologien.",
      languageTitle: "Deutschkenntnisse",
      languageDescription:
        "Ich lerne aktiv für das B2-Zertifikat, um eine reibungslose Integration in ein deutsches Arbeitsumfeld zu gewährleisten.",
      languageLevel: "B1/B2 in Arbeit",
      problemTitle: "Lösungsorientiertes Denken",
      problemDescription:
        "Ich schreibe nicht nur Code, ich entwerfe Systeme. Ob es darum geht, administrative Zeitverluste um 70 % zu reduzieren oder N-Tier-Backends zu entwerfen, ich konzentriere mich auf das 'Warum', bevor ich mich dem 'Wie' widme.",
    },
    timeline: {
      title: "Mein Werdegang",
      items: [
        {
          year: "2023 - 2025",
          title: "Diplom in Full-Stack-Entwicklung",
          subtitle: "OFPPT - Solicode, Tanger",
          description:
            "Intensive Ausbildung in Web- und Mobile-Engineering, agilen Methoden und erstklassiger Anwendungsarchitektur.",
        },
        {
          year: "2024",
          title: "Blog Solicode - Vorzeigeprojekt",
          subtitle: "Lead Developer",
          description:
            "Entwicklung einer zentralisierten Content-Plattform. Umstellung eines robusten Laravel-N-Tier-Backends auf eine RESTful-API in einem 7-Sprints-Plan.",
        },
        {
          year: "2022 - 2023",
          title: "Abitur (Physikalische Wissenschaften)",
          subtitle: "Bildungsministerium",
          description:
            "Abschluss mit Auszeichnung. Entwicklung einer starken Grundlage in analytischer Problemlösung.",
        },
      ],
    },
    vault: {
      title: "Dokumente & Zertifikate",
      items: [
        {
          title: "Full-Stack Diplom",
          type: "Ausbildung",
          file: "/certificates/Certificate_Solicode_Tangier_Recated.pdf",
          description: "Offizieller OFPPT Solicode Abschluss",
        },
        {
          title: "Lebenslauf",
          type: "Bewerbung",
          file: "/cv/Abdelhay_Mallouli_CV.pdf",
          description: "Detaillierter Werdegang",
        },
      ],
    },
  },
};
