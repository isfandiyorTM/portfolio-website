import { useEffect, useState } from "react";

/** Whether the visitor has asked for less motion. */
export const calm = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Whether `ref`'s element has come into sight. With `once: false` it also
 * goes back to false when the element leaves (for clips that pause).
 */
export function useInView(ref, { margin = "0px 0px -12% 0px", once = true, threshold = 0 } = {}) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true);
        if (once) io.disconnect();
      } else if (!once) {
        setSeen(false);
      }
    }, { rootMargin: margin, threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin, once, threshold]);
  return seen;
}
