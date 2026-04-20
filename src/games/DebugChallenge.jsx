import { useState } from "react";
import { useLang } from "../i18n/LanguageContext";

const CHALLENGES = [
  {
    title: "Something's off here...",
    lines: ["void main() {", "  runApp(MyApp())", "}"],
    bugLine: 1,
    label: "Missing semicolon",
    explanation: "Every Dart statement must end with ;  →  runApp(MyApp());",
  },
  {
    title: "The button should open a new screen",
    lines: [
      "ElevatedButton(",
      "  onPressed: () {",
      "    Navigator.pop(context);",
      "  },",
      "  child: Text('Next Page'),",
      "),",
    ],
    bugLine: 2,
    label: "Wrong Navigator method",
    explanation: "pop() closes the current screen. Use Navigator.push() to open a new one.",
  },
  {
    title: "This widget won't compile",
    lines: ["int score = 42;", "", "Text(score),"],
    bugLine: 2,
    label: "Int passed to Text()",
    explanation: "Text() only accepts String. Use score.toString() or '\\$score'.",
  },
  {
    title: "Layout looks wrong at runtime",
    lines: [
      "Column(",
      "  children: [",
      "    Icon(Icons.star),",
      "    Text('Starred'),",
      "  ],",
      "),",
    ],
    bugLine: 0,
    label: "Wrong layout widget",
    explanation: "Column() stacks vertically. For a horizontal icon+label use Row().",
  },
  {
    title: "Null safety error on startup",
    lines: [
      "class ProfilePage extends StatefulWidget {",
      "  String username;",
      "",
      "  void greet() => print('Hi \\$username!');",
      "}",
    ],
    bugLine: 1,
    label: "Non-nullable field not initialized",
    explanation: "In Dart null-safety, String must be initialized or declared as String?.",
  },
  {
    title: "Condition never works as expected",
    lines: ["if (count = 0) {", "  print('Empty list');", "}"],
    bugLine: 0,
    label: "Assignment instead of comparison",
    explanation: "= assigns a value. Use == to compare. if (count == 0).",
  },
  {
    title: "Crash after await",
    lines: [
      "Future<void> save() async {",
      "  await saveToDatabase();",
      "  Navigator.pop(context);",
      "}",
    ],
    bugLine: 2,
    label: "context used after async gap",
    explanation: "After await, the widget may be unmounted. Guard with: if (mounted) Navigator.pop(context);",
  },
  {
    title: "App icon never shows",
    lines: [
      "Image.asset(",
      "  'assets/logo.png',",
      "  width: 80,",
      "),",
    ],
    bugLine: 1,
    label: "Asset not declared in pubspec.yaml",
    explanation: "Dart can't find the image unless it's listed under flutter > assets in pubspec.yaml.",
  },
];

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function DebugChallenge() {
  const { t } = useLang();
  const g = t.games;
  const [challenges] = useState(() => shuffle(CHALLENGES).slice(0, 6));
  const [round,     setRound]     = useState(0);
  const [selected,  setSelected]  = useState(null);
  const [revealed,  setRevealed]  = useState(false);
  const [score,     setScore]     = useState(0);
  const [done,      setDone]      = useState(false);

  if (done) {
    const pct = Math.round((score / challenges.length) * 100);
    return (
      <div style={{ textAlign:"center", padding:"32px 0" }}>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:11, letterSpacing:4, color:"var(--green)", marginBottom:12 }}>// RESULTS</div>
        <div style={{ fontFamily:"var(--font-display)", fontSize:48, fontWeight:900, color: pct >= 70 ? "var(--green)" : "var(--text)", lineHeight:1 }}>
          {score}<span style={{ fontSize:24, color:"var(--text-muted)" }}>/{challenges.length}</span>
        </div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:12, color:"var(--text-muted)", marginTop:8, marginBottom:28 }}>
          {pct >= 80 ? g.dbg_senior : pct >= 50 ? g.dbg_mid : g.dbg_low}
        </div>
        <button className="btn btn-primary" onClick={() => { setRound(0); setScore(0); setSelected(null); setRevealed(false); setDone(false); }}>
          {g.restart}
        </button>
      </div>
    );
  }

  const ch = challenges[round];

  const handleLine = (i) => {
    if (revealed) return;
    setSelected(i);
  };

  const handleSubmit = () => {
    if (selected === null || revealed) return;
    if (selected === ch.bugLine) setScore(s => s + 1);
    setRevealed(true);
  };

  const next = () => {
    if (round + 1 >= challenges.length) { setDone(true); return; }
    setRound(r => r + 1);
    setSelected(null);
    setRevealed(false);
  };

  const correct = revealed && selected === ch.bugLine;

  return (
    <div>
      {/* Progress */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:3, color:"var(--green)" }}>
          {g.dbg_round} {round + 1}/{challenges.length}
        </span>
        <div style={{ display:"flex", gap:6 }}>
          {challenges.map((_, i) => (
            <div key={i} style={{ width:20, height:3, borderRadius:2, background: i < round ? "var(--green)" : i === round ? "var(--green-dim)" : "var(--green-dark)" }} />
          ))}
        </div>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--text-muted)" }}>{g.score} {score}</span>
      </div>

      {/* Title */}
      <div style={{ fontFamily:"var(--font-mono)", fontSize:12, color:"var(--text-muted)", marginBottom:16 }}>
        {ch.title}
      </div>

      {/* Code block */}
      <div style={{ background:"#030608", border:"1px solid var(--green-dark)", marginBottom:16, overflow:"hidden", overflowX:"auto" }}>
        <div style={{ padding:"8px 12px", borderBottom:"1px solid var(--green-dark)", fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:3, color:"var(--green-dim)" }}>
          // dart
        </div>
        {ch.lines.map((line, i) => {
          const isBug     = revealed && i === ch.bugLine;
          const isWrong   = revealed && i === selected && selected !== ch.bugLine;
          const isHovered = !revealed && i === selected;
          return (
            <div
              key={i}
              onClick={() => handleLine(i)}
              style={{
                display:"flex", alignItems:"flex-start", gap:12,
                padding:"7px 12px",
                cursor: revealed ? "default" : line.trim() === "" ? "default" : "pointer",
                background: isBug    ? "rgba(0,255,136,0.12)"
                          : isWrong  ? "rgba(255,60,60,0.12)"
                          : isHovered ? "rgba(0,255,136,0.06)"
                          : "transparent",
                borderLeft: isBug   ? "2px solid var(--green)"
                          : isWrong ? "2px solid #ff3c3c"
                          : "2px solid transparent",
                transition:"background 0.15s",
              }}
            >
              <span style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"#1a3a2a", minWidth:16, userSelect:"none" }}>{i + 1}</span>
              <code style={{ fontFamily:"var(--font-mono)", fontSize:"clamp(11px,3vw,13px)", color: isBug ? "var(--green)" : isWrong ? "#ff6060" : "var(--text-muted)", whiteSpace:"pre" }}>
                {line || "\u00a0"}
              </code>
              {isBug   && <span style={{ marginLeft:"auto", fontFamily:"var(--font-mono)", fontSize:9, color:"var(--green)", letterSpacing:2 }}>{g.dbg_bug} ▲</span>}
              {isWrong && <span style={{ marginLeft:"auto", fontFamily:"var(--font-mono)", fontSize:9, color:"#ff6060", letterSpacing:2 }}>{g.dbg_wrong_lbl}</span>}
            </div>
          );
        })}
      </div>

      {/* Explanation after reveal */}
      {revealed && (
        <div style={{ padding:"14px 16px", border:`1px solid ${correct ? "var(--green)" : "#ff3c3c"}`, background: correct ? "rgba(0,255,136,0.05)" : "rgba(255,60,60,0.05)", marginBottom:16 }}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:2, color: correct ? "var(--green)" : "#ff6060", marginBottom:6 }}>
            {correct ? g.dbg_correct_lbl : g.dbg_incorrect_lbl} {ch.label}
          </div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"var(--text-muted)", lineHeight:1.6 }}>{ch.explanation}</div>
        </div>
      )}

      {/* Actions */}
      {!revealed ? (
        <button className="btn btn-primary" onClick={handleSubmit} style={{ opacity: selected === null ? 0.4 : 1 }}>
          {selected === null ? g.dbg_click_line : g.dbg_submit}
        </button>
      ) : (
        <button className="btn btn-primary" onClick={next}>
          {round + 1 >= challenges.length ? g.dbg_see : g.dbg_next}
        </button>
      )}
    </div>
  );
}
