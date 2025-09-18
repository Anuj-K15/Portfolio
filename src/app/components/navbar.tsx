"use client";
import React from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const items = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="relative mx-auto max-w-7xl overflow-hidden">
        <nav className="mx-3 my-3 flex items-center justify-between rounded-2xl bg-black/40 px-4 py-3 shadow-[0_0_30px_rgba(0,0,0,0.25)] backdrop-blur-md">
          <a
            href="#home"
            className="text-sm font-semibold tracking-widest text-cyan-200"
          >
            Anuj • Portfolio
          </a>
          <ul className="hidden items-center gap-6 md:flex">
            {items.map((i) => (
              <li key={i.href}>
                <a
                  href={i.href}
                  className={cn(
                    "relative text-sm text-slate-200/80 transition hover:text-white",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded",
                    "after:absolute after:-bottom-1 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-cyan-400/70 after:transition-all hover:after:w-3/5"
                  )}
                >
                  {i.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-3 py-1.5 text-sm font-medium text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.25)] transition hover:bg-cyan-500/20 hover:shadow-[0_0_36px_rgba(34,211,238,0.35)]"
          >
            Hire Me
          </a>
        </nav>
      </div>
    </header>
  );
}
