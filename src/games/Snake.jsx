import { useState, useEffect, useRef } from "react";
import { useLang } from "../i18n/LanguageContext";
import { saveScore } from "../lib/scores";

const COLS = 18, ROWS = 18, CELL = 20;
const DIRS = { ArrowUp:[0,-1], ArrowDown:[0,1], ArrowLeft:[-1,0], ArrowRight:[1,0] };

// Start with 3 segments moving right
const INIT_SNAKE = [{x:9,y:9},{x:8,y:9},{x:7,y:9}];
const INIT_DIR   = [1, 0];

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

  const [snake, setSnake]     = useState(INIT_SNAKE);
  const [dir,   setDir]       = useState(INIT_DIR);
  const [food,  setFood]      = useState({x:4,y:4});
  const [running, setRunning] = useState(false);
  const [dead,    setDead]    = useState(false);
  const [dying,   setDying]   = useState(false);  // death animation phase
  const [score,   setScore]   = useState(0);
  const [best,    setBest]    = useState(() => { try{return parseInt(localStorage.getItem("snakeBest")||"0")}catch{return 0} });

  // dirRef = committed direction (what the snake is actually moving)
  // nextDirRef = buffered input (validated against dirRef, applied next tick)
  const dirRef     = useRef(INIT_DIR);
  const nextDirRef = useRef(null);
  const deathTimer = useRef(null);

  useEffect(() => () => clearTimeout(deathTimer.current), []);

  const reset = () => {
    clearTimeout(deathTimer.current);
    const s = [...INIT_SNAKE];
    dirRef.current  = INIT_DIR;
    nextDirRef.current = null;
    setSnake(s);
    setDir(INIT_DIR);
    setFood(spawnFood(s));
    setScore(0);
    setDead(false);
    setDying(false);
    setRunning(false);
  };

  // Key / D-pad input — buffer ONE direction ahead, validate against pending dir
  const queueDir = ([ndx, ndy]) => {
    const [pdx, pdy] = nextDirRef.current ?? dirRef.current;
    if (ndx === -pdx && ndy === -pdy) return; // ignore 180° reversal
    nextDirRef.current = [ndx, ndy];
  };

  useEffect(() => {
    const h = (e) => {
      if (DIRS[e.key]) {
        e.preventDefault();
        queueDir(DIRS[e.key]);
        if (!running && !dead && !dying) setRunning(true);
      }
      if (e.key === " " && !dead && !dying) setRunning(r => !r);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [running, dead, dying]);

  useEffect(() => {
    if (!running || dead || dying) return;
    const timer = setInterval(() => {
      setSnake(prev => {
        // Apply buffered direction this tick
        if (nextDirRef.current) {
          dirRef.current     = nextDirRef.current;
          nextDirRef.current = null;
          setDir(dirRef.current);
        }

        const [dx, dy] = dirRef.current;
        const head = { x:(prev[0].x+dx+COLS)%COLS, y:(prev[0].y+dy+ROWS)%ROWS };

        // Self-collision: check against all body segments except the tail
        // (tail vacates its cell this tick unless eating)
        if (prev.slice(0, -1).some(s => s.x===head.x && s.y===head.y)) {
          // Start dying sequence — freeze movement, glow for 2.5s then game over
          setDying(true);
          setRunning(false);
          deathTimer.current = setTimeout(() => {
            setDead(true);
            setDying(false);
          }, 2500);
          return prev;
        }

        const ate  = head.x===food.x && head.y===food.y;
        const next = ate ? [head,...prev] : [head,...prev.slice(0,-1)];
        if (ate) {
          setScore(s => {
            const ns = s + 10;
            setBest(b => { const nb=Math.max(b,ns); saveScore("snake",nb); return nb; });
            return ns;
          });
          setFood(spawnFood(next));
        }
        return next;
      });
    }, 130);
    return () => clearInterval(timer);
  }, [running, dead, dying, food]);

  const moveDir = ([ndx, ndy]) => {
    queueDir([ndx, ndy]);
    if (!running && !dead && !dying) setRunning(true);
  };

  /* ── Derived render values ── */
  const W  = COLS*CELL, H = ROWS*CELL;
  const [dx, dy] = dir;
  const head = snake[0];
  const hx = head.x*CELL + CELL/2;
  const hy = head.y*CELL + CELL/2;
  const tail = snake[snake.length-1];
  const tx = tail.x*CELL + CELL/2;
  const ty = tail.y*CELL + CELL/2;

  // Split snake into chains that don't jump across the board.
  // A wrap-around between two adjacent segments shows as |dx|>1 or |dy|>1.
  const chains = [];
  {
    let cur = [snake[0]];
    for (let i = 1; i < snake.length; i++) {
      if (Math.abs(snake[i-1].x - snake[i].x) > 1 || Math.abs(snake[i-1].y - snake[i].y) > 1) {
        chains.push(cur);
        cur = [snake[i]];
      } else {
        cur.push(snake[i]);
      }
    }
    chains.push(cur);
  }

  const eye1  = { x: hx+dx*4+dy*4,  y: hy+dy*4-dx*4 };
  const eye2  = { x: hx+dx*4-dy*4,  y: hy+dy*4+dx*4 };
  const tBase  = { x: hx+dx*9,       y: hy+dy*9 };
  const tFork1 = { x: tBase.x+dx*3+dy*2, y: tBase.y+dy*3-dx*2 };
  const tFork2 = { x: tBase.x+dx*3-dy*2, y: tBase.y+dy*3+dx*2 };

  const fx = food.x*CELL + CELL/2;
  const fy = food.y*CELL + CELL/2;

  const headColor = dying ? "#ff3355" : "#00ff88";

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"12px" }}>
      <style>{`
        @keyframes snake-die {
          0%,100% { opacity:1;   filter:drop-shadow(0 0 6px #ff3355); }
          50%      { opacity:0.25; filter:drop-shadow(0 0 18px #ff0022); }
        }
        .snake-dying { animation: snake-die 0.45s ease-in-out infinite; }
      `}</style>

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
      <div style={{ position:"relative", border:`1px solid ${dying?"#ff3355":"var(--border)"}`, lineHeight:0, width:"100%", maxWidth:`${W}px`, transition:"border-color 0.2s" }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ background:"var(--bg)", display:"block", width:"100%", height:"auto" }}>
          <defs>
            <linearGradient id="snakeGrad" gradientUnits="userSpaceOnUse" x1={tx} y1={ty} x2={hx} y2={hy}>
              <stop offset="0%"   stopColor="#002210" />
              <stop offset="45%"  stopColor="#006633" />
              <stop offset="100%" stopColor="#00dd77" />
            </linearGradient>
            <linearGradient id="snakeDyingGrad" gradientUnits="userSpaceOnUse" x1={tx} y1={ty} x2={hx} y2={hy}>
              <stop offset="0%"   stopColor="#1a0008" />
              <stop offset="45%"  stopColor="#660011" />
              <stop offset="100%" stopColor="#ff2244" />
            </linearGradient>
            <radialGradient id="foodGrad" cx="35%" cy="35%" r="60%">
              <stop offset="0%"   stopColor="#ff7799" />
              <stop offset="100%" stopColor="#cc1133" />
            </radialGradient>
          </defs>

          {/* Grid */}
          {Array.from({length:COLS+1}).map((_,i)=><line key={"v"+i} x1={i*CELL} y1={0} x2={i*CELL} y2={H} stroke="rgba(0,255,136,0.04)" strokeWidth="1"/>)}
          {Array.from({length:ROWS+1}).map((_,i)=><line key={"h"+i} x1={0} y1={i*CELL} x2={W} y2={i*CELL} stroke="rgba(0,255,136,0.04)" strokeWidth="1"/>)}

          {/* Food */}
          <circle cx={fx} cy={fy} r={CELL/2-3} fill="url(#foodGrad)" />
          <line x1={fx} y1={fy-CELL/2+3} x2={fx+2} y2={fy-CELL/2+7} stroke="#00aa44" strokeWidth={1.5} strokeLinecap="round" />
          <path d={`M ${fx+2} ${fy-CELL/2+6} Q ${fx+7} ${fy-CELL/2+2} ${fx+6} ${fy-CELL/2+8}`} fill="#00cc44" opacity={0.9} />

          {/* Snake group — apply dying animation class here */}
          <g className={dying ? "snake-dying" : ""}>
            {chains.map((chain, ci) =>
              chain.length > 1 ? (
                <path key={ci}
                  d={chain.map((s,i)=>`${i===0?'M':'L'}${s.x*CELL+CELL/2} ${s.y*CELL+CELL/2}`).join(' ')}
                  fill="none"
                  stroke={dying ? "url(#snakeDyingGrad)" : "url(#snakeGrad)"}
                  strokeWidth={CELL-3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                /* single isolated segment after a wrap — draw as circle */
                <circle key={ci}
                  cx={chain[0].x*CELL+CELL/2} cy={chain[0].y*CELL+CELL/2}
                  r={(CELL-3)/2}
                  fill={dying ? "#660011" : "#006633"}
                />
              )
            )}

            {/* Tongue */}
            {(running || dying) && !dead && (
              <>
                <line x1={hx+dx*7} y1={hy+dy*7} x2={tBase.x} y2={tBase.y} stroke="#ff3355" strokeWidth={1.5} strokeLinecap="round" />
                <line x1={tBase.x} y1={tBase.y} x2={tFork1.x} y2={tFork1.y} stroke="#ff3355" strokeWidth={1} strokeLinecap="round" />
                <line x1={tBase.x} y1={tBase.y} x2={tFork2.x} y2={tFork2.y} stroke="#ff3355" strokeWidth={1} strokeLinecap="round" />
              </>
            )}

            {/* Head */}
            <circle cx={hx} cy={hy} r={CELL/2} fill={headColor} />
            <ellipse cx={hx-dx*1.5+dy*1.5} cy={hy-dy*1.5-dx*1.5} rx={3} ry={2} fill="rgba(255,255,255,0.25)" />

            {/* Eyes */}
            <circle cx={eye1.x} cy={eye1.y} r={2.5} fill="white" />
            <circle cx={eye2.x} cy={eye2.y} r={2.5} fill="white" />
            <circle cx={eye1.x+dx*0.9} cy={eye1.y+dy*0.9} r={1.3} fill={dying?"#330000":"#001a08"} />
            <circle cx={eye2.x+dx*0.9} cy={eye2.y+dy*0.9} r={1.3} fill={dying?"#330000":"#001a08"} />
            <circle cx={eye1.x+dx*0.3} cy={eye1.y+dy*0.3} r={0.45} fill="white" opacity={0.8} />
            <circle cx={eye2.x+dx*0.3} cy={eye2.y+dy*0.3} r={0.45} fill="white" opacity={0.8} />
          </g>
        </svg>

        {/* Overlays: start / pause / game over */}
        {!running && !dying && (
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
          {label:"↑", d:[0,-1],  row:1, col:2},
          {label:"←", d:[-1,0],  row:2, col:1},
          {label:"↓", d:[0,1],   row:2, col:2},
          {label:"→", d:[1,0],   row:2, col:3},
        ].map(({label, d, row, col}) => (
          <button key={label}
            onClick={() => moveDir(d)}
            onTouchStart={e=>{ e.preventDefault(); moveDir(d); }}
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
