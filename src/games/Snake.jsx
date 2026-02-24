import { useState, useEffect, useCallback, useRef } from "react";

const COLS = 18, ROWS = 18, CELL = 20;
const DIRS = { ArrowUp:[0,-1], ArrowDown:[0,1], ArrowLeft:[-1,0], ArrowRight:[1,0] };
const rand = () => ({ x:Math.floor(Math.random()*COLS), y:Math.floor(Math.random()*ROWS) });

export default function Snake() {
  const [snake, setSnake]     = useState([{x:9,y:9}]);
  const [dir, setDir]         = useState([1,0]);
  const [food, setFood]       = useState({x:4,y:4});
  const [running, setRunning] = useState(false);
  const [dead, setDead]       = useState(false);
  const [score, setScore]     = useState(0);
  const [best, setBest]       = useState(() => { try{return parseInt(localStorage.getItem("snakeBest")||"0")}catch{return 0} });
  const dirRef = useRef([1,0]);

  const reset = () => { setSnake([{x:9,y:9}]); setDir([1,0]); dirRef.current=[1,0]; setFood(rand()); setScore(0); setDead(false); setRunning(false); };

  useEffect(() => {
    const h = (e) => {
      if (DIRS[e.key]) {
        e.preventDefault();
        const [dx,dy]=DIRS[e.key], [cx,cy]=dirRef.current;
        if(dx!==-cx||dy!==-cy){ dirRef.current=[dx,dy]; setDir([dx,dy]); }
        if(!running&&!dead) setRunning(true);
      }
      if(e.key===" "&&!dead) setRunning(r=>!r);
    };
    window.addEventListener("keydown",h);
    return () => window.removeEventListener("keydown",h);
  }, [running,dead]);

  useEffect(() => {
    if(!running||dead) return;
    const t = setInterval(() => {
      setSnake(prev => {
        const [dx,dy]=dirRef.current;
        const head={x:prev[0].x+dx, y:prev[0].y+dy};
        if(head.x<0||head.x>=COLS||head.y<0||head.y>=ROWS){ setDead(true); setRunning(false); return prev; }
        if(prev.some(s=>s.x===head.x&&s.y===head.y)){ setDead(true); setRunning(false); return prev; }
        const ate=head.x===food.x&&head.y===food.y;
        const next=ate?[head,...prev]:[head,...prev.slice(0,-1)];
        if(ate){ setScore(s=>{const ns=s+10; setBest(b=>{const nb=Math.max(b,ns);try{localStorage.setItem("snakeBest",nb)}catch{}; return nb;}); return ns;}); setFood(rand()); }
        return next;
      });
    }, 130);
    return () => clearInterval(t);
  }, [running,dead,food]);

  const moveDir = (dx,dy) => {
    const [cx,cy]=dirRef.current;
    if(dx!==-cx||dy!==-cy){ dirRef.current=[dx,dy]; setDir([dx,dy]); }
    if(!running&&!dead) setRunning(true);
  };

  const w=COLS*CELL, h=ROWS*CELL;

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"12px" }}>
      {/* Scores */}
      <div style={{ display:"flex", gap:"16px" }}>
        {[["SCORE",score],["BEST",best]].map(([l,v])=>(
          <div key={l} style={{ textAlign:"center", border:"1px solid var(--border)", background:"var(--bg)", padding:"8px 20px" }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"2px", color:"var(--green-dim)" }}>{l}</div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:"20px", fontWeight:700, color:"var(--green)" }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Game board */}
      <div style={{ position:"relative", border:"1px solid var(--border)", lineHeight:0, maxWidth:"100%", overflow:"hidden" }}>
        <svg width={w} height={h} style={{ background:"var(--bg)", display:"block", maxWidth:"100%", height:"auto" }}>
          {Array.from({length:COLS+1}).map((_,i)=><line key={"v"+i} x1={i*CELL} y1={0} x2={i*CELL} y2={h} stroke="rgba(0,255,136,0.04)" strokeWidth="1"/>)}
          {Array.from({length:ROWS+1}).map((_,i)=><line key={"h"+i} x1={0} y1={i*CELL} x2={w} y2={i*CELL} stroke="rgba(0,255,136,0.04)" strokeWidth="1"/>)}
          <rect x={food.x*CELL+2} y={food.y*CELL+2} width={CELL-4} height={CELL-4} fill="#ff4466" rx="3"/>
          {snake.map((s,i)=>(
            <rect key={i} x={s.x*CELL+1} y={s.y*CELL+1} width={CELL-2} height={CELL-2} fill={i===0?"var(--green)":`rgba(0,255,136,${Math.max(0.2,0.9-i*0.04)})`} rx="2"/>
          ))}
        </svg>
        {!running && (
          <div style={{ position:"absolute", inset:0, background:"rgba(5,10,15,0.88)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"12px" }}>
            {dead ? (
              <>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"22px", color:"#ff4466", letterSpacing:"3px" }}>GAME OVER</div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"12px", color:"var(--text-muted)" }}>SCORE: {score}</div>
                <button className="btn btn-primary" onClick={reset} style={{ padding:"10px 28px", fontSize:"12px" }}>RESTART</button>
              </>
            ) : (
              <>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"18px", color:"var(--green)", letterSpacing:"3px" }}>SNAKE 🐍</div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"var(--text-muted)", textAlign:"center", lineHeight:1.8 }}>
                  ARROW KEYS OR D-PAD BELOW<br/>SPACE = PAUSE
                </div>
                <button className="btn btn-primary" onClick={()=>setRunning(true)} style={{ padding:"10px 28px", fontSize:"12px" }}>START</button>
              </>
            )}
          </div>
        )}
      </div>

      {/* D-pad — always visible for mobile */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,52px)", gridTemplateRows:"repeat(2,52px)", gap:"6px", marginTop:"4px" }}>
        {[
          {label:"↑",dx:0,dy:-1,row:1,col:2},
          {label:"←",dx:-1,dy:0,row:2,col:1},
          {label:"↓",dx:0,dy:1, row:2,col:2},
          {label:"→",dx:1,dy:0, row:2,col:3},
        ].map(({label,dx,dy,row,col})=>(
          <button key={label} onClick={()=>moveDir(dx,dy)} style={{
            gridRow:row, gridColumn:col,
            background:"var(--bg-card)", border:"1px solid var(--border)",
            color:"var(--green)", fontSize:"22px", cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center",
            transition:"all 0.15s", borderRadius:"4px",
            WebkitTapHighlightColor:"transparent",
          }}
          onTouchStart={e=>{ e.preventDefault(); moveDir(dx,dy); }}>
            {label}
          </button>
        ))}
      </div>
      <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"var(--text-muted)", letterSpacing:"2px" }}>
        TAP D-PAD OR USE ARROW KEYS
      </div>
    </div>
  );
}