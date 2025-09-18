"use client";
import React from "react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  subtitle,
  align = "left",
}: {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn("mb-8", align === "center" ? "text-center" : "text-left")}
    >
      <h2 className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-purple-300 bg-clip-text text-3xl font-black tracking-tight text-transparent drop-shadow-[0_0_25px_rgba(34,211,238,0.25)] md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-2 text-sm text-slate-300/85 md:text-base",
            align === "center" ? "mx-auto max-w-2xl" : ""
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
