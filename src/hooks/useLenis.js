import { useEffect } from "react";
import Lenis from "lenis";

/* Initializes Lenis smooth scroll once, globally.
   Use this hook once at the app root. */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12,           // 0.08 was too low under WebGL load — 0.12 is smoother feeling
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
      syncTouch: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
