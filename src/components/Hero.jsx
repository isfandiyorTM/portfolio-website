import { useState, useEffect, useRef, useCallback } from "react";
import { useTypewriter } from "../hooks/useTypewriter";
import { useLang } from "../i18n/LanguageContext";
import ParticleCanvas from "./ParticleCanvas";
import MatrixRain from "./MatrixRain";
import ResumeModal from "./ResumeModal";
import CSSKeyboard from "./CSSKeyboard";


const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@!$%&*?";

function ScrambleText({ text, style }) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef(null);

  const scramble = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    let iter = 0;
    const total = text.replace(/ /g, "").length * 2 + 8;
    const tick = () => {
      setDisplay(
        text.split("").map((ch, i) => {
          if (ch === " ") return " ";
          if (i < Math.floor(iter / 2)) return text[i];
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }).join("")
      );
      if (iter < total) { iter++; rafRef.current = requestAnimationFrame(tick); }
      else setDisplay(text);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [text]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [scramble]);

  return (
    <span style={{ ...style, cursor: "default" }} onMouseEnter={scramble}>
      {display}
    </span>
  );
}

function TerminalCursor() {
  const [v, setV] = useState(true);
  useEffect(() => { const t=setInterval(()=>setV(x=>!x),530); return()=>clearInterval(t); }, []);
  return <span style={{ display:"inline-block", width:"10px", height:"1.1em", background:v?"var(--green)":"transparent", marginLeft:"4px", verticalAlign:"middle", transition:"background 0.1s" }} />;
}

const IDLE_SECS = 90;

export default function Hero() {
  const { t }               = useLang();
  const { displayed, done } = useTypewriter(t.hero.title, 800);
  const scrollTo            = id => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  const [resumeOpen, setResumeOpen] = useState(false);
  const [idle, setIdle]     = useState(false);

  const sectionRef    = useRef(null);
  const mouseMoveRaf  = useRef(null);
  const lastActive    = useRef(Date.now());
  const idleTimer     = useRef(null);

  // Idle detection — resets on any interaction
  useEffect(() => {
    const bump = () => { lastActive.current = Date.now(); if (idle) setIdle(false); };
    const tick = () => {
      if (Date.now() - lastActive.current >= IDLE_SECS * 1000) setIdle(true);
    };
    window.addEventListener("mousemove",  bump, { passive: true });
    window.addEventListener("keydown",    bump, { passive: true });
    window.addEventListener("scroll",     bump, { passive: true });
    window.addEventListener("click",      bump, { passive: true });
    window.addEventListener("touchstart", bump, { passive: true });
    idleTimer.current = setInterval(tick, 5000);
    return () => {
      window.removeEventListener("mousemove",  bump);
      window.removeEventListener("keydown",    bump);
      window.removeEventListener("scroll",     bump);
      window.removeEventListener("click",      bump);
      window.removeEventListener("touchstart", bump);
      clearInterval(idleTimer.current);
    };
  }, [idle]);

  const handleMouseMove = useCallback((e) => {
    if (mouseMoveRaf.current) return;
    mouseMoveRaf.current = requestAnimationFrame(() => {
      mouseMoveRaf.current = null;
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top)  / rect.height;
      const ox = (nx - 0.5) * 28;
      const oy = (ny - 0.5) * 28;
      sectionRef.current.style.backgroundPosition = `${ox}px ${oy}px, ${ox}px ${oy}px`;
    });
  }, []);

  return (<>
    <section
      ref={sectionRef}
      id="home"
      className="grid-bg"
      onMouseMove={handleMouseMove}
      style={{ minHeight:"100vh", position:"relative", overflow:"hidden", display:"flex", alignItems:"center", padding:"100px 40px 60px", width:"100%" }}
    >
      {/* Matrix Rain — desktop only */}
      <div className="hero-bg-only-desktop" style={{ position:"absolute", inset:0, zIndex:0, opacity:0.07, pointerEvents:"none", filter:"blur(0.8px)" }}>
        <MatrixRain style={{ width:"100%", height:"100%" }} />
      </div>

      {/* Particle background — desktop only */}
      <div className="hero-bg-only-desktop" style={{ position:"absolute", inset:0, zIndex:2, opacity:0.18, pointerEvents:"none" }}>
        <ParticleCanvas style={{ width:"100%", height:"100%" }} />
      </div>

      {/* CSS 3D Keyboard — right-middle, clickable */}
      <CSSKeyboard idle={idle} />

      {/* rahimovdevs.tech badge — bottom right */}
      <a
        href="https://rahimovdevs.tech"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "absolute", bottom: 24, right: 28, zIndex: 5,
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "7px 14px", borderRadius: 20,
          fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "1.5px",
          color: "rgba(0,255,136,0.65)", textDecoration: "none", whiteSpace: "nowrap",
          background: "rgba(4,12,7,0.92)",
          border: "1px solid rgba(0,255,136,0.22)",
          boxShadow: "0 0 16px rgba(0,255,136,0.05)",
          transition: "border-color 0.3s, box-shadow 0.3s, color 0.3s",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,255,136,0.55)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(0,255,136,0.18)"; e.currentTarget.style.color = "rgba(0,255,136,1)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,255,136,0.22)"; e.currentTarget.style.boxShadow = "0 0 16px rgba(0,255,136,0.05)"; e.currentTarget.style.color = "rgba(0,255,136,0.65)"; }}
      >
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 6px var(--green)", animation: "pulse-glow 2s ease-in-out infinite", flexShrink: 0 }} />
        rahimovdevs.tech
        <span style={{ opacity: 0.5, fontSize: 12 }}>↗</span>
      </a>

      {/* Text content — dims during idle */}
      <div style={{ maxWidth:"1100px", margin:"0 auto", width:"100%", position:"relative", zIndex:5, pointerEvents:"none", opacity: idle ? 0.18 : 1, transition:"opacity 2s ease" }}>
        <div style={{ maxWidth:"520px", pointerEvents:"auto" }}>

          {/* Availability badge */}
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:18, animation:"fadeUp 0.5s ease both" }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:"#f59e0b", boxShadow:"0 0 8px #f59e0b88", animation:"pulse-glow 2s ease-in-out infinite" }} />
            <span style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:3, color:"var(--text-muted)", textTransform:"uppercase" }}>
              {t.hero.status}
            </span>
          </div>

          <div className="section-label" style={{ animation:"fadeUp 0.6s ease both" }}>{t.hero.greeting}</div>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(36px,6vw,72px)", fontWeight:900, lineHeight:1.1, marginBottom:"16px", animation:"fadeUp 0.8s 0.2s ease both", opacity:0 }}>
            <ScrambleText text="ISFANDIYOR" /><br />
            <ScrambleText text="MADAMINOV" style={{ color:"var(--green)" }} />
          </h1>

          <div style={{ fontFamily:"var(--font-mono)", fontSize:"clamp(13px,2vw,17px)", color:"var(--green-dim)", marginBottom:"28px", animation:"fadeUp 0.8s 0.4s ease both", opacity:0, minHeight:"28px" }}>
            {displayed}{!done && <TerminalCursor />}
          </div>

          <p style={{ color:"var(--text-muted)", lineHeight:1.8, fontSize:"15px", maxWidth:"460px", marginBottom:"36px", animation:"fadeUp 0.8s 0.6s ease both", opacity:0 }}>
            {t.hero.bio}
          </p>

          <div style={{ display:"flex", gap:"16px", flexWrap:"wrap", animation:"fadeUp 0.8s 0.8s ease both", opacity:0 }}>
            <button className="btn btn-primary"   onClick={() => scrollTo("projects")}>{t.hero.cta_projects}</button>
            <button className="btn btn-secondary" onClick={() => scrollTo("contact")}>{t.hero.cta_contact}</button>
            <button className="btn btn-secondary" onClick={() => setResumeOpen(true)}>{t.hero.cta_cv}</button>
          </div>

        </div>
      </div>

    </section>

    {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
  </>);
}
