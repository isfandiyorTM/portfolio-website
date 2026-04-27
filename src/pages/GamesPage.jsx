import { useState, useEffect, useRef, lazy, Suspense, Component } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { crashed: false }; }
  static getDerivedStateFromError() { return { crashed: true }; }
  render() {
    if (this.state.crashed) {
      const { errorMsg = "⚠ LOAD_ERROR — refresh to retry", retryLabel = "RETRY" } = this.props;
      return (
        <div style={{ padding:"40px", textAlign:"center", fontFamily:"var(--font-mono)", fontSize:12, color:"#ff4466", border:"1px solid #ff4466", letterSpacing:2 }}>
          {errorMsg}
          <br />
          <button
            onClick={() => this.setState({ crashed: false })}
            style={{ marginTop:16, padding:"8px 20px", fontFamily:"var(--font-mono)", fontSize:11, background:"transparent", border:"1px solid #ff4466", color:"#ff4466", cursor:"pointer", letterSpacing:2 }}
          >
            {retryLabel}
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const Snake          = lazy(() => import("../games/Snake"));
const TypeRacer      = lazy(() => import("../games/TypeRacer"));
const Quiz           = lazy(() => import("../games/Quiz"));
const WhackABug      = lazy(() => import("../games/WhackABug"));
const MemoryCard     = lazy(() => import("../games/MemoryCard"));
const DebugChallenge = lazy(() => import("../games/DebugChallenge"));
const ReactionTest   = lazy(() => import("../games/ReactionTest"));
const FlappyWidget   = lazy(() => import("../games/FlappyWidget"));
const CodeOrder      = lazy(() => import("../games/CodeOrder"));

const GAME_COMPONENTS = {
  memory: MemoryCard, snake: Snake, typeracer: TypeRacer, quiz: Quiz,
  whack: WhackABug, debug: DebugChallenge, reaction: ReactionTest, flappy: FlappyWidget,
  codeorder: CodeOrder,
};

const GAME_META = {
  memory:    { icon: "🃏", color: "#7c3aed", tag: "MEMORY" },
  snake:     { icon: "🐍", color: "#16a34a", tag: "ARCADE" },
  typeracer: { icon: "⌨️", color: "#0ea5e9", tag: "TYPING" },
  quiz:      { icon: "🧠", color: "#f59e0b", tag: "TRIVIA" },
  whack:     { icon: "🐛", color: "#ef4444", tag: "REFLEX" },
  debug:     { icon: "🔍", color: "#00ff88", tag: "LOGIC" },
  reaction:  { icon: "⚡", color: "#f97316", tag: "REFLEX" },
  flappy:    { icon: "🐦", color: "#06b6d4", tag: "ARCADE" },
  codeorder: { icon: "📋", color: "#00ff88", tag: "LOGIC" },
};

const GAME_IDS = ["memory","snake","typeracer","quiz","whack","debug","reaction","flappy","codeorder"];

const SCORE_MAP = [
  { id:"snake",     icon:"🐍", key:"snakeBest",     unit:"pts",  color:"#16a34a" },
  { id:"typeracer", icon:"⌨️",  key:"typeracerBest", unit:"wpm",  color:"#0ea5e9" },
  { id:"memory",    icon:"🃏", key:"memoryBest",    unit:"moves",color:"#7c3aed" },
  { id:"whack",     icon:"🐛", key:"whackBest",     unit:"pts",  color:"#ef4444" },
  { id:"reaction",  icon:"⚡", key:"reactionBest",  unit:"ms",   color:"#f97316" },
  { id:"flappy",    icon:"🐦", key:"flappyBest",    unit:"pts",  color:"#06b6d4" },
  { id:"codeorder", icon:"📋", key:"codeorderBest", unit:"pts",  color:"#00ff88" },
];

function ScoreDashboard({ onPlay }) {
  const { t } = useLang();
  const g = t.games;
  const scores = SCORE_MAP.map(s => {
    let val = null;
    try { val = localStorage.getItem(s.key); } catch {}
    return { ...s, val };
  }).filter(s => s.val !== null);

  if (scores.length === 0) return null;

  return (
    <div style={{ marginBottom:32 }}>
      <div style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:3, color:"var(--text-muted)", marginBottom:10 }}>
        {g.scores_label}
      </div>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
        {scores.map(s => (
          <button
            key={s.id}
            onClick={() => onPlay(s.id)}
            style={{
              display:"flex", alignItems:"center", gap:7,
              padding:"7px 12px", border:`1px solid ${s.color}44`,
              background:`${s.color}0d`, cursor:"pointer",
              transition:"all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.background = `${s.color}1a`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = `${s.color}44`; e.currentTarget.style.background = `${s.color}0d`; }}
          >
            <span style={{ fontSize:16, lineHeight:1 }}>{s.icon}</span>
            <span style={{ fontFamily:"var(--font-display)", fontSize:15, fontWeight:700, color:s.color, lineHeight:1 }}>{s.val}</span>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:8, letterSpacing:1, color:"var(--text-muted)" }}>{s.unit}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// C3 — Static noise canvas that fades out on load
function NoiseIntro() {
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = 200, H = 120;
    canvas.width = W;
    canvas.height = H;

    let frame = 0;
    const TOTAL = 28;
    let raf;
    let alive = true;

    // Reuse a single ImageData buffer — avoid allocating 200×120×4 bytes every frame
    const img = ctx.createImageData(W, H);

    const draw = () => {
      const alpha = Math.max(0, 1 - frame / TOTAL);
      const a8 = Math.floor(alpha * 210);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.floor(Math.random() * 180);
        img.data[i]   = Math.floor(v * 0.02);
        img.data[i+1] = Math.floor(v * 0.75);
        img.data[i+2] = Math.floor(v * 0.3);
        img.data[i+3] = a8;
      }
      ctx.putImageData(img, 0, 0);
      frame++;
      if (frame <= TOTAL + 8) {
        raf = requestAnimationFrame(draw);
      } else {
        if (alive) setVisible(false);
      }
    };

    raf = requestAnimationFrame(draw);
    return () => { alive = false; cancelAnimationFrame(raf); };
  }, []);

  if (!visible) return null;
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", inset: 0, width: "100%", height: "100%",
        zIndex: 999, pointerEvents: "none", imageRendering: "pixelated",
      }}
    />
  );
}

export default function GamesPage({ onBack }) {
  const [active, setActive] = useState(null);
  const [swept,  setSwept]  = useState(false);
  const { t } = useLang();
  const g = t.games;
  const navigate = useNavigate();

  useEffect(() => {
    const id = setTimeout(() => setSwept(true), 900);
    return () => clearTimeout(id);
  }, []);

  /* Scroll to top whenever the active game changes (open or close) */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [active]);

  // C5 — particle bursts state
  const [bursts, setBursts] = useState([]);

  const games = GAME_IDS.map(id => ({
    id,
    ...g[id],
    ...GAME_META[id],
  }));

  const current  = games.find(x => x.id === active);
  const GameComp = active ? GAME_COMPONENTS[active] : null;

  // C5 — spawn burst particles, then navigate
  const handleCardClick = (gm, e) => {
    const cx = e.clientX;
    const cy = e.clientY;
    const id = Date.now();
    const particles = Array.from({ length: 18 }, (_, i) => {
      const angle = (i / 18) * Math.PI * 2;
      const dist  = 55 + Math.random() * 55;
      return {
        pid: i,
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist,
        size: 4 + Math.random() * 4,
      };
    });
    setBursts(b => [...b, { id, cx, cy, color: gm.color, particles }]);
    setTimeout(() => setBursts(b => b.filter(x => x.id !== id)), 750);
    setActive(gm.id);
  };

  return (
    <>
      <style>{`
        .gp-wrap  { width:100%; min-height:100vh; background:var(--bg); color:var(--text); position:relative; }

        /* bg layer — absolute + overflow:hidden so no child can cause scroll jumps */
        .gp-bg-layer { position:absolute; inset:0; overflow:hidden; pointer-events:none; z-index:0; }
        .gp-grid-overlay {
          position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px);
          background-size:40px 40px;
        }
        .gp-scanline {
          position:absolute; left:0; right:0; height:2px; pointer-events:none;
          background:linear-gradient(transparent, rgba(0,255,136,0.08), transparent);
          animation:scanline 10s linear infinite;
        }

        /* horizontal entry sweep — fixed so it never causes scroll */
        @keyframes gp-sweep-h {
          0%   { transform:translateX(-100%); }
          100% { transform:translateX(200%);  }
        }
        .gp-sweep {
          position:fixed; top:0; left:0; width:100%; height:3px; z-index:500;
          background:linear-gradient(90deg,transparent 0%,var(--green) 40%,#00e5ff 60%,transparent 100%);
          box-shadow:0 0 18px 4px rgba(0,255,136,0.5);
          animation:gp-sweep-h 0.85s cubic-bezier(0.4,0,0.6,1) forwards;
          pointer-events:none;
        }

        /* floating icon animations */
        @keyframes float-h    { 0%,100%{transform:translate(0,0) rotate(-3deg)} 33%{transform:translate(22px,-14px) rotate(4deg)} 66%{transform:translate(-14px,9px) rotate(-6deg)} }
        @keyframes float-diag { 0%,100%{transform:translate(0,0) rotate(0deg)} 50%{transform:translate(20px,-28px) rotate(12deg)} }
        @keyframes float-slow { 0%,100%{transform:translate(0,0) scale(1) rotate(2deg)} 50%{transform:translate(-18px,16px) scale(1.1) rotate(-5deg)} }
        @keyframes float-spin { 0%{transform:translate(0,0) rotate(0deg)} 50%{transform:translate(12px,-18px) rotate(180deg)} 100%{transform:translate(0,0) rotate(360deg)} }

        .gp-header{ border-bottom:1px solid var(--border); background:var(--bg-nav); backdrop-filter:blur(12px); padding:0 24px; height:64px; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:100; }
        .gp-inner { max-width:1100px; margin:0 auto; padding:40px 40px 80px; position:relative; z-index:2; }

        /* ── Card entrance animation ── */
        @keyframes gp-card-in {
          from { opacity:0; transform:translateY(24px) scale(0.96); }
          to   { opacity:1; transform:translateY(0)    scale(1); }
        }

        /* ── Grid ── */
        .gp-grid  { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
        @media(max-width:900px){ .gp-grid{ grid-template-columns:repeat(2,1fr); } }
        @media(max-width:480px){ .gp-grid{ grid-template-columns:repeat(2,1fr); gap:10px; } }

        /* ── C4 — Idle card pulse ── */
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
        /* entrance + idle both run together; idle starts after entrance finishes */
        .gp-card-enter {
          animation: gp-card-in 0.4s cubic-bezier(0.22,1,0.36,1) both,
                     gp-card-idle 3s ease-in-out 0.5s infinite;
        }
        .gp-card:hover.gp-card-enter { animation: none; }
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


        /* ── C1 — Floating icons (absolute so they don't escape the bg-layer) ── */
        .gp-bg-icon {
          position:absolute; pointer-events:none; z-index:0;
          filter:grayscale(0.2);
        }

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

      {/* C3 — Noise intro overlay */}
      <NoiseIntro />

      {/* Horizontal entry sweep */}
      {!swept && <div className="gp-sweep" />}


      {/* C5 — Particle bursts (fixed so they appear over everything) */}
      {bursts.map(burst =>
        burst.particles.map(p => (
          <div
            key={`${burst.id}-${p.pid}`}
            style={{
              position: "fixed",
              left: burst.cx,
              top: burst.cy,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: burst.color,
              boxShadow: `0 0 6px 2px ${burst.color}88`,
              "--tx": `${p.tx}px`,
              "--ty": `${p.ty}px`,
              animation: "burst-particle 0.65s cubic-bezier(0,0.6,0.4,1) forwards",
              pointerEvents: "none",
              zIndex: 600,
            }}
          />
        ))
      )}

      <div className="gp-wrap">
        {/* C1 — Ambient floating game icons (background, only on grid page) */}
        {!active && (
          <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>
            {[...GAME_IDS, ...GAME_IDS].map((id, i) => {
              const ANIMS = ["float-h", "float-diag", "float-slow", "float-spin"];
              return (
                <div
                  key={`bg-${id}-${i}`}
                  className="gp-bg-icon"
                  style={{
                    left:     `${(i * 11 + 7) % 88}%`,
                    top:      `${(i * 19 + 5) % 82}%`,
                    fontSize: `${26 + (i % 5) * 10}px`,
                    opacity:  0.1 + (i % 6) * 0.028,
                    animationName:            ANIMS[i % 4],
                    animationDuration:        `${6 + (i % 6) * 2}s`,
                    animationDelay:           `${-(i * 0.8)}s`,
                    animationTimingFunction:  "ease-in-out",
                    animationIterationCount:  "infinite",
                  }}
                >
                  {GAME_META[id].icon}
                </div>
              );
            })}
          </div>
        )}

        {/* Header */}
        <div className="gp-header">
          <div style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:900, color:"var(--green)", letterSpacing:"4px" }}>
            IM<span style={{ color:"var(--text)", fontWeight:400 }}>_GAMES</span>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={() => navigate("/scores")} className="btn btn-secondary" style={{ padding:"8px 16px", fontSize:"11px", letterSpacing:"2px" }}>
              {g.scores_btn}
            </button>
            <button onClick={onBack} className="btn btn-secondary" style={{ padding:"8px 20px", fontSize:"11px", letterSpacing:"3px" }}>
              {g.back}
            </button>
          </div>
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
                <p style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"var(--text-muted)", letterSpacing:2, marginBottom:28, animation:"fadeUp 0.5s 0.2s ease both", opacity:0 }}>
                  {games.length} {g.click_to_play}
                </p>
                <ScoreDashboard onPlay={(id) => setActive(id)} />
              </div>

              <div className="gp-grid">
                {games.map((gm, i) => (
                  <div
                    key={gm.id}
                    className="gp-card gp-card-enter"
                    style={{
                      "--accent": gm.color,
                      "--accent-dim": gm.color + "66",
                      animationDelay: `${i * 60}ms`,
                    }}
                    onClick={(e) => handleCardClick(gm, e)}
                  >
                    <div className="gp-card-scan" />
                    <span className="gp-card-tag" style={{ color: gm.color }}>{gm.tag}</span>
                    <div className="gp-card-icon">{gm.icon}</div>
                    <div className="gp-card-name">{gm.label}</div>
                    <div className="gp-card-desc">{gm.desc}</div>
                    <div className="gp-card-play" style={{ "--accent": gm.color }}>{g.play_card}</div>
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
                  {g.game_back}
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

              <ErrorBoundary key={active} errorMsg={g.game_error} retryLabel={g.game_retry}>
                <Suspense fallback={
                  <div style={{ padding:"60px", textAlign:"center", fontFamily:"var(--font-mono)", fontSize:12, letterSpacing:3, color:"var(--text-muted)" }}>
                    {g.loading}
                  </div>
                }>
                  <GameComp key={active} />
                </Suspense>
              </ErrorBoundary>

              {/* Game switcher strip */}
              <div style={{ marginTop:40, paddingTop:24, borderTop:"1px solid var(--border)" }}>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:3, color:"var(--text-muted)", marginBottom:14 }}>{g.other_games}</div>
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
