import { useState } from "react";
import { useLang } from "../i18n/LanguageContext";
import Snake      from "../games/Snake";
import TypeRacer  from "../games/TypeRacer";
import Quiz       from "../games/Quiz";
import WhackABug  from "../games/WhackABug";
import MemoryCard from "../games/MemoryCard";

const GAME_COMPONENTS = { memory:MemoryCard, snake:Snake, typeracer:TypeRacer, quiz:Quiz, whack:WhackABug };
const GAME_IDS = ["memory","snake","typeracer","quiz","whack"];

export default function GamesPage({ onBack }) {
  const [active, setActive] = useState("memory");
  const { t } = useLang();
  const g = t.games;
  const GameComponent = GAME_COMPONENTS[active];

  const games = GAME_IDS.map(id => ({ id, ...g[id], icon: {memory:"🃏",snake:"🐍",typeracer:"⌨️",quiz:"🧠",whack:"🐛"}[id] }));
  const current = games.find(x => x.id === active);

  return (
    <>
      <style>{`
        .gp-wrap { width:100%; min-height:100vh; background:var(--bg); color:var(--text); }
        .gp-header { border-bottom:1px solid var(--border); background:var(--bg-nav); backdrop-filter:blur(12px); padding:0 24px; height:64px; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:100; }
        .gp-inner { max-width:1100px; margin:0 auto; padding:32px 40px 60px; }
        .gp-tabs { display:none; overflow-x:auto; gap:8px; padding-bottom:4px; scrollbar-width:none; -ms-overflow-style:none; margin-bottom:20px; }
        .gp-tabs::-webkit-scrollbar { display:none; }
        .gp-tab { font-family:var(--font-mono); font-size:12px; letter-spacing:2px; padding:10px 16px; border:1px solid var(--border); background:transparent; color:var(--text-muted); cursor:pointer; transition:all 0.3s; text-transform:uppercase; display:flex; align-items:center; gap:6px; white-space:nowrap; flex-shrink:0; }
        .gp-tab.active { border-color:var(--green); background:rgba(0,255,136,0.08); color:var(--green); }
        .gp-layout { display:grid; grid-template-columns:1fr 260px; gap:24px; align-items:start; }
        .gp-panel { border:1px solid var(--border); background:var(--bg-card); padding:24px; }
        .gp-panel-header { margin-bottom:20px; padding-bottom:14px; border-bottom:1px solid var(--border); display:flex; align-items:center; gap:12px; }
        .gp-sidebar { display:flex; flex-direction:column; gap:10px; }
        .gp-sidebar-item { border:1px solid var(--border); background:var(--bg-card); padding:14px 16px; cursor:pointer; transition:all 0.3s; display:flex; align-items:center; gap:12px; }
        .gp-sidebar-item:hover, .gp-sidebar-item.active { border-color:var(--green); background:rgba(0,255,136,0.05); }
        @media(max-width:768px) {
          .gp-inner { padding:16px 16px 48px; }
          .gp-tabs { display:flex !important; }
          .gp-layout { grid-template-columns:1fr !important; }
          .gp-sidebar { display:none !important; }
          .gp-panel { padding:16px; }
        }
      `}</style>

      <div className="gp-wrap">
        <div className="gp-header">
          <div style={{ fontFamily:"var(--font-display)", fontSize:"18px", fontWeight:900, color:"var(--green)", letterSpacing:"4px" }}>
            IM<span style={{ color:"var(--text)", fontWeight:400 }}>_GAMES</span>
          </div>
          <button onClick={onBack} className="btn btn-secondary" style={{ padding:"8px 20px", fontSize:"11px", letterSpacing:"3px" }}>{g.back}</button>
        </div>

        <div className="gp-inner">
          <div style={{ marginBottom:"24px" }}>
            <p style={{ fontFamily:"var(--font-mono)", fontSize:"11px", letterSpacing:"4px", color:"var(--green)", marginBottom:"6px" }}>{g.label}</p>
            <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(26px,5vw,48px)", fontWeight:900, lineHeight:1.1 }}>
              {g.heading} <span style={{ color:"var(--green)" }}>{g.heading2}</span>
            </h1>
          </div>

          {/* Mobile tabs */}
          <div className="gp-tabs">
            {games.map(gm => (
              <button key={gm.id} className={`gp-tab ${active===gm.id?"active":""}`} onClick={() => setActive(gm.id)}>
                {gm.icon} {gm.label}
              </button>
            ))}
          </div>

          <div className="gp-layout">
            <div className="gp-panel">
              <div className="gp-panel-header">
                <span style={{ fontSize:"24px" }}>{current.icon}</span>
                <div>
                  <div style={{ fontFamily:"var(--font-display)", fontSize:"15px", fontWeight:700, color:"var(--text)" }}>{current.label}</div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"11px", color:"var(--text-muted)" }}>{current.desc}</div>
                </div>
              </div>
              <GameComponent key={active} />
            </div>

            <div className="gp-sidebar">
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"11px", letterSpacing:"3px", color:"var(--green)", marginBottom:"4px" }}>{g.all_games}</div>
              {games.map(gm => (
                <div key={gm.id} className={`gp-sidebar-item ${active===gm.id?"active":""}`} onClick={() => setActive(gm.id)}>
                  <span style={{ fontSize:"20px" }}>{gm.icon}</span>
                  <div>
                    <div style={{ fontFamily:"var(--font-mono)", fontSize:"12px", letterSpacing:"2px", color:active===gm.id?"var(--green)":"var(--text)", textTransform:"uppercase" }}>{gm.label}</div>
                    <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"var(--text-muted)", marginTop:"2px" }}>{gm.desc}</div>
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