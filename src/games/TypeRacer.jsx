import { useState, useEffect, useRef } from "react";

const SNIPPETS = [
  { code: "void main() { runApp(MyApp()); }", lang: "Dart" },
  { code: "flutter pub get", lang: "Terminal" },
  { code: "StreamBuilder<QuerySnapshot>(stream: firestore.collection('users').snapshots())", lang: "Flutter" },
  { code: "final ref = FirebaseDatabase.instance.ref('users');", lang: "Firebase" },
  { code: "Navigator.push(context, MaterialPageRoute(builder: (_) => Screen()));", lang: "Flutter" },
  { code: "ListView.builder(itemCount: items.length, itemBuilder: (ctx, i) => Text(items[i]))", lang: "Flutter" },
  { code: "setState(() { counter++; });", lang: "Flutter" },
  { code: "const SizedBox(height: 16, width: double.infinity)", lang: "Dart" },
  { code: "git commit -m 'feat: add authentication'", lang: "Git" },
  { code: "class MyWidget extends StatefulWidget { const MyWidget({super.key}); }", lang: "Flutter" },
];

export default function TypeRacer() {
  const [idx, setIdx]         = useState(() => Math.floor(Math.random()*SNIPPETS.length));
  const [typed, setTyped]     = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone]       = useState(false);
  const [time, setTime]       = useState(0);
  const [wpm, setWpm]         = useState(0);
  const [best, setBest]       = useState(() => { try { return parseInt(localStorage.getItem("typeracerBest")||"0"); } catch { return 0; }});
  const inputRef = useRef(null);
  const target = SNIPPETS[idx].code;

  useEffect(() => {
    if (!started || done) return;
    const t = setInterval(() => setTime(s => s+1), 1000);
    return () => clearInterval(t);
  }, [started, done]);

  const handleInput = (e) => {
    const val = e.target.value;
    if (!started && val.length > 0) setStarted(true);
    if (val.length > target.length) return;
    setTyped(val);
    if (val === target) {
      setDone(true);
      const mins = time / 60 || 1/60;
      const words = target.split(" ").length;
      const calcWpm = Math.round(words / mins);
      setWpm(calcWpm);
      setBest(b => { const nb=Math.max(b,calcWpm); try{localStorage.setItem("typeracerBest",nb)}catch{}; return nb; });
    }
  };

  const restart = () => {
    setIdx(Math.floor(Math.random()*SNIPPETS.length));
    setTyped(""); setStarted(false); setDone(false); setTime(0); setWpm(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const accuracy = typed.length === 0 ? 100 :
    Math.round((typed.split("").filter((c,i) => c===target[i]).length / typed.length) * 100);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
      {/* Stats */}
      <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
        {[["TIME", `${time}s`],["WPM", wpm||"--"],["ACC", `${accuracy}%`],["BEST", best ? `${best} wpm` : "---"]].map(([l,v]) => (
          <div key={l} style={{ border:"1px solid var(--border)", background:"var(--bg)", padding:"8px 16px", flex:1, textAlign:"center", minWidth:"70px" }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"2px", color:"var(--green-dim)" }}>{l}</div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:"16px", fontWeight:700, color:"var(--green)" }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Language badge */}
      <div style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"3px", color:"var(--green)", opacity:0.7 }}>
        // {SNIPPETS[idx].lang}
      </div>

      {/* Code display */}
      <div style={{
        background:"var(--bg)", border:"1px solid var(--border)",
        padding:"20px", fontFamily:"var(--font-mono)", fontSize:"15px",
        lineHeight:1.8, letterSpacing:"1px", position:"relative", minHeight:"80px",
        wordBreak:"break-all",
      }}>
        {target.split("").map((char, i) => {
          let color = "var(--text-muted)";
          if (i < typed.length) color = typed[i] === char ? "var(--green)" : "#ff4466";
          return (
            <span key={i} style={{
              color, background: i === typed.length ? "rgba(0,255,136,0.2)" : "transparent",
              transition:"color 0.1s",
            }}>{char}</span>
          );
        })}
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        value={typed}
        onChange={handleInput}
        disabled={done}
        placeholder={done ? "✓ COMPLETE!" : "Start typing..."}
        style={{
          background:"var(--bg-card)", border:`1px solid ${done ? "var(--green)" : "var(--border)"}`,
          color:"var(--text)", padding:"14px 16px",
          fontFamily:"var(--font-mono)", fontSize:"14px",
          outline:"none", width:"100%",
          transition:"border-color 0.3s",
        }}
        autoFocus
      />

      {done && (
        <div style={{ textAlign:"center" }}>
          <div style={{ fontFamily:"var(--font-display)", fontSize:"28px", color:"var(--green)", marginBottom:"8px" }}>
            {wpm} WPM 🎉
          </div>
          {best === wpm && <div style={{ fontFamily:"var(--font-mono)", fontSize:"12px", color:"var(--green)", marginBottom:"16px" }}>★ NEW BEST!</div>}
          <button className="btn btn-primary" onClick={restart} style={{ justifyContent:"center" }}>NEXT SNIPPET</button>
        </div>
      )}
      {!done && <button className="btn btn-secondary" onClick={restart} style={{ justifyContent:"center", fontSize:"11px" }}>↺ NEW SNIPPET</button>}
    </div>
  );
}