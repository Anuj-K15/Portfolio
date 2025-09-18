"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function formatNumber(value: number, decimals: number, useGrouping: boolean) {
  if (!useGrouping && decimals === 0) return String(Math.round(value));
  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping,
  } as any);
}

/**
 * CountUpNumber
 * - Animates from 0 (or from) to a target number with easing.
 * - Supports prefix/suffix, decimals, grouping, and min duration.
 */
export function CountUpNumber({
  to,
  from,
  duration = 800,
  delay = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  useGrouping = true,
  resetOnChange = false,
}: {
  to: number;
  from?: number;
  duration?: number; // ms
  delay?: number; // ms
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  useGrouping?: boolean;
  resetOnChange?: boolean; // when true, animate from provided `from` (or 0) instead of previous value
}) {
  const [display, setDisplay] = useState(typeof from === "number" ? from : 0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTo = useRef(to);
  const lastFrom = useRef(typeof from === "number" ? from : 0);

  // Re-run animation when `to` changes
  useEffect(() => {
    // If value changed, animate from previous displayed value (smooth) unless resetOnChange is true
    const startValue = resetOnChange
      ? typeof from === "number"
        ? from
        : 0
      : display;
    lastFrom.current = startValue;
    lastTo.current = to;
    setDisplay(startValue);

    const start = () => {
      startRef.current = performance.now();
      const tick = (now: number) => {
        if (startRef.current == null) return;
        const elapsed = now - startRef.current;
        const t = Math.min(1, elapsed / Math.max(1, duration));
        const eased = easeOutCubic(t);
        const val =
          lastFrom.current + (lastTo.current - lastFrom.current) * eased;
        setDisplay(val);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    let timer: any = null;
    if (delay > 0) {
      timer = setTimeout(start, delay);
    } else {
      start();
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [to, from, duration, delay, resetOnChange]);

  const text = useMemo(
    () => `${prefix}${formatNumber(display, decimals, useGrouping)}${suffix}`,
    [display, decimals, prefix, suffix, useGrouping]
  );

  return <span className={className}>{text}</span>;
}
