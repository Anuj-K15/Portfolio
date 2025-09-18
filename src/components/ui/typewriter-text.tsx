"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * TypewriterText
 * - Animates text content with a fast typing/rolling effect.
 * - Re-runs when `text` changes.
 * - Numbers get a slightly faster tick by default.
 */
export function TypewriterText({
  text,
  speed = 20,
  className,
  startDelay = 0,
  minDuration = 300,
}: {
  text: string;
  speed?: number; // ms per char
  className?: string;
  startDelay?: number; // ms before starting
  minDuration?: number; // ensure short strings still visibly animate
}) {
  const isNumber = useMemo(() => /^[-+#0-9.,%\s]+$/.test(text), [text]);
  const step = Math.max(8, speed / (isNumber ? 1.5 : 1));
  const [out, setOut] = useState("");
  const iRef = useRef(0);
  const textRef = useRef(text);

  useEffect(() => {
    // reset when text changes
    textRef.current = text;
    iRef.current = 0;
    setOut("");

    let raf = 0;
    let startedAt = 0;
    let last = 0;

    const start = () => {
      startedAt = performance.now();
      last = startedAt;
      raf = requestAnimationFrame(tick);
    };

    const tick = (now: number) => {
      if (iRef.current >= textRef.current.length) {
        // If finished too quickly, hold the last frame until minDuration has passed
        if (now - startedAt < minDuration) {
          raf = requestAnimationFrame(tick);
        }
        return;
      }
      if (now - last >= step) {
        const next = iRef.current + 1;
        setOut(textRef.current.slice(0, next));
        iRef.current = next;
        last = now;
      }
      raf = requestAnimationFrame(tick);
    };

    const delayTimer =
      startDelay > 0 ? setTimeout(start, startDelay) : (start(), null);
    return () => {
      if (delayTimer) clearTimeout(delayTimer as any);
      cancelAnimationFrame(raf);
    };
  }, [text, step, startDelay, minDuration]);

  return <span className={className}>{out || ""}</span>;
}
