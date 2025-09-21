"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type LazySectionProps = {
  children: React.ReactNode;
  className?: string;
  /** Start observing before the element reaches the viewport */
  rootMargin?: string;
  /** Intersection threshold (0..1) */
  threshold?: number;
  /** When true, keep the content mounted after the first reveal */
  once?: boolean;
  /** Optional placeholder (e.g., skeleton). Default: renders nothing to avoid white boxes */
  placeholder?: React.ReactNode;
  /** Apply a fade/slide-in animation on reveal */
  animate?: boolean;
  /** If true, render as visible on first paint (useful for above-the-fold) */
  initialInView?: boolean;
  /** Reserve vertical space to reduce layout shift (e.g., 300 or "20rem") */
  minHeight?: number | string;
};

export function LazySection({
  children,
  className,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.1,
  once = true,
  placeholder = null,
  animate = true,
  initialInView = false,
  minHeight,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(initialInView);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (visible && once) return; // already visible and sticky

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) {
              observer.disconnect();
            }
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { root: null, rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once, visible]);

  const style =
    minHeight !== undefined
      ? {
          minHeight:
            typeof minHeight === "number" ? `${minHeight}px` : minHeight,
        }
      : undefined;

  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        animate &&
          "transition-all duration-700 will-change-transform will-change-opacity",
        animate &&
          (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"),
        className
      )}
    >
      {visible ? children : placeholder}
    </div>
  );
}
