import { useState } from "react";
import Snake      from "../games/Snake";
import TypeRacer  from "../games/TypeRacer";
import Quiz       from "../games/Quiz";
import WhackABug  from "../games/WhackABug";
import MemoryCard from "../games/MemoryCard";

const GAMES = [
  { id:"memory",   label:"Memory",    icon:"🃏", desc:"Match tech card pairs",       component:<MemoryCard/> },
  { id:"snake",    label:"Snake",     icon:"🐍", desc:"Classic snake on a code grid", component:<Snake/>      },
  { id:"typeracer",label:"Type Racer",icon:"⌨️", desc:"Type Flutter snippets fast",   component:<TypeRacer/>  },
  { id:"quiz",     label:"Quiz",      icon:"🧠", desc:"Flutter & Dart trivia",        component:<Quiz/>       },
  { id:"whack",    label:"Whack-a-Bug",icon:"🐛",desc:"Squash bugs before they escape",component:<WhackABug/> },
];

export default function GamesPage({ onBack }) {
  const [active, setActive] = useState("memory");
  const current = GAMES.find(g => g.id === active);

  return (
    <div style={{ width:"100%", minHeight:"100vh", background:"var(--bg)", color:"var(--text)" }}>

      {/* Header */}
      <div style={{ borderBottom:"1px solid var(--border)", background:"var(--bg-nav)", backdropFilter:"blur(12px)", padding:"0 40px", height:"64px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ fontFamily:"var(--font-display)", fontSize:"18px", fontWeight:900, color:"var(--green)", letterSpacing:"4px" }}>
          IM<span style={{ color:"var(--text)", fontWeight:400 }}>_GAMES</span>
        </div>
        <button onClick={onBack} className="btn btn-secondary" style={{ padding:"8px 20px", fontSize:"11px", letterSpacing:"3px" }}>
          ← BACK
        </button>
      </div>

      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"40px" }}>

        {/* Title */}
        <div style={{ marginBottom:"32px" }}>
          <p style={{ fontFamily:"var(--font-mono)", fontSize:"11px", letterSpacing:"4px", color:"var(--green)", marginBottom:"8px" }}>// ARCADE.EXE</p>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(28px,5vw,52px)", fontWeight:900, lineHeight:1.1 }}>
            MINI<br/><span style={{ color:"var(--green)" }}>GAMES_</span>
          </h1>
        </div>

        {/* Game tabs */}
        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"32px" }}>
          {GAMES.map(g => (
            <button
              key={g.id}
              onClick={() => setActive(g.id)}
              style={{
                fontFamily:"var(--font-mono)", fontSize:"12px", letterSpacing:"2px",
                padding:"10px 20px", border:`1px solid ${active===g.id ? "var(--green)" : "var(--border)"}`,
                background: active===g.id ? "rgba(0,255,136,0.08)" : "transparent",
                color: active===g.id ? "var(--green)" : "var(--text-muted)",
                cursor:"pointer", transition:"all 0.3s", textTransform:"uppercase",
                display:"flex", alignItems:"center", gap:"8px",
              }}
            >
              {g.icon} {g.label}
            </button>
          ))}
        </div>

        {/* Active game */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 300px", gap:"32px", alignItems:"start" }}>

          {/* Game area */}
          <div style={{ border:"1px solid var(--border)", background:"var(--bg-card)", padding:"28px" }}>
            <div style={{ marginBottom:"20px", paddingBottom:"16px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", gap:"12px" }}>
              <span style={{ fontSize:"24px" }}>{current.icon}</span>
              <div>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"16px", fontWeight:700, color:"var(--text)" }}>{current.label}</div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"11px", color:"var(--text-muted)", letterSpacing:"1px" }}>{current.desc}</div>
              </div>
            </div>
            {current.component}
          </div>

          {/* Sidebar — game list */}
          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"11px", letterSpacing:"3px", color:"var(--green)", marginBottom:"4px" }}>// ALL GAMES</div>
            {GAMES.map(g => (
              <div key={g.id} onClick={() => setActive(g.id)} style={{
                border:`1px solid ${active===g.id ? "var(--green)" : "var(--border)"}`,
                background: active===g.id ? "rgba(0,255,136,0.05)" : "var(--bg-card)",
                padding:"16px", cursor:"pointer", transition:"all 0.3s",
                display:"flex", alignItems:"center", gap:"12px",
              }}>
                <span style={{ fontSize:"20px" }}>{g.icon}</span>
                <div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"12px", letterSpacing:"2px", color: active===g.id ? "var(--green)" : "var(--text)", textTransform:"uppercase" }}>{g.label}</div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"var(--text-muted)", marginTop:"2px" }}>{g.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}