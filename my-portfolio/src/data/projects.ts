import { Project } from "@/types";
import { Layout, Database, Terminal, Code2 } from "lucide-react";

export const projects: Project[] = [
  {
    id: 1,
    title: "OmniOrder System",
    description: "A comprehensive restaurant management architecture featuring real-time order processing and kitchen-to-table synchronization.",
    tech: ["PHP", "Laravel", "MySQL", "Tailwind"],
    link: "https://github.com/abdelhaymallouli/restaurant-ordering-system",
    github: "https://github.com/abdelhaymallouli/restaurant-ordering-system",
    image: "/projects/omniorder.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "WeatherWise Engine",
    description: "Data-driven weather analysis platform that leverages Python for processing meteorological APIs with a focus on UI/UX clarity.",
    tech: ["Python", "Flask", "REST APIs", "Charts.js"],
    link: "https://github.com/abdelhaymallouli/WeatherWise",
    github: "https://github.com/abdelhaymallouli/WeatherWise",
    image: "/projects/weatherwise.jpg",
    featured: true,
  },
  {
    id: 3,
    title: "CartFlow Core",
    description: "A high-performance state management implementation for e-commerce, focused on optimizing render cycles and user interaction latency.",
    tech: ["JavaScript", "React", "LocalStorage API", "Tailwind"],
    github: "https://github.com/abdelhaymallouli/cart-shopping",
    link: "https://github.com/abdelhaymallouli/cart-shopping",
    image: "/projects/cartflow.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "Tangier Gourmet Interface",
    description: "A localized digital experience designed for high-end hospitality, focusing on accessibility and immersive visual storytelling.",
    tech: ["HTML5", "CSS3", "JavaScript", "Animation Engine"],
    github: "https://github.com/abdelhaymallouli/Restaurant-of-Tangier",
    link: "https://github.com/abdelhaymallouli/Restaurant-of-Tangier",
    image: "/projects/tangier.jpg",
    featured: false,
  }
];
