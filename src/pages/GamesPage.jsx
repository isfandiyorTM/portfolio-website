import { useState } from "react";
import { useLang } from "../i18n/LanguageContext";
import Snake           from "../games/Snake";
import TypeRacer       from "../games/TypeRacer";
import Quiz            from "../games/Quiz";
import WhackABug       from "../games/WhackABug";
import MemoryCard      from "../games/MemoryCard";
import DebugChallenge  from "../games/DebugChallenge";
import ReactionTest    from "../games/ReactionTest";
import FlappyWidget    from "../games/FlappyWidget";

const GAME_COMPONENTS = {
  memory: MemoryCard, snake: Snake, typeracer: TypeRacer, quiz: Quiz,
  whack: WhackABug, debug: DebugChallenge, reaction: ReactionTest, flappy: FlappyWidget,
};

const GAME_META = {
  memory:   { icon: "🃏", color: "#7c3aed", tag: "MEMORY" },
  snake:    { icon: "🐍", color: "#16a34a", tag: "ARCADE" },
  typeracer:{ icon: "⌨️", color: "#0ea5e9", tag: "TYPING" },
  quiz:     { icon: "🧠", color: "#f59e0b", tag: "TRIVIA" },
  whack:    { icon: "🐛", color: "#ef4444", tag: "REFLEX" },
  debug:    { icon: "🔍", color: "#00ff88", tag: "LOGIC" },
  reaction: { icon: "⚡", color: "#f97316", tag: "REFLEX" },
  flappy:   { icon: "🐦", color: "#06b6d4", tag: "ARCADE" },
};

const GAME_IDS = ["memory","snake","typeracer","quiz","whack","debug","reaction","flappy"];

export default function GamesPage({ onBack }) {
  const [active, setActive] = useState(null);
  const { t } = useLang();
  const g = t.games;

  const games = GAME_IDS.map(id => ({
    id,
    ...g[id],
    ...GAME_META[id],
  }));

  const current   = games.find(x => x.id === active);
  const GameComp  = active ? GAME_COMPONENTS[active] : null;

  return (
    <>
      <style>{`
        .gp-wrap  { width:100%; min-height:100vh; background:var(--bg); color:var(--text); position:relative; }

        /* grid-bg overlay identical to hero */
        .gp-wrap::before {
          content:''; position:fixed; inset:0; pointer-events:none; z-index:0;
          background-image:
            linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px);
          background-size:40px 40px;
        }
        /* scanline sweep */
        .gp-wrap::after {
          content:''; position:fixed; left:0; right:0; height:2px; pointer-events:none; z-index:1;
          background:linear-gradient(transparent, rgba(0,255,136,0.06), transparent);
          animation:scanline 10s linear infinite;
        }

        .gp-header{ border-bottom:1px solid var(--border); background:var(--bg-nav); backdrop-filter:blur(12px); padding:0 24px; height:64px; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:100; }
        .gp-inner { max-width:1100px; margin:0 auto; padding:40px 40px 80px; position:relative; z-index:2; }

        /* ── Card entrance animation ── */
        @keyframes gp-card-in {
          from { opacity:0; transform:translateY(24px) scale(0.96); }
          to   { opacity:1; transform:translateY(0)    scale(1); }
        }
        .gp-card-enter {
          animation: gp-card-in 0.4s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* ── Grid ── */
        .gp-grid  { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
        @media(max-width:900px){ .gp-grid{ grid-template-columns:repeat(2,1fr); } }
        @media(max-width:480px){ .gp-grid{ grid-template-columns:repeat(2,1fr); gap:10px; } }

        .gp-card  {
          position:relative; overflow:hidden;
          border:1px solid var(--border); background:var(--bg-card);
          padding:22px 16px 18px;
          cursor:pointer;
          transition:transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
          display:flex; flex-direction:column; gap:8px;
        }
        .gp-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:var(--accent); opacity:0; transition:opacity 0.22s;
        }
        .gp-card:hover { transform:translateY(-4px); border-color:var(--accent-dim); box-shadow:0 8px 32px rgba(0,0,0,0.4); }
        .gp-card:hover::before { opacity:1; }
        .gp-card-scan {
          position:absolute; inset:0; pointer-events:none;
          background:linear-gradient(transparent 50%, rgba(0,0,0,0.03) 50%);
          background-size:100% 4px; opacity:0; transition:opacity 0.22s;
        }
        .gp-card:hover .gp-card-scan { opacity:1; }
        .gp-card-tag {
          position:absolute; top:12px; right:12px;
          font-family:var(--font-mono); font-size:8px; letter-spacing:2px;
          padding:3px 7px; border:1px solid currentColor; opacity:0.5;
        }
        .gp-card-icon { font-size:40px; line-height:1; }
        .gp-card-name { font-family:var(--font-display); font-size:13px; font-weight:700; letter-spacing:2px; color:var(--text); }
        .gp-card-desc { font-family:var(--font-mono); font-size:10px; color:var(--text-muted); line-height:1.5; flex:1; }
        .gp-card-play {
          font-family:var(--font-mono); font-size:9px; letter-spacing:3px;
          color:var(--accent); display:flex; align-items:center; gap:4px;
          opacity:0; transform:translateY(4px); transition:opacity 0.2s, transform 0.2s;
        }
        .gp-card:hover .gp-card-play { opacity:1; transform:translateY(0); }

        /* ── Game view ── */
        .gp-game-header {
          display:flex; align-items:center; gap:16px; margin-bottom:32px;
          padding-bottom:20px; border-bottom:1px solid var(--border);
        }
        .gp-back {
          font-family:var(--font-mono); font-size:10px; letter-spacing:3px;
          padding:9px 16px; border:1px solid var(--border); background:transparent;
          color:var(--text-muted); cursor:pointer; transition:all 0.2s;
          display:flex; align-items:center; gap:6px; white-space:nowrap;
        }
        .gp-back:hover { border-color:var(--green); color:var(--green); }
        .gp-breadcrumb { font-family:var(--font-mono); font-size:10px; color:var(--text-muted); letter-spacing:2px; }
        .gp-breadcrumb span { color:var(--green); }

        /* ── Heading area ── */
        .gp-hero { margin-bottom:40px; }

        @media(max-width:600px){
          .gp-inner{ padding:12px 12px 60px; }
          .gp-grid { gap:8px; }
          .gp-card { padding:14px 10px 12px; gap:6px; }
          .gp-card-icon { font-size:28px; }
          .gp-card-name { font-size:10px; letter-spacing:1px; }
          .gp-card-desc { display:none; }
          .gp-card-tag  { font-size:7px; padding:2px 5px; top:8px; right:8px; }
          .gp-game-header { margin-bottom:16px; padding-bottom:12px; gap:10px; }
        }
      `}</style>

      <div className="gp-wrap">
        {/* Header */}
        <div className="gp-header">
          <div style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:900, color:"var(--green)", letterSpacing:"4px" }}>
            IM<span style={{ color:"var(--text)", fontWeight:400 }}>_GAMES</span>
          </div>
          <button onClick={onBack} className="btn btn-secondary" style={{ padding:"8px 20px", fontSize:"11px", letterSpacing:"3px" }}>
            {g.back}
          </button>
        </div>

        <div className="gp-inner">

          {/* ── Grid landing ── */}
          {!active && (
            <>
              <div className="gp-hero">
                <p style={{ fontFamily:"var(--font-mono)", fontSize:11, letterSpacing:4, color:"var(--green)", marginBottom:8, animation:"fadeUp 0.5s ease both" }}>{g.label}</p>
                <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(26px,5vw,48px)", fontWeight:900, lineHeight:1.1, marginBottom:12, animation:"fadeUp 0.5s 0.1s ease both", opacity:0 }}>
                  {g.heading} <span style={{ color:"var(--green)" }}>{g.heading2}</span>
                </h1>
                <p style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"var(--text-muted)", letterSpacing:2, animation:"fadeUp 0.5s 0.2s ease both", opacity:0 }}>
                  {games.length} games — click any card to play
                </p>
              </div>

              <div className="gp-grid">
                {games.map((gm, i) => (
                  <div
                    key={gm.id}
                    className="gp-card gp-card-enter"
                    style={{ "--accent": gm.color, "--accent-dim": gm.color + "66", animationDelay: `${i * 60}ms` }}
                    onClick={() => setActive(gm.id)}
                  >
                    <div className="gp-card-scan" />
                    <span className="gp-card-tag" style={{ color: gm.color }}>{gm.tag}</span>
                    <div className="gp-card-icon">{gm.icon}</div>
                    <div className="gp-card-name">{gm.label}</div>
                    <div className="gp-card-desc">{gm.desc}</div>
                    <div className="gp-card-play" style={{ "--accent": gm.color }}>PLAY →</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── Active game view ── */}
          {active && current && GameComp && (
            <>
              <div className="gp-game-header">
                <button className="gp-back" onClick={() => setActive(null)}>
                  ← BACK
                </button>
                <div>
                  <div className="gp-breadcrumb">
                    GAMES / <span>{current.label}</span>
                  </div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--text-muted)", marginTop:3 }}>
                    {current.desc}
                  </div>
                </div>
                <div style={{ marginLeft:"auto", fontSize:32 }}>{current.icon}</div>
              </div>

              <GameComp key={active} />

              {/* Game switcher strip */}
              <div style={{ marginTop:40, paddingTop:24, borderTop:"1px solid var(--border)" }}>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:3, color:"var(--text-muted)", marginBottom:14 }}>OTHER GAMES</div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {games.filter(gm => gm.id !== active).map(gm => (
                    <button
                      key={gm.id}
                      onClick={() => setActive(gm.id)}
                      style={{
                        fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:2,
                        padding:"7px 14px", border:"1px solid var(--border)",
                        background:"transparent", color:"var(--text-muted)",
                        cursor:"pointer", transition:"all 0.2s",
                        display:"flex", alignItems:"center", gap:6,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = gm.color; e.currentTarget.style.color = gm.color; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
                    >
                      {gm.icon} {gm.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}
