import { useState, useEffect, useRef } from "react";

function getBrowser() {
  const ua = navigator.userAgent;
  if (/Edg\/(\d+)/.test(ua))             return `Edge ${ua.match(/Edg\/(\d+)/)[1]}`;
  if (/OPR\/(\d+)/.test(ua))             return `Opera ${ua.match(/OPR\/(\d+)/)[1]}`;
  if (/Chrome\/(\d+)/.test(ua))          return `Chrome ${ua.match(/Chrome\/(\d+)/)[1]}`;
  if (/Firefox\/(\d+)/.test(ua))         return `Firefox ${ua.match(/Firefox\/(\d+)/)[1]}`;
  if (/Version\/(\d+).*Safari/.test(ua)) return `Safari ${ua.match(/Version\/(\d+)/)[1]}`;
  return "Unknown Browser";
}

function getOS() {
  const ua = navigator.userAgent;
  if (/Windows NT (10|11)/.test(ua)) return "Windows 10 / 11";
  if (/Windows NT 6\.3/.test(ua))    return "Windows 8.1";
  if (/Windows/.test(ua))            return "Windows";
  if (/iPhone OS/.test(ua))          return "iOS";
  if (/iPad/.test(ua))               return "iPadOS";
  if (/Android/.test(ua))            return "Android";
  if (/Mac OS X/.test(ua))           return "macOS";
  if (/Linux/.test(ua))              return "Linux";
  return "Unknown OS";
}

function getTimezone() {
  try {
    const tz  = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const off = -new Date().getTimezoneOffset() / 60;
    return `UTC${off >= 0 ? "+" : ""}${off}  ·  ${tz}`;
  } catch { return "Unknown"; }
}

function getStatus() {
  const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const wide = screen.width >= 1280;
  if (dark && wide) return "DEVELOPER DETECTED";
  if (dark || wide) return "TECH USER DETECTED";
  return "VISITOR IDENTIFIED";
}

const SESSION_KEY = "vscan_v1";

const MSGS = [
  "SCANNING VISITOR",
  "ANALYZING BROWSER",
  "READING ENVIRONMENT",
  "COMPILING PROFILE",
];

const CSS = `
@keyframes vs-in {
  from { transform: translateY(calc(100% + 24px)); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
@keyframes vs-out {
  from { transform: translateY(0); opacity: 1; }
  to   { transform: translateY(calc(100% + 24px)); opacity: 0; }
}
@keyframes vs-blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
@keyframes vs-bar {
  0%   { width:  0%; }
  12%  { width: 18%; }
  20%  { width: 18%; }
  34%  { width: 43%; }
  42%  { width: 43%; }
  56%  { width: 65%; }
  64%  { width: 65%; }
  78%  { width: 86%; }
  86%  { width: 86%; }
  100% { width: 100%; }
}
@keyframes vs-sweep {
  0%   { top:  0%; opacity: 0.9; }
  85%  { top: 100%; opacity: 0.9; }
  100% { top: 100%; opacity: 0; }
}
@keyframes vs-row-in {
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes vs-status-glow {
  0%,100% { text-shadow: 0 0 6px var(--green); }
  50%     { text-shadow: 0 0 20px var(--green), 0 0 40px rgba(0,255,136,0.35); }
}
`;

export default function VisitorScan() {
  const [phase,       setPhase]       = useState("hidden");
  const [msgIdx,      setMsgIdx]      = useState(0);
  const [visibleRows, setVisibleRows] = useState(0);

  const ids = useRef([]);
  const clear = () => ids.current.forEach(id => { clearTimeout(id); clearInterval(id); });

  const info = useRef(null);
  if (!info.current) info.current = {
    browser:  getBrowser(),
    os:       getOS(),
    screen:   `${screen.width} × ${screen.height}`,
    timezone: getTimezone(),
    language: navigator.language || "Unknown",
    status:   getStatus(),
  };

  const rows = [
    ["BROWSER",  info.current.browser],
    ["OS",       info.current.os],
    ["SCREEN",   info.current.screen],
    ["TIMEZONE", info.current.timezone],
    ["LANGUAGE", info.current.language],
  ];

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, "1");

    const later = (fn, ms) => { const id = setTimeout(fn, ms); ids.current.push(id); };

    later(() => {
      setPhase("scanning");

      // Cycle scan messages while progress bar runs
      let mi = 0;
      const iv = setInterval(() => { mi = (mi + 1) % MSGS.length; setMsgIdx(mi); }, 430);
      ids.current.push(iv);

      later(() => {
        clearInterval(iv);
        setPhase("results");

        // Reveal rows + status line one by one
        for (let i = 1; i <= rows.length + 1; i++) {
          later(() => setVisibleRows(i), i * 190);
        }

        // Auto-dismiss 5 s after last row
        later(() => {
          setPhase("leaving");
          later(() => setPhase("hidden"), 550);
        }, (rows.length + 1) * 190 + 5000);
      }, 1900);
    }, 3200);

    return clear;
  }, []);

  const dismiss = () => {
    clear();
    setPhase("leaving");
    setTimeout(() => setPhase("hidden"), 550);
  };

  if (phase === "hidden") return null;

  const leaving = phase === "leaving";

  return (
    <>
      <style>{CSS}</style>
      <div
        onClick={dismiss}
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 9995,
          width: 300, cursor: "pointer", userSelect: "none", overflow: "hidden",
          fontFamily: "var(--font-mono)",
          background: "rgba(4,12,7,0.97)",
          border: "1px solid rgba(0,255,136,0.28)",
          borderRadius: 8, padding: "13px 15px",
          boxShadow: "0 0 50px rgba(0,255,136,0.1), 0 24px 60px rgba(0,0,0,0.88)",
          animation: `${leaving ? "vs-out" : "vs-in"} 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards`,
        }}
      >
        {/* Title row */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 10, paddingBottom: 8,
          borderBottom: "1px solid rgba(0,255,136,0.08)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{
              width: 5, height: 5, borderRadius: "50%",
              background: "var(--green)", boxShadow: "0 0 6px var(--green)",
              animation: "pulse-glow 1.5s ease-in-out infinite",
            }} />
            <span style={{ fontSize: 9, letterSpacing: "3px", color: "rgba(0,255,136,0.6)", textTransform: "uppercase" }}>
              System Scan
            </span>
          </div>
          <span style={{ fontSize: 9, color: "rgba(0,255,136,0.25)", letterSpacing: "1px" }}>
            click to dismiss
          </span>
        </div>

        {/* Scanning phase */}
        {phase === "scanning" && (
          <>
            <div style={{ fontSize: 11, letterSpacing: "2px", color: "rgba(0,255,136,0.65)", marginBottom: 11 }}>
              {MSGS[msgIdx]}<span style={{ animation: "vs-blink 0.7s step-end infinite" }}>_</span>
            </div>

            {/* Progress bar */}
            <div style={{ height: 2, background: "rgba(0,255,136,0.07)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 2,
                background: "linear-gradient(90deg, rgba(0,255,136,0.55), var(--green))",
                boxShadow: "0 0 8px var(--green)",
                animation: "vs-bar 1.85s ease forwards",
              }} />
            </div>

            {/* Sweep line */}
            <div style={{
              position: "absolute", left: 0, right: 0, height: 1, pointerEvents: "none",
              background: "linear-gradient(90deg, transparent, rgba(0,255,136,0.55), transparent)",
              animation: "vs-sweep 1.9s linear forwards",
            }} />
          </>
        )}

        {/* Results phase */}
        {phase === "results" && (
          <>
            <div style={{ marginBottom: 8 }}>
              {rows.map(([label, value], i) => (
                <div key={label} style={{
                  display: "flex", gap: 8, lineHeight: 1.95,
                  opacity: i < visibleRows ? 1 : 0,
                  ...(i < visibleRows ? { animation: "vs-row-in 0.22s ease both" } : {}),
                }}>
                  <span style={{ fontSize: 9, color: "rgba(0,255,136,0.28)", width: 64, flexShrink: 0, letterSpacing: "1px" }}>
                    {label}
                  </span>
                  <span style={{ fontSize: 11, color: "rgba(0,255,136,0.88)" }}>{value}</span>
                </div>
              ))}
            </div>

            {visibleRows > rows.length && (
              <div style={{
                borderTop: "1px solid rgba(0,255,136,0.1)", paddingTop: 8, marginTop: 2,
                animation: "vs-row-in 0.22s ease both",
              }}>
                <div style={{
                  fontSize: 10, letterSpacing: "2.5px", color: "var(--green)",
                  animation: "vs-status-glow 2s ease-in-out infinite",
                }}>
                  ▸ {info.current.status}
                </div>
                <div style={{ fontSize: 9, color: "rgba(0,255,136,0.22)", marginTop: 4, letterSpacing: "2px" }}>
                  CLEARANCE LEVEL : GRANTED
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
