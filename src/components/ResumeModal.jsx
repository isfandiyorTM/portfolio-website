import { useEffect, useState } from "react";

export default function ResumeModal({ onClose }) {
  const [hoverClose, setHoverClose] = useState(false);
  const [hoverDl, setHoverDl] = useState(false);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(5,10,15,0.88)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        animation: "fadeUp 0.25s ease both",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 820, height: "88vh",
          border: "1px solid var(--green-dark)",
          background: "var(--bg)",
          display: "flex", flexDirection: "column",
          boxShadow: "0 0 60px rgba(0,255,136,0.12)",
          position: "relative",
        }}
      >
        {/* Header bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 16px", borderBottom: "1px solid var(--green-dark)",
          background: "rgba(0,255,136,0.03)", flexShrink: 0,
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:"var(--green)", boxShadow:"0 0 8px var(--green)", animation:"pulse-glow 1.5s infinite" }} />
            <span style={{ fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:3, color:"var(--green)" }}>
              resume.pdf
            </span>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <a
              href="/resume.pdf"
              download
              onMouseEnter={() => setHoverDl(true)}
              onMouseLeave={() => setHoverDl(false)}
              style={{ textDecoration:"none" }}
            >
              <button style={{
                fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:2,
                padding:"5px 12px", border:"1px solid var(--green-dark)",
                background: hoverDl ? "rgba(0,255,136,0.08)" : "transparent",
                color:"var(--green)", cursor:"pointer", transition:"all 0.2s",
              }}>
                ↓ DOWNLOAD
              </button>
            </a>
            <button
              onClick={onClose}
              onMouseEnter={() => setHoverClose(true)}
              onMouseLeave={() => setHoverClose(false)}
              style={{
                fontFamily:"var(--font-mono)", fontSize:13,
                padding:"5px 10px", border:"1px solid var(--green-dark)",
                background: hoverClose ? "rgba(255,50,50,0.08)" : "transparent",
                color: hoverClose ? "#ff4466" : "var(--text-muted)",
                cursor:"pointer", transition:"all 0.2s",
                borderColor: hoverClose ? "#ff4466" : "var(--green-dark)",
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* PDF viewer */}
        <iframe
          src="/resume.pdf#toolbar=0"
          style={{ flex: 1, border: "none", width: "100%", background: "#fff" }}
          title="Resume"
        />
      </div>
    </div>
  );
}
