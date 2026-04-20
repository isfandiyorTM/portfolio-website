import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { useLang  } from "../i18n/LanguageContext";

const GAME_NAMES = ["GAMES","MEMORY","SNAKE","TYPERАCER","QUIZ","WHACK-BUG","DEBUGGER","REACTION","FLAPPY"];

function AnimatedGamesBtn({ onClick }) {
  const [idx,   setIdx]   = useState(0);
  const [phase, setPhase] = useState("show"); // "show" | "out" | "in"
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setPhase("out");
      setTimeout(() => {
        setIdx(i => (i + 1) % GAME_NAMES.length);
        setPhase("in");
        setTimeout(() => setPhase("show"), 280);
      }, 260);
    }, 2000);
    return () => clearInterval(timerRef.current);
  }, []);

  const anim = phase === "out" ? "navSlideOut 0.26s ease forwards"
             : phase === "in"  ? "navSlideIn  0.28s ease forwards"
             : "none";

  return (
    <button
      onClick={onClick}
      style={{
        fontFamily:"var(--font-mono)", fontSize:"12px", letterSpacing:"2px",
        padding:"6px 14px", border:"1px solid var(--green)",
        background:"rgba(0,255,136,0.08)", color:"var(--green)",
        cursor:"pointer", transition:"background 0.3s, box-shadow 0.3s",
        marginLeft:"8px", textTransform:"uppercase",
        minWidth:120, overflow:"hidden",
      }}
      onMouseEnter={e => { e.currentTarget.style.background="rgba(0,255,136,0.16)"; e.currentTarget.style.boxShadow="0 0 12px rgba(0,255,136,0.2)"; }}
      onMouseLeave={e => { e.currentTarget.style.background="rgba(0,255,136,0.08)"; e.currentTarget.style.boxShadow="none"; }}
    >
      <span style={{ display:"inline-block", animation: anim }}>
        🎮 {GAME_NAMES[idx]}
      </span>
    </button>
  );
}

const LANGS = [
  { code:"en", flag:"🇺🇸" },
  { code:"ru", flag:"🇷🇺" },
  { code:"uz", flag:"🇺🇿" },
];

export default function Navbar({ onGamesClick }) {
  const [active, setActive]     = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { dark, toggle }        = useTheme();
  const { lang, t, switchLang } = useLang();

  const NAV_KEYS = ["home","about","projects","contact"];

  useEffect(() => {
    const ids = NAV_KEYS.map(k => k);
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if(e.isIntersecting) setActive(e.target.id); }); },
      { threshold: 0.4 }
    );
    ids.forEach(id => { const el=document.getElementById(id); if(el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        .lang-btn {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          padding: 4px 6px;
          border-radius: 4px;
          opacity: 0.5;
          transition: all 0.2s;
          line-height: 1;
          color: var(--text);
        }
        .lang-btn:hover { opacity: 1; transform: scale(1.15); }
        .lang-btn.active { opacity: 1; filter: drop-shadow(0 0 6px rgba(0,255,136,0.6)); transform: scale(1.1); }
        .lang-group { display: flex; align-items: center; gap: 2px; border: 1px solid var(--border); padding: 4px 6px; }
      `}</style>

      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, borderBottom:"1px solid var(--border)", background:"var(--bg-nav)", backdropFilter:"blur(12px)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 24px", height:"64px", width:"100%" }}>

        {/* Logo */}
        <div style={{ fontFamily:"var(--font-display)", fontSize:"18px", fontWeight:900, color:"var(--green)", letterSpacing:"4px", animation:"flicker 6s infinite", flexShrink:0 }}>
          IM<span style={{ color:"var(--text)", fontWeight:400 }}>_DEV</span>
        </div>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display:"flex", alignItems:"center", gap:"2px" }}>
          {NAV_KEYS.map(key => (
            <button key={key} className={`nav-link ${active===key?"active":""}`} onClick={() => scrollTo(key)}>
              {t.nav[key]}
            </button>
          ))}
          <AnimatedGamesBtn onClick={onGamesClick} />

          {/* Language flags */}
          <div className="lang-group" style={{ marginLeft:"8px" }}>
            {LANGS.map(l => (
              <button key={l.code} className={`lang-btn ${lang===l.code?"active":""}`} onClick={() => switchLang(l.code)} title={l.code.toUpperCase()}>
                {l.flag}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button onClick={toggle} className="theme-toggle" style={{ marginLeft:"8px" }}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Mobile right side */}
        <div style={{ display:"flex", gap:"6px", alignItems:"center" }}>
          {/* Flags on mobile too */}
          <div className="mobile-menu-btn lang-group" style={{ display:"flex" }}>
            {LANGS.map(l => (
              <button key={l.code} className={`lang-btn ${lang===l.code?"active":""}`} onClick={() => switchLang(l.code)} style={{ fontSize:"16px" }}>
                {l.flag}
              </button>
            ))}
          </div>
          <button onClick={toggle} className="theme-toggle mobile-menu-btn" style={{ display:"flex" }}>
            {dark ? "☀️" : "🌙"}
          </button>
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ background:"none", border:"1px solid var(--green)", color:"var(--green)", padding:"8px 12px", fontFamily:"var(--font-mono)", fontSize:"11px", letterSpacing:"2px", cursor:"pointer", display:"flex" }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-nav" style={{ position:"fixed", top:"64px", left:0, right:0, zIndex:99, background:"var(--bg)", borderBottom:"1px solid var(--border)", display:"flex", flexDirection:"column" }}>
          {NAV_KEYS.map(key => (
            <button key={key} className={`nav-link ${active===key?"active":""}`} style={{ textAlign:"left", padding:"16px 24px", borderBottom:"1px solid var(--border)" }} onClick={() => scrollTo(key)}>
              {t.nav[key]}
            </button>
          ))}
          <button onClick={() => { onGamesClick(); setMenuOpen(false); }} style={{ fontFamily:"var(--font-mono)", fontSize:"12px", letterSpacing:"2px", padding:"16px 24px", border:"none", borderBottom:"1px solid var(--border)", background:"transparent", color:"var(--green)", cursor:"pointer", textAlign:"left", textTransform:"uppercase" }}>
            🎮 {t.nav.games}
          </button>
        </div>
      )}
    </>
  );
}