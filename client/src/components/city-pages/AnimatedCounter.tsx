import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/use-in-view";

type AnimatedCounterProps = {
  /** The real, final number to count up to — only ever a genuinely real value already in the
      codebase (e.g. the verified Google review count). Never invent a number just to animate it. */
  value: number;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

/** Counts up from 0 to `value` once scrolled into view, then stops — a one-shot reveal, not a
    continuously-looping animation. Uses requestAnimationFrame driving a text node's content
    (no layout-triggering properties), so it can't cost CLS. */
export function AnimatedCounter({ value, durationMs = 1200, prefix = "", suffix = "", className }: AnimatedCounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
