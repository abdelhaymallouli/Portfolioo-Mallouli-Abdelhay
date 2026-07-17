# Mallouli Portfolio - Full Project Documentation

## 🚀 Overview

This project is a high-end, elite developer portfolio and "Command Center" built for **Abdelhay Mallouli**. It serves as a technical showcase for German IT recruitment, specifically targeting an "Ausbildung zum Fachinformatiker".

The design follows a **"Midnight Pro"** aesthetic: dark navy backgrounds, electric blue accents, glassmorphism, and high-fidelity animations.

---

## 🏗️ Technical Architecture

The project follows a modern **S-D-C (Static-Data-Component)** architecture, ensuring that the UI remains decoupled from the content.

```mermaid
graph TD
    %% Define Styles
    classDef main fill:#1e1e2f,stroke:#3b82f6,stroke-width:2px,color:#fff
    classDef data fill:#0f172a,stroke:#10b981,stroke-width:2px,color:#fff
    classDef route fill:#1e1e2f,stroke:#8b5cf6,stroke-width:2px,color:#fff
    classDef asset fill:#334155,stroke:#94a3b8,stroke-width:1px,color:#fff

    %% Application Core
    App["Next.js 16 App Router"]:::main

    %% Routes
    subgraph Routes
        R1["/ (Hero, Skills, Projects)"]:::route
        R2["/bewerbung (Executive Briefing)"]:::route
    end

    %% Data Layer
    subgraph "Data Layer (`src/data/`)"
        D1["portfolio.ts (ME, SKILLS)"]:::data
        D2["projects.ts (Project Metadata)"]:::data
        D3["Experience.ts (Professional History)"]:::data
        D4["bewerbung.ts (Certs & Motivation)"]:::data
    end

    %% Component Layer
    subgraph "Component Ecosystem (`src/components/`)"
        C1["3D Canvas (Three.js/R3F)"]
        C2["UI-Kit (Buttons, Cards)"]
        C3["Section Components"]
    end

    %% Assets
    subgraph Assets
        AS1["public/imgs/profile.png"]:::asset
        AS2["public/cv/*.pdf"]:::asset
    end

    %% Flow
    App --> Routes
    D1 & D2 & D3 & D4 -.-> C3
    C3 --> Routes
    C1 --> R1
    AS1 & AS2 --> R2
```

---

## 🛠️ Tech Stack & Patterns

### Core Technologies

| Category         | Technology                         |
| :--------------- | :--------------------------------- |
| **Framework**    | Next.js 16 (React 19)              |
| **Styling**      | Tailwind CSS 4 (Glassmorphism 2.0) |
| **Animations**   | Framer Motion 12 (Scroll-linked)   |
| **3D Rendering** | React Three Fiber / Three.js       |
| **Icons**        | Lucide React                       |
| **Type Safety**  | TypeScript (Strict Mode)           |

### Modern Patterns

- **React 19 Server Components:** Default for all routes to minimize client-side JS.
- **Next.js 16 App Router:** Utilizing specialized layouts and loading states.
- **Glassmorphism 2.0:** Deeply nested backdrop filters combined with CSS variables for dynamic themes.
- **Performance:** Using `React.memo` and `useMemo` for heavy 3D calculations.

---

## ✨ Core Features

### 1. The "Midnight Pro" UI

- **Dynamic Glow:** Subtle cursor-following or scroll-linked glow effects on containers.
- **Micro-interactions:** Interactive hover states using Framer Motion's `whileHover`.
- **Global 3D Canvas:** A performant 3D environment rendered as a background layer.

### 2. Digital Bewerbungsmappe (`/bewerbung`)

This is the "Executive Briefing" mode of the portfolio:

- **Bento Grid Layout:** Modular information display for certificates, skills, and languages.
- **Dual-Language Logic:** Content is toggled between German (DE) and English (EN) using local state, with German as the primary target for recruiters.
- **Technical Briefing Video:** A specialized UI component for video introductions with a terminal-like aesthetic.
- **ROI-Driven Content:** Focuses on business value, highlighting specific achievements and time savings.

### 3. Engineering Culture

- **Clean Code:** Separation of concerns between UI (`components/`) and Content (`data/`).
- **DevOps Emphasis:** Highlighting Docker, Linux, and CI/CD skills.
- **Professional Presence:** Integrated CV download and LinkedIn connection.

---

## 📂 Directory Structure

```text
/
├── public/                 # Static assets (images, pdfs, videos)
├── src/
│   ├── app/                # Next.js App Router (Routes & Layouts)
│   │   ├── bewerbung/      # Dedicated recruiter landing page
│   │   └── globals.css     # Global styles & design system tokens
│   ├── components/         # Reusable UI components
│   │   ├── 3d/             # Three.js / R3F scenes
│   │   ├── ui/             # Reusable UI elements (Buttons, Inputs)
│   │   └── ui-kit/         # Complex UI molecules (BriefingVideo, etc.)
│   ├── data/               # The "Source of Truth" (JSON-like TS files)
│   ├── lib/                # Shared utilities (Tailwind Merge, Helpers)
│   └── types/              # Global TS interfaces & definitions
```

---

## 📈 Performance & SEO

- **Lighthouse Focus:** Optimized for 100/100 scores in Performance and Accessibility.
- **Semantic HTML:** Using `<section>`, `<article>`, and proper ARIA labels.
- **Zero CLS:** Pre-defined aspect ratios for all images and 3D containers.
