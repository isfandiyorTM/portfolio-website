import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLang } from "../i18n/LanguageContext";
import { RESUME } from "../constants/data";

function ResumeContent() {
  const { t } = useLang();
  const rv = t.resume;
  return (
    <div style={{
      fontFamily: "var(--font-mono)",
      color: "var(--text)",
      padding: "32px 36px",
      overflowY: "auto",
      height: "100%",
      background: "var(--bg)",
    }}>
      <style>{`
        .rv-h2 { font-size:9px; letter-spacing:4px; color:var(--green); text-transform:uppercase; margin:0 0 10px; padding-bottom:5px; border-bottom:1px solid var(--green-dark); }
        .rv-section { margin-bottom:24px; }
        .rv-tag { display:inline-block; font-size:8px; letter-spacing:1px; padding:2px 7px; border:1px solid var(--green-dark); color:var(--text-muted); border-radius:2px; margin:2px 3px 2px 0; }
        .rv-bullet { font-size:11px; color:var(--text-muted); margin:3px 0 3px 14px; line-height:1.6; }
        .rv-bullet::before { content:"›"; color:var(--green); margin-right:6px; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 28, borderBottom: "1px solid var(--green-dark)", paddingBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 4, color: "var(--green)", marginBottom: 4 }}>
          {RESUME.name}
        </div>
        <div style={{ fontSize: 11, letterSpacing: 2, color: "var(--text-muted)", marginBottom: 14 }}>
          {rv.job_title}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px" }}>
          {RESUME.contact.map(c => (
            <span key={c.text} style={{ fontSize: 10, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ color: "var(--green)" }}>{c.icon}</span> {c.text}
            </span>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 28 }}>
        {RESUME.stats.map((s, i) => (
          <div key={i} style={{ border: "1px solid var(--green-dark)", padding: "10px 8px", textAlign: "center", background: "rgba(0,255,136,0.03)" }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: "var(--green)", lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: 8, letterSpacing: 2, color: "var(--text-muted)", marginTop: 3 }}>{rv.stat_labels[i]}</div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="rv-section">
        <div className="rv-h2">{rv.summary}</div>
        <p style={{ fontSize: 11, lineHeight: 1.8, color: "var(--text-muted)", margin: 0 }}>{rv.summary_text}</p>
      </div>

      {/* Experience */}
      <div className="rv-section">
        <div className="rv-h2">{rv.experience}</div>
        {RESUME.experience.map((ex, i) => {
          const tr = rv.exp[i];
          return (
            <div key={ex.company} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text)" }}>{tr.role}</span>
                <span style={{ fontSize: 9, letterSpacing: 2, color: "var(--green)", opacity: 0.7 }}>{tr.period}</span>
              </div>
              <div style={{ fontSize: 10, color: "var(--green)", marginBottom: 6, opacity: 0.8 }}>{ex.company}</div>
              {tr.points.map(p => <div key={p} className="rv-bullet">{p}</div>)}
            </div>
          );
        })}
      </div>

      {/* Projects */}
      <div className="rv-section">
        <div className="rv-h2">{rv.projects}</div>
        {RESUME.projects.map((pr, i) => (
          <div key={pr.name} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text)" }}>{pr.name}</span>
              <span style={{ fontSize: 9, color: "var(--green)", opacity: 0.6 }}>{pr.tech}</span>
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 3, lineHeight: 1.6 }}>{rv.proj[i].desc}</div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="rv-section">
        <div className="rv-h2">{rv.tech}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {RESUME.skills.map((sk, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 9, letterSpacing: 2, color: "var(--green)", width: 54, flexShrink: 0 }}>{rv.skill_labels[i]}</span>
              <span style={{ color: "var(--green-dark)" }}>→</span>
              {sk.items.map(it => <span key={it} className="rv-tag">{it}</span>)}
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="rv-section">
        <div className="rv-h2">{rv.education}</div>
        {rv.edu.map(e => (
          <div key={e.degree} style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4 }}>
            <div>
              <div style={{ fontSize: 11, color: "var(--text)" }}>{e.degree}</div>
              <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{e.school}</div>
            </div>
            <span style={{ fontSize: 9, letterSpacing: 2, color: "var(--green)", opacity: 0.7 }}>{e.year}</span>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 8, letterSpacing: 3, color: "var(--text-muted)", textAlign: "center", opacity: 0.4, marginTop: 8 }}>
        © 2026 ISFANDIYOR MADAMINOV
      </div>
    </div>
  );
}

function ModalInner({ onClose }) {
  const { t } = useLang();
  const [hoverClose, setHoverClose] = useState(false);
  const [hoverDl,    setHoverDl]    = useState(false);

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
        position: "fixed", inset: 0, zIndex: 9000,
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
          width: "100%", maxWidth: 820,
          height: "88vh",
          border: "1px solid var(--green-dark)",
          background: "var(--bg)",
          display: "flex", flexDirection: "column",
          boxShadow: "0 0 60px rgba(0,255,136,0.12)",
        }}
      >
        {/* Header bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 16px", borderBottom: "1px solid var(--green-dark)",
          background: "rgba(0,255,136,0.03)", flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 8px var(--green)", animation: "pulse-glow 1.5s infinite" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 3, color: "var(--green)" }}>
              resume.pdf
            </span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <style>{`
              @keyframes modal-dl-glow {
                0%,100% { box-shadow:0 0 4px rgba(0,255,136,0.4), 0 0 12px rgba(0,255,136,0.15); border-color:rgba(0,255,136,0.35); }
                50%      { box-shadow:0 0 10px rgba(0,255,136,0.8), 0 0 28px rgba(0,255,136,0.4); border-color:rgba(0,255,136,0.8); }
              }
              @keyframes modal-dl-scan {
                0%   { left:-80%; }
                100% { left:220%; }
              }
              @keyframes modal-dl-bounce {
                0%,100% { transform:translateY(0); }
                50%     { transform:translateY(2px); }
              }
              .modal-dl-btn {
                position:relative; overflow:hidden;
                animation:modal-dl-glow 1.6s ease-in-out infinite;
              }
              .modal-dl-btn::before {
                content:'';
                position:absolute; top:0; left:-80%; width:45%; height:100%;
                background:linear-gradient(90deg,transparent,rgba(0,255,136,0.18),transparent);
                animation:modal-dl-scan 2.2s ease-in-out infinite;
                pointer-events:none;
              }
              .modal-dl-arrow { display:inline-block; animation:modal-dl-bounce 1.1s ease-in-out infinite; margin-right:3px; }
            `}</style>
            <a
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <button className="modal-dl-btn" style={{
                fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2,
                padding: "5px 14px", border: "1px solid var(--green-dark)",
                background: "rgba(0,255,136,0.06)",
                color: "var(--green)", cursor: "pointer",
              }}>
                <span className="modal-dl-arrow">↓</span> {t.resume.download}
              </button>
            </a>
            <button
              onClick={onClose}
              onMouseEnter={() => setHoverClose(true)}
              onMouseLeave={() => setHoverClose(false)}
              style={{
                fontFamily: "var(--font-mono)", fontSize: 13,
                padding: "5px 10px", border: "1px solid var(--green-dark)",
                background: hoverClose ? "rgba(255,50,50,0.08)" : "transparent",
                color: hoverClose ? "#ff4466" : "var(--text-muted)",
                cursor: "pointer", transition: "all 0.2s",
                borderColor: hoverClose ? "#ff4466" : "var(--green-dark)",
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Resume content */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          <ResumeContent />
        </div>
      </div>
    </div>
  );
}

export default function ResumeModal({ onClose }) {
  return createPortal(<ModalInner onClose={onClose} />, document.body);
}
