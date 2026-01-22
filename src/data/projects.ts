import { Project } from "@/types";

export const projects: Project[] = [
  // --- FEATURED (Top Tier) ---
  {
    id: 1,
    title: "Venuvibe Event Planning Platform",
    description: "Venuvibe: Streamline your events with seamless venue booking, vendor management, and admin controls. Modern React frontend + robust PHP/MySQL backend.",
    tech: ["React", "TypeScript", "PHP", "MySQL", "Tailwind CSS", "Vite"],
    link: "https://venuvibe-deploy.vercel.app/",
    github: "https://github.com/abdelhaymallouli/Venuvibe-Event-Planning-Platform",
    image: "https://raw.githubusercontent.com/abdelhaymallouli/Venuvibe-Event-Planning-Platform/main/screenshots/home.png", // real screenshot (home page)
    featured: true,
  },
  {
    id: 2,
    title: "Restaurant Ordering System",
    description: "Full-featured online food ordering platform with menu browsing, shopping cart, secure checkout, user auth, and powerful admin panel for orders & management.",
    tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    link: "",
    github: "https://github.com/abdelhaymallouli/restaurant-ordering-system",
    image: "", 
    featured: true,
  },
  {
    id: 3,
    title: "Cultural Event Manager",
    description: "PHP web app for event discovery, filtering, ticket booking, user registration/login, profile management, and secure real-time reservations for association events.",
    tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    link: "",
    github: "https://github.com/abdelhaymallouli/Event-management-of-a-cultural-association",
    image: "https://raw.githubusercontent.com/abdelhaymallouli/Event-management-of-a-cultural-association/refs/heads/main/screenshots/homePage.png", // repo has /screenshots folder → replace with real raw link later
    featured: true,
  },
  {
    id: 4,
    title: "WeatherWise",
    description: "Desktop weather application fetching real-time data from OpenWeatherMap API. Displays temperature, humidity, wind, pressure with clean Tkinter GUI.",
    tech: ["Python", "Tkinter", "Requests", "OpenWeatherMap API", "Pytz", "Geopy"],
    link: "",
    github: "https://github.com/abdelhaymallouli/WeatherWise",
    image: "https://raw.githubusercontent.com/abdelhaymallouli/WeatherWise/main/screenshots/logo.png", // repo has /screenshots & /images folders → add real one (e.g. main-window.png)
    featured: false,
  },
  {
    id: 5,
    title: "Restaurant of Tangier",
    description: "Dynamic web app presenting restaurants in Tangier: detailed pages, admin data management, search/navigation, responsive & visually rich design.",
    tech: ["HTML", "CSS", "JavaScript", "PHP (admin)"],
    link: "https://restaurant-of-tangier.vercel.app/",
    github: "https://github.com/abdelhaymallouli/Restaurant-of-Tangier",
    image: "https://raw.githubusercontent.com/abdelhaymallouli/Restaurant-of-Tangier/main/screenshots/homepage.png",
    featured: false,
  },
  {
    id: 6,
    title: "Cart Shopping (Dessert Shop)",
    description: "Interactive dessert shop front-end: browse items, view details/prices, add to cart with real-time updates — all in vanilla JS + LocalStorage.",
    tech: ["JavaScript", "HTML", "CSS", "LocalStorage", "DOM Manipulation"],
    link: "https://cart-shopping-pi.vercel.app/",
    github: "https://github.com/abdelhaymallouli/cart-shopping",
    image: "",
    featured: false,
  },
  {
    id: 7,
    title: "AttendanceFlow AMS (Current Project)",
    description: "Modern student attendance management system solving school admin pain points: digital tracking, justifications, reports — built with user-centered design.",
    tech: ["HTML", "CSS", "JavaScript", "PHP (likely backend)"],
    link: "",
    github: "https://github.com/abdelhaymallouli/AttendanceFlow-AMS",
    image: "",
    featured: false,
  },


  // You can add more like WordHaven-Bookstore, Goals-Tracker, etc.
];