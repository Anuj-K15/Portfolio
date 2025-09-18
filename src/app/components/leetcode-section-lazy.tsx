"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const LeetCodeSection = dynamic(
  () => import("./leetcode-section").then((m) => m.LeetCodeSection),
  { ssr: false }
);

export function LeetCodeSectionLazy({
  username,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.01,
  placeholder,
}: {
  username: string;
  rootMargin?: string;
  threshold?: number;
  placeholder?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { root: null, rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, visible]);

  return (
    <div ref={ref}>
      {visible ? (
        <LeetCodeSection username={username} />
      ) : (
        placeholder ?? <div className="py-12 md:py-16" />
      )}
    </div>
  );
}
