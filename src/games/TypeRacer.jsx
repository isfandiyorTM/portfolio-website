import { useState, useEffect, useRef, useCallback } from "react";
import { useLang } from "../i18n/LanguageContext";

const CONTENT = {
  en: {
    easy: [
      "the quick brown fox jumps over the lazy dog and runs away fast",
      "code is written once but read many times so write it well",
      "practice makes perfect and typing is no different at all",
      "every great developer was once a beginner who kept going",
      "build apps that make people smile and solve real problems today",
      "focus on progress not perfection and you will always improve",
      "clean code is not written by following rules but by caring deeply",
    ],
    medium: [
      "Programming is not about typing fast, it is about thinking clearly and solving problems one step at a time.",
      "The best way to learn a new skill is to build something real with it, even if it breaks along the way.",
      "Software development is a team sport. The code you write today will be read by someone else tomorrow.",
      "Debugging is twice as hard as writing the code in the first place. Write it simple the first time.",
      "A good programmer looks both ways before crossing a one-way street and always writes tests afterward.",
    ],
    quotes: [
      "First, solve the problem. Then, write the code. - John Johnson",
      "Any fool can write code a computer understands. Good programmers write code humans understand. - Fowler",
      "Simplicity is the soul of efficiency. - Austin Freeman",
      "Before software can be reusable it first has to be usable. - Ralph Johnson",
      "The most disastrous thing you can learn is your first programming language. - Alan Kay",
      "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
    ],
  },
  uz: {
    easy: [
      "tez yashil tulki dangasa it ustidan sakrab o'tdi va uzoqqa yugurdi",
      "kod bir marta yoziladi lekin ko'p marta o'qiladi shuning uchun uni yaxshi yozing",
      "mashq mukammallikka olib keladi va tez yozish ham bundan mustasno emas",
      "har bir buyuk dasturchi bir vaqtlar boshlagan yangi keldi edi va davom etdi",
      "odamlarni xursand qiladigan va muammolarni hal qiladigan ilovalar yarating",
      "mukammallik emas balki taraqqiyotga e'tibor bering va doim yaxshilanasiz",
      "yaxshi kod qoidalarga rioya qilish orqali emas balki g'amxo'rlik bilan yoziladi",
    ],
    medium: [
      "Dasturlash tez yozish haqida emas, balki aniq fikrlash va muammolarni birma-bir hal qilish haqida.",
      "Yangi ko'nikmani o'rganishning eng yaxshi usuli u bilan haqiqiy narsa qurishdir, hatto u buzilsa ham.",
      "Dasturiy ta'minot ishlab chiqish jamoa ishi. Siz bugun yozgan kod ertaga boshqa odam tomonidan o'qiladi.",
      "Xatoliklarni tuzatish kodni yozishdan ikki baravar qiyin. Birinchi marta oddiy yozing.",
      "Yaxshi dasturchi bir tomonli ko'chani kesib o'tishdan oldin ham ikkala tomonga qaraydi.",
    ],
    quotes: [
      "Avval muammoni hal qiling. Keyin kodni yozing. - John Johnson",
      "Har bir ahmoq kompyuter tushunadigan kod yoza oladi. Yaxshi dasturchilar inson tushunadigan kod yozadi. - Fowler",
      "Oddiylik samaradorlikning ruhi. - Austin Freeman",
      "Dasturiy ta'minot qayta foydalanilishidan oldin avval foydalanilishi kerak. - Ralph Johnson",
      "O'rganishingiz mumkin bo'lgan eng halokatli narsa birinchi dasturlash tilingizdir. - Alan Kay",
    ],
  },
  ru: {
    easy: [
      "быстрая коричневая лиса перепрыгнула через ленивую собаку и убежала прочь",
      "код пишется один раз но читается много раз поэтому пишите его хорошо",
      "практика ведёт к совершенству и быстрая печать не является исключением из этого",
      "каждый великий разработчик когда-то был новичком который продолжал идти вперёд",
      "создавайте приложения которые заставляют людей улыбаться и решают реальные задачи",
      "сосредоточьтесь на прогрессе а не на совершенстве и вы всегда будете улучшаться",
      "чистый код пишется не следованием правилам а заботой о качестве написанного",
    ],
    medium: [
      "Программирование — это не про скорость печати, а про чёткое мышление и решение задач по одной.",
      "Лучший способ освоить новый навык — создать с его помощью что-то реальное, даже если это сломается.",
      "Разработка программного обеспечения — командный вид спорта. Код который вы пишете сегодня прочитает кто-то другой.",
      "Отладка в два раза сложнее написания кода. Пишите просто с первого раза.",
      "Хороший программист смотрит в обе стороны перед переходом по дороге с односторонним движением.",
    ],
    quotes: [
      "Сначала решите проблему. Затем напишите код. - John Johnson",
      "Любой дурак напишет код который поймёт компьютер. Хороший программист пишет код который поймёт человек. - Fowler",
      "Простота — душа эффективности. - Austin Freeman",
      "Прежде чем программное обеспечение можно будет повторно использовать, оно должно быть пригодным для использования. - Ralph Johnson",
      "Самое губительное что вы можете выучить — это ваш первый язык программирования. - Alan Kay",
    ],
  },
};

// Code content is language-independent
const CODE_CONTENT = [
  "void main() { runApp(const MyApp()); }",
  "Widget build(BuildContext context) { return Scaffold(body: Center(child: Text('Hello'))); }",
  "Future<void> fetchData() async { final res = await http.get(uri); if (res.statusCode == 200) return; }",
  "final items = ['flutter', 'dart', 'mobile']; final upper = items.map((e) => e.toUpperCase()).toList();",
  "setState(() { counter++; score += 10; lastUpdated = DateTime.now(); });",
];

const pick = (mode, lang) => {
  if (mode === "code") {
    return CODE_CONTENT[Math.floor(Math.random() * CODE_CONTENT.length)];
  }
  const bank = CONTENT[lang]?.[mode] ?? CONTENT.en[mode];
  return bank[Math.floor(Math.random() * bank.length)];
};

const calcWpm = (correctChars, startMs) => {
  const mins = (Date.now() - startMs) / 60000;
  if (mins < 0.0001) return 0;
  return Math.round(correctChars / 5 / mins);
};

export default function TypeRacer() {
  const { t, lang } = useLang();
  const g = t.games;

  const MODE_META = {
    easy:   { label: g.tr_mode_easy,   icon: "🌱", hint: g.tr_hint_easy },
    medium: { label: g.tr_mode_medium, icon: "⚡", hint: g.tr_hint_medium },
    code:   { label: g.tr_mode_code,   icon: "💻", hint: g.tr_hint_code },
    quotes: { label: g.tr_mode_quotes, icon: "💬", hint: g.tr_hint_quotes },
  };

  const [mode,    setMode]   = useState("easy");
  const [text,    setText]   = useState(() => pick("easy", lang));
  const [typed,   setTyped]  = useState("");
  const [phase,   setPhase]  = useState("idle");   // idle | typing | done
  const [wpm,     setWpm]    = useState(0);
  const [acc,     setAcc]    = useState(100);
  const [elapsed, setElapsed] = useState(0);
  const [best,    setBest]   = useState(() => { try { return parseInt(localStorage.getItem("typeracerBest") || "0") || 0; } catch { return 0; } });
  const [newBest, setNewBest] = useState(false);

  const inputRef    = useRef(null);
  const startRef    = useRef(null);
  const intervalRef = useRef(null);
  const errorsRef   = useRef(new Set());
  const keyRef      = useRef({ total: 0, correct: 0 });
  const typedRef    = useRef("");   // mirror for interval closure

  const clearTimer = () => { if (intervalRef.current) clearInterval(intervalRef.current); };

  const startTimer = (startText) => {
    clearTimer();
    intervalRef.current = setInterval(() => {
      const cur = typedRef.current;
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
      const correctChars = [...cur].filter((c, i) => c === startText[i]).length;
      setWpm(calcWpm(correctChars, startRef.current));
      const { total, correct: ck } = keyRef.current;
      setAcc(total === 0 ? 100 : Math.round((ck / total) * 100));
    }, 200);
  };

  useEffect(() => () => clearTimer(), []);

  const reset = useCallback((newMode, newText) => {
    clearTimer();
    errorsRef.current = new Set();
    keyRef.current = { total: 0, correct: 0 };
    typedRef.current = "";
    setTyped("");
    setPhase("idle");
    setWpm(0);
    setAcc(100);
    setElapsed(0);
    setNewBest(false);
    const m = newMode ?? mode;
    const tx = newText ?? pick(m, lang);
    setMode(m);
    setText(tx);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [mode, lang]);

  const handleInput = (e) => {
    const val = e.target.value;
    if (val.length > text.length) return;

    if (phase === "idle" && val.length > 0) {
      startRef.current = Date.now();
      setPhase("typing");
      startTimer(text);
    }

    if (val.length > typed.length) {
      const idx = val.length - 1;
      const correct = val[idx] === text[idx];
      keyRef.current.total++;
      if (correct) keyRef.current.correct++;
      else errorsRef.current.add(idx);
    }

    typedRef.current = val;
    setTyped(val);

    if (val.length === text.length) {
      clearTimer();
      const finalSecs = Math.floor((Date.now() - startRef.current) / 1000);
      const correctChars = [...val].filter((c, i) => c === text[i]).length;
      const finalWpm = calcWpm(correctChars, startRef.current);
      const { total, correct: ck } = keyRef.current;
      const finalAcc = total === 0 ? 100 : Math.round((ck / total) * 100);
      setWpm(finalWpm);
      setAcc(finalAcc);
      setElapsed(finalSecs);
      setPhase("done");
      if (finalWpm > best) {
        setBest(finalWpm);
        setNewBest(true);
        try { localStorage.setItem("typeracerBest", finalWpm); } catch {}
      }
    }
  };

  const handleModeChange = (m) => reset(m, pick(m, lang));

  const progress = text.length > 0 ? (typed.length / text.length) * 100 : 0;

  return (
    <div style={{ userSelect: "none" }}>
      <style>{`
        .tr-mode { font-family:var(--font-mono); font-size:10px; letter-spacing:2px; padding:7px 12px; border:1px solid var(--border); background:transparent; color:var(--text-muted); cursor:pointer; transition:all 0.2s; text-transform:uppercase; white-space:nowrap; }
        .tr-mode.active { border-color:var(--green); background:rgba(0,255,136,0.08); color:var(--green); }
        .tr-mode:hover:not(.active) { border-color:var(--green-dim); color:var(--text); }
        .tr-char { font-family:var(--font-mono); font-size:17px; line-height:2; }
        .tr-char.correct  { color:var(--green); }
        .tr-char.wrong    { color:#ff3c3c; background:rgba(255,60,60,0.15); border-radius:2px; }
        .tr-char.cursor   { outline:1px solid var(--green); background:rgba(0,255,136,0.12); animation:blink 1s step-end infinite; }
        .tr-char.pending  { color:var(--text-muted); opacity:0.45; }
        @keyframes tr-nb { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
        .tr-nb { animation:tr-nb 0.5s ease; color:#ffcc44 !important; }
      `}</style>

      {/* Mode selector */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
        {Object.entries(MODE_META).map(([m, meta]) => (
          <button key={m} className={`tr-mode ${mode === m ? "active" : ""}`} onClick={() => handleModeChange(m)}>
            {meta.icon} {meta.label}<span style={{ opacity: 0.45, fontSize: 9, marginLeft: 4 }}>— {meta.hint}</span>
          </button>
        ))}
      </div>

      {/* Stats bar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 14 }}>
        {[
          { label: g.wpm,    value: phase === "idle" ? "—" : wpm,                      color: "var(--green)" },
          { label: g.acc,    value: phase === "idle" ? "—" : acc + "%",                color: acc >= 95 ? "var(--green)" : acc >= 80 ? "#ffcc44" : "#ff3c3c" },
          { label: g.errors, value: phase === "idle" ? "—" : errorsRef.current.size,   color: errorsRef.current.size === 0 ? "var(--green)" : "#ff6060" },
          { label: g.time,   value: phase === "idle" ? "—" : elapsed + "s",            color: "var(--text-muted)" },
        ].map(s => (
          <div key={s.label} style={{ border: "1px solid var(--border)", background: "var(--bg)", padding: "10px 8px", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: 2, color: "var(--text-muted)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ height: 2, background: "var(--border)", marginBottom: 14 }}>
        <div style={{ height: "100%", width: progress + "%", background: "var(--green)", transition: "width 0.1s", boxShadow: "0 0 5px var(--green)" }} />
      </div>

      {phase !== "done" ? (
        <>
          {/* Text display — clicking focuses hidden input */}
          <div
            onClick={() => inputRef.current?.focus()}
            style={{
              background: "#030608",
              border: "1px solid var(--green-dark)",
              padding: "20px 22px",
              marginBottom: 14,
              cursor: "text",
              lineHeight: 2,
              wordBreak: "break-word",
            }}
          >
            {[...text].map((ch, i) => {
              let cls = "tr-char pending";
              if (i < typed.length)   cls = typed[i] === ch ? "tr-char correct" : "tr-char wrong";
              else if (i === typed.length) cls = "tr-char pending cursor";
              return (
                <span key={i} className={cls}>
                  {ch === " " ? "\u00a0" : ch}
                </span>
              );
            })}
          </div>

          {/* Hidden input */}
          <input
            ref={inputRef}
            value={typed}
            onChange={handleInput}
            onPaste={e => e.preventDefault()}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 1, height: 1 }}
            autoFocus
          />

          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", letterSpacing: 2, textAlign: "center", marginBottom: 14 }}>
            {phase === "idle" ? g.tr_start_hint : `${text.length - typed.length} ${g.tr_remaining}`}
          </div>

          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button className="btn btn-secondary" style={{ fontSize: 11, padding: "8px 14px", letterSpacing: 2 }} onClick={() => reset(mode, pick(mode, lang))}>{g.tr_new_text}</button>
            {phase === "typing" && (
              <button className="btn btn-secondary" style={{ fontSize: 11, padding: "8px 14px", letterSpacing: 2 }} onClick={() => reset(mode, text)}>{g.tr_retry}</button>
            )}
          </div>
        </>
      ) : (
        /* Results */
        <div style={{ border: "1px solid var(--green)", background: "rgba(0,255,136,0.04)", padding: "28px 24px", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 4, color: "var(--green)", marginBottom: 16 }}>// RESULTS</div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 900, color: "var(--green)", lineHeight: 1 }}>{wpm}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 16, color: "var(--text-muted)" }}>WPM</span>
          </div>

          {newBest && (
            <div className="tr-nb" style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 3, marginBottom: 14 }}>{g.tr_new_best}</div>
          )}

          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginBottom: 24, marginTop: 8 }}>
            {[
              { label: g.acc,    value: acc + "%" },
              { label: g.errors, value: errorsRef.current.size },
              { label: g.time,   value: elapsed + "s" },
              { label: g.best,   value: best + " " + g.wpm },
            ].map(s => (
              <div key={s.label} style={{ fontFamily: "var(--font-mono)", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: "var(--text)" }}>{s.value}</div>
                <div style={{ fontSize: 9, letterSpacing: 2, color: "var(--text-muted)", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button className="btn btn-primary" onClick={() => reset(mode, text)}>{g.tr_retry} ↺</button>
            <button className="btn btn-secondary" onClick={() => reset(mode, pick(mode, lang))}>{g.tr_new_text.replace(" ↺","")} →</button>
          </div>
        </div>
      )}
    </div>
  );
}
