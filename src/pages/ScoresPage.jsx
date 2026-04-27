import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLeaderboard, supabaseReady } from "../lib/scores";
import { useLang } from "../i18n/LanguageContext";

const LOCAL_SCORES = [
  { id:"snake",     key:"snakeBest",     label:"Snake",     icon:"🐍", unit:"pts",   color:"#16a34a", higherBetter:true  },
  { id:"typeracer", key:"typeracerBest", label:"TypeRacer", icon:"⌨️",  unit:"wpm",   color:"#0ea5e9", higherBetter:true  },
  { id:"memory",    key:"memoryBest",    label:"Memory",    icon:"🃏", unit:"moves", color:"#7c3aed", higherBetter:false },
  { id:"whack",     key:"whackBest",     label:"Whack-Bug", icon:"🐛", unit:"pts",   color:"#ef4444", higherBetter:true  },
  { id:"reaction",  key:"reactionBest",  label:"Reaction",  icon:"⚡", unit:"ms",    color:"#f97316", higherBetter:false },
  { id:"flappy",    key:"flappyBest",    label:"Flappy",    icon:"🐦", unit:"pts",   color:"#06b6d4", higherBetter:true  },
  { id:"codeorder", key:"codeorderBest", label:"CodeOrder", icon:"📋", unit:"pts",   color:"#00ff88", higherBetter:true  },
];

function LocalBoard() {
  const { t } = useLang();
  const scores = LOCAL_SCORES.map(s => {
    let val = null;
    try { val = localStorage.getItem(s.key); } catch {}
    return { ...s, val };
  });

  const hasAny = scores.some(s => s.val !== null);

  return (
    <div style={{ marginBottom:40 }}>
      <div style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:3, color:"var(--text-muted)", marginBottom:14 }}>
        // YOUR_LOCAL_BEST_SCORES
      </div>
      {!hasAny ? (
        <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"var(--text-muted)", padding:"24px 0", textAlign:"center", border:"1px solid var(--border)" }}>
          No scores yet — play some games first!
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:10 }}>
          {scores.map(s => (
            <div
              key={s.id}
              style={{
                border:`1px solid ${s.val !== null ? s.color+"44" : "var(--border)"}`,
                background: s.val !== null ? `${s.color}0d` : "var(--bg-card)",
                padding:"14px 16px",
                display:"flex", flexDirection:"column", gap:6,
              }}
            >
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:20 }}>{s.icon}</span>
                <span style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:2, color:"var(--text-muted)" }}>{s.label.toUpperCase()}</span>
              </div>
              {s.val !== null ? (
                <div style={{ display:"flex", alignItems:"baseline", gap:5 }}>
                  <span style={{ fontFamily:"var(--font-display)", fontSize:26, fontWeight:900, color:s.color, lineHeight:1 }}>{s.val}</span>
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--text-muted)", letterSpacing:1 }}>{s.unit}</span>
                </div>
              ) : (
                <span style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"var(--border)", letterSpacing:2 }}>---</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function GlobalBoard({ gameId }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const meta = LOCAL_SCORES.find(s => s.id === gameId);

  useEffect(() => {
    setLoading(true);
    getLeaderboard(gameId, 10).then(data => {
      setRows(data);
      setLoading(false);
    });
  }, [gameId]);

  if (!supabaseReady) {
    return (
      <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--text-muted)", padding:"20px", textAlign:"center", border:"1px solid var(--border)" }}>
        Global leaderboard not configured — add Supabase env vars to enable.
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--text-muted)", padding:"20px", textAlign:"center", letterSpacing:3 }}>
        LOADING...
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--text-muted)", padding:"20px", textAlign:"center", border:"1px solid var(--border)" }}>
        No global scores yet for {meta?.label}.
      </div>
    );
  }

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
      {rows.map((row, i) => (
        <div
          key={i}
          style={{
            display:"flex", alignItems:"center", gap:12,
            padding:"8px 14px",
            border:"1px solid var(--border)",
            background: i === 0 ? `${meta?.color}12` : "var(--bg-card)",
            borderColor: i === 0 ? `${meta?.color}44` : "var(--border)",
          }}
        >
          <span style={{ fontFamily:"var(--font-mono)", fontSize:10, color: i===0?"#ffd700": i===1?"#c0c0c0": i===2?"#cd7f32":"var(--text-muted)", minWidth:20, textAlign:"right" }}>
            #{i+1}
          </span>
          <span style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:700, color: meta?.color ?? "var(--green)", flex:1 }}>
            {row.score}
          </span>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:8, color:"var(--text-muted)" }}>{meta?.unit}</span>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:8, color:"var(--text-muted)" }}>
            {new Date(row.created_at).toLocaleDateString()}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ScoresPage() {
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState("snake");

  return (
    <>
      <style>{`
        .sp-wrap { width:100%; min-height:100vh; background:var(--bg); color:var(--text); }
        .sp-header { border-bottom:1px solid var(--border); background:var(--bg-nav); backdrop-filter:blur(12px); padding:0 24px; height:64px; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:100; }
        .sp-inner { max-width:900px; margin:0 auto; padding:40px 24px 80px; }
        .sp-tab { fontFamily:var(--font-mono); font-size:10px; letter-spacing:2px; padding:8px 14px; border:1px solid var(--border); background:transparent; color:var(--text-muted); cursor:pointer; transition:all 0.2s; display:flex; align-items:center; gap:6px; }
        .sp-tab.active { border-color:var(--green); color:var(--green); background:rgba(0,255,136,0.06); }
        .sp-tab:hover:not(.active) { border-color:var(--text-muted); color:var(--text); }
        @media(max-width:600px){
          .sp-inner{ padding:20px 12px 60px; }
        }
      `}</style>
      <div className="sp-wrap">
        <div className="sp-header">
          <div style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:900, color:"var(--green)", letterSpacing:"4px" }}>
            IM<span style={{ color:"var(--text)", fontWeight:400 }}>_SCORES</span>
          </div>
          <button className="btn btn-secondary" onClick={() => navigate("/games")} style={{ padding:"8px 20px", fontSize:"11px", letterSpacing:"3px" }}>
            ← GAMES
          </button>
        </div>

        <div className="sp-inner">
          <LocalBoard />

          {/* Global leaderboard */}
          <div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:3, color:"var(--text-muted)", marginBottom:14 }}>
              // GLOBAL_LEADERBOARD
            </div>

            {/* Game tabs */}
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:16 }}>
              {LOCAL_SCORES.map(s => (
                <button
                  key={s.id}
                  className={`sp-tab${activeGame === s.id ? " active" : ""}`}
                  onClick={() => setActiveGame(s.id)}
                  style={{ fontFamily:"var(--font-mono)" }}
                >
                  {s.icon} {s.label}
                </button>
              ))}
            </div>

            <GlobalBoard gameId={activeGame} />
          </div>
        </div>
      </div>
    </>
  );
}
