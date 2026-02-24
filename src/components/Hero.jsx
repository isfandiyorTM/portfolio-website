import { useState, useEffect } from "react";
import { useTypewriter } from "../hooks/useTypewriter";
import { useLang } from "../i18n/LanguageContext";

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

export default function Hero() {
  const { t } = useLang();
  const { displayed, done } = useTypewriter(t.hero.title, 800);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  return (
    <section id="home" className="grid-bg" style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:"100px 40px 60px", position:"relative", width:"100%" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto", width:"100%", position:"relative" }}>
        <div style={{ position:"absolute", right:"5%", top:"50%", transform:"translateY(-50%)", width:"300px", height:"300px", borderRadius:"50%", border:"1px solid var(--green-dark)", display:"flex", alignItems:"center", justifyContent:"center", opacity:0.4, pointerEvents:"none" }}>
          <div className="hex-spinner" />
        </div>
        <div style={{ maxWidth:"680px" }}>
          <div className="section-label" style={{ animation:"fadeUp 0.6s ease both" }}>{t.hero.greeting}</div>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(36px,6vw,72px)", fontWeight:900, lineHeight:1.1, marginBottom:"16px", animation:"fadeUp 0.8s 0.2s ease both", opacity:0 }}>
            <GlitchText text="ISFANDIYOR" /><br />
            <span style={{ color:"var(--green)" }}>MADAMINOV</span>
          </h1>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"clamp(13px,2vw,17px)", color:"var(--green-dim)", marginBottom:"28px", animation:"fadeUp 0.8s 0.4s ease both", opacity:0, minHeight:"28px" }}>
            {displayed}{!done && <TerminalCursor />}
          </div>
          <p style={{ color:"var(--text-muted)", lineHeight:1.8, fontSize:"15px", maxWidth:"520px", marginBottom:"36px", animation:"fadeUp 0.8s 0.6s ease both", opacity:0 }}>
            {t.hero.bio}
          </p>
          <div style={{ display:"flex", gap:"16px", flexWrap:"wrap", animation:"fadeUp 0.8s 0.8s ease both", opacity:0 }}>
            <button className="btn btn-primary"   onClick={() => scrollTo("projects")}>{t.hero.cta_projects}</button>
            <button className="btn btn-secondary" onClick={() => scrollTo("contact")}>{t.hero.cta_contact}</button>
          </div>
        </div>
      </div>
    </section>
  );
}