import { useState, useEffect, useCallback, useRef } from "react";

const COLS = 20, ROWS = 20;
const CELL = 22;
const DIRS = { ArrowUp:[0,-1], ArrowDown:[0,1], ArrowLeft:[-1,0], ArrowRight:[1,0] };

const rand = () => ({ x: Math.floor(Math.random()*COLS), y: Math.floor(Math.random()*ROWS) });

export default function Snake() {
  const [snake, setSnake]   = useState([{x:10,y:10}]);
  const [dir, setDir]       = useState([1,0]);
  const [food, setFood]     = useState({x:5,y:5});
  const [running, setRunning] = useState(false);
  const [dead, setDead]     = useState(false);
  const [score, setScore]   = useState(0);
  const [best, setBest]     = useState(() => { try { return parseInt(localStorage.getItem("snakeBest")||"0"); } catch { return 0; } });
  const dirRef = useRef(dir);
  dirRef.current = dir;

  const reset = () => {
    setSnake([{x:10,y:10}]);
    setDir([1,0]);
    setFood(rand());
    setScore(0);
    setDead(false);
    setRunning(false);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (DIRS[e.key]) {
        e.preventDefault();
        const [dx,dy] = DIRS[e.key];
        const [cx,cy] = dirRef.current;
        if (dx !== -cx || dy !== -cy) setDir([dx,dy]);
        if (!running && !dead) setRunning(true);
      }
      if (e.key === " ") { if (!dead) setRunning(r => !r); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [running, dead]);

  useEffect(() => {
    if (!running || dead) return;
    const interval = setInterval(() => {
      setSnake(prev => {
        const [dx,dy] = dirRef.current;
        const head = { x: prev[0].x+dx, y: prev[0].y+dy };
        if (head.x<0||head.x>=COLS||head.y<0||head.y>=ROWS) { setDead(true); setRunning(false); return prev; }
        if (prev.some(s=>s.x===head.x&&s.y===head.y)) { setDead(true); setRunning(false); return prev; }
        const ateFood = head.x===food.x && head.y===food.y;
        const next = ateFood ? [head,...prev] : [head,...prev.slice(0,-1)];
        if (ateFood) {
          setScore(s => {
            const ns = s+10;
            setBest(b => { const nb=Math.max(b,ns); try{localStorage.setItem("snakeBest",nb)}catch{}; return nb; });
            return ns;
          });
          setFood(rand());
        }
        return next;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [running, dead, food]);

  const w = COLS * CELL, h = ROWS * CELL;

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"16px" }}>
      {/* Score */}
      <div style={{ display:"flex", gap:"24px" }}>
        {[["SCORE",score],["BEST",best]].map(([l,v]) => (
          <div key={l} style={{ textAlign:"center" }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"3px", color:"var(--green-dim)" }}>{l}</div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:"22px", fontWeight:700, color:"var(--green)" }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Canvas */}
      <div style={{ position:"relative", border:"1px solid var(--border)", lineHeight:0 }}>
        <svg width={w} height={h} style={{ background:"var(--bg)", display:"block" }}>
          {/* Grid */}
          {Array.from({length:COLS+1}).map((_,i) => (
            <line key={"v"+i} x1={i*CELL} y1={0} x2={i*CELL} y2={h} stroke="rgba(0,255,136,0.04)" strokeWidth="1"/>
          ))}
          {Array.from({length:ROWS+1}).map((_,i) => (
            <line key={"h"+i} x1={0} y1={i*CELL} x2={w} y2={i*CELL} stroke="rgba(0,255,136,0.04)" strokeWidth="1"/>
          ))}
          {/* Food */}
          <rect x={food.x*CELL+3} y={food.y*CELL+3} width={CELL-6} height={CELL-6} fill="#ff4466" rx="3"/>
          {/* Snake */}
          {snake.map((s,i) => (
            <rect key={i} x={s.x*CELL+1} y={s.y*CELL+1} width={CELL-2} height={CELL-2}
              fill={i===0 ? "var(--green)" : `rgba(0,255,136,${0.9-i*0.02})`} rx="2"/>
          ))}
        </svg>

        {/* Overlay */}
        {(!running) && (
          <div style={{ position:"absolute", inset:0, background:"rgba(5,10,15,0.85)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"16px" }}>
            {dead ? (
              <>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"24px", color:"#ff4466", letterSpacing:"4px" }}>GAME OVER</div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"13px", color:"var(--text-muted)" }}>SCORE: {score}</div>
                <button className="btn btn-primary" onClick={reset} style={{ padding:"10px 24px", fontSize:"12px" }}>RESTART</button>
              </>
            ) : (
              <>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"18px", color:"var(--green)", letterSpacing:"3px" }}>SNAKE</div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"11px", color:"var(--text-muted)", textAlign:"center", lineHeight:1.8 }}>
                  USE ARROW KEYS TO MOVE<br/>PRESS SPACE TO PAUSE
                </div>
                <button className="btn btn-primary" onClick={()=>setRunning(true)} style={{ padding:"10px 24px", fontSize:"12px" }}>START</button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Mobile controls */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,48px)", gridTemplateRows:"repeat(2,48px)", gap:"6px" }}>
        {[["↑",[0,-1],0,1],["←",[-1,0],1,0],["↓",[0,1],1,2],["→",[1,0],1,2]].map(([label,d,r,c]) => (
          <button key={label} onClick={() => {
            const [dx,dy]=d, [cx,cy]=dirRef.current;
            if(dx!==-cx||dy!==-cy){setDir(d);}
            if(!running&&!dead) setRunning(true);
          }} style={{
            gridRow: label==="↑"?1:2, gridColumn: label==="↑"?2:label==="←"?1:label==="↓"?2:3,
            background:"var(--bg-card)", border:"1px solid var(--border)",
            color:"var(--green)", fontSize:"20px", cursor:"pointer", display:"flex",
            alignItems:"center", justifyContent:"center", transition:"all 0.15s",
          }}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}