import { useState, useEffect, useRef } from "react";

const ITEMS = [
  { cmd: "inspect_element()",  status: "ACCESS DENIED" },
  { cmd: "view_page_source()", status: "ENCRYPTED"     },
  { cmd: "save_as()",          status: "PROTECTED"      },
  { cmd: "copy_source()",      status: "CLASSIFIED"     },
];

const CSS = `
@keyframes rc-in {
  from { opacity:0; transform:scale(0.93) translateY(-6px); }
  to   { opacity:1; transform:scale(1)    translateY(0); }
}
@keyframes rc-blink {
  0%,49%{opacity:1} 50%,100%{opacity:0}
}
`;

export default function RightClickTrap() {
  const [menu, setMenu] = useState(null); // { x, y }
  const menuRef = useRef(null);

  useEffect(() => {
    const onContext = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      e.preventDefault();
      setMenu({ x: e.clientX, y: e.clientY });
    };
    const onDismiss = (e) => {
      if (!menuRef.current?.contains(e.target)) setMenu(null);
    };
    const onEsc = (e) => { if (e.key === "Escape") setMenu(null); };

    window.addEventListener("contextmenu", onContext);
    window.addEventListener("click",       onDismiss);
    window.addEventListener("keydown",     onEsc);
    return () => {
      window.removeEventListener("contextmenu", onContext);
      window.removeEventListener("click",       onDismiss);
      window.removeEventListener("keydown",     onEsc);
    };
  }, []);

  if (!menu) return null;

  // Keep menu inside viewport
  const x = Math.min(menu.x, window.innerWidth  - 240);
  const y = Math.min(menu.y, window.innerHeight - 200);

  return (
    <>
      <style>{CSS}</style>
      <div
        ref={menuRef}
        style={{
          position: "fixed", top: y, left: x, zIndex: 99997,
          width: 232, fontFamily: "var(--font-mono)",
          background: "rgba(4,12,7,0.98)",
          border: "1px solid rgba(255,60,60,0.35)",
          borderRadius: 6, overflow: "hidden",
          boxShadow: "0 0 30px rgba(255,40,40,0.08), 0 16px 40px rgba(0,0,0,0.92)",
          animation: "rc-in 0.18s cubic-bezier(0.34,1.56,0.64,1) both",
          userSelect: "none",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "8px 12px 7px",
          borderBottom: "1px solid rgba(255,60,60,0.12)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <div style={{ display: "flex", gap: 5 }}>
            {["#ff5f57","#febc2e","#28c840"].map(c => (
              <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.7 }} />
            ))}
          </div>
          <span style={{ fontSize: 8, letterSpacing: "3px", color: "rgba(255,70,70,0.65)", textTransform: "uppercase", marginLeft: 2 }}>
            ACCESS DENIED
          </span>
          <span style={{ marginLeft: "auto", fontSize: 9, color: "rgba(255,70,70,0.4)", animation: "rc-blink 1s step-end infinite" }}>■</span>
        </div>

        {/* Items */}
        {ITEMS.map(({ cmd, status }) => (
          <div
            key={cmd}
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "7px 12px", borderBottom: "1px solid rgba(0,255,136,0.04)",
              cursor: "not-allowed", transition: "background 0.12s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,40,40,0.05)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <span style={{ fontSize: 10, color: "rgba(0,255,136,0.4)" }}>{cmd}</span>
            <span style={{ fontSize: 8, color: "rgba(255,70,70,0.7)", letterSpacing: "1px" }}>{status}</span>
          </div>
        ))}

        {/* Footer */}
        <div style={{
          padding: "7px 12px",
          fontSize: 8, letterSpacing: "1.5px",
          color: "rgba(255,60,60,0.28)", textAlign: "center",
        }}>
          ⚠ INTRUSION ATTEMPT LOGGED
        </div>
      </div>
    </>
  );
}
