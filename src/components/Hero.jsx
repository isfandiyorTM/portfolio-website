import { useState, useEffect, useRef, useCallback } from "react";
import { useTypewriter } from "../hooks/useTypewriter";
import { useLang } from "../i18n/LanguageContext";
import ParticleCanvas from "./ParticleCanvas";
import MatrixRain from "./MatrixRain";
import CodeFloat from "./CodeFloat";
import ResumeModal from "./ResumeModal";


function GlitchText({ text }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const i = setInterval(() => { setGlitch(true); setTimeout(() => setGlitch(false), 200); }, 4000);
    return () => clearInterval(i);
  }, []);
  return <span style={{ position:"relative", display:"inline-block", animation:glitch?"glitch 0.2s steps(2) forwards":"none" }}>{text}</span>;
}

function TerminalCursor() {
  const [v, setV] = useState(true);
  useEffect(() => { const t=setInterval(()=>setV(x=>!x),530); return()=>clearInterval(t); }, []);
  return <span style={{ display:"inline-block", width:"10px", height:"1.1em", background:v?"var(--green)":"transparent", marginLeft:"4px", verticalAlign:"middle", transition:"background 0.1s" }} />;
}

function PressButton({ glitch }) {
  const { t } = useLang();
  const rc = t.hero.rahimovcard;
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [blink, setBlink]     = useState(true);
  const btnRef      = useRef(null);
  const rippleTimer = useRef(null);
  const pressTimer  = useRef(null);

  useEffect(() => {
    const iv = setInterval(() => setBlink(b => !b), 700);
    return () => {
      clearInterval(iv);
      clearTimeout(rippleTimer.current);
      clearTimeout(pressTimer.current);
    };
  }, []);

  const handleClick = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    const id = Date.now();
    setRipples(r => [...r, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
    rippleTimer.current = setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 900);
    setPressed(true);
    pressTimer.current = setTimeout(() => { window.open("https://rahimovdevs.tech", "_blank"); setPressed(false); }, 180);
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>

      <div style={{
        fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:4,
        color: blink ? "var(--green)" : "transparent",
        transition:"color 0.12s", userSelect:"none",
      }}>
        ▼ &nbsp;{rc.press_label}&nbsp; ▼
      </div>

      <div
        ref={btnRef}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position:"relative", overflow:"hidden", cursor:"pointer", width:"100%",
          background: pressed ? "rgba(0,255,136,0.1)" : hovered ? "rgba(0,255,136,0.04)" : "var(--bg)",
          border: `1px solid ${glitch ? "#00e5ff" : hovered ? "var(--green)" : "var(--green-dark)"}`,
          boxShadow: glitch
            ? "0 0 0 1px #00e5ff, 0 0 30px #00e5ff55"
            : hovered ? "0 0 0 1px var(--green), 0 0 40px #00ff8833" : "0 0 0 1px var(--green-dark), 0 0 20px #00ff8810",
          transform: pressed ? "scale(0.97)" : "scale(1)",
          transition: "background 0.2s, transform 0.1s",
          userSelect:"none",
          filter: glitch ? "hue-rotate(180deg) brightness(1.4)" : "none",
        }}
      >
        {/* Scan line */}
        <div style={{
          position:"absolute", left:0, right:0, top:0, height:"1px",
          background:"linear-gradient(90deg,transparent,var(--green),transparent)",
          animation:"scanline 3s linear infinite",
          opacity: hovered ? 0.9 : 0.4,
          pointerEvents:"none", zIndex:3,
        }} />

        {/* Ripples */}
        {ripples.map(rp => (
          <div key={rp.id} style={{
            position:"absolute", left:rp.x, top:rp.y,
            transform:"translate(-50%,-50%)",
            width:0, height:0, borderRadius:"50%",
            background:"rgba(0,255,136,0.3)",
            animation:"ripple 0.9s ease-out forwards",
            pointerEvents:"none", zIndex:2,
          }} />
        ))}

        {/* Corner brackets */}
        {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
          <div key={v+h} style={{
            position:"absolute", [v]:0, [h]:0, width:14, height:14,
            borderTop:    v==="top"    ? "1px solid var(--green)" : "none",
            borderBottom: v==="bottom" ? "1px solid var(--green)" : "none",
            borderLeft:   h==="left"   ? "1px solid var(--green)" : "none",
            borderRight:  h==="right"  ? "1px solid var(--green)" : "none",
            pointerEvents:"none",
          }} />
        ))}

        <div style={{ padding:"22px 22px 18px", position:"relative", zIndex:1 }}>
          {/* Status row */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:"var(--green)", boxShadow:"0 0 8px var(--green)", animation:"pulse-glow 1.5s ease-in-out infinite" }} />
              <span style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:3, color:"var(--green)" }}>{rc.live}</span>
            </div>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:8, color:"var(--text-muted)", letterSpacing:1 }}>rahimovdevs.tech</span>
          </div>

          {/* Title */}
          <div style={{
            fontFamily:"var(--font-display)", fontSize:"clamp(20px,3vw,28px)", fontWeight:900,
            lineHeight:1.1, marginBottom:10,
            color: hovered ? "var(--green)" : "var(--text)", transition:"color 0.3s",
          }}>
            RAHIMOV<span style={{ color:"var(--green)" }}>DEVS</span>
          </div>

          <p style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"var(--text-muted)", lineHeight:1.6, marginBottom:16, maxWidth:240 }}>
            {rc.desc}
          </p>

          {/* Stats */}
          <div style={{ display:"flex", gap:20, paddingTop:14, borderTop:"1px solid var(--green-dark)" }}>
            {[[rc.s1v,rc.s1l],[rc.s2v,rc.s2l],[rc.s3v,rc.s3l]].map(([v,l]) => (
              <div key={l}>
                <div style={{ fontFamily:"var(--font-display)", fontSize:15, fontWeight:900, color:"var(--green)" }}>{v}</div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:7, letterSpacing:2, color:"var(--text-muted)", textTransform:"uppercase", marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA bar */}
        <div style={{
          borderTop:"1px solid var(--green-dark)", padding:"10px 22px",
          display:"flex", justifyContent:"space-between", alignItems:"center",
          background: hovered ? "rgba(0,255,136,0.04)" : "transparent", transition:"background 0.2s",
        }}>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:3, color: hovered ? "var(--green)" : "var(--green-dim)" }}>
            {rc.visit}
          </span>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:14, color:"var(--green)", display:"inline-block", transform: hovered ? "translateX(3px)" : "none", transition:"transform 0.2s" }}>↗</span>
        </div>
      </div>

      <div style={{ fontFamily:"var(--font-mono)", fontSize:8, letterSpacing:3, color:"var(--text-muted)", animation:"flicker 3s infinite", userSelect:"none" }}>
        {rc.hint}
      </div>
    </div>
  );
}

export default function Hero() {
  const { t }            = useLang();
  const { displayed, done } = useTypewriter(t.hero.title, 800);
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  const [resumeOpen, setResumeOpen] = useState(false);

  const sectionRef   = useRef(null);
  const textRef      = useRef(null);
  const dvdRef       = useRef(null);
  const pos          = useRef(null);
  const vel          = useRef({ dx: 1.5, dy: 1.1 });
  const rafRef       = useRef(null);
  const glitchTimer  = useRef(null);
  const paused       = useRef(false);
  const mouseMoveRaf = useRef(null);
  const [glitch, setGlitch] = useState(false);

  // B2 — grid parallax on mousemove
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

  useEffect(() => {
    const step = () => {
      const section = sectionRef.current;
      const text    = textRef.current;
      const dvd     = dvdRef.current;
      if (!section || !text || !dvd) { rafRef.current = requestAnimationFrame(step); return; }

      const sRect   = section.getBoundingClientRect();
      const tRect   = text.getBoundingClientRect();
      const leftBound = tRect.right - sRect.left + 24;   // 24px gap after text
      const rightBound = section.clientWidth;
      const topBound   = 0;
      const botBound   = section.clientHeight;
      const bw = dvd.offsetWidth;
      const bh = dvd.offsetHeight;

      // Initialise position on first valid frame
      if (!pos.current) {
        pos.current = { x: leftBound + 20, y: Math.floor(botBound * 0.25) };
      }

      if (!paused.current) {
        let { x, y }   = pos.current;
        let { dx, dy } = vel.current;

        x += dx;
        y += dy;

        let bounced = false;
        if (x <= leftBound)         { x = leftBound;          dx =  Math.abs(dx); bounced = true; }
        if (x + bw >= rightBound)   { x = rightBound - bw;    dx = -Math.abs(dx); bounced = true; }
        if (y <= topBound)          { y = topBound;            dy =  Math.abs(dy); bounced = true; }
        if (y + bh >= botBound)     { y = botBound - bh;       dy = -Math.abs(dy); bounced = true; }

        pos.current = { x, y };
        vel.current = { dx, dy };
        dvd.style.left = x + "px";
        dvd.style.top  = y + "px";

        if (bounced) {
          setGlitch(true);
          clearTimeout(glitchTimer.current);
          glitchTimer.current = setTimeout(() => setGlitch(false), 160);
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(glitchTimer.current);
    };
  }, []);

  return (<>
    <section
      ref={sectionRef}
      id="home"
      className="grid-bg"
      onMouseMove={handleMouseMove}
      style={{ minHeight:"100vh", position:"relative", overflow:"hidden", display:"flex", alignItems:"center", padding:"100px 40px 60px", width:"100%" }}
    >
      {/* B1 — Matrix Rain */}
      <div className="hero-bg-only-desktop" style={{ position:"absolute", inset:0, zIndex:0, opacity:0.07, pointerEvents:"none", filter:"blur(0.8px)" }}>
        <MatrixRain style={{ width:"100%", height:"100%" }} />
      </div>

      {/* Particle background */}
      <div className="hero-bg-only-desktop" style={{ position:"absolute", inset:0, zIndex:2, opacity:0.18, pointerEvents:"none" }}>
        <ParticleCanvas style={{ width:"100%", height:"100%" }} />
      </div>

      {/* B4 — Floating code typewriter (right side background) */}
      <div className="hero-bg-only-desktop" style={{ position:"absolute", right:"3%", top:"12%", zIndex:3, opacity:0.32, pointerEvents:"none", maxWidth:260 }}>
        <CodeFloat />
      </div>
      {/* Text — pointer events disabled on full-width wrapper so DVD button stays clickable */}
      <div style={{ maxWidth:"1100px", margin:"0 auto", width:"100%", position:"relative", zIndex:5, pointerEvents:"none" }}>
        <div ref={textRef} style={{ maxWidth:"560px", pointerEvents:"auto" }}>
          {/* Availability badge */}
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:18, animation:"fadeUp 0.5s ease both" }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:"#f59e0b", boxShadow:"0 0 8px #f59e0b88", animation:"pulse-glow 2s ease-in-out infinite" }} />
            <span style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:3, color:"var(--text-muted)", textTransform:"uppercase" }}>
              {t.hero.status}
            </span>
          </div>

          <div className="section-label" style={{ animation:"fadeUp 0.6s ease both" }}>{t.hero.greeting}</div>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(36px,6vw,72px)", fontWeight:900, lineHeight:1.1, marginBottom:"16px", animation:"fadeUp 0.8s 0.2s ease both", opacity:0 }}>
            <GlitchText text="ISFANDIYOR" /><br />
            <span style={{ color:"var(--green)" }}>MADAMINOV</span>
          </h1>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"clamp(13px,2vw,17px)", color:"var(--green-dim)", marginBottom:"28px", animation:"fadeUp 0.8s 0.4s ease both", opacity:0, minHeight:"28px" }}>
            {displayed}{!done && <TerminalCursor />}
          </div>
          <p style={{ color:"var(--text-muted)", lineHeight:1.8, fontSize:"15px", maxWidth:"480px", marginBottom:"36px", animation:"fadeUp 0.8s 0.6s ease both", opacity:0 }}>
            {t.hero.bio}
          </p>
          <div style={{ display:"flex", gap:"16px", flexWrap:"wrap", animation:"fadeUp 0.8s 0.8s ease both", opacity:0 }}>
            <button className="btn btn-primary"   onClick={() => scrollTo("projects")}>{t.hero.cta_projects}</button>
            <button className="btn btn-secondary" onClick={() => scrollTo("contact")}>{t.hero.cta_contact}</button>
            <button className="btn btn-secondary" onClick={() => setResumeOpen(true)}>{t.hero.cta_cv}</button>
          </div>

          {/* Mobile-only rahimovdevs CTA */}
          <a href="https://rahimovdevs.tech" target="_blank" rel="noopener noreferrer"
             className="hero-mobile-cta"
             style={{ textDecoration:"none", display:"none", marginTop:24, animation:"fadeUp 0.8s 1s ease both", opacity:0 }}>
            <div style={{
              border:"1px solid var(--green-dark)", padding:"16px 20px",
              display:"flex", justifyContent:"space-between", alignItems:"center",
              background:"rgba(0,255,136,0.03)",
            }}>
              <div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:3, color:"var(--green)", marginBottom:4 }}>{t.hero.rahimovcard.student_label}</div>
                <div style={{ fontFamily:"var(--font-display)", fontSize:16, fontWeight:900, color:"var(--text)" }}>
                  RAHIMOV<span style={{ color:"var(--green)" }}>DEVS</span>
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:7, height:7, borderRadius:"50%", background:"var(--green)", boxShadow:"0 0 8px var(--green)", animation:"pulse-glow 1.5s ease-in-out infinite" }} />
                <span style={{ fontFamily:"var(--font-mono)", fontSize:12, color:"var(--green)" }}>↗</span>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* DVD button — bounces freely, pauses on hover so it's clickable */}
      <div
        ref={dvdRef}
        className="hero-card-float"
        style={{ position:"absolute", zIndex:4, width:290, pointerEvents:"auto" }}
        onMouseEnter={() => { paused.current = true;  }}
        onMouseLeave={() => { paused.current = false; }}
      >
        <PressButton glitch={glitch} />
      </div>
    </section>

    {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
  </>);
}
