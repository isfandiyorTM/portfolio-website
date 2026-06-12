import { useState, useEffect, useRef } from "react";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
const CHARS  = "ISFANDIYORMADAMINOV10アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ";

const CSS = `
@keyframes km-flash {
  0%   { opacity: 1; }
  50%  { opacity: 0.4; }
  100% { opacity: 0; }
}
@keyframes km-text {
  from { opacity:0; letter-spacing:28px; filter:blur(6px); }
  to   { opacity:1; letter-spacing:8px;  filter:blur(0); }
}
@keyframes km-sub {
  from { opacity:0; transform:translateY(8px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes km-hint {
  from { opacity:0; }
  to   { opacity:1; }
}
@keyframes km-out {
  from { opacity:1; }
  to   { opacity:0; }
}
@keyframes km-scanlines {
  from { background-position: 0 0; }
  to   { background-position: 0 80px; }
}
`;

export default function KonamiCode() {
  const [phase, setPhase] = useState("idle"); // idle | active | leaving
  const progress  = useRef([]);
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const exitTimer = useRef(null);

  // Matrix rain on canvas
  useEffect(() => {
    if (phase !== "active") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx  = canvas.getContext("2d");
    const SIZE = 14;
    const cols = Math.ceil(canvas.width / SIZE);
    const drops = Array.from({ length: cols }, () => Math.random() * -60);
    const speeds = Array.from({ length: cols }, () => 0.5 + Math.random() * 0.7);

    const frame = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `bold ${SIZE}px monospace`;

      for (let i = 0; i < cols; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x  = i * SIZE;
        const y  = drops[i] * SIZE;
        // Head of stream is brightest
        const isHead = drops[i] > 0 && drops[i] * SIZE < canvas.height;
        ctx.fillStyle = isHead ? "rgba(200,255,220,1)" : "rgba(0,255,136,0.72)";
        ctx.fillText(ch, x, y);
        if (drops[i] * SIZE > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += speeds[i];
      }

      animRef.current = requestAnimationFrame(frame);
    };

    animRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animRef.current);
  }, [phase]);

  // Key sequence detector
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      const next = [...progress.current, e.key].slice(-KONAMI.length);
      progress.current = next;
      if (next.join(",") === KONAMI.join(",")) {
        progress.current = [];
        clearTimeout(exitTimer.current);
        window.dispatchEvent(new CustomEvent("achievement:unlock", { detail: "matrix" }));
        setPhase("active");
        exitTimer.current = setTimeout(() => {
          setPhase("leaving");
          setTimeout(() => setPhase("idle"), 900);
        }, 5500);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); clearTimeout(exitTimer.current); };
  }, []);

  if (phase === "idle") return null;

  const leaving = phase === "leaving";

  return (
    <>
      <style>{CSS}</style>
      <div style={{
        position: "fixed", inset: 0, zIndex: 99998, pointerEvents: "none",
        background: "rgba(0,0,0,0.9)",
        animation: leaving ? "km-out 0.9s ease forwards" : undefined,
      }}>
        {/* Initial green flash */}
        {!leaving && (
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(0,255,136,0.28)",
            animation: "km-flash 0.55s ease both",
            pointerEvents: "none",
          }} />
        )}

        {/* Matrix rain */}
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />

        {/* Scanlines */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
          animation: "km-scanlines 0.25s linear infinite",
        }} />

        {/* Center text */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 16,
        }}>
          <div style={{
            fontFamily: "var(--font-mono)", fontWeight: 700,
            fontSize: "clamp(18px,3.5vw,40px)",
            color: "#00ff88",
            textShadow: "0 0 30px #00ff88, 0 0 70px #00ff88, 0 0 120px rgba(0,255,136,0.45)",
            animation: "km-text 0.7s cubic-bezier(0.16,1,0.3,1) both",
          }}>
            // WAKE UP, ISFANDIYOR
          </div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "clamp(11px,1.6vw,17px)",
            color: "rgba(0,255,136,0.5)", letterSpacing: "6px",
            animation: "km-sub 0.5s 0.35s ease both",
          }}>
            THE MATRIX HAS YOU
          </div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 10,
            color: "rgba(0,255,136,0.22)", letterSpacing: "3px", marginTop: 8,
            animation: "km-hint 0.5s 1.5s ease both",
          }}>
            AUTO-EXIT IN 5s
          </div>
        </div>
      </div>
    </>
  );
}
