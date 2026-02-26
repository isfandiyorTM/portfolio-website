import { useState, useEffect } from "react";

export default function LoadingScreen({ onDone }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onDone, 800);
    }, 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "#050a0f",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "32px",
      opacity: fadeOut ? 0 : 1,
      transition: "opacity 0.8s ease",
      pointerEvents: fadeOut ? "none" : "all",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');

        @keyframes slowPulse {
          0%, 100% { opacity: 1; text-shadow: 0 0 20px rgba(0,255,136,0.4); }
          50%       { opacity: 0.3; text-shadow: none; }
        }

        @keyframes ringPulse {
          0%   { transform: scale(0.92); opacity: 0.15; }
          50%  { transform: scale(1.08); opacity: 0.4;  }
          100% { transform: scale(0.92); opacity: 0.15; }
        }

        @keyframes ringPulse2 {
          0%   { transform: scale(1.1); opacity: 0.08; }
          50%  { transform: scale(1.3); opacity: 0.0;  }
          100% { transform: scale(1.1); opacity: 0.08; }
        }

        @keyframes lineFill {
          from { width: 0%; }
          to   { width: 100%; }
        }

        @keyframes subtleFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      {/* Outer ripple rings */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          position: "absolute",
          width: "160px", height: "160px",
          borderRadius: "50%",
          border: "1px solid rgba(0,255,136,0.15)",
          animation: "ringPulse 2.4s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute",
          width: "210px", height: "210px",
          borderRadius: "50%",
          border: "1px solid rgba(0,255,136,0.06)",
          animation: "ringPulse2 2.4s ease-in-out infinite",
        }} />

        {/* Initials */}
        <div style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "clamp(48px, 12vw, 72px)",
          fontWeight: 900,
          color: "#00ff88",
          letterSpacing: "8px",
          animation: "slowPulse 2.4s ease-in-out infinite",
          userSelect: "none",
        }}>
          IM
        </div>
      </div>

      {/* Thin progress line */}
      <div style={{
        width: "120px",
        height: "1px",
        background: "#0d2a1a",
        overflow: "hidden",
        animation: "subtleFade 0.6s ease both",
      }}>
        <div style={{
          height: "100%",
          background: "linear-gradient(to right, transparent, #00ff88, transparent)",
          animation: "lineFill 2.4s ease forwards",
        }} />
      </div>

      {/* Name */}
      <div style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: "11px",
        letterSpacing: "5px",
        color: "#2a6a4a",
        textTransform: "uppercase",
        animation: "subtleFade 1s 0.4s ease both",
        opacity: 0,
      }}>
        Isfandiyor Madaminov
      </div>
    </div>
  );
}