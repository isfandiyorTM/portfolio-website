import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed", bottom: 32, right: 32, zIndex: 500,
        width: 44, height: 44,
        background: hovered ? "rgba(0,255,136,0.1)" : "var(--bg)",
        border: "1px solid var(--green)",
        color: "var(--green)",
        fontFamily: "var(--font-mono)", fontSize: 18,
        cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: hovered
          ? "0 0 24px rgba(0,255,136,0.35), 0 0 0 1px var(--green)"
          : "0 0 12px rgba(0,255,136,0.15)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.2s",
        animation: "fadeUp 0.3s ease both",
      }}
      title="Back to top"
    >
      ↑
    </button>
  );
}
