import { useState, useEffect } from "react";

export function useTypewriter(text, delay = 0, speed = 40) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted]     = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return { displayed, done: displayed.length >= text.length };
}