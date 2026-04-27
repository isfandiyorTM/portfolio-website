import { useState, useRef } from "react";
import { useLang } from "../i18n/LanguageContext";
import { saveScore } from "../lib/scores";

const CHALLENGES = [
  {
    title: "Hello World in Python",
    lines: [
      { id: "a", text: 'print("Hello, World!")', correct: 0 },
    ],
  },
  {
    title: "For loop in Python",
    lines: [
      { id: "a", text: "for i in range(5):", correct: 0 },
      { id: "b", text: "    print(i)", correct: 1 },
    ],
  },
  {
    title: "Simple function",
    lines: [
      { id: "a", text: "def greet(name):", correct: 0 },
      { id: "b", text: '    return "Hello, " + name', correct: 1 },
      { id: "c", text: 'print(greet("Alice"))', correct: 2 },
    ],
  },
  {
    title: "If / else block",
    lines: [
      { id: "a", text: "x = 10", correct: 0 },
      { id: "b", text: "if x > 5:", correct: 1 },
      { id: "c", text: '    print("big")', correct: 2 },
      { id: "d", text: "else:", correct: 3 },
      { id: "e", text: '    print("small")', correct: 4 },
    ],
  },
  {
    title: "While loop with break",
    lines: [
      { id: "a", text: "count = 0", correct: 0 },
      { id: "b", text: "while True:", correct: 1 },
      { id: "c", text: "    count += 1", correct: 2 },
      { id: "d", text: "    if count >= 3:", correct: 3 },
      { id: "e", text: "        break", correct: 4 },
      { id: "f", text: "print(count)", correct: 5 },
    ],
  },
  {
    title: "List operations",
    lines: [
      { id: "a", text: "fruits = []", correct: 0 },
      { id: "b", text: 'fruits.append("apple")', correct: 1 },
      { id: "c", text: 'fruits.append("banana")', correct: 2 },
      { id: "d", text: "print(fruits)", correct: 3 },
    ],
  },
  {
    title: "Class definition",
    lines: [
      { id: "a", text: "class Dog:", correct: 0 },
      { id: "b", text: "    def __init__(self, name):", correct: 1 },
      { id: "c", text: "        self.name = name", correct: 2 },
      { id: "d", text: "    def bark(self):", correct: 3 },
      { id: "e", text: '        print("Woof! I am " + self.name)', correct: 4 },
    ],
  },
  {
    title: "Try / except",
    lines: [
      { id: "a", text: "try:", correct: 0 },
      { id: "b", text: "    x = int(input())", correct: 1 },
      { id: "c", text: "except ValueError:", correct: 2 },
      { id: "d", text: '    print("Not a number")', correct: 3 },
    ],
  },
];

const shuffle = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function CodeOrder() {
  const { t } = useLang();
  const g = t.games;

  const [qIdx,    setQIdx]    = useState(0);
  const [items,   setItems]   = useState(() => shuffle(CHALLENGES[0].lines));
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [score,   setScore]   = useState(0);
  const [done,    setDone]    = useState(false);
  const [best,    setBest]    = useState(() => { try { return parseInt(localStorage.getItem("codeorderBest") || "0"); } catch { return 0; } });

  const dragIdx = useRef(null);
  const dragOverIdx = useRef(null);

  const challenge = CHALLENGES[qIdx];

  const handleDragStart = (i) => { dragIdx.current = i; };
  const handleDragEnter = (i) => { dragOverIdx.current = i; };
  const handleDragEnd   = () => {
    if (dragIdx.current === null || dragOverIdx.current === null) return;
    if (dragIdx.current === dragOverIdx.current) { dragIdx.current = null; dragOverIdx.current = null; return; }
    const next = [...items];
    const [moved] = next.splice(dragIdx.current, 1);
    next.splice(dragOverIdx.current, 0, moved);
    setItems(next);
    dragIdx.current = null;
    dragOverIdx.current = null;
  };

  // Touch drag
  const touchStartY = useRef(null);
  const touchStartIdx = useRef(null);
  const handleTouchStart = (i, e) => {
    touchStartIdx.current = i;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchMove = (e) => { e.preventDefault(); };
  const handleTouchEnd = (e) => {
    const endY = e.changedTouches[0].clientY;
    const delta = endY - touchStartY.current;
    const step = Math.round(delta / 44);
    if (step === 0 || touchStartIdx.current === null) return;
    const from = touchStartIdx.current;
    const to = Math.max(0, Math.min(items.length - 1, from + step));
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setItems(next);
    touchStartIdx.current = null;
  };

  const moveUp   = (i) => { if (i === 0) return; const n = [...items]; [n[i-1],n[i]]=[n[i],n[i-1]]; setItems(n); };
  const moveDown = (i) => { if (i === items.length-1) return; const n = [...items]; [n[i],n[i+1]]=[n[i+1],n[i]]; setItems(n); };

  const check = () => {
    const isCorrect = items.every((item, i) => item.correct === i);
    setChecked(true);
    setCorrect(isCorrect);
    if (isCorrect) {
      const ns = score + 1;
      setScore(ns);
      if (qIdx + 1 >= CHALLENGES.length) {
        const nb = Math.max(best, ns);
        setBest(nb);
        saveScore("codeorder", nb);
        setDone(true);
      }
    }
  };

  const next = () => {
    const ni = qIdx + 1;
    if (ni >= CHALLENGES.length) {
      const nb = Math.max(best, score);
      setBest(nb);
      saveScore("codeorder", nb);
      setDone(true);
      return;
    }
    setQIdx(ni);
    setItems(shuffle(CHALLENGES[ni].lines));
    setChecked(false);
    setCorrect(false);
  };

  const retry = () => {
    setItems(shuffle(challenge.lines));
    setChecked(false);
    setCorrect(false);
  };

  const restart = () => {
    setQIdx(0);
    setItems(shuffle(CHALLENGES[0].lines));
    setChecked(false);
    setCorrect(false);
    setScore(0);
    setDone(false);
  };

  const lineColor = (item, i) => {
    if (!checked) return "var(--border)";
    return item.correct === i ? "var(--green)" : "#ff4466";
  };

  const lineBg = (item, i) => {
    if (!checked) return "var(--bg-card)";
    return item.correct === i ? "rgba(0,255,136,0.08)" : "rgba(255,68,102,0.08)";
  };

  if (done) {
    return (
      <div style={{ textAlign:"center", padding:"40px 20px", display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
        <div style={{ fontFamily:"var(--font-display)", fontSize:32, color:"var(--green)" }}>🏆</div>
        <div style={{ fontFamily:"var(--font-display)", fontSize:22, color:"var(--green)", letterSpacing:3 }}>{g.codeorder_complete}</div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:13, color:"var(--text-muted)" }}>
          {g.score}: <span style={{ color:"var(--green)", fontWeight:700 }}>{score}</span> / {CHALLENGES.length}
          {score === best && score > 0 && <span style={{ color:"var(--green)", marginLeft:10 }}>{g.new_best}</span>}
        </div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"var(--text-muted)", letterSpacing:2 }}>
          {g.best}: {best} / {CHALLENGES.length}
        </div>
        <button className="btn btn-primary" onClick={restart} style={{ padding:"12px 32px" }}>{g.play_again}</button>
      </div>
    );
  }

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:3, color:"var(--text-muted)" }}>
          {g.codeorder_challenge} {qIdx + 1} / {CHALLENGES.length}
        </div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:3, color:"var(--green)" }}>
          {g.score}: {score}  {g.best}: {best}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height:3, background:"var(--border)", borderRadius:2 }}>
        <div style={{ height:"100%", background:"var(--green)", width:`${((qIdx)/CHALLENGES.length)*100}%`, transition:"width 0.4s", borderRadius:2 }} />
      </div>

      {/* Title */}
      <div style={{ fontFamily:"var(--font-display)", fontSize:14, fontWeight:700, color:"var(--text)", letterSpacing:1 }}>
        {challenge.title}
      </div>
      <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--text-muted)", letterSpacing:1 }}>
        {g.codeorder_hint}
      </div>

      {/* Lines */}
      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
        {items.map((item, i) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(i)}
            onDragEnter={() => handleDragEnter(i)}
            onDragEnd={handleDragEnd}
            onDragOver={e => e.preventDefault()}
            onTouchStart={e => handleTouchStart(i, e)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              display:"flex", alignItems:"center", gap:8,
              padding:"10px 12px",
              border:`1px solid ${lineColor(item, i)}`,
              background: lineBg(item, i),
              borderRadius:3,
              cursor:"grab",
              transition:"border-color 0.2s, background 0.2s",
              userSelect:"none",
              WebkitTapHighlightColor:"transparent",
            }}
          >
            <span style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--text-muted)", minWidth:16, textAlign:"right" }}>{i+1}</span>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:12, color:"var(--text)", flex:1, whiteSpace:"pre" }}>{item.text}</span>
            {/* Mobile arrows */}
            <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
              <button
                onClick={() => moveUp(i)}
                disabled={i === 0}
                style={{ background:"none", border:"none", color: i===0 ? "var(--border)" : "var(--green)", cursor: i===0?"default":"pointer", fontSize:10, lineHeight:1, padding:"2px 4px" }}
              >▲</button>
              <button
                onClick={() => moveDown(i)}
                disabled={i === items.length-1}
                style={{ background:"none", border:"none", color: i===items.length-1 ? "var(--border)" : "var(--green)", cursor: i===items.length-1?"default":"pointer", fontSize:10, lineHeight:1, padding:"2px 4px" }}
              >▼</button>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback */}
      {checked && (
        <div style={{
          fontFamily:"var(--font-mono)", fontSize:11, textAlign:"center", padding:"10px",
          border:`1px solid ${correct ? "var(--green)" : "#ff4466"}`,
          background: correct ? "rgba(0,255,136,0.06)" : "rgba(255,68,102,0.06)",
          color: correct ? "var(--green)" : "#ff4466",
          letterSpacing: 2,
        }}>
          {correct ? g.codeorder_correct : g.codeorder_wrong}
        </div>
      )}

      {/* Actions */}
      <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
        {!checked && (
          <button className="btn btn-primary" onClick={check} style={{ padding:"10px 28px", fontSize:12 }}>
            {g.codeorder_check}
          </button>
        )}
        {checked && !correct && (
          <button className="btn btn-secondary" onClick={retry} style={{ padding:"10px 28px", fontSize:12 }}>
            {g.rxt_try_again}
          </button>
        )}
        {checked && correct && (
          <button className="btn btn-primary" onClick={next} style={{ padding:"10px 28px", fontSize:12 }}>
            {qIdx + 1 < CHALLENGES.length ? g.next : g.codeorder_finish}
          </button>
        )}
      </div>
    </div>
  );
}
