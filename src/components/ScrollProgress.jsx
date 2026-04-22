import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const onScroll = () => {
      const el = document.documentElement;
      const pct = Math.min((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100, 100);
      bar.style.width = pct + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={barRef} style={{
      position: "fixed", top: 0, left: 0, zIndex: 10000,
      height: "2px", width: "0%",
      background: "var(--green)",
      boxShadow: "0 0 8px var(--green), 0 0 2px var(--green)",
      pointerEvents: "none",
      transition: "width 0.08s linear",
    }} />
  );
}
