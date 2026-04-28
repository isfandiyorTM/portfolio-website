import { useLang } from "../i18n/LanguageContext";
import { RESUME } from "../constants/data";

export default function ResumePage() {
  const { t } = useLang();
  const rv = t.resume;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;900&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family:'JetBrains Mono', monospace; background:#fff; color:#111; }
        .page { max-width:820px; margin:0 auto; padding:48px 52px; }
        h2 { font-size:9px; letter-spacing:4px; text-transform:uppercase; color:#00994d; margin:0 0 10px; padding-bottom:6px; border-bottom:1px solid #d0f0e0; }
        .section { margin-bottom:26px; }
        .tag { display:inline-block; font-size:8px; letter-spacing:1px; padding:2px 7px; border:1px solid #cce8d8; color:#555; border-radius:2px; margin:2px 3px 2px 0; }
        .bullet { font-size:11px; color:#444; margin:3px 0 3px 14px; line-height:1.7; }
        .bullet::before { content:"›"; color:#00994d; margin-right:6px; }

        @keyframes pdf-glow {
          0%,100% { box-shadow:0 0 6px rgba(0,153,77,0.5), 0 0 18px rgba(0,153,77,0.25); }
          50%      { box-shadow:0 0 14px rgba(0,153,77,0.9), 0 0 36px rgba(0,153,77,0.55); }
        }
        @keyframes pdf-scan {
          0%   { left:-80%; }
          100% { left:220%; }
        }
        @keyframes dl-bounce {
          0%,100% { transform:translateY(0); }
          50%     { transform:translateY(3px); }
        }
        .pdf-btn {
          position:relative; overflow:hidden;
          animation:pdf-glow 1.6s ease-in-out infinite;
        }
        .pdf-btn::before {
          content:'';
          position:absolute; top:0; left:-80%; width:45%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent);
          animation:pdf-scan 2.2s ease-in-out infinite;
          pointer-events:none;
        }
        .pdf-btn:hover { background:#007a3d !important; transform:translateY(-1px); transition:transform 0.15s,background 0.15s; }
        .dl-arrow { display:inline-block; animation:dl-bounce 1.1s ease-in-out infinite; margin-right:4px; }

        @media print {
          body { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
          .no-print { display:none !important; }
          .page { padding:32px 40px; }
        }
      `}</style>

      {/* Print button — hidden on print */}
      <div className="no-print" style={{ position:"fixed", top:16, right:16, display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6, zIndex:10 }}>
        <div style={{ display:"flex", gap:8 }}>
          <button
            className="pdf-btn"
            onClick={() => window.print()}
            style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:2, padding:"9px 18px", border:"1px solid #00994d", background:"#00994d", color:"#fff", cursor:"pointer" }}
          >
            <span className="dl-arrow">↓</span> {rv.download} PDF
          </button>
          <button
            onClick={() => window.close()}
            style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, padding:"9px 12px", border:"1px solid #ccc", background:"#fff", cursor:"pointer" }}
          >
            ✕
          </button>
        </div>
        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:1, color:"#aaa" }}>
          choose <span style={{color:"#00994d"}}>Save&nbsp;as&nbsp;PDF</span> in the dialog
        </div>
      </div>

      <div className="page">
        {/* Header */}
        <div style={{ borderBottom:"2px solid #00994d", paddingBottom:20, marginBottom:24 }}>
          <div style={{ fontSize:24, fontWeight:900, letterSpacing:4, color:"#00994d", marginBottom:4 }}>
            {RESUME.name}
          </div>
          <div style={{ fontSize:12, letterSpacing:2, color:"#555", marginBottom:14 }}>
            {rv.job_title}
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"6px 24px" }}>
            {RESUME.contact.map(c => (
              <span key={c.text} style={{ fontSize:10, color:"#555", display:"flex", alignItems:"center", gap:5 }}>
                <span style={{ color:"#00994d" }}>{c.icon}</span> {c.text}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:26 }}>
          {RESUME.stats.map((s, i) => (
            <div key={i} style={{ border:"1px solid #d0f0e0", padding:"10px 8px", textAlign:"center" }}>
              <div style={{ fontSize:20, fontWeight:900, color:"#00994d", lineHeight:1 }}>{s.v}</div>
              <div style={{ fontSize:8, letterSpacing:2, color:"#777", marginTop:3 }}>{rv.stat_labels[i]}</div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="section">
          <h2>{rv.summary}</h2>
          <p style={{ fontSize:11, lineHeight:1.8, color:"#444" }}>{rv.summary_text}</p>
        </div>

        {/* Experience */}
        <div className="section">
          <h2>{rv.experience}</h2>
          {RESUME.experience.map((ex, i) => {
            const tr = rv.exp[i];
            return (
              <div key={ex.company} style={{ marginBottom:16 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", flexWrap:"wrap", gap:4 }}>
                  <span style={{ fontSize:13, fontWeight:700, color:"#111" }}>{tr.role}</span>
                  <span style={{ fontSize:9, letterSpacing:2, color:"#00994d" }}>{tr.period}</span>
                </div>
                <div style={{ fontSize:10, color:"#00994d", marginBottom:6, opacity:0.8 }}>{ex.company}</div>
                {tr.points.map(p => <div key={p} className="bullet">{p}</div>)}
              </div>
            );
          })}
        </div>

        {/* Projects */}
        <div className="section">
          <h2>{rv.projects}</h2>
          {RESUME.projects.map((pr, i) => (
            <div key={pr.name} style={{ marginBottom:12 }}>
              <div style={{ display:"flex", alignItems:"baseline", gap:10, flexWrap:"wrap" }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#111" }}>{pr.name}</span>
                <span style={{ fontSize:9, color:"#00994d", opacity:0.7 }}>{pr.tech}</span>
              </div>
              <div style={{ fontSize:11, color:"#444", marginTop:3, lineHeight:1.7 }}>{rv.proj[i].desc}</div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="section">
          <h2>{rv.tech}</h2>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {RESUME.skills.map((sk, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                <span style={{ fontSize:9, letterSpacing:1, color:"#00994d", width:80, flexShrink:0 }}>{rv.skill_labels[i]}</span>
                <span style={{ color:"#aaa" }}>→</span>
                {sk.items.map(it => <span key={it} className="tag">{it}</span>)}
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="section">
          <h2>{rv.education}</h2>
          {rv.edu.map(e => (
            <div key={e.degree} style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:4 }}>
              <div>
                <div style={{ fontSize:11, color:"#111" }}>{e.degree}</div>
                <div style={{ fontSize:10, color:"#777" }}>{e.school}</div>
              </div>
              <span style={{ fontSize:9, letterSpacing:2, color:"#00994d" }}>{e.year}</span>
            </div>
          ))}
        </div>

        <div style={{ fontSize:8, letterSpacing:3, color:"#aaa", textAlign:"center", marginTop:16, paddingTop:16, borderTop:"1px solid #eee" }}>
          © 2026 ISFANDIYOR MADAMINOV — FLUTTER DEVELOPER & IT MENTOR
        </div>
      </div>
    </>
  );
}
