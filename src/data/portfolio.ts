// Centralized portfolio/resume data for Anuj Karambalkar
// Update URLs/handles and percentages as needed.

export interface SkillEntry {
  label: string;
  level: number; // 0-100 proficiency (subjective)
  accent?: string;
  logos?: string[];
}

export interface ExperienceEntry {
  period: string;
  title: string;
  company: string;
  bullets: string[];
}

export interface ProjectEntry {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  date?: string; // month/year
}

export interface EducationEntry {
  period: string;
  degree: string;
  institution: string;
  bullets?: string[];
}

export interface AchievementEntry {
  title: string;
  org?: string;
  date?: string;
}

// LeetCode data is now fully dynamic via /api/leetcode and not stored statically here.

export interface PortfolioData {
  name: string;
  title: string;
  heroTagline: string;
  summary: string;
  resumeFile: string;
  social: {
    github?: string;
    linkedin?: string;
    email?: string;
    website?: string;
  };
  skills: SkillEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  education: EducationEntry[];
  achievements: AchievementEntry[];
}

export const portfolio: PortfolioData = {
  name: "Anuj Karambalkar",
  title: "Full Stack / AI-Driven Web Developer",
  heroTagline: "Shipping practical AI & full‑stack web products",
  summary:
    "Versatile web developer with hands‑on experience building full‑stack apps, SaaS tooling and AI‑driven platforms using React, Next.js, Node.js and modern databases. Comfortable wiring responsive UI/UX, authentication, scalable APIs and third‑party integrations. Driven by innovation, teamwork and solving real user problems.",
  resumeFile: "/Anuj_Resume_09-25.pdf", // Place your real PDF at public/Anuj_Resume_09-25.pdf
  social: {
    github: "#", // TODO: add GitHub profile URL
    linkedin: "#", // TODO: add LinkedIn profile URL
    email: "anujkarambalkar1504@gmail.com",
    website: "#",
  },
  skills: [
    {
      label: "React",
      level: 90,
      logos: ["/logos/react.svg"],
      accent: "#61dafb",
    },
    {
      label: "Next.js",
      level: 88,
      logos: ["/logos/nextjs.svg"],
      accent: "#60a5fa",
    },
    {
      label: "TypeScript",
      level: 88,
      logos: ["/logos/typescript.svg"],
      accent: "#3178c6",
    },
    {
      label: "JavaScript",
      level: 85,
      logos: ["/logos/javascript.svg"],
      accent: "#facc15",
    },
    {
      label: "Node.js",
      level: 80,
      logos: ["/logos/nodejs.svg"],
      accent: "#34d399",
    },
    {
      label: "Python",
      level: 72,
      logos: ["/logos/python.svg"],
      accent: "#22d3ee",
    },
    {
      label: "MongoDB",
      level: 72,
      logos: ["/logos/mongodb.svg"],
      accent: "#16a34a",
    },
    { label: "SQL", level: 70, logos: ["/logos/sql.svg"], accent: "#1d4ed8" },
    {
      label: "GenAI",
      level: 65,
      logos: ["/logos/genai.svg"],
      accent: "#a855f7",
    },
    { label: "Java", level: 68, logos: ["/logos/java.svg"], accent: "#ef4444" },
  ],
  experience: [
    {
      period: "Jun 2025 – Aug 2025",
      title: "Full Stack Developer Intern",
      company: "NTS Nihon Global",
      bullets: [
        "Contributed to production features across backend (Node.js, Express, MongoDB) and frontend (React, Tailwind).",
        "Designed & optimized APIs, authentication flows and database schemas for scalability & security.",
        "Implemented and deployed features for Kryft‑AI (AI website builder) and ChaloStay (vacation rental platform).",
        "Collaborated in an agile team to deliver responsive, production‑ready solutions under tight deadlines.",
      ],
    },
  ],
  projects: [
    {
      title: "Kryft‑AI: AI SaaS Website Builder",
      date: "Jul 2025",
      description:
        "AI platform (OpenAI + E2B) that generates production‑ready Next.js apps from natural language prompts with iterative editing.",
      tags: [
        "Next.js",
        "TypeScript",
        "OpenAI",
        "Prisma",
        "Neon DB",
        "Docker",
        "Inngest",
        "Clerk",
      ],
      link: "#",
    },
    {
      title: "ChaloStay: Vacation Rental Platform",
      date: "Jun 2025",
      description:
        "Airbnb‑style booking app with secure auth, dynamic pricing, image uploads and geospatial property discovery.",
      tags: [
        "Next.js",
        "Prisma",
        "MongoDB",
        "Tailwind",
        "NextAuth",
        "Cloudinary",
        "Leaflet",
      ],
      link: "#",
    },
  ],
  education: [
    {
      period: "2022 – 2026",
      degree: "B.Tech (Computer Science & Business Systems) • CGPA: 9.54",
      institution: "Bharati Vidyapeeth Deemed University (DET), Navi Mumbai",
      bullets: [
        "Active in placements coordination & student tech communities.",
      ],
    },
  ],
  achievements: [
    {
      title: "Introduction to Model Context Protocol",
      org: "Anthropic Academy",
      date: "Aug 2025",
    },
    {
      title: "Dev with AI Hackathon – Finalist",
      org: "BVDUET",
      date: "Apr 2025",
    },
    {
      title: "Prompt‑to‑Project Challenge – Runner‑up",
      org: "BVDUET",
      date: "Feb 2025",
    },
    {
      title: "Google Cloud Computing Foundations & Generative AI",
      org: "GDSC‑BVP‑DET",
      date: "Mar 2024",
    },
  ],
};
