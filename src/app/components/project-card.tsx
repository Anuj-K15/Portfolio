"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  role?: string;
  link?: string;
  image?: string; // Project thumbnail/image URL
};

export function ProjectCard({ project }: { project: Project }) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [transform, setTransform] = React.useState<string>(
    "perspective(900px) rotateX(0deg) rotateY(0deg)"
  );

  function onMove(e: React.MouseEvent) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = -(y / rect.height - 0.5) * 8; // tilt up/down
    const ry = (x / rect.width - 0.5) * 10; // tilt left/right
    setTransform(
      `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`
    );
  }

  function reset() {
    setTransform(
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)"
    );
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="[transform-style:preserve-3d]"
      style={{ transform: transform, transition: "transform 150ms ease" }}
    >
      <Card
        className={cn(
          "group overflow-hidden rounded-2xl border-cyan-400/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-0 backdrop-blur-lg transition",
          "hover:border-cyan-300/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.35)]"
        )}
      >
        <div className="relative h-48 w-full overflow-hidden">
          {/* Project thumbnail image */}
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-300 group-hover:scale-110"
            />
          )}

          {/* Gradient overlays */}
          {/* <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/15 to-purple-600/20" />
          <div className="absolute right-0 top-0 size-36 -translate-y-1/3 translate-x-1/4 rounded-full bg-cyan-400/20 blur-2xl" />
          <div className="absolute bottom-0 left-0 size-24 translate-y-1/2 -translate-x-1/3 rounded-full bg-fuchsia-400/20 blur-xl" /> */}
        </div>
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-xl font-semibold text-white">
            {project.title}
          </CardTitle>
          <CardDescription className="text-slate-300/80">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-2 ">
          {project.tags.map((t) => (
            <Badge
              key={t}
              variant="outline"
              className="border-cyan-400/40 bg-cyan-500/10 text-cyan-100"
            >
              {t}
            </Badge>
          ))}
        </CardContent>
        <CardContent className="flex flex-wrap items-center py-4">
          {project.link && (
            <a
              href={project.link}
              className="w-full rounded-md border text-center border-cyan-400/40 bg-cyan-400/40 px-3 py-1 text-xs font-medium text-white transition hover:bg-cyan-500/20"
            >
              View
            </a>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
