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
      "a bug is just a feature that has not been understood yet",
      "ship it learn from users and iterate fast to build better products",
      "reading other people code is one of the best ways to grow fast",
      "version control is your safety net always commit before you break things",
      "naming things well is one of the hardest problems in all of programming",
      "a great user interface is invisible it just works without thinking",
      "every line of code you delete makes the program better and simpler",
      "the best code is no code solve the problem before writing anything",
      "slow is smooth and smooth is fast take your time and do it right",
      "learn the fundamentals deeply and the frameworks will make more sense",
      "your first solution is rarely the best one always refactor and improve",
      "write code for humans first and computers second always",
      "small commits often are better than one giant commit at the end",
    ],
    medium: [
      "Programming is not about typing fast, it is about thinking clearly and solving problems one step at a time.",
      "The best way to learn a new skill is to build something real with it, even if it breaks along the way.",
      "Software development is a team sport. The code you write today will be read by someone else tomorrow.",
      "Debugging is twice as hard as writing the code in the first place. Write it simple the first time.",
      "A good programmer looks both ways before crossing a one-way street and always writes tests afterward.",
      "The most important skill a developer can have is the ability to communicate clearly with their team.",
      "Code that is never shipped is worthless. Done and deployed beats perfect but never released every single time.",
      "You do not need to understand every line of a library to use it. Read the docs, try examples, then dig deeper.",
      "Every senior developer you admire was once completely lost trying to center a div or fix a null pointer exception.",
      "Test your assumptions early. The longer a wrong assumption survives, the more expensive it becomes to correct.",
      "If you cannot explain your code to someone else in simple words, you probably do not understand it well enough yourself.",
      "Write the simplest thing that could possibly work, then make it better once you understand the problem fully.",
      "Performance optimization without measurement is just guessing. Profile first, then optimize what actually matters.",
      "The goal of code review is not to find bugs but to share knowledge and raise the quality of the whole team.",
    ],
    quotes: [
      "First, solve the problem. Then, write the code. - John Johnson",
      "Any fool can write code a computer understands. Good programmers write code humans understand. - Fowler",
      "Simplicity is the soul of efficiency. - Austin Freeman",
      "Before software can be reusable it first has to be usable. - Ralph Johnson",
      "The most disastrous thing you can learn is your first programming language. - Alan Kay",
      "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
      "Make it work, make it right, make it fast. - Kent Beck",
      "Talk is cheap. Show me the code. - Linus Torvalds",
      "The function of good software is to make the complex appear simple. - Grady Booch",
      "First do it, then do it right, then do it better. - Addy Osmani",
      "In programming, if someone tells you something is wrong or does not work, they are usually right. - Linus Torvalds",
      "Programs must be written for people to read, and only incidentally for machines to execute. - Abelson & Sussman",
      "It always takes longer than you expect, even when you take into account the Hofstadter's Law. - Hofstadter",
      "Most good programmers do programming not because they expect to get paid but because it is fun. - Torvalds",
      "Walking on water and developing software from a specification are easy if both are frozen. - Edward V Berard",
      "The best error message is the one that never shows up. - Thomas Fuchs",
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
      "xato bu shunchaki hali to'liq tushunilmagan funksiya hisoblanadi",
      "yuborib yuboring foydalanuvchilardan o'rganing va tez takrorlab yaxshilanib boring",
      "boshqa dasturchilar kodini o'qish o'sishning eng yaxshi usullaridan biridir",
      "versiya nazorati sizning xavfsizlik to'ringiz doim buzishdan oldin saqlang",
      "nomlarni yaxshi berish dasturlashdagi eng qiyin muammolardan biri hisoblanadi",
      "buyuk foydalanuvchi interfeysi ko'rinmas bo'ladi u shunchaki ishlaydi",
      "o'chiradigan har bir kod qatori dasturni yanada yaxshi va sodda qiladi",
      "eng yaxshi kod bu umuman kod emas muammoni yozishdan avval hal qiling",
    ],
    medium: [
      "Dasturlash tez yozish haqida emas, balki aniq fikrlash va muammolarni birma-bir hal qilish haqida.",
      "Yangi ko'nikmani o'rganishning eng yaxshi usuli u bilan haqiqiy narsa qurishdir, hatto u buzilsa ham.",
      "Dasturiy ta'minot ishlab chiqish jamoa ishi. Siz bugun yozgan kod ertaga boshqa odam tomonidan o'qiladi.",
      "Xatoliklarni tuzatish kodni yozishdan ikki baravar qiyin. Birinchi marta oddiy yozing.",
      "Yaxshi dasturchi bir tomonli ko'chani kesib o'tishdan oldin ham ikkala tomonga qaraydi.",
      "Dasturchi ega bo'lishi mumkin bo'lgan eng muhim ko'nikma bu jamoa bilan aniq muloqot qila olish qobiliyatidir.",
      "Hech qachon chiqarilmagan kod qiymatsiz. Bajarilgan va joylashtirilgan har doim mukammal lekin chiqarilmaganidan yaxshidir.",
    ],
    quotes: [
      "Avval muammoni hal qiling. Keyin kodni yozing. - John Johnson",
      "Har bir ahmoq kompyuter tushunadigan kod yoza oladi. Yaxshi dasturchilar inson tushunadigan kod yozadi. - Fowler",
      "Oddiylik samaradorlikning ruhi. - Austin Freeman",
      "Dasturiy ta'minot qayta foydalanilishidan oldin avval foydalanilishi kerak. - Ralph Johnson",
      "O'rganishingiz mumkin bo'lgan eng halokatli narsa birinchi dasturlash tilingizdir. - Alan Kay",
      "Uni ishlat, to'g'ri qil, tezlashtir. - Kent Beck",
      "Gap arzon. Menga kodni ko'rsat. - Linus Torvalds",
      "Yaxshi dasturiy ta'minotning vazifasi murakkabni oddiy ko'rsatishdir. - Grady Booch",
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
      "баг это просто функция которая ещё не была правильно понята и изучена",
      "отправляйте код учитесь у пользователей и итерируйте быстро для создания лучших продуктов",
      "чтение чужого кода является одним из лучших способов профессионального роста",
      "контроль версий это ваша страховочная сеть всегда делайте коммит перед изменениями",
      "хорошее именование вещей является одной из самых сложных задач в программировании",
      "отличный интерфейс невидим он просто работает без необходимости думать о нём",
      "каждая удалённая строка кода делает программу лучше и проще для понимания",
    ],
    medium: [
      "Программирование — это не про скорость печати, а про чёткое мышление и решение задач по одной.",
      "Лучший способ освоить новый навык — создать с его помощью что-то реальное, даже если это сломается.",
      "Разработка программного обеспечения — командный вид спорта. Код который вы пишете сегодня прочитает кто-то другой.",
      "Отладка в два раза сложнее написания кода. Пишите просто с первого раза.",
      "Хороший программист смотрит в обе стороны перед переходом по дороге с односторонним движением.",
      "Самый важный навык разработчика — это умение чётко общаться со своей командой.",
      "Код который никогда не выпускается бесполезен. Сделанное и развёрнутое всегда лучше идеального но не выпущенного.",
    ],
    quotes: [
      "Сначала решите проблему. Затем напишите код. - John Johnson",
      "Любой дурак напишет код который поймёт компьютер. Хороший программист пишет код который поймёт человек. - Fowler",
      "Простота — душа эффективности. - Austin Freeman",
      "Прежде чем программное обеспечение можно будет повторно использовать, оно должно быть пригодным для использования. - Ralph Johnson",
      "Самое губительное что вы можете выучить — это ваш первый язык программирования. - Alan Kay",
      "Сделайте это работающим, затем правильным, затем быстрым. - Kent Beck",
      "Разговоры дёшевы. Покажи мне код. - Linus Torvalds",
      "Функция хорошего программного обеспечения — сделать сложное простым. - Grady Booch",
    ],
  },
};

const CODE_CONTENT = [
  "void main() { runApp(const MyApp()); }",
  "Widget build(BuildContext context) { return Scaffold(body: Center(child: Text('Hello'))); }",
  "Future<void> fetchData() async { final res = await http.get(uri); if (res.statusCode == 200) return; }",
  "final items = ['flutter', 'dart', 'mobile']; final upper = items.map((e) => e.toUpperCase()).toList();",
  "setState(() { counter++; score += 10; lastUpdated = DateTime.now(); });",
  "class UserModel { final String id; final String name; const UserModel({required this.id, required this.name}); }",
  "final bloc = context.read<AuthBloc>(); bloc.add(LoginEvent(email: email, password: password));",
  "StreamBuilder<User?>(stream: auth.authStateChanges(), builder: (ctx, snap) { if (snap.hasData) return HomeScreen(); return LoginScreen(); });",
  "extension StringExt on String { bool get isEmail => RegExp(r'^[\\w.]+@[\\w]+\\.[a-z]{2,}$').hasMatch(this); }",
  "SharedPreferences prefs = await SharedPreferences.getInstance(); await prefs.setString('token', value);",
  "Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const HomeScreen()));",
  "Column(crossAxisAlignment: CrossAxisAlignment.start, children: [ Text(title), const SizedBox(height: 8), Text(body) ])",
  "TextStyle get labelStyle => TextStyle(fontFamily: 'Orbitron', fontSize: 12, letterSpacing: 2, color: Colors.green);",
  "final response = await Dio().get('/api/users', queryParameters: {'page': 1, 'limit': 20});",
  "BlocBuilder<CounterBloc, CounterState>(builder: (context, state) { return Text('${state.count}'); });",
  "AnimatedContainer(duration: const Duration(milliseconds: 300), curve: Curves.easeOut, width: isOpen ? 200 : 60);",
  "mixin Validator { String? validateEmail(String? v) => v != null && v.contains('@') ? null : 'Invalid email'; }",
];

const pickMulti = (mode, lang, lines) => {
  const bank = mode === "code" ? CODE_CONTENT : (CONTENT[lang]?.[mode] ?? CONTENT.en[mode]);
  const shuffled = [...bank].sort(() => Math.random() - 0.5);
  const count = mode === "quotes" ? 1 : Math.min(lines, shuffled.length);
  return shuffled.slice(0, count).join(" ");
};

const calcWpm = (correctChars, startMs) => {
  const mins = (Date.now() - startMs) / 60000;
  if (mins < 0.0001) return 0;
  return Math.round(correctChars / 5 / mins);
};

const wpmRating = (wpm) => {
  if (wpm >= 90) return { label: "S", color: "#00ff88" };
  if (wpm >= 70) return { label: "A", color: "#4ade80" };
  if (wpm >= 50) return { label: "B", color: "#ffcc44" };
  if (wpm >= 30) return { label: "C", color: "#fb923c" };
  return { label: "D", color: "#ff3c3c" };
};

/* ── Visual Keyboard ──────────────────────────────────────────────────── */
const KB_ROWS = [
  ["1","2","3","4","5","6","7","8","9","0","-","="],
  ["q","w","e","r","t","y","u","i","o","p","[","]"],
  ["a","s","d","f","g","h","j","k","l",";","'"],
  ["z","x","c","v","b","n","m",",",".","/"],
  [" "],
];

function KeyboardViz({ nextKey, pressedKey, pressedCorrect }) {
  return (
    <div style={{
      padding: "14px 10px 10px",
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      marginTop: 14,
      userSelect: "none",
    }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: 3, color: "var(--text-muted)", textAlign: "center", marginBottom: 10 }}>
        KEYBOARD
      </div>
      {KB_ROWS.map((row, ri) => (
        <div key={ri} style={{ display: "flex", gap: 3, justifyContent: "center", marginBottom: 3 }}>
          {row.map(key => {
            const isSpace   = key === " ";
            const isNext    = nextKey === key;
            const isPressed = pressedKey === key;
            const correct   = isPressed && pressedCorrect;
            const wrong     = isPressed && !pressedCorrect;

            return (
              <div
                key={key}
                style={{
                  width:    isSpace ? "min(220px, 55vw)" : "clamp(20px, 4vw, 28px)",
                  height:   "clamp(22px, 3.5vw, 28px)",
                  display:  "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: isSpace ? 8 : "clamp(8px, 1.8vw, 10px)",
                  letterSpacing: isSpace ? 3 : 0,
                  border: "1px solid",
                  borderColor: correct ? "var(--green)"
                              : wrong  ? "#ff3c3c"
                              : isNext ? "rgba(0,255,136,0.55)"
                              : "var(--border)",
                  background: correct ? "rgba(0,255,136,0.18)"
                             : wrong  ? "rgba(255,60,60,0.18)"
                             : isNext ? "rgba(0,255,136,0.06)"
                             : "var(--bg)",
                  color: correct ? "var(--green)"
                       : wrong   ? "#ff3c3c"
                       : isNext  ? "var(--green)"
                       : "var(--text-muted)",
                  boxShadow: correct ? "0 0 10px rgba(0,255,136,0.35)"
                           : wrong   ? "0 0 10px rgba(255,60,60,0.35)"
                           : isNext  ? "0 0 6px rgba(0,255,136,0.18)"
                           : "none",
                  transition: "background 0.1s, border-color 0.1s, box-shadow 0.1s, color 0.1s",
                  borderRadius: 2,
                  flexShrink: 0,
                }}
              >
                {isSpace ? "SPACE" : key.toUpperCase()}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────────── */
export default function TypeRacer() {
  const { t, lang } = useLang();
  const g = t.games;

  const MODE_META = {
    easy:   { label: g.tr_mode_easy,   icon: "🌱", hint: g.tr_hint_easy },
    medium: { label: g.tr_mode_medium, icon: "⚡", hint: g.tr_hint_medium },
    code:   { label: g.tr_mode_code,   icon: "💻", hint: g.tr_hint_code },
    quotes: { label: g.tr_mode_quotes, icon: "💬", hint: g.tr_hint_quotes },
  };

  const LEN_META = [
    { key: "short",    lines: 1, label: g.tr_len_short    ?? "Short",    hint: "~1 line"  },
    { key: "medium",   lines: 3, label: g.tr_len_medium   ?? "Medium",   hint: "~3 lines" },
    { key: "long",     lines: 5, label: g.tr_len_long     ?? "Long",     hint: "~5 lines" },
    { key: "marathon", lines: 9, label: g.tr_len_marathon ?? "Marathon", hint: "~9 lines" },
  ];

  const [mode,    setMode]    = useState("easy");
  const [lenKey,  setLenKey]  = useState("short");
  const [text,    setText]    = useState(() => pickMulti("easy", "en", 1));
  const [typed,   setTyped]   = useState("");
  const [phase,   setPhase]   = useState("idle");
  const [wpm,     setWpm]     = useState(0);
  const [acc,     setAcc]     = useState(100);
  const [elapsed, setElapsed] = useState(0);
  const [best,    setBest]    = useState(() => { try { return parseInt(localStorage.getItem("typeracerBest") || "0") || 0; } catch { return 0; } });
  const [newBest, setNewBest] = useState(false);

  // keyboard state
  const [pressedKey,     setPressedKey]     = useState(null);
  const [pressedCorrect, setPressedCorrect] = useState(true);

  const inputRef    = useRef(null);
  const startRef    = useRef(null);
  const intervalRef = useRef(null);
  const errorsRef   = useRef(new Set());
  const keyRef      = useRef({ total: 0, correct: 0 });
  const typedRef    = useRef("");
  const textRef     = useRef(text);
  const phaseRef    = useRef("idle");
  const pressTimer  = useRef(null);

  textRef.current  = text;
  phaseRef.current = phase;

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

  useEffect(() => () => { clearTimer(); clearTimeout(pressTimer.current); }, []);

  // track physical key presses for keyboard visualization
  useEffect(() => {
    const onKeyDown = (e) => {
      if (phaseRef.current === "done") return;
      const raw = e.key;
      const key = raw === " " ? " " : raw.length === 1 ? raw.toLowerCase() : null;
      if (!key) return;

      const nextChar = textRef.current[typedRef.current.length];
      const isCorrect = nextChar !== undefined && (key === nextChar || key === nextChar.toLowerCase());

      setPressedKey(key);
      setPressedCorrect(isCorrect);
      clearTimeout(pressTimer.current);
      pressTimer.current = setTimeout(() => setPressedKey(null), 240);
    };
    window.addEventListener("keydown", onKeyDown, { passive: true });
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const getLinesForKey = (key) => LEN_META.find(l => l.key === key)?.lines ?? 1;

  const reset = useCallback((newMode, newLenKey, newText) => {
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
    setPressedKey(null);
    const m  = newMode   ?? mode;
    const lk = newLenKey ?? lenKey;
    const tx = newText   ?? pickMulti(m, lang, getLinesForKey(lk));
    setMode(m);
    setLenKey(lk);
    setText(tx);
    textRef.current  = tx;
    phaseRef.current = "idle";
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [mode, lenKey, lang]);

  const handleInput = (e) => {
    const val = e.target.value;
    if (val.length > text.length) return;

    if (phase === "idle" && val.length > 0) {
      startRef.current = Date.now();
      setPhase("typing");
      phaseRef.current = "typing";
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
      phaseRef.current = "done";
      if (finalWpm > best) {
        setBest(finalWpm);
        setNewBest(true);
        try { localStorage.setItem("typeracerBest", finalWpm); } catch {}
      }
    }
  };

  const handleModeChange = (m)  => reset(m, lenKey, null);
  const handleLenChange  = (lk) => reset(mode, lk, null);

  const progress = text.length > 0 ? (typed.length / text.length) * 100 : 0;
  const nextChar = phase !== "done" && text.length > 0 ? text[typed.length] : null;
  const nextKey  = nextChar === " " ? " " : nextChar?.toLowerCase() ?? null;
  const rating   = wpmRating(wpm);

  return (
    <div style={{ userSelect: "none" }}>
      <style>{`
        .tr-mode { font-family:var(--font-mono); font-size:10px; letter-spacing:2px; padding:7px 12px; border:1px solid var(--border); background:transparent; color:var(--text-muted); cursor:pointer; transition:all 0.2s; text-transform:uppercase; white-space:nowrap; }
        .tr-mode.active { border-color:var(--green); background:rgba(0,255,136,0.08); color:var(--green); box-shadow:0 0 12px rgba(0,255,136,0.12); }
        .tr-mode:hover:not(.active) { border-color:var(--green-dim); color:var(--text); }
        .tr-len { font-family:var(--font-mono); font-size:9px; letter-spacing:2px; padding:5px 10px; border:1px solid var(--border); background:transparent; color:var(--text-muted); cursor:pointer; transition:all 0.2s; text-transform:uppercase; }
        .tr-len.active { border-color:#7c3aed; background:rgba(124,58,237,0.1); color:#a78bfa; box-shadow:0 0 8px rgba(124,58,237,0.15); }
        .tr-len:hover:not(.active) { border-color:var(--green-dim); color:var(--text); }
        .tr-char { font-family:var(--font-mono); font-size:17px; line-height:2; }
        .tr-char.correct  { color:var(--green); }
        .tr-char.wrong    { color:#ff3c3c; background:rgba(255,60,60,0.15); border-radius:2px; }
        .tr-char.cursor   { outline:1px solid var(--green); background:rgba(0,255,136,0.12); animation:blink 1s step-end infinite; }
        .tr-char.pending  { color:var(--text-muted); opacity:0.45; }
        .tr-stat-card { border:1px solid var(--border); background:var(--bg); padding:10px 6px; text-align:center; transition:border-color 0.3s; }
        @media(max-width:600px){ .tr-char { font-size:14px !important; } }
        @keyframes tr-nb { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }
        .tr-nb { animation:tr-nb 0.5s ease; color:#ffcc44 !important; }
        @keyframes tr-done-in { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .tr-done { animation:tr-done-in 0.35s ease both; }
        @keyframes tr-rating { 0%{transform:scale(0.5);opacity:0} 60%{transform:scale(1.15)} 100%{transform:scale(1);opacity:1} }
        .tr-rating-badge { animation:tr-rating 0.4s 0.1s ease both; }
      `}</style>

      {/* Mode selector */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        {Object.entries(MODE_META).map(([m, meta]) => (
          <button key={m} className={`tr-mode ${mode === m ? "active" : ""}`} onClick={() => handleModeChange(m)}>
            {meta.icon} {meta.label}
          </button>
        ))}
      </div>

      {/* Length selector */}
      {mode !== "quotes" && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14, alignItems: "center" }}>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:2, color:"var(--text-muted)", marginRight:4 }}>
            {g.tr_len_label ?? "LENGTH"}:
          </span>
          {LEN_META.map(l => (
            <button key={l.key} className={`tr-len ${lenKey === l.key ? "active" : ""}`} onClick={() => handleLenChange(l.key)}>
              {l.label}
            </button>
          ))}
        </div>
      )}
      {mode === "quotes" && <div style={{ marginBottom: 14 }} />}

      {/* Stats bar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginBottom: 12 }}>
        {[
          { label: g.wpm,    value: phase === "idle" ? "—" : wpm,                    color: phase === "typing" ? "var(--green)" : "var(--text)" },
          { label: g.acc,    value: phase === "idle" ? "—" : acc + "%",              color: acc >= 95 ? "var(--green)" : acc >= 80 ? "#ffcc44" : "#ff3c3c" },
          { label: g.errors, value: phase === "idle" ? "—" : errorsRef.current.size, color: errorsRef.current.size === 0 ? "var(--green)" : "#ff6060" },
          { label: g.time,   value: phase === "idle" ? "—" : elapsed + "s",          color: "var(--text-muted)" },
        ].map(s => (
          <div key={s.label} className="tr-stat-card">
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 20, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: 2, color: "var(--text-muted)", marginTop: 5 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ height: 2, background: "var(--border)", marginBottom: 12, position: "relative" }}>
        <div style={{
          height: "100%",
          width: progress + "%",
          background: progress === 100 ? "var(--green)" : "var(--green)",
          transition: "width 0.1s linear",
          boxShadow: "0 0 6px var(--green)",
        }} />
      </div>

      {phase !== "done" ? (
        <>
          {/* Text display */}
          <div
            onClick={() => inputRef.current?.focus()}
            style={{
              background: "var(--bg)",
              border: "1px solid",
              borderColor: phase === "typing" ? "rgba(0,255,136,0.3)" : "var(--green-dark)",
              borderLeft: `3px solid ${phase === "typing" ? "var(--green)" : "var(--green-dark)"}`,
              padding: mode === "quotes" ? "28px 28px" : "18px 20px",
              marginBottom: 0,
              cursor: "text",
              lineHeight: mode === "quotes" ? 2.4 : 2,
              wordBreak: "break-word",
              maxHeight: "240px",
              overflowY: "auto",
              textAlign: mode === "quotes" ? "center" : "left",
              transition: "border-color 0.3s",
            }}
          >
            {[...text].map((ch, i) => {
              const authorStart = mode === "quotes" ? text.lastIndexOf(" - ") : -1;
              const inAuthor    = authorStart !== -1 && i >= authorStart;
              let cls = "tr-char pending";
              if (i < typed.length)       cls = typed[i] === ch ? "tr-char correct" : "tr-char wrong";
              else if (i === typed.length) cls = "tr-char pending cursor";
              return (
                <span
                  key={i}
                  className={cls}
                  style={inAuthor && i >= typed.length ? { opacity: 0.5, fontStyle: "italic" } : undefined}
                >
                  {ch === " " ? " " : ch}
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

          {/* Keyboard */}
          <KeyboardViz nextKey={nextKey} pressedKey={pressedKey} pressedCorrect={pressedCorrect} />

          {/* Bottom bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", letterSpacing: 2 }}>
              {phase === "idle"
                ? g.tr_start_hint
                : `${text.length - typed.length} ${g.tr_remaining}`}
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn btn-secondary" style={{ fontSize: 11, padding: "7px 14px", letterSpacing: 2 }}
                onClick={() => reset(mode, lenKey, pickMulti(mode, lang, getLinesForKey(lenKey)))}>
                {g.tr_new_text}
              </button>
              {phase === "typing" && (
                <button className="btn btn-secondary" style={{ fontSize: 11, padding: "7px 14px", letterSpacing: 2 }}
                  onClick={() => reset(mode, lenKey, text)}>
                  {g.tr_retry}
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        /* Results screen */
        <div className="tr-done" style={{ border: "1px solid var(--green)", background: "rgba(0,255,136,0.03)", padding: "32px 24px", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 4, color: "var(--green)", marginBottom: 20 }}>// RESULTS</div>

          {/* WPM + rating */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 6 }}>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 64, fontWeight: 900, color: "var(--green)", lineHeight: 1 }}>{wpm}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--text-muted)" }}>WPM</span>
              </div>
              {newBest && (
                <div className="tr-nb" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 3, marginTop: 4 }}>{g.tr_new_best}</div>
              )}
            </div>
            <div
              className="tr-rating-badge"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 40,
                fontWeight: 900,
                color: rating.color,
                border: `2px solid ${rating.color}`,
                width: 64,
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 20px ${rating.color}44`,
              }}
            >
              {rating.label}
            </div>
          </div>

          {/* Detail stats */}
          <div style={{ display: "flex", justifyContent: "center", gap: 0, flexWrap: "wrap", margin: "20px 0 24px", border: "1px solid var(--border)" }}>
            {[
              { label: g.acc,    value: acc + "%",         color: acc >= 95 ? "var(--green)" : acc >= 80 ? "#ffcc44" : "#ff3c3c" },
              { label: g.errors, value: errorsRef.current.size, color: errorsRef.current.size === 0 ? "var(--green)" : "#ff6060" },
              { label: g.time,   value: elapsed + "s",     color: "var(--text)" },
              { label: g.best,   value: best + " wpm",     color: "var(--green-dim)" },
            ].map((s, i) => (
              <div key={s.label} style={{
                fontFamily: "var(--font-mono)", textAlign: "center",
                flex: "1 1 80px",
                padding: "14px 8px",
                borderRight: i < 3 ? "1px solid var(--border)" : "none",
              }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 8, letterSpacing: 2, color: "var(--text-muted)", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={() => reset(mode, lenKey, text)}>{g.tr_retry} ↺</button>
            <button className="btn btn-secondary" onClick={() => reset(mode, lenKey, null)}>{g.tr_new_text} →</button>
          </div>
        </div>
      )}
    </div>
  );
}
