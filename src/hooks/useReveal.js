import { useLayoutEffect, useRef } from "react";

export function useReveal(threshold = 0.1) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isMobile = window.innerWidth < 768;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: isMobile ? "0px 0px -10px 0px" : "0px 0px -50px 0px" }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
