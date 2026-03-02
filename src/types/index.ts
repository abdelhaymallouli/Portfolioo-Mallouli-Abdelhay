export interface Project {
  id: number;
  title: string;
  description: string;
  methodologies: string[];
  tech: string[];
  link: string;
  github: string;
  image: string;
  status?: string;
  technicalChallenges?: string[];
  solutions?: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

// Fix #16 — Experience type was missing, everything was typed as `any`
export interface Certificate {
  name: string;
  url: string;
}

export interface Experience {
  company: string;
  role: string;
  type: "work" | "school";
  period: string;
  location: string;
  description: string;
  certificate?: Certificate;
  details: string[];
  tech: string[];
}

export interface StandaloneCert {
  title: string;
  issuer: string;
  date: string;
  url: string;
  tech: string;
}
