import { useState, useEffect, useRef } from "react";

/* Animates a number from 0 to `target` when `active` becomes true.
   Uses ease-out cubic for a natural deceleration. */
export function useCounter(target, active, duration = 1800) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    const startTime = performance.now();
    const numericTarget = parseFloat(target.replace(/[^0-9.]/g, "")) || 0;

    const tick = (now) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      /* Ease out cubic: decelerate toward end */
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(numericTarget * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);

  /* Reconstruct display string preserving suffix like "+" or "★" */
  const suffix = target.replace(/[0-9.]/g, "");
  return `${count}${suffix}`;
}
