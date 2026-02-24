import { useState, useEffect, useRef } from "react";

const SNIPPETS = [
  { code:"void main() { runApp(MyApp()); }", lang:"Dart" },
  { code:"flutter pub get", lang:"Terminal" },
  { code:"setState(() { counter++; });", lang:"Flutter" },
  { code:"Navigator.push(context, MaterialPageRoute(builder: (_) => Screen()));", lang:"Flutter" },
  { code:"final ref = FirebaseDatabase.instance.ref('users');", lang:"Firebase" },
  { code:"git commit -m 'feat: add authentication'", lang:"Git" },
  { code:"const SizedBox(height: 16, width: double.infinity)", lang:"Dart" },
  { code:"ListView.builder(itemCount: items.length, itemBuilder: (ctx, i) => Text(items[i]))", lang:"Flutter" },
];

export default function TypeRacer() {
  const [idx, setIdx]         = useState(()=>Math.floor(Math.random()*SNIPPETS.length));
  const [typed, setTyped]     = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone]       = useState(false);
  const [time, setTime]       = useState(0);
  const [wpm, setWpm]         = useState(0);
  const [best, setBest]       = useState(()=>{ try{return parseInt(localStorage.getItem("typeracerBest")||"0")}catch{return 0} });
  const inputRef = useRef(null);
  const target = SNIPPETS[idx].code;

  useEffect(()=>{
    if(!started||done) return;
    const t=setInterval(()=>setTime(s=>s+1),1000);
    return ()=>clearInterval(t);
  },[started,done]);

  const handleInput = (e) => {
    const val=e.target.value;
    if(!started&&val.length>0) setStarted(true);
    if(val.length>target.length) return;
    setTyped(val);
    if(val===target){
      setDone(true);
      const mins=(time||1)/60;
      const w=Math.round((target.split(" ").length)/mins);
      setWpm(w);
      setBest(b=>{ const nb=Math.max(b,w); try{localStorage.setItem("typeracerBest",nb)}catch{}; return nb; });
    }
  };

  const restart = () => {
    setIdx(Math.floor(Math.random()*SNIPPETS.length));
    setTyped(""); setStarted(false); setDone(false); setTime(0); setWpm(0);
    setTimeout(()=>inputRef.current?.focus(),100);
  };

  const accuracy = typed.length===0 ? 100 :
    Math.round((typed.split("").filter((c,i)=>c===target[i]).length/typed.length)*100);

  const progress = Math.round((typed.length/target.length)*100);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>

      {/* Stats */}
      <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
        {[["⏱ TIME",`${time}s`],["⚡ WPM",wpm||"--"],["🎯 ACC",`${accuracy}%`],["🏆 BEST",best?`${best}wpm`:"---"]].map(([l,v])=>(
          <div key={l} style={{ border:"1px solid var(--border)", background:"var(--bg)", padding:"8px 10px", flex:1, textAlign:"center", minWidth:"60px" }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"1px", color:"var(--green-dim)", whiteSpace:"nowrap" }}>{l}</div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:"clamp(13px,3vw,17px)", fontWeight:700, color:"var(--green)" }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ height:"3px", background:"var(--border)" }}>
        <div style={{ height:"100%", background:"var(--green)", width:`${progress}%`, transition:"width 0.1s" }}/>
      </div>

      {/* Language */}
      <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"3px", color:"var(--green)", opacity:0.7 }}>
        // {SNIPPETS[idx].lang}
      </div>

      {/* Code display */}
      <div style={{ background:"var(--bg)", border:"1px solid var(--border)", padding:"16px", fontFamily:"var(--font-mono)", fontSize:"clamp(12px,3vw,15px)", lineHeight:1.9, letterSpacing:"0.5px", wordBreak:"break-all", minHeight:"70px" }}>
        {target.split("").map((char,i)=>{
          let color="var(--text-muted)";
          if(i<typed.length) color=typed[i]===char?"var(--green)":"#ff4466";
          return <span key={i} style={{ color, background:i===typed.length?"rgba(0,255,136,0.2)":"transparent", transition:"color 0.08s" }}>{char}</span>;
        })}
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        value={typed}
        onChange={handleInput}
        disabled={done}
        placeholder={done?"✓ DONE! Click below for next snippet":"Start typing the code above..."}
        style={{
          background:"var(--bg-card)", border:`1px solid ${done?"var(--green)":"var(--border)"}`,
          color:"var(--text)", padding:"14px 16px",
          fontFamily:"var(--font-mono)", fontSize:"clamp(12px,3vw,14px)",
          outline:"none", width:"100%", transition:"border-color 0.3s",
        }}
        autoFocus
      />

      {done ? (
        <div style={{ textAlign:"center" }}>
          <div style={{ fontFamily:"var(--font-display)", fontSize:"clamp(22px,6vw,32px)", color:"var(--green)", marginBottom:"6px" }}>{wpm} WPM 🎉</div>
          {best===wpm&&<div style={{ fontFamily:"var(--font-mono)", fontSize:"11px", color:"var(--green)", marginBottom:"12px" }}>★ NEW BEST!</div>}
          <button className="btn btn-primary" onClick={restart} style={{ justifyContent:"center" }}>NEXT SNIPPET →</button>
        </div>
      ) : (
        <button className="btn btn-secondary" onClick={restart} style={{ justifyContent:"center", fontSize:"11px" }}>↺ SKIP SNIPPET</button>
      )}
    </div>
  );
}