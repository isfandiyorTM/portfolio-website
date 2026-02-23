import { useState, useEffect } from "react";
import { NAV_ITEMS } from "../constants/data";

export default function Navbar() {
  const [active, setActive]     = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.4 }
    );
    NAV_ITEMS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        borderBottom: "1px solid var(--green-dark)",
        background: "rgba(5,10,15,0.92)",
        backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px", height: "64px",
        width: "100%",
      }}>
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: "18px", fontWeight: 900,
          color: "var(--green)", letterSpacing: "4px",
          animation: "flicker 6s infinite",
        }}>
          IM<span style={{ color: "var(--text)", fontWeight: 400 }}>_DEV</span>
        </div>

        {/* Desktop */}
        <div className="desktop-nav" style={{ display: "flex", gap: "8px" }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              className={`nav-link ${active === item ? "active" : ""}`}
              onClick={() => scrollTo(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none", border: "1px solid var(--green)",
            color: "var(--green)", padding: "8px 12px",
            fontFamily: "var(--font-mono)", fontSize: "12px",
            letterSpacing: "2px", cursor: "pointer",
          }}
        >
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-nav" style={{
          position: "fixed", top: "64px", left: 0, right: 0, zIndex: 99,
          background: "var(--bg)", borderBottom: "1px solid var(--green-dark)",
          display: "flex", flexDirection: "column",
        }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              className={`nav-link ${active === item ? "active" : ""}`}
              style={{ textAlign: "left", padding: "16px 40px", borderBottom: "1px solid var(--green-dark)" }}
              onClick={() => scrollTo(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </>
  );
}