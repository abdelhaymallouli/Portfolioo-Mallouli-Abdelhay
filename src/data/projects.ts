import { Project } from "@/types";

export const projects: Project[] = [
  // 1. LEAD WITH IMPACT: Solving institutional problems with modern methodologies
  {
    id: 7,
    title: "AttendanceFlow AMS",
    description: "A digital transformation project for educational institutions. It eliminates manual paperwork by automating student attendance tracking, justification management, and administrative reporting using a user-centered design approach.",
    tech: ["PHP", "JavaScript", "MySQL", "Tailwind CSS"],
    methodologies: ["Scrum", "Design Thinking (Double Diamond)", "Agile", "User-Centered Design"],
    link: "",
    github: "https://github.com/abdelhaymallouli/AttendanceFlow-AMS",
    image: "", 
  },
  // 2. MODERN STACK: Demonstrating React, TypeScript, and Marketplace logic
  {
    id: 1,
    title: "Venuvibe Event Platform",
    description: "A professional full-stack marketplace bridging venue owners and event planners. Features automated booking workflows and a robust administrative control panel for vendor management.",
    tech: ["React", "TypeScript", "PHP", "MySQL", "Vite"],
    methodologies: ["Agile Development", "Component-Based Architecture", "State Management"],
    link: "https://venuvibe-deploy.vercel.app/",
    github: "https://github.com/abdelhaymallouli/Venuvibe-Event-Planning-Platform",
    image: "https://raw.githubusercontent.com/abdelhaymallouli/Venuvibe-Event-Planning-Platform/main/screenshots/home.png",
  },
  // 3. ANALYTICAL SKILLS: Data visualization and financial logic are high-value to HR
  {
    id: 8,
    title: "Personal Finance Manager",
    description: "A data-driven budget tracking application. Features a dynamic dashboard for real-time financial insights and visualized transaction data to help users manage capital effectively.",
    tech: ["PHP", "MySQL", "JavaScript", "Chart.js", "CSS3"],
    methodologies: ["MVC Architecture", "Data Visualization", "Secure CRUD Operations"],
    link: "", 
    github: "https://github.com/abdelhaymallouli/personal-finance-manager-php",
    image: "https://raw.githubusercontent.com/abdelhaymallouli/personal-finance-app-php/main/screenshots/landing.png"
  },
  // 4. BACKEND MATURITY: Shows security awareness and clean PHP 8 OOP
  {
    id: 3,
    title: "Farha Cultural Event Platform",
    description: "A secure ticketing solution architected for high data integrity. Implements advanced filtering and a secure end-to-end booking flow for community organizations.",
    tech: ["PHP 8 (OOP)", "MySQL", "JavaScript (ES6+)", "PDO Security"],
    methodologies: ["Relational Database Design", "Secure Authentication (Bcrypt)", "Page Controller Pattern"],
    link: "",
    github: "https://github.com/abdelhaymallouli/Event-management-of-a-cultural-association",
    image: "https://raw.githubusercontent.com/abdelhaymallouli/Event-management-of-a-cultural-association/refs/heads/main/screenshots/homePage.png"
  },
  // 5. OPERATIONAL LOGIC: Demonstrating workflow and kitchen-to-customer operations
  {
    id: 2,
    title: "Restaurant Ordering System",
    description: "A comprehensive digital ordering solution optimizing food delivery workflows. Connects customer interfaces with data-driven admin dashboards for real-time order tracking.",
    tech: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3"],
    methodologies: ["Session Management", "Real-time Status Tracking", "Responsive UI"],
    link: "",
    github: "https://github.com/abdelhaymallouli/restaurant-ordering-system",
    image: "https://raw.githubusercontent.com/abdelhaymallouli/restaurant-ordering-system/main/screenshots/screenshot.png",
  },
  // 6. SPECIALIZED: SEO and Local Business Focus
  {
    id: 5,
    title: "Restaurant of Tangier",
    description: "A local-SEO directory application designed with a mobile-first approach. Focuses on dynamic data rendering and accessible design for local business growth.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    methodologies: ["Responsive Web Design (RWD)", "Local SEO Optimization", "Mobile-First Design"],
    link: "https://restaurant-of-tangier.vercel.app/",
    github: "https://github.com/abdelhaymallouli/Restaurant-of-Tangier",
    image: "https://raw.githubusercontent.com/abdelhaymallouli/Restaurant-of-Tangier/main/screenshots/homepage.png",
  },
  // 7. API & INTEGRATION: Showing Python and Third-party Data skills
  {
    id: 4,
    title: "WeatherWise",
    description: "A technical demonstration of API orchestration. Converts raw meteorological data into actionable user insights via a clean, desktop-optimized interface.",
    tech: ["Python", "Tkinter", "Requests API", "Geopy"],
    methodologies: ["API Integration", "Error Handling", "Object-Oriented Programming (OOP)"],
    link: "",
    github: "https://github.com/abdelhaymallouli/WeatherWise",
    image: "https://raw.githubusercontent.com/abdelhaymallouli/WeatherWise/main/screenshots/logo.png",
  },
  // 8. FUNDAMENTALS: Pure JavaScript logic and state management
  {
    id: 6,
    title: "Cart Shopping (Dessert Shop)",
    description: "A high-performance frontend case study. Implements efficient state management and DOM manipulation using Vanilla JavaScript for zero-latency interactions.",
    tech: ["JavaScript", "DOM Manipulation", "CSS3", "HTML5"],
    methodologies: ["State Management", "Event-Driven Programming", "Vanilla JS Architecture"],
    link: "https://cart-shopping-pi.vercel.app/",
    github: "https://github.com/abdelhaymallouli/cart-shopping",
    image: "https://raw.githubusercontent.com/abdelhaymallouli/cart-shopping/main/assets/image.png" 
  }
];