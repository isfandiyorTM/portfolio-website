import { useState, useEffect, useRef } from "react";

const BUGS = ["🐛","🐞","🦗","🦟","🐜"];
const GRID = 16;

export default function WhackABug() {
  const [cells, setCells]     = useState(Array(GRID).fill(null));
  const [score, setScore]     = useState(0);
  const [missed, setMissed]   = useState(0);
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [done, setDone]       = useState(false);
  const [best, setBest]       = useState(() => { try{return parseInt(localStorage.getItem("whackBest")||"0")}catch{return 0} });
  const intervalsRef = useRef([]);

  const clearAll = () => { intervalsRef.current.forEach(clearInterval); intervalsRef.current = []; };

  const spawnBug = () => {
    const pos = Math.floor(Math.random() * GRID);
    const bug = BUGS[Math.floor(Math.random()*BUGS.length)];
    setCells(c => { const n=[...c]; n[pos]=bug; return n; });
    const t = setTimeout(() => {
      setCells(c => { if(c[pos]===bug){ setMissed(m=>m+1); const n=[...c]; n[pos]=null; return n; } return c; });
    }, 900);
    intervalsRef.current.push(t);
  };

  const start = () => {
    setCells(Array(GRID).fill(null));
    setScore(0); setMissed(0); setTimeLeft(30); setDone(false);
    setRunning(true);
  };

  useEffect(() => {
    if (!running) return;
    const spawnInterval = setInterval(spawnBug, 600);
    intervalsRef.current.push(spawnInterval);
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setRunning(false); setDone(true); clearAll();
          setScore(s => { setBest(b => { const nb=Math.max(b,s); try{localStorage.setItem("whackBest",nb)}catch{}; return nb; }); return s; });
          return 0;
        }
        return t-1;
      });
    }, 1000);
    intervalsRef.current.push(timer);
    return clearAll;
  }, [running]);

  const whack = (i) => {
    if (!cells[i] || !running) return;
    setCells(c => { const n=[...c]; n[i]=null; return n; });
    setScore(s => s+1);
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
      {/* Stats */}
      <div style={{ display:"flex", gap:"12px" }}>
        {[["TIME",`${timeLeft}s`],["SCORE",score],["MISSED",missed],["BEST",best]].map(([l,v]) => (
          <div key={l} style={{ border:"1px solid var(--border)", background:"var(--bg)", padding:"8px 12px", flex:1, textAlign:"center" }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"2px", color:"var(--green-dim)" }}>{l}</div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:"18px", fontWeight:700, color: l==="MISSED"&&missed>3 ? "#ff4466" : "var(--green)" }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"8px", position:"relative" }}>
        {cells.map((bug, i) => (
          <div key={i} onClick={() => whack(i)} style={{
            aspectRatio:"1", border:`1px solid ${bug ? "var(--green)" : "var(--border)"}`,
            background: bug ? "rgba(0,255,136,0.08)" : "var(--bg-card)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:"clamp(20px,5vw,36px)", cursor: bug ? "pointer" : "default",
            transition:"all 0.15s", userSelect:"none",
            boxShadow: bug ? "0 0 16px rgba(0,255,136,0.2)" : "none",
            transform: bug ? "scale(1.05)" : "scale(1)",
          }}>
            {bug || ""}
          </div>
        ))}

        {/* Overlay */}
        {(!running) && (
          <div style={{ position:"absolute", inset:0, background:"rgba(5,10,15,0.88)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"16px" }}>
            {done ? (
              <>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"22px", color:"var(--green)" }}>TIME'S UP!</div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"13px", color:"var(--text-muted)", textAlign:"center" }}>
                  SCORE: {score} &nbsp;|&nbsp; MISSED: {missed}
                  {best===score && score>0 && <div style={{ color:"var(--green)", marginTop:"4px" }}>★ NEW BEST!</div>}
                </div>
                <button className="btn btn-primary" onClick={start} style={{ padding:"10px 24px", fontSize:"12px" }}>PLAY AGAIN</button>
              </>
            ) : (
              <>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"20px", color:"var(--green)", letterSpacing:"3px" }}>WHACK-A-BUG</div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"11px", color:"var(--text-muted)", textAlign:"center", lineHeight:1.8 }}>
                  CLICK THE BUGS BEFORE<br/>THEY ESCAPE! 30 SECONDS.
                </div>
                <button className="btn btn-primary" onClick={start} style={{ padding:"10px 24px", fontSize:"12px" }}>START</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}