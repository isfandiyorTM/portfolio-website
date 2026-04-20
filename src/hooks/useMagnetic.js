import { useRef, useCallback } from "react";

/* Magnetic button effect — element is pulled toward cursor when nearby.
   Attach ref to the element, spread handlers onto it. */
export function useMagnetic(strength = 0.38) {
  const ref = useRef(null);
  const animId = useRef(null);

  const onMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    cancelAnimationFrame(animId.current);
    ref.current.style.transition = "transform 0.1s ease";
    ref.current.style.transform  =
      `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
  }, [strength]);

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transition = "transform 0.65s cubic-bezier(0.16,1,0.3,1)";
    ref.current.style.transform  = "translate3d(0, 0, 0)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
