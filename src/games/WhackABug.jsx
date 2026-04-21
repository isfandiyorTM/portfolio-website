import { useState, useEffect, useRef } from "react";
import { useLang } from "../i18n/LanguageContext";

const BUGS = ["🐛","🐞","🦗","🦟","🐜"];

export default function WhackABug() {
  const { t } = useLang();
  const g = t.games;

  const [cells, setCells]       = useState(Array(12).fill(null));
  const [score, setScore]       = useState(0);
  const [missed, setMissed]     = useState(0);
  const [running, setRunning]   = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [done, setDone]         = useState(false);
  const [best, setBest]         = useState(() => { try{return parseInt(localStorage.getItem("whackBest")||"0")}catch{return 0} });
  const intervalsRef = useRef([]);

  const clearAll = () => { intervalsRef.current.forEach(id=>{ clearInterval(id); clearTimeout(id); }); intervalsRef.current=[]; };

  const spawnBug = () => {
    const pos = Math.floor(Math.random()*12);
    const bug = BUGS[Math.floor(Math.random()*BUGS.length)];
    setCells(c=>{ const n=[...c]; n[pos]=bug; return n; });
    const t = setTimeout(()=>{
      setCells(c=>{ if(c[pos]===bug){ setMissed(m=>m+1); const n=[...c]; n[pos]=null; return n; } return c; });
    }, 1000);
    intervalsRef.current.push(t);
  };

  const start = () => {
    setCells(Array(12).fill(null));
    setScore(0); setMissed(0); setTimeLeft(30); setDone(false); setRunning(true);
  };

  useEffect(()=>{
    if(!running) return;
    const s = setInterval(spawnBug, 700);
    const timer = setInterval(()=>{
      setTimeLeft(prev=>{
        if(prev<=1){
          setRunning(false); setDone(true); clearAll();
          setScore(sc=>{ setBest(b=>{ const nb=Math.max(b,sc); try{localStorage.setItem("whackBest",nb)}catch{}; return nb; }); return sc; });
          return 0;
        }
        return prev-1;
      });
    },1000);
    intervalsRef.current.push(s,timer);
    return clearAll;
  },[running]);

  const whack = (i) => {
    if(!cells[i]||!running) return;
    setCells(c=>{ const n=[...c]; n[i]=null; return n; });
    setScore(s=>s+1);
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"6px" }}>
        {[[g.time,`${timeLeft}s`],[g.hit,score],[g.missed,missed],[g.best,best]].map(([l,v])=>(
          <div key={l} style={{ border:"1px solid var(--border)", background:"var(--bg)", padding:"8px 6px", textAlign:"center", minWidth:0 }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", letterSpacing:"1px", color:"var(--green-dim)", marginBottom:"2px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{l}</div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:"clamp(14px,4vw,20px)", fontWeight:700, color: l===g.missed&&missed>3?"#ff4466":"var(--green)" }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Time bar */}
      <div style={{ height:"4px", background:"var(--border)", borderRadius:"2px" }}>
        <div style={{ height:"100%", background:"var(--green)", width:`${(timeLeft/30)*100}%`, transition:"width 1s linear", borderRadius:"2px" }}/>
      </div>

      {/* Grid — constrained so cells don't get enormous on wide panels */}
      <div style={{ maxWidth:"380px", margin:"0 auto", width:"100%" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"8px", position:"relative" }}>
        {cells.map((bug,i)=>(
          <div key={i} onClick={()=>whack(i)}
            onTouchStart={e=>{ e.preventDefault(); whack(i); }}
            style={{
              aspectRatio:"1",
              border:`1px solid ${bug?"var(--green)":"var(--border)"}`,
              background:bug?"rgba(0,255,136,0.07)":"var(--bg-card)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:"clamp(22px,6vw,40px)", cursor:bug?"pointer":"default",
              transition:"all 0.1s", userSelect:"none",
              boxShadow:bug?"0 0 16px rgba(0,255,136,0.2)":"none",
              transform:bug?"scale(1.05)":"scale(1)",
              borderRadius:"4px",
              WebkitTapHighlightColor:"transparent",
            }}>
            {bug||""}
          </div>
        ))}

        {!running && (
          <div style={{ position:"absolute", inset:0, background:"rgba(5,10,15,0.9)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"14px", borderRadius:"4px" }}>
            {done ? (
              <>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"20px", color:"var(--green)" }}>{g.times_up}</div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"12px", color:"var(--text-muted)", textAlign:"center" }}>
                  {g.hit}: {score} | {g.missed}: {missed}
                  {best===score&&score>0&&<div style={{ color:"var(--green)", marginTop:"4px" }}>{g.new_best}</div>}
                </div>
                <button className="btn btn-primary" onClick={start} style={{ padding:"10px 24px", fontSize:"12px" }}>{g.play_again}</button>
              </>
            ) : (
              <>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"18px", color:"var(--green)", letterSpacing:"2px" }}>{t.games.whack.label} 🐛</div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", color:"var(--text-muted)", textAlign:"center", lineHeight:1.8 }}>
                  {g.whack_hint.toUpperCase()}<br/>{g.whack_30s.toUpperCase()}
                </div>
                <button className="btn btn-primary" onClick={start} style={{ padding:"10px 24px", fontSize:"12px" }}>{g.start}</button>
              </>
            )}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
