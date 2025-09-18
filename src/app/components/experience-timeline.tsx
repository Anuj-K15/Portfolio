"use client";
import React from "react";

export type TimelineItem = {
  period: string;
  title: string;
  org: string;
  details: string;
};

export function ExperienceTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative ml-3 border-l border-cyan-400/30 pl-6">
      {items.map((it, idx) => (
        <li key={idx} className="mb-8">
          <div className="absolute -left-[9px] mt-1 size-4 rounded-full border border-cyan-400/50 bg-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.4)]" />
          <time className="text-xs font-mono uppercase tracking-wide text-cyan-200/90">{it.period}</time>
          <h3 className="mt-1 text-lg font-semibold text-white">{it.title}</h3>
          <p className="text-sm text-slate-300/80">{it.org}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-300/80">{it.details}</p>
        </li>
      ))}
    </ol>
  );
}
