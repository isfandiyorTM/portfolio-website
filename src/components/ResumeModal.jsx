import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const RESUME = {
  name:    "ISFANDIYOR MADAMINOV",
  title:   "Flutter Mobile Developer & IT Mentor",
  contact: [
    { icon: "✉", text: "isfandiyormadaminov12@gmail.com" },
    { icon: "🌐", text: "rahimovdevs.tech" },
    { icon: "📍", text: "Tashkent, Uzbekistan" },
    { icon: "⌥",  text: "github.com/isfandiyordev" },
  ],
  summary:
    "IT educator and Flutter developer with 4+ years of experience across academies, university, and private schools. Taught 450+ students ranging from computer basics to full-stack web and mobile development. Built real-world business software and maintains a 5-star mentor rating.",
  experience: [
    {
      role:    "IT Teacher",
      company: "Rahimov School",
      period:  "2025 — Present",
      points: [
        "Teaching Word, Excel, PowerPoint, Canva, and computer basics to beginners.",
        "Running Python, HTML/CSS/JS, and FrontEnd courses for intermediate students.",
        "Introducing students to AI tools and vibe coding workflows.",
      ],
    },
    {
      role:    "Co-developer & Network Manager",
      company: "Biznex POS System",
      period:  "2024 — 2025",
      points: [
        "Built a full POS business management system together with my university teacher.",
        "Installed and configured POS systems on-site at restaurants across the city.",
        "Communicated directly with real clients — gathered requirements and resolved issues.",
        "Diagnosed and fixed technical errors in the field as they arose.",
      ],
    },
    {
      role:    "Teaching Assistant",
      company: "University",
      period:  "2023 — 2024",
      points: [
        "Assisted classmates and junior students with FrontEnd development (HTML, CSS, JS, React).",
        "Provided guidance on Python programming, PostgreSQL, and MySQL database design.",
        "Mentored students learning Dart and Flutter for mobile development.",
      ],
    },
    {
      role:    "IT Instructor",
      company: "ICode · Codial · Integer",
      period:  "2021 — 2023",
      points: [
        "Taught Computer Literacy (Komputer Savodxonligi) to students of all ages across three academies.",
        "Delivered FrontEnd courses covering HTML, CSS, and JavaScript fundamentals.",
        "Prepared students for practical computer usage and entry-level web development.",
      ],
    },
  ],
  projects: [
    {
      name:  "Cho'ntak",
      tech:  "Flutter · BLoC · SQLite · Clean Architecture",
      desc:  "Personal finance tracker for Uzbekistan — so'm currency, 3 languages, 100% offline, PIN & biometric lock.",
    },
    {
      name:  "Hoji Jalyuzi",
      tech:  "Flutter · Firebase",
      desc:  "Business management app — order tracking, inventory, customer records for a blinds company.",
    },
    {
      name:  "Rahimov Devs Platform",
      tech:  "React · Vite",
      desc:  "Live student showcase platform — 450+ mentored, 3+ live student portfolios published.",
    },
  ],
  skills: [
    { label: "Mobile",    items: ["Flutter", "Dart", "iOS", "Android"] },
    { label: "State",     items: ["BLoC", "Provider", "Riverpod"] },
    { label: "Backend",   items: ["Firebase", "REST API", "SQLite"] },
    { label: "Arch",      items: ["Clean Architecture", "SOLID", "MVC"] },
    { label: "Tools",     items: ["Git", "GitHub", "VS Code", "Figma"] },
    { label: "Web",       items: ["React", "Vite", "HTML", "CSS", "JS"] },
    { label: "Teaching",  items: ["Python", "FrontEnd", "MS Office", "Canva", "AI Tools"] },
  ],
  education: [
    { degree: "Self-directed / Continuous Learning", school: "Flutter Docs · Dart Docs · Community", year: "2021 — Present" },
  ],
  stats: [
    { v: "4+",   l: "Years" },
    { v: "450+", l: "Students" },
    { v: "2+",   l: "Apps Shipped" },
    { v: "5★",   l: "Mentor Rating" },
  ],
};

function ResumeContent() {
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
          {RESUME.title}
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
        {RESUME.stats.map(s => (
          <div key={s.l} style={{ border: "1px solid var(--green-dark)", padding: "10px 8px", textAlign: "center", background: "rgba(0,255,136,0.03)" }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: "var(--green)", lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: 8, letterSpacing: 2, color: "var(--text-muted)", marginTop: 3 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="rv-section">
        <div className="rv-h2">// SUMMARY</div>
        <p style={{ fontSize: 11, lineHeight: 1.8, color: "var(--text-muted)", margin: 0 }}>{RESUME.summary}</p>
      </div>

      {/* Experience */}
      <div className="rv-section">
        <div className="rv-h2">// EXPERIENCE</div>
        {RESUME.experience.map(ex => (
          <div key={ex.role} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text)" }}>{ex.role}</span>
              <span style={{ fontSize: 9, letterSpacing: 2, color: "var(--green)", opacity: 0.7 }}>{ex.period}</span>
            </div>
            <div style={{ fontSize: 10, color: "var(--green)", marginBottom: 6, opacity: 0.8 }}>{ex.company}</div>
            {ex.points.map(p => <div key={p} className="rv-bullet">{p}</div>)}
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="rv-section">
        <div className="rv-h2">// PROJECTS</div>
        {RESUME.projects.map(pr => (
          <div key={pr.name} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text)" }}>{pr.name}</span>
              <span style={{ fontSize: 9, color: "var(--green)", opacity: 0.6 }}>{pr.tech}</span>
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 3, lineHeight: 1.6 }}>{pr.desc}</div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="rv-section">
        <div className="rv-h2">// TECH STACK</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {RESUME.skills.map(sk => (
            <div key={sk.label} style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 9, letterSpacing: 2, color: "var(--green)", width: 54, flexShrink: 0 }}>{sk.label}</span>
              <span style={{ color: "var(--green-dark)" }}>→</span>
              {sk.items.map(it => <span key={it} className="rv-tag">{it}</span>)}
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="rv-section">
        <div className="rv-h2">// EDUCATION</div>
        {RESUME.education.map(e => (
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
                <span className="modal-dl-arrow">↓</span> DOWNLOAD
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
