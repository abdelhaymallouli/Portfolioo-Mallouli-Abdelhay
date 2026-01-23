import { Project } from "@/types";

export const projects: Project[] = [
  // 1. THE FLAGSHIP: This proves you can work in a professional engineering team.
  {
    id: 9,
    title: "Blog Solicode",
    description: "A centralized content platform solving institutional communication gaps. Engineered with a 7-sprint roadmap, transitioning from a robust Laravel N-Tier back-end to a RESTful API. Developed using Design Thinking to ensure user-centric discovery.",
    tech: ["Laravel 12", "PHP (OOP)", "MySQL", "Tailwind CSS", "Preline UI"],
    methodologies: [
      "Scrum (7-Sprint Roadmap)",
      "N-Tier Architecture",
      "GitFlow & PR Peer Review",
      "UML Modeling (Use Case/Class Diagrams)"
    ],
    link: "https://cobinatori.com/",
    github: "", 
    image: "/screenshots/BlogSolicode.png",
    status: "Production - Sprint 1 Complete"
  },

  // 2. THE BUSINESS CASE: This proves you understand ROI (Return on Investment).
  {
    id: 1,
    title: "AttendanceFlow AMS",
    description: "An empathetic EdTech solution reducing 'Paper-to-Laptop' friction. This system automates administrative workflows, solving a 70% time-loss gap identified during the Empathy Phase of research.",
    tech: ["Laravel", "Tailwind CSS", "MySQL", "Vite", "Preline"],
    methodologies: [
      "Design Thinking (Empathy/Define)",
      "User Persona Mapping",
      "User-Centered Design (UCD)",
      "Agile/Scrum"
    ],
    link: "",
    github: "https://github.com/abdelhaymallouli/AttendanceFlow-AMS",
    image: "/screenshots/AttendanceFlow.png",
    status: "In Development - Sprint 1"
  },

  // 3. THE MODERN FULL-STACK: This checks the React/TypeScript box.
  {
    id: 2,
    title: "Venuvibe Event Platform",
    description: "A professional full-stack marketplace bridging venue owners and event planners. Features automated booking workflows and a robust administrative control panel for vendor management.",
    tech: ["React", "TypeScript", "PHP", "MySQL", "Vite"],
    methodologies: ["Agile Development", "Component-Based Architecture", "State Management"],
    link: "https://venuvibe-deploy.vercel.app/",
    github: "https://github.com/abdelhaymallouli/Venuvibe-Event-Planning-Platform",
    image: "/screenshots/Venuvibe.png",
  },

 
  {
    id: 3,
    title: "Personal Finance Manager",
    description: "A data-driven budget tracking application featuring a dynamic dashboard for real-time financial insights. Visualizes transaction data to help users manage capital effectively.",
    tech: ["PHP", "MySQL", "JavaScript", "Chart.js", "CSS3"],
    methodologies: ["MVC Architecture", "Data Visualization", "Secure CRUD Operations"],
    link: "",
    github: "https://github.com/abdelhaymallouli/personal-finance-manager-php",
    image: "/screenshots/PersonalFinance.png"
  },

  
  {
    id: 4,
    title: "Farha Cultural Event Platform",
    description: "A secure ticketing solution architected for high data integrity. Implements advanced filtering and a secure end-to-end booking flow using modern security standards.",
    tech: ["PHP 8 (OOP)", "MySQL", "JavaScript (ES6+)", "PDO Security"],
    methodologies: ["Relational Database Design", "Secure Authentication (Bcrypt)", "Page Controller Pattern"],
    link: "",
    github: "https://github.com/abdelhaymallouli/Event-management-of-a-cultural-association",
    image: "/screenshots/FarhaCultural.png"
  },

  // 6. THE PROCESS BUILDER: Shows complex business logic (Ordering/Kitchen/Admin).
  {
    id: 5,
    title: "Restaurant Ordering System",
    description: "An E-commerce solution optimizing food delivery workflows. Connects customer interfaces with data-driven admin dashboards for real-time order tracking.",
    tech: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3"],
    methodologies: ["Session Management", "Real-time Status Tracking", "Responsive UI"],
    link: "",
    github: "https://github.com/abdelhaymallouli/restaurant-ordering-system",
    image: "/screenshots/RestaurantOrdering.png",
  },

  // 7. THE UX SPECIALIST: Shows attention to detail and customer experience.
  {
    id: 10,
    title: "World Haven Book Store",
    description: "An online bookstore interface focused on user experience. Features dynamic book discovery, category-based filtering, and a persistence-based wishlist.",
    tech: ["HTML5", "CSS3", "JavaScript", "LocalStorage"],
    methodologies: ["Local Persistence", "Dynamic DOM Manipulation", "UX/UI Optimization"],
    link: "https://word-haven-bookstore.vercel.app/",
    github: "https://github.com/abdelhaymallouli/World-Haven-Book-Store",
    image: "/screenshots/wordhaven.png",
  },

  // 8. THE INTEGRATOR: Demonstrates API skills and Python knowledge.
  {
    id: 7,
    title: "WeatherWise",
    description: "A technical demonstration of API orchestration. Converts raw meteorological data into actionable user insights via a clean, desktop-optimized interface.",
    tech: ["Python", "Tkinter", "Requests API", "Geopy"],
    methodologies: ["API Integration", "Error Handling", "Object-Oriented Programming (OOP)"],
    link: "",
    github: "https://github.com/abdelhaymallouli/WeatherWise",
    image: "/screenshots/WeatherWise.png",
  },

  // 9. THE SEO/MARKETING AWARE: Shows you understand the web beyond just code.
  {
    id: 6,
    title: "Restaurant of Tangier",
    description: "A local-SEO directory application designed with a mobile-first approach. Focuses on dynamic data rendering and accessible design for local business growth.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    methodologies: ["Responsive Web Design (RWD)", "Local SEO Optimization", "Mobile-First Design"],
    link: "https://restaurant-of-tangier.vercel.app/",
    github: "https://github.com/abdelhaymallouli/Restaurant-of-Tangier",
    image: "/screenshots/RestaurantOfTangier.png",
  },

  // 10. THE FOUNDATION: Proves you know vanilla JavaScript deeply.
  {
    id: 8,
    title: "Cart Shopping (Dessert Shop)",
    description: "A high-performance frontend case study. Implements efficient state management using Vanilla JavaScript for zero-latency interactions.",
    tech: ["JavaScript", "DOM Manipulation", "CSS3", "HTML5"],
    methodologies: ["State Management", "Event-Driven Programming", "Vanilla JS Architecture"],
    link: "https://cart-shopping-pi.vercel.app/",
    github: "https://github.com/abdelhaymallouli/cart-shopping",
    image: "/screenshots/CartShopping.png"
  }
];