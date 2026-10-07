import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";
import { useLang  } from "../i18n/LanguageContext";
import { useIdle, DIM_NAV, DIM_EASE } from "../context/IdleContext";
import { NAV_ITEMS } from "../constants/data";

const GAME_NAMES = ["GAMES","MEMORY","SNAKE","TYPERACER","QUIZ","WHACK-BUG","DEBUGGER","REACTION","FLAPPY"];

function AnimatedGamesBtn({ onClick, label }) {
  const [idx,   setIdx]   = useState(0);
  const [phase, setPhase] = useState("show"); // "show" | "out" | "in"
  const timerRef  = useRef(null);
  const t1Ref     = useRef(null);
  const t2Ref     = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setPhase("out");
      t1Ref.current = setTimeout(() => {
        setIdx(i => (i + 1) % GAME_NAMES.length);
        setPhase("in");
        t2Ref.current = setTimeout(() => setPhase("show"), 280);
      }, 260);
    }, 2000);
    return () => {
      clearInterval(timerRef.current);
      clearTimeout(t1Ref.current);
      clearTimeout(t2Ref.current);
    };
  }, []);

  const anim = phase === "out" ? "navSlideOut 0.26s ease forwards"
             : phase === "in"  ? "navSlideIn  0.28s ease forwards"
             : "none";

  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        fontFamily:"var(--font-mono)", fontSize:"12px", letterSpacing:"2px",
        padding:"6px 14px", border:"1px solid var(--green)",
        background:"rgba(0,255,136,0.08)", color:"var(--green)",
        cursor:"pointer", transition:"background 0.3s, box-shadow 0.3s",
        marginLeft:"8px", textTransform:"uppercase",
        width:150, overflow:"hidden",
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
  { code:"en", flag:"🇺🇸", label:"EN" },
  { code:"ru", flag:"🇷🇺", label:"RU" },
  { code:"uz", flag:"🇺🇿", label:"UZ" },
];

function LangDropdown({ lang, switchLang, label }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = LANGS.find(l => l.code === lang) || LANGS[0];

  const close = useCallback((e) => {
    if (ref.current && !ref.current.contains(e.target)) setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open, close]);

  return (
    <div ref={ref} style={{ position:"relative" }}>
      <button
        className="lang-btn active"
        aria-label={`${label}: ${current.label}`}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"16px", opacity:1, padding:"4px 8px", border:"1px solid var(--border)" }}
      >
        <span aria-hidden="true">{current.flag}</span> <span aria-hidden="true" style={{ fontSize:"10px", opacity:0.6 }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{ position:"absolute", top:"calc(100% + 6px)", right:0, background:"var(--bg-nav)", border:"1px solid var(--border)", backdropFilter:"blur(12px)", zIndex:200, minWidth:"90px" }}>
          {LANGS.map(l => (
            <button
              key={l.code}
              className="lang-btn"
              lang={l.code}
              aria-current={lang === l.code ? "true" : undefined}
              onClick={() => { switchLang(l.code); setOpen(false); }}
              style={{ display:"flex", alignItems:"center", gap:"8px", width:"100%", padding:"8px 12px", fontSize:"16px", opacity: lang === l.code ? 1 : 0.5, borderBottom:"1px solid var(--border)" }}
            >
              <span aria-hidden="true">{l.flag}</span> <span style={{ fontFamily:"var(--font-mono)", fontSize:"11px", letterSpacing:"1px" }}>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar({ onGamesClick }) {
  const [active, setActive]     = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { dark, toggle }        = useTheme();
  const { lang, t, switchLang } = useLang();
  const idle                    = useIdle();

  // Only sleep over the hero. The nav is fixed and outlives the hero, so
  // dimming it while the reader sits on a full-brightness section below
  // would read as a bug rather than as the hero's screensaver.
  const asleep = idle && active === "home";
  const dim    = { opacity: asleep ? DIM_NAV : 1, transition: DIM_EASE };

  const themeLabel = dark ? t.a11y.theme_light : t.a11y.theme_dark;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if(e.isIntersecting) setActive(e.target.id); }); },
      { threshold: 0.4 }
    );
    NAV_ITEMS.forEach(id => { const el=document.getElementById(id); if(el) observer.observe(el); });
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
      `}</style>

      <nav aria-label={t.a11y.main_nav} style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, borderBottom:"1px solid var(--border)", background:"var(--bg-nav)", backdropFilter:"blur(12px)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 24px", height:"64px", width:"100%" }}>

        {/* Logo — stays lit while the rest of the nav sleeps, same rule as the hero's name */}
        <div style={{ fontFamily:"var(--font-display)", fontSize:"18px", fontWeight:900, color:"var(--green)", letterSpacing:"4px", animation:"flicker 6s infinite", flexShrink:0 }}>
          IM<span style={{ color:"var(--text)", fontWeight:400 }}>_DEV</span>
        </div>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display:"flex", alignItems:"center", gap:"2px", ...dim }}>
          {NAV_ITEMS.map(key => (
            <button key={key} className={`nav-link ${active===key?"active":""}`} aria-current={active===key ? "true" : undefined} onClick={() => scrollTo(key)}>
              {t.nav[key]}
            </button>
          ))}
          <AnimatedGamesBtn onClick={onGamesClick} label={t.nav.games} />

          {/* Language dropdown */}
          <div style={{ marginLeft:"8px" }}>
            <LangDropdown lang={lang} switchLang={switchLang} label={t.a11y.language} />
          </div>

          {/* Theme toggle */}
          <button onClick={toggle} className="theme-toggle" style={{ marginLeft:"8px" }} aria-label={themeLabel}>
            <span aria-hidden="true">{dark ? "☀️" : "🌙"}</span>
          </button>
        </div>

        {/* Mobile right side */}
        <div style={{ display:"flex", gap:"6px", alignItems:"center", ...dim }}>
          {/* Language dropdown on mobile */}
          <div className="mobile-menu-btn">
            <LangDropdown lang={lang} switchLang={switchLang} label={t.a11y.language} />
          </div>
          <button onClick={toggle} className="theme-toggle mobile-menu-btn" style={{ display:"flex" }} aria-label={themeLabel}>
            <span aria-hidden="true">{dark ? "☀️" : "🌙"}</span>
          </button>
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? t.a11y.menu_close : t.a11y.menu_open} aria-expanded={menuOpen} style={{ background:"none", border:"1px solid var(--green)", color:"var(--green)", padding:"8px 12px", fontFamily:"var(--font-mono)", fontSize:"11px", letterSpacing:"2px", cursor:"pointer", display:"flex" }}>
            <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-nav" style={{ position:"fixed", top:"64px", left:0, right:0, zIndex:99, background:"var(--bg)", borderBottom:"1px solid var(--border)", display:"flex", flexDirection:"column" }}>
          {NAV_ITEMS.map(key => (
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