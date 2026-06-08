import { useState, useRef, useEffect, useCallback } from "react";

// ACCESS GRANTED flash CSS keyframe (added alongside the keyboard CSS)
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

const ROWS = [
  [["`",1],["1",1],["2",1],["3",1],["4",1],["5",1],["6",1],["7",1],["8",1],["9",1],["0",1],["-",1],["=",1],["⌫",2]],
  [["TAB",1.5],["Q",1],["W",1],["E",1],["R",1],["T",1],["Y",1],["U",1],["I",1],["O",1],["P",1],["[",1],["]",1],["\\",1.5]],
  [["CAPS",1.75],["A",1],["S",1],["D",1],["F",1],["G",1],["H",1],["J",1],["K",1],["L",1],[";",1],["'",1],["↵",2.25]],
  [["⇧",2.25],["Z",1],["X",1],["C",1],["V",1],["B",1],["N",1],["M",1],[",",1],[".",1],["/",1],["⇧",2.75]],
  [["CTRL",1.5],["⌘",1.25],["ALT",1.25],["",6.25],["ALT",1.25],["⌘",1.25],["CTRL",1.5]],
];

// Full name sequence — one step per second
// null = silent step (creates the breaks between/after names)
const SEQUENCE = [
  "I","S","F","A","N","D","I","Y","O","R",  // ISFANDIYOR  (steps 0-9)
  null, null,                                  // 2 s break   (steps 10-11)
  "M","A","D","A","M","I","N","O","V",       // MADAMINOV   (steps 12-20)
  null, null, null,                            // 3 s break   (steps 21-23)
]; // 24 steps → 24 s loop

// All letters that ever light up across both names
const LIT = new Set(["I","S","F","A","N","D","Y","O","R","M","V"]);

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

.kb-led {
  position: absolute; top:3px; right:3px;
  width:3px; height:3px; border-radius:50%;
  background: var(--green); opacity:0; pointer-events:none;
}
.kb-led.kb-glow { animation: kb-led-glow 2.24s ease-in-out 1 forwards; }
`;

export default function CSSKeyboard() {
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
  const clickTimer   = useRef(null); // 5 s resume timer
  const flashTimer   = useRef(null); // 3 s flash duration
  const startedRef   = useRef(false);

  const startSequence = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    let s = 0;
    setStep(s);
    seqRef.current = setInterval(() => {
      s = (s + 1) % SEQUENCE.length;
      setStep(s);
    }, 1000);
  }, []);

  useEffect(() => {
    // Start after loading screen finishes: window.load + 1800 ms covers the
    // LoadingScreen's min-1400ms + 800ms fade-out + App's 500ms opacity transition.
    let delayTimer;
    const onLoad = () => { delayTimer = setTimeout(startSequence, 1800); };

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
      clearTimeout(flashTimer.current);
      if (seqRef.current) clearInterval(seqRef.current);
      mq.removeEventListener("change", onMq);
    };
  }, [startSequence]);

  // Physical keyboard → visual key glow
  useEffect(() => {
    const onKey = (e) => {
      if (e.repeat) return;
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      const label = labelFromEvent(e);
      if (label === undefined) return;
      const positions = findPositions(label);
      if (positions.length === 0) return;

      setActive(true);
      setPhysKeys(prev => {
        const next = { ...prev };
        positions.forEach(k => { next[k] = (next[k] ?? 0) + 1; });
        return next;
      });
      clearTimeout(clickTimer.current);
      clickTimer.current = setTimeout(() => {
        setActive(false);
        setClickedKey(null);
        setPhysKeys({});
      }, 5000);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
      }
      resetTimer = setTimeout(() => { typed = ""; }, 2000);
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); clearTimeout(resetTimer); };
  }, []);

  const onKeyClick = (ri, ki, label) => {
    if (!label) return; // skip space bar
    setActive(true);
    setClickedKey(prev => {
      const same = prev && prev.ri === ri && prev.ki === ki;
      return { ri, ki, n: same ? prev.n + 1 : 0 };
    });
    // Resume the default sequence 5 s after the last interaction
    clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      setActive(false);
      setClickedKey(null);
      setPhysKeys({});
    }, 5000);
  };

  if (!show) return null;

  return (
    <>
      <style>{CSS}{ACCESS_CSS}</style>

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
        <div style={{ animation: "kb-float-y 4s ease-in-out infinite" }}>
          <div style={{
            transform: hovered
              ? "perspective(900px) rotateX(5deg) rotateY(-2deg) scale(1.08)"
              : "perspective(900px) rotateX(22deg) rotateY(-18deg) scale(1)",
            transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}>
            <div style={{
              background:   "rgba(7,16,10,0.92)",
              border:       `1px solid rgba(0,255,136,${flash.on ? 0.7 : active ? 0.45 : 0.16})`,
              borderRadius: 10,
              padding:      "12px 12px 14px",
              boxShadow:    flash.on
                ? "0 0 80px rgba(0,255,136,0.7), 0 0 160px rgba(0,255,136,0.35), 0 28px 80px rgba(0,0,0,0.75), inset 0 1px 0 rgba(0,255,136,0.5)"
                : active
                  ? "0 0 22px rgba(0,255,136,0.28), 0 0 50px rgba(0,255,136,0.10), 0 28px 80px rgba(0,0,0,0.75), inset 0 1px 0 rgba(0,255,136,0.18)"
                  : "0 0 60px rgba(0,255,136,0.05), 0 28px 80px rgba(0,0,0,0.75), inset 0 1px 0 rgba(0,255,136,0.09)",
              display:      "flex", flexDirection: "column", gap: G,
              transition:   "border-color 0.6s ease, box-shadow 0.8s ease",
            }}>

              {ROWS.map((row, ri) => (
                <div key={ri} style={{ display:"flex", gap:G }}>
                  {row.map(([label, mult], ki) => {
                    const isLit = LIT.has(label);
                    const space = label === "";
                    const w     = Math.round(mult * W);

                    // Sequential glow: only during default mode and when this step matches
                    const isSeq      = isLit && !active && step >= 0 && SEQUENCE[step] === label;
                    // Click glow: any non-space key during click mode
                    const isClick    = active && !space && !!clickedKey
                      && clickedKey.ri === ri && clickedKey.ki === ki;
                    // Physical key glow: real keyboard press
                    const physN      = physKeys[`${ri}-${ki}`];
                    const isPhysical = active && physN !== undefined;
                    // Flash glow: every key (including space bar) when MADAMINOV typed
                    const isFlash    = flash.on;

                    const glow = isSeq || isClick || isPhysical || isFlash;

                    // Changing the React key remounts the div → CSS animation restarts.
                    // Flash > physical > click > seq priority.
                    let divKey;
                    if (isFlash)        divKey = `${ri}-${ki}-f${flash.n}`;
                    else if (isPhysical) divKey = `${ri}-${ki}-pk${physN}`;
                    else if (isSeq)      divKey = `${ri}-${ki}-s${step}`;
                    else if (isClick)    divKey = `${ri}-${ki}-c${clickedKey.n}`;
                    else                 divKey = `${ri}-${ki}`;

                    // Wave effect during flash: each row starts slightly later (top→bottom)
                    const flashDelay = flash.on ? `${ri * 80}ms` : undefined;

                    return (
                      <div
                        key={divKey}
                        className={`kb-key${space ? " kb-space" : ""}${glow ? " kb-glow" : ""}`}
                        onClick={() => onKeyClick(ri, ki, label)}
                        style={{
                          width: w, height: H,
                          fontSize: w > 55 ? "7px" : "9px",
                          ...(flashDelay ? { animationDelay: flashDelay } : {}),
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
      </div>
    </>
  );
}
