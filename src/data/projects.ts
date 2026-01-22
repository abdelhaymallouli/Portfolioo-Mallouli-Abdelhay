import { Project } from "@/types";

export const projects: Project[] = [
  // --- FEATURED (Top Tier) ---
  {
    id: 1,
    title: "Venuvibe Event Planning Platform",
    description: "Venuvibe: Streamline your events with seamless venue booking, vendor management, and admin controls. Powered by React & PHP.",
    tech: ["React", "PHP", "MySQL", "Tailwind"],
    link: "https://github.com/abdelhaymallouli/venuvibe",
    github: "https://github.com/abdelhaymallouli/venuvibe",
    image: "https://raw.githubusercontent.com/abdelhaymallouli/Venuvibe-Event-Planning-Platform/main/screenshots/home.png",
    featured: true,
  },
  {
    id: 2,
    title: "Moco-Bot",
    description: "Enterprise-grade Mattermost bot engineered with Golang to automate internal workflow controls and bridge communication channels via Webhooks.",
    tech: ["Golang", "Mattermost API", "Docker", "Webhooks"],
    link: "https://github.com/abdelhaymallouli/moco-bot",
    github: "https://github.com/abdelhaymallouli/moco-bot",
    image: "/projects/moco-bot.jpg",
    featured: true,
  },
  {
    id: 3,
    title: "EcoTrack Mobile (Prototype)",
    description: "Native Android application for tracking daily carbon footprint. Built during mobile formation to master Kotlin data binding and MVVM architecture.",
    tech: ["Kotlin", "Android SDK", "Room DB", "Material 3"],
    github: "https://github.com/abdelhaymallouli", // Update specific link
    link: "https://github.com/abdelhaymallouli",
    image: "/projects/mobile-app.jpg", // 📸 Screenshot Android Studio
    featured: true,
  },
  
  // --- WEB APPS ---
  {
    id: 4,
    title: "WeatherWise Analytics",
    description: "Python-based meteorological engine interfacing with OpenWeatherMap APIs to visualize climatic data with high precision.",
    tech: ["Python", "Flask", "REST APIs", "Tkinter"],
    link: "https://github.com/abdelhaymallouli/WeatherWise",
    github: "https://github.com/abdelhaymallouli/WeatherWise",
    image: "/projects/weatherwise.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "Cultural Event Manager",
    description: "Complex relational database system for managing association events, conflicts, and resource allocation.",
    tech: ["PHP Native", "Advanced SQL", "UML", "Figma"],
    link: "https://github.com/abdelhaymallouli/Event-management-of-a-cultural-association",
    github: "https://github.com/abdelhaymallouli/Event-management-of-a-cultural-association",
    image: "/projects/event-manager.jpg",
    featured: false,
  },
  {
    id: 6,
    title: "TaskFlow API (Go)",
    description: "A high-performance REST API for task management built with Go. Focuses on concurrency and low-latency JSON processing.",
    tech: ["Go (Golang)", "Gin Gonic", "Postman", "API Design"],
    github: "https://github.com/abdelhaymallouli",
    link: "https://github.com/abdelhaymallouli",
    image: "/projects/go-api.jpg",
    featured: false,
  },

  // --- FRONTEND & EXPERIMENTS ---
  {
    id: 7,
    title: "CartFlow State Engine",
    description: "Vanilla JavaScript shopping cart implementing complex state management and LocalStorage persistence without frameworks.",
    tech: ["JavaScript", "DOM", "LocalStorage", "CSS Grid"],
    link: "https://github.com/abdelhaymallouli/cart-shopping",
    github: "https://github.com/abdelhaymallouli/cart-shopping",
    image: "/projects/cartflow.jpg",
    featured: false,
  },
  {
    id: 8,
    title: "Tangier Gourmet UI",
    description: "Pixel-perfect hospitality interface focusing on accessibility, semantic HTML5, and immersive visual storytelling.",
    tech: ["HTML5", "CSS3", "Responsive", "SEO"],
    link: "https://github.com/abdelhaymallouli/Restaurant-of-Tangier",
    github: "https://github.com/abdelhaymallouli/Restaurant-of-Tangier",
    image: "/projects/tangier.jpg",
    featured: false,
  },
  {
    id: 9,
    title: "Live Search Ajax",
    description: "Real-time search implementation using PHP and Ajax to filter large datasets instantly without page reloads.",
    tech: ["PHP", "Ajax", "jQuery", "MySQL"],
    github: "https://github.com/abdelhaymallouli",
    link: "https://github.com/abdelhaymallouli",
    image: "/projects/ajax-search.jpg",
    featured: false,
  },
  {
    id: 10,
    title: "React Dashboard",
    description: "Modern admin dashboard template using React 19 and Tailwind CSS, featuring dark mode and data tables.",
    tech: ["React", "TypeScript", "Tailwind", "Charts"],
    github: "https://github.com/abdelhaymallouli",
    link: "https://github.com/abdelhaymallouli",
    image: "/projects/dashboard.jpg",
    featured: false,
  }
];