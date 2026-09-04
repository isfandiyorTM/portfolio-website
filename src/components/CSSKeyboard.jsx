import { useState, useRef, useEffect, useCallback } from "react";

// ACCESS GRANTED flash CSS keyframe (added alongside the keyboard CSS)
const IDLE_CSS = `
@keyframes kb-idle-pulse {
  0%,100% {
    background: rgba(12,22,15,0.9); border-color: rgba(0,255,136,0.07);
    box-shadow: 0 3px 0 rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.025);
    color: rgba(0,255,136,0.16);
  }
  50% {
    background: rgba(0,255,136,0.09); border-color: rgba(0,255,136,0.38);
    box-shadow: 0 0 14px rgba(0,255,136,0.28), 0 2px 0 rgba(0,0,0,0.4), inset 0 1px 0 rgba(0,255,136,0.18);
    color: rgba(0,255,136,0.7);
  }
}
.kb-key.kb-idle { animation: kb-idle-pulse var(--idle-dur) ease-in-out infinite; }
@keyframes kb-standby-fade {
  0%,100% { opacity: 0.5; } 50% { opacity: 1; }
}
`;

const ACCESS_CSS = `
@keyframes kb-access-anim {
  0%   { opacity:0; transform:translate(-50%,-50%) scale(0.85); }
  12%  { opacity:1; transform:translate(-50%,-50%) scale(1.06); }
  22%  { opacity:1; transform:translate(-50%,-50%) scale(1);    }
  78%  { opacity:1; transform:translate(-50%,-50%) scale(1);    }
  100% { opacity:0; transform:translate(-50%,-50%) scale(0.94); }
}
`;

// Maps event.key → ROWS label.  Single printable chars use .toUpperCase() directly.
const KEY_MAP = {
  " ": "", "Backspace": "⌫", "Tab": "TAB", "CapsLock": "CAPS",
  "Enter": "↵", "Shift": "⇧", "Control": "CTRL", "Alt": "ALT", "Meta": "⌘",
};

function labelFromEvent(e) {
  if (Object.prototype.hasOwnProperty.call(KEY_MAP, e.key)) return KEY_MAP[e.key];
  if (e.key.length === 1) return e.key.toUpperCase();
  return undefined;
}

// Returns all {ri,ki} positions matching label (handles duplicate keys like ⇧, CTRL)
function findPositions(label) {
  const out = [];
  for (let ri = 0; ri < ROWS.length; ri++)
    for (let ki = 0; ki < ROWS[ri].length; ki++)
      if (ROWS[ri][ki][0] === label) out.push(`${ri}-${ki}`);
  return out;
}

const G = 3;
const W = 37;
const H = 34;

// ── Typing test ────────────────────────────────────────────────────────────
const TEST_POOL = [
  "flutter","dart","build","ship","code","async","state","widget","mobile",
  "react","debug","push","loop","learn","keys","fast","run","fix","dev",
  "clean","git","test","app","web","sdk","type","void","true","class","data",
];
const TEST_LEN = 15;

function newTest() {
  const shuffled = [...TEST_POOL].sort(() => Math.random() - 0.5);
  return {
    words: shuffled.slice(0, TEST_LEN),
    wIdx: 0, typed: "",
    startTime: null, errors: 0, wpm: 0, done: false,
  };
}

const RESULT_CSS = `
@keyframes kb-result-in {
  0%   { opacity:0; transform:translate(-50%,-50%) scale(0.82); }
  14%  { opacity:1; transform:translate(-50%,-50%) scale(1.04); }
  22%  { opacity:1; transform:translate(-50%,-50%) scale(1);    }
  100% { opacity:1; transform:translate(-50%,-50%) scale(1);    }
}
@keyframes kb-result-wpm {
  from { opacity:0; transform:translateY(12px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes kb-result-badge {
  0%,100% { text-shadow:0 0 8px var(--green); }
  50%     { text-shadow:0 0 20px var(--green), 0 0 40px rgba(0,255,136,0.4); }
}
`;

const TEST_CSS = `
@keyframes kb-key-error {
  0%,100% {
    background: rgba(12,22,15,0.9); border-color: rgba(0,255,136,0.07);
    color: rgba(0,255,136,0.16); transform: translateY(0);
  }
  25%   { background: rgba(255,50,50,0.15); border-color: rgba(255,80,80,0.55); color: rgba(255,100,100,0.85); transform: translateY(2px); }
  62.5% { background: rgba(255,50,50,0.20); border-color: rgba(255,80,80,0.75); color: rgba(255,120,120,1);    transform: translateY(2px); }
  87.5% { background: rgba(255,50,50,0.08); border-color: rgba(255,80,80,0.30); color: rgba(255,100,100,0.45); transform: translateY(0); }
}
.kb-key.kb-error { animation: kb-key-error 0.7s ease-in-out 1 forwards; }
`;

const ROWS = [
  [["`",1],["1",1],["2",1],["3",1],["4",1],["5",1],["6",1],["7",1],["8",1],["9",1],["0",1],["-",1],["=",1],["⌫",2]],
  [["TAB",1.5],["Q",1],["W",1],["E",1],["R",1],["T",1],["Y",1],["U",1],["I",1],["O",1],["P",1],["[",1],["]",1],["\\",1.5]],
  [["CAPS",1.75],["A",1],["S",1],["D",1],["F",1],["G",1],["H",1],["J",1],["K",1],["L",1],[";",1],["'",1],["↵",2.25]],
  [["⇧",2.25],["Z",1],["X",1],["C",1],["V",1],["B",1],["N",1],["M",1],[",",1],[".",1],["/",1],["⇧",2.75]],
  [["CTRL",1.5],["⌘",1.25],["ALT",1.25],["",6.25],["ALT",1.25],["⌘",1.25],["CTRL",1.5]],
];

// Build time-appropriate greeting sequence (called once at module load)
const SEQUENCE = (() => {
  const h = new Date().getHours();
  let greeting;
  if      (h >= 5  && h < 12) greeting = ["G","O","O","D",null,"M","O","R","N","I","N","G"];
  else if (h >= 12 && h < 17) greeting = ["G","O","O","D",null,"A","F","T","E","R","N","O","O","N"];
  else if (h >= 17 && h < 21) greeting = ["G","O","O","D",null,"E","V","E","N","I","N","G"];
  else                         greeting = ["G","O","O","D",null,"N","I","G","H","T"];
  return [
    ...greeting,
    null, null,
    "M","Y", null, "N","A","M","E", null, "I","S",
    null, null,
    "I","S","F","A","N","D","I","Y","O","R",
    null, null,
    "M","A","D","A","M","I","N","O","V",
    null, null, null,
  ];
})();

// All letters that ever light up across all possible greetings + name
const LIT = new Set(["G","T","H","E","I","S","F","A","N","D","Y","O","R","M","V"]);

// Single-key glow: press down → peak green → release → dark (2.24 s, plays once).
// Percentages match the timing in the original 14 s sequential keyframe:
//   25 %  = 0.56 s (pressing)   was  4 % of 14 s
//   62.5% = 1.40 s (peak)       was 10 % of 14 s
//   87.5% = 1.96 s (fading)     was 14 % of 14 s
const CSS = `
@keyframes kb-float-y {
  0%,100% { transform: translateY(0px);   }
  50%      { transform: translateY(-12px); }
}

@keyframes kb-key-glow {
  0%,100% {
    background:   rgba(12,22,15,0.9);
    border-color: rgba(0,255,136,0.07);
    box-shadow:   0 3px 0 rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.025);
    color:        rgba(0,255,136,0.16);
    transform:    translateY(0px);
  }
  25% {
    background:   rgba(0,255,136,0.10);
    border-color: rgba(0,255,136,0.45);
    box-shadow:   0 0 14px rgba(0,255,136,0.35), 0 2px 0 rgba(0,0,0,0.55), inset 0 1px 0 rgba(0,255,136,0.2);
    color:        rgba(0,255,136,0.75);
    transform:    translateY(2px);
  }
  62.5% {
    background:   rgba(0,255,136,0.18);
    border-color: rgba(0,255,136,0.75);
    box-shadow:   0 0 28px rgba(0,255,136,0.65), 0 0 56px rgba(0,255,136,0.25),
                  0 1px 0 rgba(0,0,0,0.55), inset 0 1px 0 rgba(0,255,136,0.45);
    color:        rgba(0,255,136,1);
    transform:    translateY(2px);
  }
  87.5% {
    background:   rgba(0,255,136,0.07);
    border-color: rgba(0,255,136,0.28);
    box-shadow:   0 0 10px rgba(0,255,136,0.20), 0 3px 0 rgba(0,0,0,0.55);
    color:        rgba(0,255,136,0.40);
    transform:    translateY(0px);
  }
}

@keyframes kb-led-glow {
  0%,100% { opacity:0;   box-shadow:none; }
  25%     { opacity:0.6; box-shadow:0 0 5px var(--green); }
  62.5%   { opacity:1;   box-shadow:0 0 12px var(--green), 0 0 24px var(--green); }
  87.5%   { opacity:0.3; box-shadow:0 0 3px var(--green); }
}

.kb-key {
  border-radius: 4px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  position: relative; user-select: none; cursor: pointer;
  font-family: var(--font-mono); letter-spacing: 0.3px;
  background:   rgba(12,22,15,0.9);
  border:       1px solid rgba(0,255,136,0.07);
  box-shadow:   0 3px 0 rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.025);
  color:        rgba(0,255,136,0.16);
}
.kb-space { background: rgba(16,30,20,0.80); cursor: default; }

/* Glow class: single play, holds dark at the end */
.kb-key.kb-glow { animation: kb-key-glow 2.24s ease-in-out 1 forwards; }

.kb-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 7px 14px; border-radius: 20px;
  font-family: var(--font-mono); font-size: 10px; letter-spacing: 1.5px;
  color: rgba(0,255,136,0.65); text-decoration: none; white-space: nowrap;
  background: rgba(4,12,7,0.92);
  border: 1px solid rgba(0,255,136,0.22);
  box-shadow: 0 0 16px rgba(0,255,136,0.05);
  transition: border-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
}
.kb-badge:hover {
  border-color: rgba(0,255,136,0.55);
  box-shadow: 0 0 24px rgba(0,255,136,0.18);
  color: rgba(0,255,136,1);
}
.kb-badge .kb-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--green); box-shadow: 0 0 6px var(--green);
  animation: pulse-glow 2s ease-in-out infinite; flex-shrink: 0;
}

.kb-led {
  position: absolute; top:3px; right:3px;
  width:3px; height:3px; border-radius:50%;
  background: var(--green); opacity:0; pointer-events:none;
}
.kb-led.kb-glow { animation: kb-led-glow 2.24s ease-in-out 1 forwards; }
`;

export default function CSSKeyboard({ idle = false }) {
  // step: index into SEQUENCE (-1 = sequence not started yet)
  const [step,       setStep]       = useState(-1);
  // active: click mode — sequential display paused, clicked key glows
  const [active,     setActive]     = useState(false);
  const [clickedKey, setClickedKey] = useState(null); // { ri, ki, n }
  const [show,       setShow]       = useState(true);
  // flash: triggered when MADAMINOV is typed on physical keyboard
  const [flash,      setFlash]      = useState({ on: false, n: 0 });
  const [hovered,    setHovered]    = useState(false);
  // physKeys: { "ri-ki": animCounter } — tracks physically pressed keys
  const [physKeys,   setPhysKeys]   = useState({});

  const seqRef       = useRef(null); // setInterval handle
  const clickTimer   = useRef(null); // 5 s click-mode resume timer
  const physTimer    = useRef(null); // 3 s physical-key clear timer
  const flashTimer   = useRef(null); // 3 s flash duration
  const startedRef   = useRef(false);

  // Typing test
  const [test,       setTest]       = useState(null); // null = inactive
  // activeKeys: { "ri-ki": { n, correct } } — one entry per key position, own timer each
  const [activeKeys, setActiveKeys] = useState({});
  const testRef         = useRef(null);
  const activeKeyTimers = useRef({});
  testRef.current = test;

  // Runs the greeting sequence from the very beginning (index 0)
  const runSequence = useCallback(() => {
    if (seqRef.current) clearInterval(seqRef.current);
    let s = 0;
    setStep(s);
    seqRef.current = setInterval(() => {
      s = (s + 1) % SEQUENCE.length;
      setStep(s);
    }, 1000);
  }, []);

  // Stops the sequence and clears the lit key — next run starts over from "G"
  const pauseSequence = useCallback(() => {
    if (seqRef.current) { clearInterval(seqRef.current); seqRef.current = null; }
    setStep(-1);
  }, []);

  const startSequence = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    runSequence();
  }, [runSequence]);

  useEffect(() => {
    // Start after loading screen finishes: window.load + 1800 ms covers the
    // LoadingScreen's min-1400ms + 800ms fade-out + App's 500ms opacity transition.
    let delayTimer;
    const onLoad = () => { delayTimer = setTimeout(startSequence, 4800); };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    const mq = window.matchMedia("(max-width:900px)");
    setShow(!mq.matches);
    const onMq = e => setShow(!e.matches);
    mq.addEventListener("change", onMq);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(delayTimer);
      clearTimeout(clickTimer.current);
      clearTimeout(physTimer.current);
      clearTimeout(flashTimer.current);
      if (seqRef.current) clearInterval(seqRef.current);
      mq.removeEventListener("change", onMq);
    };
  }, [startSequence]);

  // Physical keyboard → visual key glow. Typing pauses the greeting sequence;
  // 3 s after the last keypress it replays from the beginning.
  useEffect(() => {
    const onKey = (e) => {
      if (e.repeat) return;
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (testRef.current) return; // test mode handles its own key highlights
      const label = labelFromEvent(e);
      if (label === undefined) return;
      const positions = findPositions(label);
      if (positions.length === 0) return;

      pauseSequence();

      setPhysKeys(prev => {
        const next = { ...prev };
        positions.forEach(k => { next[k] = (next[k] ?? 0) + 1; });
        return next;
      });
      // Clear physKeys 3 s after the last keypress (glow animation is 2.24 s),
      // then replay the greeting from its first letter.
      clearTimeout(physTimer.current);
      physTimer.current = setTimeout(() => {
        setPhysKeys({});
        // Don't resume underneath an in-progress typing test (TAB is a keypress too)
        if (startedRef.current && !testRef.current) runSequence();
      }, 3000);
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); clearTimeout(physTimer.current); };
  }, [pauseSequence, runSequence]);

  // MADAMINOV easter egg — tracks last 9 typed chars, ignores input fields
  useEffect(() => {
    let typed = "";
    let resetTimer;
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      clearTimeout(resetTimer);
      typed = (typed + e.key.toUpperCase()).slice(-9);
      if (typed === "MADAMINOV") {
        typed = "";
        clearTimeout(flashTimer.current);
        setFlash(f => ({ on: true, n: f.n + 1 }));
        flashTimer.current = setTimeout(() => setFlash(f => ({ ...f, on: false })), 3000);
        window.dispatchEvent(new CustomEvent("achievement:unlock", { detail: "access" }));
      }
      resetTimer = setTimeout(() => { typed = ""; }, 2000);
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); clearTimeout(resetTimer); };
  }, []);

  // TAB → toggle typing test
  useEffect(() => {
    const onTab = (e) => {
      if (e.key !== "Tab") return;
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      e.preventDefault();
      setTest(prev => {
        if (prev && prev.done) { pauseSequence(); return newTest(); } // restart when done
        if (prev) { if (startedRef.current) runSequence(); return null; } // exit test
        pauseSequence();
        return newTest();
      });
      // Clear all active key highlights and their timers
      Object.values(activeKeyTimers.current).forEach(clearTimeout);
      activeKeyTimers.current = {};
      setActiveKeys({});
    };
    window.addEventListener("keydown", onTab);
    return () => window.removeEventListener("keydown", onTab);
  }, [pauseSequence, runSequence]);

  // Test mode key processing (mounted once; reads testRef for latest state)
  useEffect(() => {
    const onKey = (e) => {
      const t = testRef.current;
      if (!t || t.done) return;
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      const ch = e.key;
      if (ch === "Tab")    return; // handled by TAB effect
      if (ch === "Escape") {
        setTest(null);
        if (startedRef.current) runSequence();
        return;
      }

      if (ch === "Backspace") {
        setTest(prev => prev ? { ...prev, typed: prev.typed.slice(0, -1) } : prev);
        return;
      }
      if (ch.length !== 1) return;

      const startTime = t.startTime ?? Date.now();
      const word      = t.words[t.wIdx];

      // Helper: light up key positions for a label, each with its own cleanup timer
      const glowPositions = (keyLabel, correct, duration) => {
        const positions = findPositions(keyLabel);
        positions.forEach(posKey => {
          setActiveKeys(prev => ({
            ...prev,
            [posKey]: { n: (prev[posKey]?.n ?? 0) + 1, correct },
          }));
          clearTimeout(activeKeyTimers.current[posKey]);
          activeKeyTimers.current[posKey] = setTimeout(() => {
            setActiveKeys(prev => { const next = { ...prev }; delete next[posKey]; return next; });
            delete activeKeyTimers.current[posKey];
          }, duration);
        });
      };

      if (ch === " ") {
        e.preventDefault(); // stop page scroll
        glowPositions("", true, 380);
        // Count uncompleted chars as errors
        const wordErrors = word.length - [...t.typed].filter((c, i) => c === word[i]).length;
        const newErrors  = t.errors + wordErrors;
        const nextWIdx   = t.wIdx + 1;
        const elapsed    = (Date.now() - startTime) / 60000;
        const wpm        = Math.round(nextWIdx / Math.max(elapsed, 0.001));

        if (nextWIdx >= TEST_LEN) {
          setTest(prev => ({ ...prev, wIdx: nextWIdx, typed: "", done: true, wpm, errors: newErrors, startTime }));
          window.dispatchEvent(new CustomEvent("achievement:unlock", { detail: "typist" }));
          if (wpm >= 60) window.dispatchEvent(new CustomEvent("achievement:unlock", { detail: "speedDemon" }));
        } else {
          setTest(prev => ({ ...prev, wIdx: nextWIdx, typed: "", errors: newErrors, startTime }));
        }
        return;
      }

      const correct    = t.typed.length < word.length && ch === word[t.typed.length];
      glowPositions(ch.toUpperCase(), correct, correct ? 500 : 600);

      const newTyped     = t.typed + ch;
      const isLastWord   = t.wIdx === TEST_LEN - 1;
      const wordComplete = correct && newTyped.length === word.length;

      if (isLastWord && wordComplete) {
        const elapsed = (Date.now() - startTime) / 60000;
        const wpm     = Math.round(TEST_LEN / Math.max(elapsed, 0.001));
        setTest(prev => ({ ...prev, typed: newTyped, done: true, wpm, startTime }));
        window.dispatchEvent(new CustomEvent("achievement:unlock", { detail: "typist" }));
        if (wpm >= 60) window.dispatchEvent(new CustomEvent("achievement:unlock", { detail: "speedDemon" }));
      } else {
        setTest(prev => ({ ...prev, typed: newTyped, startTime }));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      Object.values(activeKeyTimers.current).forEach(clearTimeout);
    };
  }, [runSequence]);

  const onKeyClick = (ri, ki, label) => {
    if (!label) return; // skip space bar
    setActive(true);
    pauseSequence();
    setClickedKey(prev => {
      const same = prev && prev.ri === ri && prev.ki === ki;
      return { ri, ki, n: same ? prev.n + 1 : 0 };
    });
    // Replay the default sequence from the beginning 5 s after the last click
    clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      setActive(false);
      setClickedKey(null);
      if (startedRef.current) runSequence();
    }, 5000);
  };

  if (!show) return null;

  return (
    <>
      <style>{CSS}{IDLE_CSS}{ACCESS_CSS}{TEST_CSS}{RESULT_CSS}</style>

      {/* Typing test result overlay — shown when test is done */}
      {test?.done && (
        <div style={{
          position: "fixed", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: 9994, pointerEvents: "none", textAlign: "center",
          animation: "kb-result-in 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
        }}>
          <div style={{
            fontFamily: "var(--font-mono)",
            background: "rgba(4,12,7,0.96)",
            border: "1px solid rgba(0,255,136,0.35)",
            borderRadius: 12,
            padding: "28px 44px 24px",
            boxShadow: "0 0 60px rgba(0,255,136,0.15), 0 30px 80px rgba(0,0,0,0.9)",
          }}>
            <div style={{ fontSize: 9, letterSpacing: "4px", color: "rgba(0,255,136,0.35)", marginBottom: 10, textTransform: "uppercase" }}>
              Typing Test Complete
            </div>
            <div style={{
              fontSize: "clamp(56px,8vw,88px)", fontWeight: 900,
              color: "#00ff88", lineHeight: 1,
              textShadow: "0 0 40px rgba(0,255,136,0.5)",
              animation: "kb-result-wpm 0.4s 0.15s ease both",
            }}>
              {test.wpm}
            </div>
            <div style={{ fontSize: 10, letterSpacing: "4px", color: "rgba(0,255,136,0.45)", marginBottom: 14 }}>
              WPM
            </div>
            {test.wpm >= 60 && (
              <div style={{
                fontSize: 11, letterSpacing: "2.5px", color: "var(--green)",
                marginBottom: 10, animation: "kb-result-badge 2s ease-in-out infinite",
              }}>
                ⚡ SPEED DEMON
              </div>
            )}
            <div style={{ fontSize: 11, color: "rgba(0,255,136,0.35)", marginBottom: 16 }}>
              {test.errors} error{test.errors !== 1 ? "s" : ""}
              <span style={{ margin: "0 10px", opacity: 0.4 }}>·</span>
              {TEST_LEN} words
            </div>
            <div style={{ fontSize: 9, color: "rgba(0,255,136,0.2)", letterSpacing: "2px" }}>
              TAB to restart  ·  ESC to exit
            </div>
          </div>
        </div>
      )}

      {/* ACCESS GRANTED overlay — fixed center, plays for 3 s */}
      {flash.on && (
        <div style={{
          position: "fixed", top: "50%", left: "50%",
          zIndex: 9990, pointerEvents: "none", textAlign: "center",
          animation: "kb-access-anim 3s ease-in-out both",
        }}>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(18px,3vw,30px)",
            fontWeight: 700,
            letterSpacing: "8px",
            color: "#00ff88",
            textShadow: "0 0 30px #00ff88, 0 0 60px #00ff88, 0 0 90px rgba(0,255,136,0.4)",
          }}>
            ACCESS GRANTED
          </div>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "5px",
            color: "rgba(0,255,136,0.55)",
            marginTop: "10px",
          }}>
            ISFANDIYOR MADAMINOV
          </div>
        </div>
      )}

      <div
        style={{ position: "absolute", right: "3%", top: "50%", transform: "translateY(-50%)", zIndex: 3 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ position: "relative" }}>

        {/* Typing test panel */}
        {test && (
          <div style={{
            position: "absolute", bottom: "calc(100% + 14px)", left: "50%",
            transform: "translateX(-50%)",
            width: 370, minHeight: 80,
            background: "rgba(4,12,7,0.97)",
            border: "1px solid rgba(0,255,136,0.22)",
            borderRadius: 8, padding: "12px 16px",
            fontFamily: "var(--font-mono)", zIndex: 20,
            boxShadow: "0 0 30px rgba(0,255,136,0.08)",
            pointerEvents: "none",
          }}>
            {test.done ? (
              <div style={{ textAlign: "center", padding: "4px 0" }}>
                <div style={{ fontSize: 9, color: "rgba(0,255,136,0.3)", letterSpacing: 2 }}>TAB to restart  ·  ESC to exit</div>
              </div>
            ) : (
              <>
                {/* Words display */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 8px", marginBottom: 10, lineHeight: 1.6 }}>
                  {test.words.map((word, wi) => {
                    if (wi < test.wIdx - 1) return null;
                    const isCurrent = wi === test.wIdx;
                    const isDone    = wi < test.wIdx;
                    return (
                      <span key={`${wi}-${word}`} style={{
                        fontSize: 13,
                        opacity: isDone ? 0.28 : isCurrent ? 1 : 0.45,
                        whiteSpace: "nowrap",
                      }}>
                        {isCurrent
                          ? word.split("").map((ch, ci) => {
                              let color;
                              if (ci < test.typed.length)      color = test.typed[ci] === ch ? "#00ff88" : "#ff5555";
                              else if (ci === test.typed.length) color = "rgba(0,255,136,0.9)";
                              else                               color = "rgba(0,255,136,0.3)";
                              return (
                                <span key={ci} style={{
                                  color,
                                  borderBottom: ci === test.typed.length ? "1px solid rgba(0,255,136,0.7)" : "none",
                                }}>{ch}</span>
                              );
                            })
                          : <span style={{ color: isDone ? "rgba(0,255,136,0.4)" : "rgba(0,255,136,0.45)" }}>{word}</span>
                        }
                      </span>
                    );
                  })}
                </div>
                {/* Footer */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "rgba(0,255,136,0.5)" }}>
                    {test.startTime
                      ? `${Math.round(test.wIdx / Math.max((Date.now() - test.startTime) / 60000, 0.001))} wpm`
                      : "start typing"}
                  </span>
                  <span style={{ fontSize: 10, color: "rgba(0,255,136,0.3)", letterSpacing: 1 }}>
                    {test.wIdx}/{TEST_LEN}
                  </span>
                  <span style={{ fontSize: 9, color: "rgba(0,255,136,0.22)", letterSpacing: 2 }}>TAB/ESC to exit</span>
                </div>
              </>
            )}
          </div>
        )}

        {/* TAB hint shown when keyboard is hovered and no test active */}
        {!test && hovered && (
          <div style={{
            position: "absolute", bottom: "calc(100% + 10px)", left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 2,
            color: "rgba(0,255,136,0.35)", whiteSpace: "nowrap",
            pointerEvents: "none", zIndex: 20,
          }}>
            TAB → typing test
          </div>
        )}

<div style={{ animation: "kb-float-y 4s ease-in-out infinite" }}>
          <div style={{
            transform: hovered
              ? "perspective(900px) rotateX(5deg) rotateY(-2deg) scale(1.08)"
              : "perspective(900px) rotateX(22deg) rotateY(-18deg) scale(1)",
            transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}>
            <div style={{
              background:   "rgba(7,16,10,0.92)",
              border:       `1px solid rgba(0,255,136,${flash.on ? 0.7 : idle ? 0.3 : active ? 0.45 : 0.16})`,
              borderRadius: 10,
              padding:      "12px 12px 14px",
              position:     "relative",
              boxShadow:    flash.on
                ? "0 0 80px rgba(0,255,136,0.7), 0 0 160px rgba(0,255,136,0.35), 0 28px 80px rgba(0,0,0,0.75), inset 0 1px 0 rgba(0,255,136,0.5)"
                : idle
                  ? "0 0 40px rgba(0,255,136,0.18), 0 28px 80px rgba(0,0,0,0.75), inset 0 1px 0 rgba(0,255,136,0.12)"
                  : active
                    ? "0 0 22px rgba(0,255,136,0.28), 0 0 50px rgba(0,255,136,0.10), 0 28px 80px rgba(0,0,0,0.75), inset 0 1px 0 rgba(0,255,136,0.18)"
                    : "0 0 60px rgba(0,255,136,0.05), 0 28px 80px rgba(0,0,0,0.75), inset 0 1px 0 rgba(0,255,136,0.09)",
              display:      "flex", flexDirection: "column", gap: G,
              transition:   "border-color 0.6s ease, box-shadow 0.8s ease",
            }}>

              {/* STANDBY overlay — shown during idle */}
              {idle && (
                <div style={{
                  position:"absolute", inset:0, display:"flex",
                  alignItems:"center", justifyContent:"center",
                  zIndex:10, pointerEvents:"none", borderRadius:10,
                  background:"rgba(4,12,7,0.55)", backdropFilter:"blur(1px)",
                }}>
                  <div style={{
                    fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:"4px",
                    color:"rgba(0,255,136,0.75)",
                    animation:"kb-standby-fade 2s ease-in-out infinite",
                  }}>
                    // STANDBY
                  </div>
                </div>
              )}

              {ROWS.map((row, ri) => (
                <div key={ri} style={{ display:"flex", gap:G }}>
                  {row.map(([label, mult], ki) => {
                    const isLit = LIT.has(label);
                    const space = label === "";
                    const w     = Math.round(mult * W);

                    // Sequential glow: only during default mode (not idle, not active, not test)
                    const isSeq      = isLit && !active && !idle && !test && step >= 0 && SEQUENCE[step] === label;
                    // Click glow: any non-space key during click mode
                    const isClick    = active && !space && !!clickedKey
                      && clickedKey.ri === ri && clickedKey.ki === ki;
                    // Physical key glow: real keyboard press (runs independently of sequential)
                    const physN      = physKeys[`${ri}-${ki}`];
                    const isPhysical = physN !== undefined;
                    // Flash glow: every key (including space bar) when MADAMINOV typed
                    const isFlash    = flash.on;
                    // Test key highlight: per-position map — multiple keys can glow at once
                    const activeKey  = test ? activeKeys[`${ri}-${ki}`] : undefined;
                    const isTestKey  = !!activeKey;
                    const isTestErr  = isTestKey && !activeKey.correct;

                    const glow = isSeq || isClick || isPhysical || isFlash || (isTestKey && activeKey.correct);

                    // Changing the React key remounts the div → CSS animation restarts.
                    // Flash > test > physical > click > seq priority.
                    let divKey;
                    if (isFlash)         divKey = `${ri}-${ki}-f${flash.n}`;
                    else if (isTestKey)  divKey = `${ri}-${ki}-tk${activeKey.n}`;
                    else if (isPhysical) divKey = `${ri}-${ki}-pk${physN}`;
                    else if (isSeq)      divKey = `${ri}-${ki}-s${step}`;
                    else if (isClick)    divKey = `${ri}-${ki}-c${clickedKey.n}`;
                    else                 divKey = `${ri}-${ki}`;

                    // Idle wave: LIT keys pulse with staggered delay (diagonal wave)
                    const isIdleWave = idle && isLit && !flash.on;
                    const idleDelay  = isIdleWave ? `${((ri * 4 + ki) * 0.12).toFixed(2)}s` : undefined;
                    const idleDur    = isIdleWave ? `${(2.2 + (ri * 0.15)).toFixed(2)}s` : undefined;

                    // Wave effect during flash: each row starts slightly later (top→bottom)
                    const flashDelay = flash.on ? `${ri * 80}ms` : undefined;

                    return (
                      <div
                        key={divKey}
                        className={`kb-key${space ? " kb-space" : ""}${glow ? " kb-glow" : ""}${isTestErr ? " kb-error" : ""}${isIdleWave ? " kb-idle" : ""}`}
                        onClick={() => onKeyClick(ri, ki, label)}
                        style={{
                          width: w, height: H,
                          fontSize: w > 55 ? "7px" : "9px",
                          ...(flashDelay ? { animationDelay: flashDelay } : {}),
                          ...(isIdleWave ? { "--idle-dur": idleDur, animationDelay: idleDelay } : {}),
                        }}
                      >
                        {/* LED dot only on LIT keys */}
                        {isLit && <span className={`kb-led${glow ? " kb-glow" : ""}`} />}
                        {label}
                      </div>
                    );
                  })}
                </div>
              ))}

            </div>
          </div>
        </div>
        </div>{/* position:relative wrapper */}
      </div>
    </>
  );
}
