import { useState, useEffect } from "react";
import { useLang } from "../i18n/LanguageContext";
import { saveScore } from "../lib/scores";

const TECH_CARDS = [
  { id:"flutter",  label:"Flutter",  emoji:"🐦" },
  { id:"dart",     label:"Dart",     emoji:"🎯" },
  { id:"firebase", label:"Firebase", emoji:"🔥" },
  { id:"git",      label:"Git",      emoji:"🌿" },
  { id:"figma",    label:"Figma",    emoji:"🎨" },
  { id:"sql",      label:"SQL",      emoji:"🗄️" },
  { id:"api",      label:"REST API", emoji:"🔌" },
  { id:"mobile",   label:"Mobile",   emoji:"📱" },
];

const shuffle = (arr) => { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const createDeck = () => shuffle(TECH_CARDS.flatMap(c=>[{...c,uid:c.id+"_a"},{...c,uid:c.id+"_b"}]));

export default function MemoryCard() {
  const { t } = useLang();
  const g = t.games;

  const [deck, setDeck]       = useState(createDeck);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves]     = useState(0);
  const [locked, setLocked]   = useState(false);
  const [won, setWon]         = useState(false);
  const [best, setBest]       = useState(()=>{ try{const s=localStorage.getItem("memoryBest");return s?parseInt(s):null}catch{return null} });
  const [time, setTime]       = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(()=>{ if(!running)return; const t=setInterval(()=>setTime(s=>s+1),1000); return()=>clearInterval(t); },[running]);

  useEffect(()=>{
    if(matched.length===TECH_CARDS.length*2&&matched.length>0){
      setWon(true); setRunning(false);
      if(!best||moves<best){ setBest(moves); saveScore("memory",moves); }
    }
  },[matched]);

  useEffect(()=>{
    if(flipped.length!==2) return;
    setLocked(true); const[a,b]=flipped;
    if(deck[a].id===deck[b].id){ setMatched(m=>[...m,deck[a].uid,deck[b].uid]); setFlipped([]); setLocked(false); }
    else{ setTimeout(()=>{ setFlipped([]); setLocked(false); },900); }
    setMoves(m=>m+1);
  },[flipped]);

  const click = (i) => {
    if(locked||flipped.includes(i)||matched.includes(deck[i].uid)||flipped.length===2) return;
    if(!running) setRunning(true);
    setFlipped(f=>[...f,i]);
  };

  const restart = () => { setDeck(createDeck()); setFlipped([]); setMatched([]); setMoves(0); setLocked(false); setWon(false); setTime(0); setRunning(false); };
  const fmt = s=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"6px" }}>
        {[[g.moves,moves],[g.time,fmt(time)],[g.left,`${TECH_CARDS.length-matched.length/2}`],[g.best,best??"---"]].map(([l,v])=>(
          <div key={l} style={{ border:"1px solid var(--border)", background:"var(--bg)", padding:"8px 6px", textAlign:"center", minWidth:0 }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"8px", letterSpacing:"1px", color:"var(--green-dim)", marginBottom:"2px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{l}</div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:"clamp(13px,3.5vw,17px)", fontWeight:700, color:"var(--green)" }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", justifyContent:"flex-end" }}>
        <button onClick={restart} className="btn btn-secondary" style={{ padding:"6px 16px", fontSize:"13px" }}>↺ {g.restart}</button>
      </div>

      {/* Grid — constrained so all 16 cards stay visible */}
      <div style={{ maxWidth:"380px", margin:"0 auto", width:"100%" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"6px" }}>
          {deck.map((card,i)=>{
            const isFlipped=flipped.includes(i), isMatched=matched.includes(card.uid);
            return(
              <div key={card.uid} onClick={()=>click(i)} style={{ aspectRatio:"1", perspective:"400px", cursor:isMatched?"default":"pointer", WebkitTapHighlightColor:"transparent" }}>
                <div style={{ width:"100%", height:"100%", position:"relative", transformStyle:"preserve-3d", transform:isFlipped||isMatched?"rotateY(180deg)":"rotateY(0deg)", transition:"transform 0.4s" }}>
                  <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden", background:"var(--bg-card)", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ fontFamily:"var(--font-display)", fontSize:"clamp(14px,4vw,22px)", color:"var(--border)" }}>?</span>
                  </div>
                  <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden", transform:"rotateY(180deg)", background:isMatched?"linear-gradient(135deg,#001a0d,#002a15)":"var(--bg-card)", border:`1px solid ${isMatched?"var(--green)":"var(--border)"}`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"4px", boxShadow:isMatched?"0 0 12px rgba(0,255,136,0.3)":"none" }}>
                    <span style={{ fontSize:"clamp(16px,5vw,26px)" }}>{card.emoji}</span>
                    <span style={{ fontFamily:"var(--font-mono)", fontSize:"clamp(7px,2vw,10px)", color:isMatched?"var(--green)":"var(--text-muted)", textTransform:"uppercase", letterSpacing:"1px", textAlign:"center", padding:"0 2px" }}>{card.label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {won && (
        <div style={{ textAlign:"center", padding:"16px", border:"1px solid var(--green)", background:"rgba(0,255,136,0.05)" }}>
          <div style={{ fontFamily:"var(--font-display)", fontSize:"clamp(18px,5vw,24px)", color:"var(--green)", marginBottom:"6px" }}>🏆 {g.you_win}</div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:"12px", color:"var(--text-muted)", marginBottom:"14px" }}>
            {moves} {g.moves.toLowerCase()} | {fmt(time)}{best===moves&&<span style={{ color:"var(--green)" }}> {g.new_best}</span>}
          </div>
          <button className="btn btn-primary" onClick={restart} style={{ justifyContent:"center" }}>{g.play_again}</button>
        </div>
      )}
    </div>
  );
}
