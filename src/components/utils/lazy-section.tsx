"use client";
import React, { useEffect, useRef, useState } from "react";

export function LazySection({
  children,
  rootMargin = "0px 0px -20% 0px",
  threshold = 0.01,
  once = true,
  placeholder,
  className,
}: {
  children: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  once?: boolean; // keep mounted after first reveal
  placeholder?: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (visible && once) return; // already visible

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { root: null, rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once, visible]);

  return (
    <div ref={ref} className={className}>
      {visible ? children : placeholder ?? <div className="py-12 md:py-16" />}
    </div>
  );
}
