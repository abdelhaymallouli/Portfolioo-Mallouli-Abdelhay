export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  link: string;
  github: string;
  image: string;
  featured: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}