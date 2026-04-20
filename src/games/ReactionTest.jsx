import { useState, useEffect, useRef } from "react";
import { useLang } from "../i18n/LanguageContext";

const ROUNDS = 5;
const MIN_WAIT = 1500;
const MAX_WAIT = 4500;

const RATINGS = [
  [180,  "Inhuman. Are you a robot?"],
  [220,  "Legendary reflexes. 🔥"],
  [260,  "Pro gamer detected."],
  [300,  "Very fast. Solid."],
  [360,  "Above average. Nice."],
  [430,  "Average human reaction."],
  [Infinity, "A little slow, but honest."],
];

function getRating(ms) {
  return RATINGS.find(([threshold]) => ms <= threshold)[1];
}

export default function ReactionTest() {
  const { t } = useLang();
  const g = t.games;
  const [phase,   setPhase]   = useState("idle");   // idle | waiting | go | early | result | done
  const [times,   setTimes]   = useState([]);
  const [current, setCurrent] = useState(0);
  const [best,    setBest]    = useState(() => {
    try { const s = localStorage.getItem("reactionBest"); return s ? parseInt(s) : null; } catch { return null; }
  });
  const startRef  = useRef(null);
  const timerRef  = useRef(null);

  const startRound = () => {
    setPhase("waiting");
    const delay = MIN_WAIT + Math.random() * (MAX_WAIT - MIN_WAIT);
    timerRef.current = setTimeout(() => {
      startRef.current = performance.now();
      setPhase("go");
    }, delay);
  };

  const handleClick = () => {
    if (phase === "idle" || phase === "result" || phase === "done") {
      if (phase === "done") reset();
      else startRound();
      return;
    }
    if (phase === "waiting") {
      clearTimeout(timerRef.current);
      setPhase("early");
      return;
    }
    if (phase === "go") {
      const ms = Math.round(performance.now() - startRef.current);
      const next = [...times, ms];
      setTimes(next);
      setCurrent(next.length);

      const newBest = best === null || ms < best ? ms : best;
      if (newBest !== best) {
        setBest(newBest);
        try { localStorage.setItem("reactionBest", newBest); } catch {}
      }

      if (next.length >= ROUNDS) { setPhase("done"); }
      else { setPhase("result"); }
    }
  };

  const tryAgain = () => {
    setPhase("waiting");
    const delay = MIN_WAIT + Math.random() * (MAX_WAIT - MIN_WAIT);
    timerRef.current = setTimeout(() => {
      startRef.current = performance.now();
      setPhase("go");
    }, delay);
  };

  const reset = () => {
    clearTimeout(timerRef.current);
    setPhase("idle");
    setTimes([]);
    setCurrent(0);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const avg = times.length > 0 ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : null;
  const last = times[times.length - 1];

  /* ── Colour scheme per phase ── */
  const bg = phase === "go"      ? "#001a08"
           : phase === "early"   ? "#1a0505"
           : phase === "waiting" ? "#050a0f"
           : "#050a0f";
  const borderCol = phase === "go"    ? "var(--green)"
                  : phase === "early" ? "#ff3c3c"
                  : "var(--green-dark)";

  return (
    <div
      onClick={handleClick}
      style={{
        border:`1px solid ${borderCol}`,
        background: bg,
        padding:"40px 24px",
        textAlign:"center",
        cursor:"pointer",
        userSelect:"none",
        transition:"background 0.2s, border-color 0.2s",
        minHeight:280,
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:16,
        position:"relative",
      }}
    >
      {/* Round pips */}
      <div style={{ position:"absolute", top:14, left:0, right:0, display:"flex", justifyContent:"center", gap:6 }}>
        {Array.from({ length: ROUNDS }).map((_, i) => (
          <div key={i} style={{ width:20, height:3, borderRadius:2, background: i < times.length ? "var(--green)" : i === times.length ? "var(--green-dim)" : "var(--green-dark)" }} />
        ))}
      </div>

      {phase === "idle" && (
        <>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:4, color:"var(--green)" }}>// REACTION_TEST</div>
          <div style={{ fontFamily:"var(--font-display)", fontSize:28, fontWeight:900, color:"var(--text)" }}>{g.rxt_title}</div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:12, color:"var(--text-muted)", lineHeight:1.7, maxWidth:280 }}>
            {g.rxt_hint} {ROUNDS} {g.rxt_rounds}.
          </div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"var(--green)", border:"1px solid var(--green-dark)", padding:"10px 24px", marginTop:8 }}>
            {g.rxt_click_start}
          </div>
          {best !== null && (
            <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--text-muted)", letterSpacing:2 }}>{g.best} {best}ms</div>
          )}
        </>
      )}

      {phase === "waiting" && (
        <>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:4, color:"var(--text-muted)" }}>// WAITING...</div>
          <div style={{ fontFamily:"var(--font-display)", fontSize:36, fontWeight:900, color:"var(--text-muted)", animation:"flicker 1.5s infinite" }}>
            . . .
          </div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"#1a3a2a" }}>{g.rxt_wait}</div>
        </>
      )}

      {phase === "go" && (
        <>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:4, color:"var(--green)" }}>// NOW!</div>
          <div style={{ fontFamily:"var(--font-display)", fontSize:52, fontWeight:900, color:"var(--green)", animation:"pulse-glow 0.5s ease-in-out infinite", lineHeight:1 }}>
            {g.rxt_now}
          </div>
        </>
      )}

      {phase === "early" && (
        <>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:4, color:"#ff6060" }}>// TOO EARLY</div>
          <div style={{ fontFamily:"var(--font-display)", fontSize:32, fontWeight:900, color:"#ff6060" }}>{g.rxt_early}</div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:12, color:"var(--text-muted)" }}>{g.rxt_early_hint}</div>
          <button className="btn btn-secondary" onClick={e => { e.stopPropagation(); tryAgain(); }} style={{ marginTop:8 }}>{g.rxt_try_again}</button>
        </>
      )}

      {phase === "result" && (
        <>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:4, color:"var(--green)" }}>// ROUND {times.length}</div>
          <div style={{ fontFamily:"var(--font-display)", fontSize:52, fontWeight:900, color:"var(--green)", lineHeight:1 }}>{last}<span style={{ fontSize:18, color:"var(--text-muted)" }}>ms</span></div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"var(--text-muted)" }}>{getRating(last)}</div>
          <button className="btn btn-primary" onClick={e => { e.stopPropagation(); startRound(); }} style={{ marginTop:8 }}>{g.rxt_next}</button>
        </>
      )}

      {phase === "done" && (
        <>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:4, color:"var(--green)" }}>// {g.results?.toUpperCase()}</div>
          <div style={{ fontFamily:"var(--font-display)", fontSize:52, fontWeight:900, color:"var(--green)", lineHeight:1 }}>{avg}<span style={{ fontSize:18, color:"var(--text-muted)" }}>ms</span></div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"var(--text-muted)", marginBottom:4 }}>{g.rxt_avg} — {getRating(avg)}</div>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center", marginBottom:12 }}>
            {times.map((ti, i) => (
              <div key={i} style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--green-dim)", padding:"4px 10px", border:"1px solid var(--green-dark)" }}>R{i+1}: {ti}ms</div>
            ))}
          </div>
          {best !== null && (
            <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--green)", letterSpacing:2 }}>{g.best} {best}ms</div>
          )}
          <button className="btn btn-secondary" onClick={e => { e.stopPropagation(); reset(); }} style={{ marginTop:8 }}>{g.play_again}</button>
        </>
      )}
    </div>
  );
}
