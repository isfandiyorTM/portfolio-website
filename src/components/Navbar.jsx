import { useState, useEffect } from "react";
import { NAV_ITEMS } from "../constants/data";
import { useTheme } from "../context/ThemeContext";

export default function Navbar({ onGamesClick }) {
  const [active, setActive]     = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { dark, toggle }        = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if(e.isIntersecting) setActive(e.target.id); }); },
      { threshold: 0.4 }
    );
    NAV_ITEMS.forEach(id => { const el=document.getElementById(id); if(el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMenuOpen(false); };

  return (
    <>
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, borderBottom:"1px solid var(--border)", background:"var(--bg-nav)", backdropFilter:"blur(12px)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 40px", height:"64px", width:"100%" }}>
        <div style={{ fontFamily:"var(--font-display)", fontSize:"18px", fontWeight:900, color:"var(--green)", letterSpacing:"4px", animation:"flicker 6s infinite" }}>
          IM<span style={{ color:"var(--text)", fontWeight:400 }}>_DEV</span>
        </div>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display:"flex", alignItems:"center", gap:"4px" }}>
          {NAV_ITEMS.map(item => (
            <button key={item} className={`nav-link ${active===item?"active":""}`} onClick={() => scrollTo(item)}>{item}</button>
          ))}
          <button onClick={onGamesClick} style={{ fontFamily:"var(--font-mono)", fontSize:"12px", letterSpacing:"2px", padding:"6px 14px", border:"1px solid var(--green)", background:"rgba(0,255,136,0.08)", color:"var(--green)", cursor:"pointer", transition:"all 0.3s", marginLeft:"8px", textTransform:"uppercase" }}>
            🎮 GAMES
          </button>
          <button onClick={toggle} className="theme-toggle" style={{ marginLeft:"8px" }}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Mobile toggle */}
        <div style={{ display:"flex", gap:"8px" }}>
          <button onClick={toggle} className="theme-toggle mobile-menu-btn" style={{ display:"flex" }}>
            {dark ? "☀️" : "🌙"}
          </button>
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ background:"none", border:"1px solid var(--green)", color:"var(--green)", padding:"8px 12px", fontFamily:"var(--font-mono)", fontSize:"12px", letterSpacing:"2px", cursor:"pointer", display:"flex" }}>
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-nav" style={{ position:"fixed", top:"64px", left:0, right:0, zIndex:99, background:"var(--bg)", borderBottom:"1px solid var(--border)", display:"flex", flexDirection:"column" }}>
          {NAV_ITEMS.map(item => (
            <button key={item} className={`nav-link ${active===item?"active":""}`} style={{ textAlign:"left", padding:"16px 40px", borderBottom:"1px solid var(--border)" }} onClick={() => scrollTo(item)}>
              {item}
            </button>
          ))}
          <button onClick={() => { onGamesClick(); setMenuOpen(false); }} style={{ fontFamily:"var(--font-mono)", fontSize:"12px", letterSpacing:"2px", padding:"16px 40px", border:"none", borderBottom:"1px solid var(--border)", background:"transparent", color:"var(--green)", cursor:"pointer", textAlign:"left", textTransform:"uppercase" }}>
            🎮 GAMES
          </button>
        </div>
      )}
    </>
  );
}