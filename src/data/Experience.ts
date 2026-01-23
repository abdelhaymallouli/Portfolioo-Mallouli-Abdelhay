// data/experiences.ts

export const EXPERIENCES = [
{
    company: "Solicode Tangier",
    role: "Mobile & Full-Stack Development Program",
    type: "school",
    period: "2025 - 2026",
    location: "Tangier, Morocco",
    description: "Advanced specialization in Native Android development and enterprise-grade web architectures with a focus on DevOps, automated testing, and network infrastructure.",
    details: [
      "Developed native Android applications using Kotlin and Jetpack Compose, implementing reactive UI states and ViewModel-driven architecture (MVVM).",
      "Architected complex back-end systems with Laravel, utilizing Eloquent ORM for advanced data relationships, custom Middlewares, and secure RESTful APIs.",
      "Integrated networking capabilities in mobile apps using Retrofit and Coroutines for asynchronous API consumption and optimistic UI updates.",
      "Implemented a comprehensive testing strategy including Unit and Integration tests using AAA patterns and Mocking frameworks.",
      "Mastered professional collaboration workflows including GitFlow, Code Reviews, and structured Pull Request cycles within a Scrum framework.",
      "Gained infrastructure expertise in LAN addressing (IPv4/DNS/DHCP) and web server administration (Apache, VirtualHosts, and SSL/TLS configuration)."
    ],
    tech: ["Kotlin", "Jetpack Compose", "Android Studio", "Laravel", "Eloquent", "Retrofit", "GitFlow", "Linux/Apache", "tailwind(Preline)","Alpine.js"]
  },
{
    company: "German Tech Partner",
    role: "Software Engineer Intern",
    type: "work",
    period: "2025 (1 Month)",
    location: "Germany / Remote",
    description: "Architected and deployed a suite of production-ready Mattermost plugins and Go-based microservices to automate enterprise workflows and HR compliance.",
    details: [
      "Engineered 'Moco-bot', an automated time-tracking compliance system integrating Personio and MOCO APIs to detect hours deficits and send smart reminders.",
      "Developed a real-time Outlook Calendar Sync plugin using Microsoft Graph API (OAuth2) to automatically update Mattermost user statuses based on live events.",
      "Architected a GDPR-compliant 'Birthday Bot' featuring an interactive HR consent management system and secure KV-store for private wish collection.",
      "Built 'MentorPulse', a mentoring feedback loop tool that automates bi-weekly pulse surveys and generates high-priority alerts for People & Culture teams.",
      "Developed 'AbwesenheitsBot', a cross-platform synchronization tool that manages 'Out of Office' states by monitoring Personio and Outlook absence data.",
      "Containerized all bot services using Docker and established local development environments with hot-reloading for rapid plugin iteration."
    ],
    tech: ["Golang", "Mattermost Plugin API", "Microsoft Graph API", "REST APIs", "OAuth2", "Docker", "PostgreSQL", "Personio & MOCO SDKs"]
  },
{
    company: "Solicode Tangier",
    role: "Full-Stack Web Development Program",
    type: "school",
    period: "2024 - 2025",
    location: "Tangier, Morocco",
    description: "Comprehensive training following the 'Active Pedagogy' model, covering the full development lifecycle from UI/UX design to advanced back-end systems.",
    details: [
      "Designed user-centric interfaces and wireframes using Figma, applying UX/UI principles and Design Thinking.",
      "Developed dynamic back-end systems using Native PHP with Object-Oriented Programming (OOP) and PDO for secure database interactions.",
      "Architected relational databases by creating MCD/MLD models and executing complex SQL queries and CRUD operations.",
      "Built interactive front-end applications using Modern JavaScript (ES6+), React.js (Hooks, Router), and responsive CSS (Flexbox, Grid, Tailwind).",
      "Managed project versioning and team collaboration using Git/GitHub, including branching, merging, and conflict resolution.",
      "Implemented Agile/Scrum methodologies to manage project cycles, from initial wireframing to final deployment."
    ],
    tech: ["PHP (OOP)", "React", "JavaScript (ES6)", "html", "css",  "MySQL", "Tailwind CSS", "Git/GitHub", "Figma", "WordPress"]
  }
];