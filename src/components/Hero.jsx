import { useState, useEffect, useRef, useCallback } from "react";
import { useTypewriter } from "../hooks/useTypewriter";
import { useLang } from "../i18n/LanguageContext";
import ParticleCanvas from "./ParticleCanvas";
import ResumeModal from "./ResumeModal";
import CSSKeyboard from "./CSSKeyboard";
import { useIdle, DIM_TEXT, DIM_BG, DIM_EASE } from "../context/IdleContext";


function TerminalCursor() {
  const [v, setV] = useState(true);
  useEffect(() => { const t=setInterval(()=>setV(x=>!x),530); return()=>clearInterval(t); }, []);
  return <span style={{ display:"inline-block", width:"10px", height:"1.1em", background:v?"var(--green)":"transparent", marginLeft:"4px", verticalAlign:"middle", transition:"background 0.1s" }} />;
}

// How long the name takes to drift to the keyboard's level and back
const DRIFT_EASE = "transform 1.4s cubic-bezier(0.22,1,0.36,1)";

export default function Hero() {
  const { t }               = useLang();
  const { displayed, done } = useTypewriter(t.hero.title, 800);
  const scrollTo            = id => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  const [resumeOpen, setResumeOpen] = useState(false);
  const idle = useIdle();

  const sectionRef    = useRef(null);
  const nameRef       = useRef(null);
  const mouseMoveRaf  = useRef(null);

  // While idle the name drifts to the hero's vertical middle — the keyboard's
  // level. Measured rather than hard-coded: the gap depends on viewport height
  // and on how tall the translated copy above the name happens to render.
  // The shift is written straight to the wrapper's style: it is a pure visual
  // offset, so there is nothing for React to re-render.
  useEffect(() => {
    const name = nameRef.current;
    if (!name) return;
    if (!idle) { name.style.transform = "translateY(0px)"; return; }

    // Pixels the name currently sits below its resting place
    let shift = 0;
    const measure = () => {
      const section = sectionRef.current;
      if (!section) return;
      const s = section.getBoundingClientRect();
      const n = name.getBoundingClientRect();
      // n already includes the current shift, so add the remaining distance to it
      shift += (s.top + s.height / 2) - (n.top + n.height / 2);
      name.style.transform = `translateY(${shift}px)`;
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
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
      {/* Particle background — desktop only */}
      <div className="hero-bg-only-desktop" style={{ position:"absolute", inset:0, zIndex:2, opacity:0.18 * (idle ? DIM_BG : 1), pointerEvents:"none", transition:DIM_EASE }}>
        <ParticleCanvas style={{ width:"100%", height:"100%" }} />
      </div>

      {/* CSS 3D Keyboard — right-middle, clickable. Deliberately not dimmed:
          it keeps greeting and responding to keypresses while the rest sleeps. */}
      <CSSKeyboard />

      {/* rahimovdevs.tech badge — bottom right */}
      <a
        href="https://rahimovdevs.tech"
        target="_blank"
        rel="noopener noreferrer"
        className="hero-badge"
        style={{ opacity: idle ? DIM_TEXT : 1 }}
      >
        <span className="hero-badge-dot" />
        rahimovdevs.tech
        <span style={{ opacity: 0.5, fontSize: 12 }}>↗</span>
      </a>

      {/* Text content — everything except the name dims during idle.
          The dim lives on these wrappers, not on the elements themselves: the
          children run fadeUp with `both`, and an animation fill outranks an
          inline opacity, so dimming them directly would do nothing. */}
      <div style={{ maxWidth:"1100px", margin:"0 auto", width:"100%", position:"relative", zIndex:5, pointerEvents:"none" }}>
        <div style={{ maxWidth:"520px", pointerEvents:"auto" }}>

          <div style={{ opacity: idle ? DIM_TEXT : 1, transition: DIM_EASE }}>
            {/* Availability badge */}
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:18, animation:"fadeUp 0.5s ease both" }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:"#f59e0b", boxShadow:"0 0 8px #f59e0b88", animation:"pulse-glow 2s ease-in-out infinite" }} />
              <span style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:3, color:"var(--text-muted)", textTransform:"uppercase" }}>
                {t.hero.status}
              </span>
            </div>

            <div className="section-label" style={{ animation:"fadeUp 0.6s ease both" }}>{t.hero.greeting}</div>
          </div>

          {/* The name stays lit while the hero sleeps, and drifts down to the
              keyboard's level. Like the dim, the drift has to sit on a wrapper:
              fadeUp's `both` fill pins translateY(0) on the h1 itself. Raised
              above the dimmed block it slides over. */}
          <div
            ref={nameRef}
            style={{ position: "relative", zIndex: 2, transition: DRIFT_EASE }}
          >
            <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(36px,6vw,72px)", fontWeight:900, lineHeight:1.1, marginBottom:"16px", animation:"fadeUp 0.8s 0.2s ease both", opacity:0 }}>
              ISFANDIYOR<br />
              <span style={{ color:"var(--green)" }}>MADAMINOV</span>
            </h1>
          </div>

          <div style={{ opacity: idle ? DIM_TEXT : 1, transition: DIM_EASE }}>
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
      </div>

    </section>

    {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
  </>);
}
