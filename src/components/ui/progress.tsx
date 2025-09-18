"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 shadow-inner shadow-black/70 ring-1 ring-white/10",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 backdrop-blur-[1px]" />
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-500 shadow-[0_0_8px_2px_rgba(34,211,238,0.45)]"
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          transition: "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
          boxShadow:
            "0 0 8px 2px rgba(34,211,238,0.45), 0 0 2px 1px rgba(255,255,255,0.25) inset",
        }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-cyan-300/20" />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
