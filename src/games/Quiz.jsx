import { useState } from "react";

const QUESTIONS = [
  { q:"What language is Flutter built with?", options:["JavaScript","Kotlin","Dart","Swift"], answer:2 },
  { q:"Which widget is used for scrollable lists in Flutter?", options:["Column","GridView","ListView","Stack"], answer:2 },
  { q:"What does 'pub get' do in Flutter?", options:["Runs the app","Fetches dependencies","Builds APK","Cleans cache"], answer:1 },
  { q:"Which state management uses Streams in Flutter?", options:["Provider","GetX","Riverpod","Bloc"], answer:3 },
  { q:"What is the entry point of every Flutter app?", options:["App()","main()","init()","start()"], answer:1 },
  { q:"Which Firebase service stores structured data in real-time?", options:["Firestore","Storage","Auth","Hosting"], answer:0 },
  { q:"What does 'hot reload' do in Flutter?", options:["Restarts app fully","Injects code without restart","Clears state","Rebuilds APK"], answer:1 },
  { q:"Which widget makes its child scrollable?", options:["Expanded","Flexible","SingleChildScrollView","Padding"], answer:2 },
  { q:"What is 'pubspec.yaml' used for?", options:["UI layout","App config & dependencies","Routing","State management"], answer:1 },
  { q:"Which Dart keyword makes a variable constant at compile time?", options:["final","static","const","var"], answer:2 },
  { q:"What does GetX provide in Flutter?", options:["Only routing","Only state","State, routing & DI","Only DI"], answer:2 },
  { q:"Which layout widget arranges children horizontally?", options:["Column","Row","Stack","Wrap"], answer:1 },
];

export default function Quiz() {
  const [questions]             = useState(() => [...QUESTIONS].sort(()=>Math.random()-0.5).slice(0,8));
  const [current, setCurrent]   = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore]       = useState(0);
  const [done, setDone]         = useState(false);
  const [answered, setAnswered] = useState(false);

  const q = questions[current];

  const handleAnswer = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === q.answer) setScore(s => s+1);
  };

  const next = () => {
    if (current + 1 >= questions.length) { setDone(true); return; }
    setCurrent(c => c+1);
    setSelected(null);
    setAnswered(false);
  };

  const restart = () => {
    setCurrent(0); setSelected(null);
    setScore(0); setDone(false); setAnswered(false);
  };

  if (done) return (
    <div style={{ textAlign:"center", padding:"32px 0" }}>
      <div style={{ fontSize:"48px", marginBottom:"16px" }}>{score >= 6 ? "🏆" : score >= 4 ? "👍" : "📚"}</div>
      <div style={{ fontFamily:"var(--font-display)", fontSize:"32px", color:"var(--green)", marginBottom:"8px" }}>
        {score}/{questions.length}
      </div>
      <div style={{ fontFamily:"var(--font-mono)", fontSize:"13px", color:"var(--text-muted)", marginBottom:"32px" }}>
        {score >= 6 ? "FLUTTER EXPERT! 🔥" : score >= 4 ? "GOOD JOB! KEEP LEARNING" : "KEEP STUDYING FLUTTER DOCS!"}
      </div>
      <button className="btn btn-primary" onClick={restart} style={{ justifyContent:"center" }}>PLAY AGAIN</button>
    </div>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
      {/* Progress */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:"11px", color:"var(--text-muted)", letterSpacing:"2px" }}>
          {current+1} / {questions.length}
        </span>
        <span style={{ fontFamily:"var(--font-display)", fontSize:"16px", color:"var(--green)" }}>
          ⭐ {score}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ height:"3px", background:"var(--border)", position:"relative" }}>
        <div style={{ position:"absolute", left:0, top:0, bottom:0, background:"var(--green)", width:`${((current)/questions.length)*100}%`, transition:"width 0.4s" }} />
      </div>

      {/* Question */}
      <div style={{ fontFamily:"var(--font-mono)", fontSize:"15px", lineHeight:1.7, color:"var(--text)", padding:"20px", border:"1px solid var(--border)", background:"var(--bg)" }}>
        <span style={{ color:"var(--green)", marginRight:"8px" }}>//</span>{q.q}
      </div>

      {/* Options */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
        {q.options.map((opt, i) => {
          let bg = "var(--bg-card)", border = "var(--border)", color = "var(--text)";
          if (answered) {
            if (i === q.answer) { bg="#001a0d"; border="var(--green)"; color="var(--green)"; }
            else if (i === selected) { bg="#1a0005"; border="#ff4466"; color="#ff4466"; }
          }
          return (
            <button key={i} onClick={() => handleAnswer(i)} style={{
              background:bg, border:`1px solid ${border}`, color,
              padding:"14px 16px", fontFamily:"var(--font-mono)", fontSize:"13px",
              cursor:answered?"default":"pointer", textAlign:"left",
              transition:"all 0.3s", letterSpacing:"1px",
            }}>
              <span style={{ color:"var(--green-dim)", marginRight:"8px" }}>{String.fromCharCode(65+i)}.</span>{opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:"13px", color: selected===q.answer ? "var(--green)" : "#ff4466" }}>
            {selected === q.answer ? "✓ CORRECT!" : `✗ WRONG — Answer: ${q.options[q.answer]}`}
          </span>
          <button className="btn btn-primary" onClick={next} style={{ padding:"10px 24px", fontSize:"12px" }}>
            {current+1 >= questions.length ? "RESULTS" : "NEXT →"}
          </button>
        </div>
      )}
    </div>
  );
}