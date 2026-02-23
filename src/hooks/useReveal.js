import { useEffect, useRef } from "react";

export function useReveal(threshold = 0.1) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Small timeout ensures DOM is fully ready before observing
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add("visible");
            observer.unobserve(el);
          }
        },
        { threshold, rootMargin: "0px 0px -50px 0px" }
      );
      observer.observe(el);

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [threshold]);

  return ref;
}