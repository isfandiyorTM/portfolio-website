import { useState } from "react";
import Snake      from "../games/Snake";
import TypeRacer  from "../games/TypeRacer";
import Quiz       from "../games/Quiz";
import WhackABug  from "../games/WhackABug";
import MemoryCard from "../games/MemoryCard";

const GAMES = [
  { id:"memory",    label:"Memory",     icon:"🃏", desc:"Match tech card pairs",          component:MemoryCard },
  { id:"snake",     label:"Snake",      icon:"🐍", desc:"Classic snake on a code grid",   component:Snake      },
  { id:"typeracer", label:"Type Racer", icon:"⌨️", desc:"Type Flutter snippets fast",     component:TypeRacer  },
  { id:"quiz",      label:"Quiz",       icon:"🧠", desc:"Flutter & Dart trivia",          component:Quiz       },
  { id:"whack",     label:"Whack-a-Bug",icon:"🐛", desc:"Squash bugs before they escape", component:WhackABug  },
];

export default function GamesPage({ onBack }) {
  const [active, setActive] = useState("memory");
  const current = GAMES.find(g => g.id === active);
  const GameComponent = current.component;

  return (
    <>
      <style>{`
        .gp-wrap { width:100%; min-height:100vh; background:var(--bg); color:var(--text); }

        /* ── Header ── */
        .gp-header {
          border-bottom:1px solid var(--border);
          background:var(--bg-nav);
          backdrop-filter:blur(12px);
          padding:0 24px;
          height:64px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          position:sticky;
          top:0;
          z-index:100;
        }

        /* ── Inner ── */
        .gp-inner { max-width:1100px; margin:0 auto; padding:32px 40px 60px; }

        /* ── Tab strip (visible on mobile, hidden desktop) ── */
        .gp-tabs {
          display:none;
          overflow-x:auto;
          gap:8px;
          padding-bottom:4px;
          scrollbar-width:none;
          -ms-overflow-style:none;
          margin-bottom:20px;
        }
        .gp-tabs::-webkit-scrollbar { display:none; }
        .gp-tab {
          font-family:var(--font-mono);
          font-size:12px;
          letter-spacing:2px;
          padding:10px 16px;
          border:1px solid var(--border);
          background:transparent;
          color:var(--text-muted);
          cursor:pointer;
          transition:all 0.3s;
          text-transform:uppercase;
          display:flex;
          align-items:center;
          gap:6px;
          white-space:nowrap;
          flex-shrink:0;
        }
        .gp-tab.active { border-color:var(--green); background:rgba(0,255,136,0.08); color:var(--green); }

        /* ── Layout ── */
        .gp-layout { display:grid; grid-template-columns:1fr 260px; gap:24px; align-items:start; }

        /* ── Game panel ── */
        .gp-panel { border:1px solid var(--border); background:var(--bg-card); padding:24px; }
        .gp-panel-header { margin-bottom:20px; padding-bottom:14px; border-bottom:1px solid var(--border); display:flex; align-items:center; gap:12px; }

        /* ── Sidebar ── */
        .gp-sidebar { display:flex; flex-direction:column; gap:10px; }
        .gp-sidebar-label { font-family:var(--font-mono); font-size:11px; letter-spacing:3px; color:var(--green); margin-bottom:4px; }
        .gp-sidebar-item { border:1px solid var(--border); background:var(--bg-card); padding:14px 16px; cursor:pointer; transition:all 0.3s; display:flex; align-items:center; gap:12px; }
        .gp-sidebar-item:hover, .gp-sidebar-item.active { border-color:var(--green); background:rgba(0,255,136,0.05); }
        .gp-sidebar-item-title { font-family:var(--font-mono); font-size:12px; letter-spacing:2px; text-transform:uppercase; transition:color 0.3s; }
        .gp-sidebar-item-desc  { font-family:var(--font-mono); font-size:10px; color:var(--text-muted); margin-top:2px; }

        /* ── Mobile ── */
        @media (max-width:768px) {
          .gp-inner   { padding:16px 16px 48px; }
          .gp-tabs    { display:flex !important; }
          .gp-layout  { grid-template-columns:1fr !important; gap:0; }
          .gp-sidebar { display:none !important; }
          .gp-panel   { padding:16px; border-left:none; border-right:none; }
          .gp-title   { font-size:26px !important; margin-bottom:4px !important; }
        }
      `}</style>

      <div className="gp-wrap">

        {/* Sticky header */}
        <div className="gp-header">
          <div style={{ fontFamily:"var(--font-display)", fontSize:"18px", fontWeight:900, color:"var(--green)", letterSpacing:"4px" }}>
            IM<span style={{ color:"var(--text)", fontWeight:400 }}>_GAMES</span>
          </div>
          <button onClick={onBack} className="btn btn-secondary" style={{ padding:"8px 20px", fontSize:"11px", letterSpacing:"3px" }}>
            ← BACK
          </button>
        </div>

        <div className="gp-inner">

          {/* Page title */}
          <div style={{ marginBottom:"24px" }}>
            <p style={{ fontFamily:"var(--font-mono)", fontSize:"11px", letterSpacing:"4px", color:"var(--green)", marginBottom:"6px" }}>// ARCADE.EXE</p>
            <h1 className="gp-title" style={{ fontFamily:"var(--font-display)", fontSize:"clamp(26px,5vw,48px)", fontWeight:900, lineHeight:1.1 }}>
              MINI <span style={{ color:"var(--green)" }}>GAMES_</span>
            </h1>
          </div>

          {/* Mobile tab strip */}
          <div className="gp-tabs">
            {GAMES.map(g => (
              <button key={g.id} className={`gp-tab ${active===g.id?"active":""}`} onClick={() => setActive(g.id)}>
                {g.icon} {g.label}
              </button>
            ))}
          </div>

          {/* Main layout */}
          <div className="gp-layout">

            {/* Game panel */}
            <div className="gp-panel">
              <div className="gp-panel-header">
                <span style={{ fontSize:"24px" }}>{current.icon}</span>
                <div>
                  <div style={{ fontFamily:"var(--font-display)", fontSize:"15px", fontWeight:700, color:"var(--text)" }}>{current.label}</div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"11px", color:"var(--text-muted)", letterSpacing:"1px" }}>{current.desc}</div>
                </div>
              </div>
              <GameComponent key={active} />
            </div>

            {/* Sidebar (desktop only) */}
            <div className="gp-sidebar">
              <div className="gp-sidebar-label">// ALL GAMES</div>
              {GAMES.map(g => (
                <div key={g.id} className={`gp-sidebar-item ${active===g.id?"active":""}`} onClick={() => setActive(g.id)}>
                  <span style={{ fontSize:"20px" }}>{g.icon}</span>
                  <div>
                    <div className="gp-sidebar-item-title" style={{ color: active===g.id ? "var(--green)" : "var(--text)" }}>{g.label}</div>
                    <div className="gp-sidebar-item-desc">{g.desc}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}