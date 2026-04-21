import { useState, useEffect, useRef } from "react";

export function useScrollTypewriter(text, speed = 35) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const triggerRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    startedRef.current = false;
    setDisplayed("");
    setDone(false);
  }, [text]);

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          let i = 0;
          const iv = setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) { clearInterval(iv); setDone(true); }
          }, speed);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [text, speed]);

  return { ref: triggerRef, displayed, done };
}
