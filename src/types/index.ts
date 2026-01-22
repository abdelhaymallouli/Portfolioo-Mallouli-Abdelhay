export interface Project {
  id: number;
  title: string;
  description: string;
  methodologies: string[];
  tech: string[];
  link: string;
  github: string;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
}