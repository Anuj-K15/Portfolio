"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Navbar } from "./components/navbar";
// Dynamically import heavy visuals
const HoloAvatar = dynamic(
  () => import("./components/particles-3d").then((m) => m.HoloAvatar),
  { ssr: false }
);
const SkillOrb = dynamic(
  () => import("./components/particles-3d").then((m) => m.SkillOrb),
  { ssr: false }
);
import { SectionHeader } from "./components/section-header";
import { ProjectCard } from "./components/project-card";
const ExperienceTimeline = dynamic(
  () => import("./components/experience-timeline").then((m) => m.ExperienceTimeline),
  { ssr: false }
);
import { ContactForm } from "./components/contact-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { LazySection } from "@/components/utils/lazy-section";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  Sparkles,
  Cpu,
  Terminal,
  Trophy,
  Flame,
} from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { LeetCodeSectionLazy } from "./components/leetcode-section-lazy";

export default function Home() {
  return (
    <div id="home" className="relative min-h-screen bg-[#05060a] text-white">
      {/* Neon gradient backdrops */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute inset-x-0 top-1/3 h-56 bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-purple-600/10 blur-2xl" />
        {/* soft vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.08),transparent_60%)]" />
      </div>

      <Navbar />

      <main className="relative mx-auto max-w-7xl px-4">
        {/* Hero */}
        <section className="relative isolate grid grid-cols-1 items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.25)]">
              <Sparkles className="size-3.5" /> Building the future, one pixel
              at a time
            </div>
            <h1 className="bg-gradient-to-br from-cyan-200 via-fuchsia-200 to-purple-300 bg-clip-text text-4xl font-extrabold leading-tight text-transparent sm:text-5xl md:text-6xl">
              {portfolio.name}
            </h1>
            <p className="mt-2 text-sm font-medium tracking-wide text-cyan-100/90">
              {portfolio.heroTagline}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300/85 md:text-base">
              {portfolio.summary}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button className="group bg-cyan-500/80 shadow-[0_0_30px_rgba(34,211,238,0.35)] transition hover:bg-cyan-500">
                <a href="#contact" className="flex items-center gap-2">
                  <Mail className="size-4" /> Get in touch
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-cyan-400/40 bg-white/5 text-cyan-100 hover:bg-white/10"
              >
                <a
                  href={portfolio.resumeFile}
                  download
                  className="flex items-center gap-2"
                >
                  <Download className="size-4" /> Download CV
                </a>
              </Button>
              <div className="ml-auto flex items-center gap-3">
                <a
                  aria-label="GitHub"
                  href={portfolio.social.github || "#"}
                  className="rounded-md border border-white/10 bg-white/5 p-2 text-slate-200/90 transition hover:border-cyan-300/40 hover:bg-cyan-500/10 hover:text-white"
                >
                  <Github className="size-5" />
                </a>
                <a
                  aria-label="LinkedIn"
                  href={portfolio.social.linkedin || "#"}
                  className="rounded-md border border-white/10 bg-white/5 p-2 text-slate-200/90 transition hover:border-cyan-300/40 hover:bg-cyan-500/10 hover:text-white"
                >
                  <Linkedin className="size-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-white/5 shadow-[inset_0_0_40px_rgba(255,255,255,0.05)] backdrop-blur-xl" />
            <HoloAvatar className="aspect-square w-full" />
          </div>

          {/* Global stars are provided by RootLayout */}
        </section>

        <Separator className="my-8 border-cyan-400/20" />

  {/* About */}
  <LazySection>
  <section id="about" className="py-12 md:py-16">
          <SectionHeader
            title="About Me"
            subtitle="Full stack & AI focused developer blending pragmatic engineering with rapid product iteration."
          />
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg md:col-span-2">
              <p className="text-slate-300/85">
                I build practical, production‑ready web & SaaS products
                end‑to‑end: performant React / Next.js frontends, secure API
                layers, type‑safe data models and AI‑assisted workflows. I value
                clean abstractions, accessibility and fast feedback loops.
                Outside coding I explore GenAI tooling, cloud infra and mentor
                peers in student tech communities.
              </p>
              <ul className="mt-4 grid list-disc gap-2 pl-5 text-sm text-slate-300/80 sm:grid-cols-2">
                <li>Full stack: React • Next.js • Node.js</li>
                <li>APIs & DB: Prisma • MongoDB • SQL</li>
                <li>Auth & SaaS patterns (Clerk, NextAuth)</li>
                <li>AI integration (OpenAI, prompt tooling)</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 via-fuchsia-500/10 to-purple-600/10 p-6 text-sm shadow-[0_0_40px_rgba(34,211,238,0.25)]">
              <div className="flex items-center gap-2 font-semibold text-cyan-100">
                <Cpu className="size-4" /> Tech Highlights
              </div>
              <div className="mt-4 space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span>Frontend</span>
                    <span className="text-xs text-cyan-200/80">
                      React • Next.js
                    </span>
                  </div>
                  <Progress value={90} />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span>Backend</span>
                    <span className="text-xs text-cyan-200/80">
                      Node.js • APIs
                    </span>
                  </div>
                  <Progress value={80} />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span>AI & Data</span>
                    <span className="text-xs text-cyan-200/80">
                      OpenAI • DB
                    </span>
                  </div>
                  <Progress value={72} />
                </div>
              </div>
            </div>
          </div>
  </section>
  </LazySection>

  {/* Skills */}
  <LazySection>
  <section id="skills" className="py-12 md:py-16">
          <SectionHeader
            title="Skills"
            subtitle="A blend of engineering rigor and creative exploration — here are tools I use every day."
          />
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {portfolio.skills.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2">
                <SkillOrb
                  label={s.label}
                  accent={s.accent}
                  logos={s.logos}
                  size={0.72}
                />
              </div>
            ))}
          </div>
  </section>
  </LazySection>

  {/* LeetCode Journey (lazy on viewport) */}
  <LeetCodeSectionLazy username="anujkarambalkar1504" />

  {/* Projects */}
  <LazySection>
  <section id="projects" className="py-12 md:py-16">
          <SectionHeader
            title="Projects"
            subtitle="Selected work — interactive, performant and user‑focused. Hover to see the holographic effect."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolio.projects.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
          <div className="mt-6 flex items-center justify-center">
            <a
              href={portfolio.social.github || "#"}
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-100 shadow-[0_0_25px_rgba(34,211,238,0.25)] transition hover:bg-cyan-500/20"
            >
              <ExternalLink className="size-4" /> More on GitHub
            </a>
          </div>
  </section>
  </LazySection>

  {/* Experience */}
  <LazySection>
  <section id="experience" className="py-12 md:py-16">
          <SectionHeader
            title="Experience"
            subtitle="Hands‑on impact through internships & product builds."
          />
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
            <ExperienceTimeline
              items={portfolio.experience.map((e) => ({
                period: e.period,
                title: e.title,
                org: e.company,
                details: e.bullets.join(" \n • "),
              }))}
            />
          </div>
  </section>
  </LazySection>

  {/* Education */}
  <LazySection>
  <section id="education" className="py-12 md:py-16">
          <SectionHeader
            title="Education"
            subtitle="Academic foundation & campus involvement."
          />
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
            <ul className="space-y-6">
              {portfolio.education.map((ed) => (
                <li key={ed.degree} className="group">
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-base font-semibold text-white">
                        {ed.degree}
                      </h3>
                      <span className="text-xs font-mono tracking-wide text-cyan-200/80">
                        {ed.period}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300/80">
                      {ed.institution}
                    </p>
                    {ed.bullets && ed.bullets.length > 0 && (
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-300/70">
                        {ed.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
  </section>
  </LazySection>

  {/* Achievements */}
  <LazySection>
  <section id="achievements" className="py-12 md:py-16">
          <SectionHeader
            title="Certifications & Achievements"
            subtitle="Recognitions and continuous learning."
          />
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {portfolio.achievements.map((a) => (
                <li
                  key={a.title + a.date}
                  className="rounded-xl border border-cyan-400/20 bg-white/5 p-4 text-xs shadow-[0_0_20px_rgba(34,211,238,0.15)] backdrop-blur-md"
                >
                  <p className="font-semibold text-cyan-100">{a.title}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wide text-slate-300/70">
                    {a.org} {a.date && <>• {a.date}</>}
                  </p>
                </li>
              ))}
            </ul>
          </div>
  </section>
  </LazySection>

  {/* Contact */}
  <LazySection>
  <section id="contact" className="py-12 md:py-16">
          <SectionHeader
            title="Contact"
            subtitle="Let’s build something extraordinary. I’m available for internships, freelance and collaborations."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 via-fuchsia-500/10 to-purple-600/10 p-6 shadow-[0_0_40px_rgba(34,211,238,0.25)]">
              <div className="mb-4 flex items-center gap-2 font-semibold text-cyan-100">
                <Terminal className="size-4" /> Drop a message
              </div>
              <ContactForm />
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
              <h3 className="text-lg font-semibold">Connect</h3>
              <p className="mt-2 text-sm text-slate-300/85">
                I’m most active on GitHub and LinkedIn. Feel free to reach out
                via email as well.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {portfolio.social.github && (
                  <a
                    href={portfolio.social.github}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200/90 transition hover:border-cyan-300/40 hover:bg-cyan-500/10 hover:text-white"
                  >
                    <Github className="size-4" /> GitHub
                  </a>
                )}
                {portfolio.social.linkedin && (
                  <a
                    href={portfolio.social.linkedin}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200/90 transition hover:border-cyan-300/40 hover:bg-cyan-500/10 hover:text-white"
                  >
                    <Linkedin className="size-4" /> LinkedIn
                  </a>
                )}
                {portfolio.social.email && (
                  <a
                    href={`mailto:${portfolio.social.email}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200/90 transition hover:border-cyan-300/40 hover:bg-cyan-500/10 hover:text-white"
                  >
                    <Mail className="size-4" /> {portfolio.social.email}
                  </a>
                )}
              </div>
              <div className="mt-6 rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-4 text-xs text-cyan-100/90">
                PS: Shared links are placeholders — update real GitHub /
                LinkedIn URLs in data file.
              </div>
            </div>
          </div>
  </section>
  </LazySection>
      </main>

      <footer className="mx-auto max-w-7xl px-4 pb-10 pt-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-xs text-slate-300/70 backdrop-blur-xl">
          © {new Date().getFullYear()} {portfolio.name} — Built with Next.js,
          Tailwind and Three.js
        </div>
      </footer>
    </div>
  );
}
