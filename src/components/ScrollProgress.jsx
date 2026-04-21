import { useState, useEffect } from "react";

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop / (el.scrollHeight - el.clientHeight);
      setPct(Math.min(scrolled * 100, 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, zIndex: 10000,
      height: "2px", width: `${pct}%`,
      background: "var(--green)",
      boxShadow: "0 0 8px var(--green), 0 0 2px var(--green)",
      pointerEvents: "none",
      transition: "width 0.08s linear",
    }} />
  );
}
