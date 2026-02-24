import { useState, useEffect } from "react";

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

function shuffle(arr) {
  const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a;
}
function createDeck() {
  return shuffle(TECH_CARDS.flatMap(c=>[{...c,uid:c.id+"_a"},{...c,uid:c.id+"_b"}]));
}

export default function MemoryCard() {
  const [deck,setDeck]=[useState(createDeck)][0];
  const [flipped,setFlipped]=useState([]);
  const [matched,setMatched]=useState([]);
  const [moves,setMoves]=useState(0);
  const [locked,setLocked]=useState(false);
  const [won,setWon]=useState(false);
  const [best,setBest]=useState(()=>{try{const s=localStorage.getItem("memoryBest");return s?parseInt(s):null}catch{return null}});
  const [time,setTime]=useState(0);
  const [running,setRunning]=useState(false);

  useEffect(()=>{if(!running)return;const t=setInterval(()=>setTime(s=>s+1),1000);return()=>clearInterval(t);},[running]);
  useEffect(()=>{
    if(matched.length===TECH_CARDS.length*2&&matched.length>0){
      setWon(true);setRunning(false);
      if(!best||moves<best){setBest(moves);try{localStorage.setItem("memoryBest",moves)}catch{}}
    }
  },[matched]);
  useEffect(()=>{
    if(flipped.length!==2)return;
    setLocked(true);const[a,b]=flipped;
    if(deck[a].id===deck[b].id){setMatched(m=>[...m,deck[a].uid,deck[b].uid]);setFlipped([]);setLocked(false);}
    else{setTimeout(()=>{setFlipped([]);setLocked(false);},900);}
    setMoves(m=>m+1);
  },[flipped]);

  const click=(i)=>{
    if(locked||flipped.includes(i)||matched.includes(deck[i].uid)||flipped.length===2)return;
    if(!running)setRunning(true);
    setFlipped(f=>[...f,i]);
  };
  const restart=()=>{setDeck(createDeck());setFlipped([]);setMatched([]);setMoves(0);setLocked(false);setWon(false);setTime(0);setRunning(false);};
  const fmt=(s)=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  return (
    <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
      <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
        {[["MOVES",moves],["TIME",fmt(time)],["MATCHED",`${matched.length/2}/${TECH_CARDS.length}`],["BEST",best?best:"---"]].map(([l,v])=>(
          <div key={l} style={{border:"1px solid var(--border)",background:"var(--bg)",padding:"8px 12px",flex:1,textAlign:"center",minWidth:"60px"}}>
            <div style={{fontFamily:"var(--font-mono)",fontSize:"9px",letterSpacing:"2px",color:"var(--green-dim)"}}>{l}</div>
            <div style={{fontFamily:"var(--font-display)",fontSize:"16px",fontWeight:700,color:"var(--green)"}}>{v}</div>
          </div>
        ))}
        <button onClick={restart} className="btn btn-secondary" style={{padding:"8px 16px",fontSize:"11px"}}>↺</button>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"8px"}}>
        {deck.map((card,i)=>{
          const isFlipped=flipped.includes(i),isMatched=matched.includes(card.uid);
          return(
            <div key={card.uid} onClick={()=>click(i)} style={{aspectRatio:"1",perspective:"400px",cursor:isMatched?"default":"pointer"}}>
              <div style={{width:"100%",height:"100%",position:"relative",transformStyle:"preserve-3d",transform:isFlipped||isMatched?"rotateY(180deg)":"rotateY(0deg)",transition:"transform 0.4s"}}>
                <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",background:"var(--bg-card)",border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <span style={{fontFamily:"var(--font-display)",fontSize:"clamp(14px,3vw,20px)",color:"var(--border)"}}>?</span>
                </div>
                <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",transform:"rotateY(180deg)",background:isMatched?"linear-gradient(135deg,#001a0d,#002a15)":"var(--bg-card)",border:`1px solid ${isMatched?"var(--green)":"var(--border)"}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"4px",boxShadow:isMatched?"0 0 16px rgba(0,255,136,0.3)":"none"}}>
                  <span style={{fontSize:"clamp(16px,4vw,26px)"}}>{card.emoji}</span>
                  <span style={{fontFamily:"var(--font-mono)",fontSize:"clamp(7px,1.5vw,10px)",color:isMatched?"var(--green)":"var(--text-muted)",textTransform:"uppercase",letterSpacing:"1px"}}>{card.label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {won&&(
        <div style={{textAlign:"center",padding:"16px",border:"1px solid var(--green)",background:"rgba(0,255,136,0.05)"}}>
          <div style={{fontFamily:"var(--font-display)",fontSize:"22px",color:"var(--green)",marginBottom:"8px"}}>🏆 YOU WIN!</div>
          <div style={{fontFamily:"var(--font-mono)",fontSize:"12px",color:"var(--text-muted)",marginBottom:"16px"}}>{moves} MOVES | {fmt(time)}{best===moves&&<span style={{color:"var(--green)"}}> ★ BEST!</span>}</div>
          <button className="btn btn-primary" onClick={restart} style={{justifyContent:"center"}}>PLAY AGAIN</button>
        </div>
      )}
    </div>
  );
}