import { useState, useEffect, useRef } from "react";

const DEFS = {
  curious:    { icon: "/>_", title: "CURIOUS",       desc: "You opened the terminal"           },
  access:     { icon: "[ ]", title: "ACCESS GRANTED", desc: "You typed MADAMINOV on keyboard"  },
  matrix:     { icon: "//",  title: "MATRIX MODE",   desc: "You found the Konami code"         },
  typist:     { icon: "___", title: "TYPIST",         desc: "You completed the typing test"     },
  speedDemon: { icon: ">>",  title: "SPEED DEMON",    desc: "Typed over 60 WPM"                 },
  nightOwl:   { icon: "~~~", title: "NIGHT OWL",      desc: "Visiting between midnight and 4am" },
  profiled:   { icon: "***", title: "PROFILED",       desc: "Your system was scanned on arrival"},
  hacker:     { icon: "#!",  title: "HACKER",         desc: "You ran the hack sequence"         },
};

const LS_KEY = "pf_ach_v1";

const CSS = `
@keyframes ach-in {
  from { opacity:0; transform:translateX(-110%); }
  to   { opacity:1; transform:translateX(0); }
}
@keyframes ach-out {
  from { opacity:1; transform:translateX(0); }
  to   { opacity:0; transform:translateX(-110%); }
}
@keyframes ach-bar {
  from { width: 0%; }
  to   { width: 100%; }
}
`;

export default function AchievementSystem() {
  const [toasts, setToasts]   = useState([]);
  const unlocked = useRef(new Set(JSON.parse(localStorage.getItem(LS_KEY) || "[]")));

  useEffect(() => {
    const onUnlock = ({ detail: id }) => {
      if (!DEFS[id] || unlocked.current.has(id)) return;
      unlocked.current.add(id);
      try { localStorage.setItem(LS_KEY, JSON.stringify([...unlocked.current])); } catch {}

      const uid = Date.now() + Math.random();
      setToasts(prev => [...prev, { uid, id, leaving: false }]);

      setTimeout(() => {
        setToasts(prev => prev.map(t => t.uid === uid ? { ...t, leaving: true } : t));
        setTimeout(() => setToasts(prev => prev.filter(t => t.uid !== uid)), 480);
      }, 3800);
    };

    window.addEventListener("achievement:unlock", onUnlock);

    // Night owl — check after other toasts have settled
    const h = new Date().getHours();
    if (h >= 0 && h < 4) setTimeout(() => onUnlock({ detail: "nightOwl" }), 6500);

    return () => window.removeEventListener("achievement:unlock", onUnlock);
  }, []);

  if (!toasts.length) return <style>{CSS}</style>;

  return (
    <>
      <style>{CSS}</style>
      <div style={{
        position: "fixed", bottom: 24, left: 24, zIndex: 9993,
        display: "flex", flexDirection: "column-reverse", gap: 10,
        alignItems: "flex-start",
      }}>
        {toasts.map(({ uid, id, leaving }) => {
          const def = DEFS[id];
          return (
            <div key={uid} style={{
              display: "flex", alignItems: "center", gap: 12,
              fontFamily: "var(--font-mono)",
              background: "rgba(4,12,7,0.97)",
              border: "1px solid rgba(0,255,136,0.32)",
              borderRadius: 8, padding: "10px 14px 8px",
              boxShadow: "0 0 30px rgba(0,255,136,0.1), 0 8px 30px rgba(0,0,0,0.85)",
              minWidth: 255, overflow: "hidden", position: "relative",
              animation: `${leaving ? "ach-out" : "ach-in"} 0.42s cubic-bezier(0.34,1.56,0.64,1) both`,
            }}>
              {/* Countdown bar */}
              {!leaving && (
                <div style={{
                  position: "absolute", bottom: 0, left: 0, height: 2,
                  background: "var(--green)", opacity: 0.45,
                  animation: "ach-bar 3.8s linear forwards",
                }} />
              )}
              <div style={{
                fontSize: 10, letterSpacing: "1px",
                color: "var(--green)", fontWeight: 700,
                textShadow: "0 0 10px var(--green)",
                minWidth: 28, textAlign: "center", flexShrink: 0,
              }}>
                {def.icon}
              </div>
              <div>
                <div style={{ fontSize: 8, letterSpacing: "3px", color: "rgba(0,255,136,0.4)", marginBottom: 2 }}>
                  ACHIEVEMENT UNLOCKED
                </div>
                <div style={{ fontSize: 12, color: "var(--green)", fontWeight: 700, letterSpacing: "1px" }}>
                  {def.title}
                </div>
                <div style={{ fontSize: 10, color: "rgba(0,255,136,0.5)", marginTop: 1 }}>
                  {def.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
