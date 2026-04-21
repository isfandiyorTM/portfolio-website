import { useState, useEffect, useRef } from "react";
import { useLang } from "../i18n/LanguageContext";

const COLS = 18, ROWS = 18, CELL = 20;
const DIRS = { ArrowUp:[0,-1], ArrowDown:[0,1], ArrowLeft:[-1,0], ArrowRight:[1,0] };

const spawnFood = (snake) => {
  let pos, attempts = 0;
  do {
    pos = { x: Math.floor(Math.random()*COLS), y: Math.floor(Math.random()*ROWS) };
    attempts++;
  } while (snake.some(s => s.x===pos.x && s.y===pos.y) && attempts < 200);
  return pos;
};

export default function Snake() {
  const { t } = useLang();
  const g = t.games;

  const [snake, setSnake]     = useState([{x:9,y:9}]);
  const [dir, setDir]         = useState([1,0]);
  const [food, setFood]       = useState({x:4,y:4});
  const [running, setRunning] = useState(false);
  const [dead, setDead]       = useState(false);
  const [score, setScore]     = useState(0);
  const [best, setBest]       = useState(() => { try{return parseInt(localStorage.getItem("snakeBest")||"0")}catch{return 0} });
  const dirRef = useRef([1,0]);

  const reset = () => {
    const s = [{x:9,y:9}];
    setSnake(s); setDir([1,0]); dirRef.current=[1,0];
    setFood(spawnFood(s)); setScore(0); setDead(false); setRunning(false);
  };

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
    const timer = setInterval(() => {
      setSnake(prev => {
        const [dx,dy]=dirRef.current;
        const head={x:prev[0].x+dx, y:prev[0].y+dy};
        if(head.x<0||head.x>=COLS||head.y<0||head.y>=ROWS){ setDead(true); setRunning(false); return prev; }
        if(prev.some(s=>s.x===head.x&&s.y===head.y)){ setDead(true); setRunning(false); return prev; }
        const ate=head.x===food.x&&head.y===food.y;
        const next=ate?[head,...prev]:[head,...prev.slice(0,-1)];
        if(ate){
          setScore(s=>{const ns=s+10; setBest(b=>{const nb=Math.max(b,ns);try{localStorage.setItem("snakeBest",nb)}catch{}; return nb;}); return ns;});
          setFood(spawnFood(next));
        }
        return next;
      });
    }, 130);
    return () => clearInterval(timer);
  }, [running,dead,food]);

  const moveDir = (ndx,ndy) => {
    const [cx,cy]=dirRef.current;
    if(ndx!==-cx||ndy!==-cy){ dirRef.current=[ndx,ndy]; setDir([ndx,ndy]); }
    if(!running&&!dead) setRunning(true);
  };

  const W=COLS*CELL, H=ROWS*CELL;
  const [dx,dy] = dir;
  const head = snake[0];
  const hx = head.x*CELL + CELL/2;
  const hy = head.y*CELL + CELL/2;
  const tail = snake[snake.length-1];
  const tx = tail.x*CELL + CELL/2;
  const ty = tail.y*CELL + CELL/2;

  // Body path (all segments)
  const bodyPath = snake.map((s,i)=>`${i===0?'M':'L'}${s.x*CELL+CELL/2} ${s.y*CELL+CELL/2}`).join(' ');

  // Eyes: forward + perpendicular offset
  const eye1 = { x: hx + dx*4 + dy*4, y: hy + dy*4 - dx*4 };
  const eye2 = { x: hx + dx*4 - dy*4, y: hy + dy*4 + dx*4 };

  // Tongue: base at mouth, forked tips
  const tBase  = { x: hx + dx*9,       y: hy + dy*9 };
  const tFork1 = { x: tBase.x+dx*3+dy*2, y: tBase.y+dy*3-dx*2 };
  const tFork2 = { x: tBase.x+dx*3-dy*2, y: tBase.y+dy*3+dx*2 };

  // Food position
  const fx = food.x*CELL + CELL/2;
  const fy = food.y*CELL + CELL/2;

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"12px" }}>

      {/* Scores */}
      <div style={{ display:"flex", gap:"12px", width:"100%", maxWidth:`${W}px` }}>
        {[[g.score,score],[g.best,best]].map(([l,v])=>(
          <div key={l} style={{ textAlign:"center", border:"1px solid var(--border)", background:"var(--bg)", padding:"8px 20px", flex:1 }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"2px", color:"var(--green-dim)" }}>{l}</div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:"20px", fontWeight:700, color:"var(--green)" }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Board */}
      <div style={{ position:"relative", border:"1px solid var(--border)", lineHeight:0, width:"100%", maxWidth:`${W}px` }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ background:"var(--bg)", display:"block", width:"100%", height:"auto" }}>
          <defs>
            {/* Gradient from tail (dark) to head (bright) */}
            <linearGradient id="snakeGrad" gradientUnits="userSpaceOnUse"
              x1={tx} y1={ty} x2={hx} y2={hy}>
              <stop offset="0%"   stopColor="#002210" />
              <stop offset="45%"  stopColor="#006633" />
              <stop offset="100%" stopColor="#00dd77" />
            </linearGradient>
            {/* Food shine */}
            <radialGradient id="foodGrad" cx="35%" cy="35%" r="60%">
              <stop offset="0%"   stopColor="#ff7799" />
              <stop offset="100%" stopColor="#cc1133" />
            </radialGradient>
          </defs>

          {/* Grid */}
          {Array.from({length:COLS+1}).map((_,i)=><line key={"v"+i} x1={i*CELL} y1={0} x2={i*CELL} y2={H} stroke="rgba(0,255,136,0.04)" strokeWidth="1"/>)}
          {Array.from({length:ROWS+1}).map((_,i)=><line key={"h"+i} x1={0} y1={i*CELL} x2={W} y2={i*CELL} stroke="rgba(0,255,136,0.04)" strokeWidth="1"/>)}

          {/* ── Food (apple) ── */}
          <circle cx={fx} cy={fy} r={CELL/2-3} fill="url(#foodGrad)" />
          {/* stem */}
          <line x1={fx} y1={fy-CELL/2+3} x2={fx+2} y2={fy-CELL/2+7}
            stroke="#00aa44" strokeWidth={1.5} strokeLinecap="round" />
          {/* leaf */}
          <path d={`M ${fx+2} ${fy-CELL/2+6} Q ${fx+7} ${fy-CELL/2+2} ${fx+6} ${fy-CELL/2+8}`}
            fill="#00cc44" opacity={0.9} />

          {/* ── Snake body (gradient stroke path) ── */}
          {snake.length > 1 && (
            <path d={bodyPath} fill="none"
              stroke="url(#snakeGrad)"
              strokeWidth={CELL-3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* ── Tongue (before head so it's behind) ── */}
          {running && !dead && (
            <>
              <line x1={hx+dx*7} y1={hy+dy*7} x2={tBase.x} y2={tBase.y}
                stroke="#ff3355" strokeWidth={1.5} strokeLinecap="round" />
              <line x1={tBase.x} y1={tBase.y} x2={tFork1.x} y2={tFork1.y}
                stroke="#ff3355" strokeWidth={1} strokeLinecap="round" />
              <line x1={tBase.x} y1={tBase.y} x2={tFork2.x} y2={tFork2.y}
                stroke="#ff3355" strokeWidth={1} strokeLinecap="round" />
            </>
          )}

          {/* ── Head ── */}
          <circle cx={hx} cy={hy} r={CELL/2} fill="#00ff88" />
          {/* Head shine */}
          <ellipse cx={hx-dx*1.5+dy*1.5} cy={hy-dy*1.5-dx*1.5} rx={3} ry={2} fill="rgba(255,255,255,0.25)" />

          {/* ── Eyes ── */}
          <circle cx={eye1.x} cy={eye1.y} r={2.5} fill="white" />
          <circle cx={eye2.x} cy={eye2.y} r={2.5} fill="white" />
          {/* Pupils (look forward) */}
          <circle cx={eye1.x+dx*0.9} cy={eye1.y+dy*0.9} r={1.3} fill="#001a08" />
          <circle cx={eye2.x+dx*0.9} cy={eye2.y+dy*0.9} r={1.3} fill="#001a08" />
          {/* Pupil glint */}
          <circle cx={eye1.x+dx*0.3} cy={eye1.y+dy*0.3} r={0.45} fill="white" opacity={0.8} />
          <circle cx={eye2.x+dx*0.3} cy={eye2.y+dy*0.3} r={0.45} fill="white" opacity={0.8} />
        </svg>

        {/* Pause / Game Over / Start overlay */}
        {!running && (
          <div style={{ position:"absolute", inset:0, background:"rgba(5,10,15,0.88)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"12px" }}>
            {dead ? (
              <>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"22px", color:"#ff4466", letterSpacing:"3px" }}>{g.game_over}</div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"12px", color:"var(--text-muted)" }}>{g.score}: {score}</div>
                <button className="btn btn-primary" onClick={reset} style={{ padding:"10px 28px", fontSize:"12px" }}>{g.restart}</button>
              </>
            ) : (
              <>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"18px", color:"var(--green)", letterSpacing:"3px" }}>{t.games.snake.label} 🐍</div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"var(--text-muted)", textAlign:"center", lineHeight:1.8 }}>
                  {g.snake_hint}
                </div>
                <button className="btn btn-primary" onClick={()=>setRunning(true)} style={{ padding:"10px 28px", fontSize:"12px" }}>{g.start}</button>
              </>
            )}
          </div>
        )}
      </div>

      {/* D-pad */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,52px)", gridTemplateRows:"repeat(2,52px)", gap:"6px", marginTop:"4px" }}>
        {[
          {label:"↑",ndx:0,ndy:-1,row:1,col:2},
          {label:"←",ndx:-1,ndy:0,row:2,col:1},
          {label:"↓",ndx:0,ndy:1, row:2,col:2},
          {label:"→",ndx:1,ndy:0, row:2,col:3},
        ].map(({label,ndx,ndy,row,col})=>(
          <button key={label} onClick={()=>moveDir(ndx,ndy)}
            onTouchStart={e=>{ e.preventDefault(); moveDir(ndx,ndy); }}
            style={{
              gridRow:row, gridColumn:col,
              background:"var(--bg-card)", border:"1px solid var(--border)",
              color:"var(--green)", fontSize:"22px", cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center",
              transition:"all 0.15s", borderRadius:"4px",
              WebkitTapHighlightColor:"transparent",
            }}>
            {label}
          </button>
        ))}
      </div>
      <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"var(--text-muted)", letterSpacing:"2px", textAlign:"center" }}>
        {g.snake_dpad}
      </div>
    </div>
  );
}
