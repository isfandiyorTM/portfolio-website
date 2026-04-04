import { useReveal } from "../hooks/useReveal";
import { SKILLS } from "../constants/data";
import { useLang } from "../i18n/LanguageContext";

const STUDENT_URLS = [
  "https://baxodirov-salohiddin.netlify.app/",
  "https://portfolio-ahmadjon-ilhamov.netlify.app/",
  "https://muhammadaziz-programmer.netlify.app/",
];

function StatCard({ value, label, index }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="stat-card reveal" style={{ transitionDelay:`${index*120}ms` }}>
      <div style={{ fontFamily:"var(--font-display)", fontSize:"clamp(28px,5vw,44px)", fontWeight:900, color:"var(--green)", marginBottom:"6px" }}>{value}</div>
      <div style={{ fontFamily:"var(--font-mono)", fontSize:"11px", letterSpacing:"2px", color:"var(--text-muted)", textTransform:"uppercase" }}>{label}</div>
    </div>
  );
}

function RevealBlock({ children, delay=0 }) {
  const ref = useReveal(0.05);
  return <div ref={ref} className="reveal" style={{ transitionDelay:`${delay}ms` }}>{children}</div>;
}

export default function About() {
  const { t } = useLang();
  const ab = t.about;

  return (
    <section id="about" style={{ padding:"120px 40px", width:"100%" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
        <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"start", marginBottom:"80px" }}>

          <RevealBlock delay={0}>
            <p className="section-label">{ab.label}</p>
            <h2 className="section-title">{ab.heading}<br /><span>{ab.heading2}</span></h2>
            <p style={{ color:"var(--text-muted)", lineHeight:1.9, marginBottom:"20px" }}>{ab.p1}</p>
            <p style={{ color:"var(--text-muted)", lineHeight:1.9 }}>{ab.p2}</p>
          </RevealBlock>

          <RevealBlock delay={200}>
            <p className="section-label">{ab.stack_label}</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"10px" }}>
              {SKILLS.map(s => <span key={s} className="skill-tag">{s}</span>)}
            </div>
          </RevealBlock>
        </div>

        <RevealBlock delay={0}>
          <p className="section-label" style={{ marginBottom:"20px" }}>{ab.stats_label}</p>
        </RevealBlock>
        <div className="stats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"20px" }}>
          {ab.stats.map((s,i) => <StatCard key={s.label} value={s.value} label={s.label} index={i} />)}
        </div>
      </div>

      {/* ── Students ───────────────────────────────────────── */}
      <div style={{ maxWidth:"1100px", margin:"0 auto", marginTop:"80px" }}>
        <RevealBlock delay={0}>
          <p className="section-label" style={{ marginBottom:"8px" }}>{ab.students_label}</p>
          <h3 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(22px,3vw,32px)",
                        fontWeight:900, marginBottom:"12px", letterSpacing:-0.5 }}>
            {ab.students_heading}
          </h3>
          <p style={{ color:"var(--text-muted)", fontSize:14, lineHeight:1.7,
                       marginBottom:"32px", maxWidth:500 }}>
            {ab.students_sub}
          </p>
        </RevealBlock>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)",
                       gap:"20px" }} className="students-grid">
          {ab.students.map((s, i) => (
            <RevealBlock key={s.name} delay={i * 120}>
              <a href={STUDENT_URLS[i]} target="_blank" rel="noopener noreferrer"
                 style={{ textDecoration:"none", display:"block" }}>
                <div className="student-card"
                     style={{ padding:"24px", border:"1px solid var(--border)",
                               cursor:"pointer", transition:"all .2s",
                               background:"var(--surface)" }}
                     onMouseEnter={e => {
                       e.currentTarget.style.borderColor = "var(--green)";
                       e.currentTarget.style.transform   = "translateY(-3px)";
                     }}
                     onMouseLeave={e => {
                       e.currentTarget.style.borderColor = "var(--border)";
                       e.currentTarget.style.transform   = "none";
                     }}>
                  {/* Avatar */}
                  <div style={{ width:44, height:44, borderRadius:"50%",
                                 background:"rgba(0,255,136,0.08)",
                                 border:"1px solid var(--green-dark)",
                                 display:"flex", alignItems:"center",
                                 justifyContent:"center", marginBottom:14,
                                 fontFamily:"var(--font-mono)", fontSize:12,
                                 fontWeight:700, color:"var(--green)",
                                 letterSpacing:1 }}>
                    {s.init}
                  </div>
                  <div style={{ fontWeight:700, fontSize:15,
                                 color:"var(--text)", marginBottom:4 }}>
                    {s.name}
                  </div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:10,
                                 letterSpacing:2, color:"var(--green)",
                                 marginBottom:10 }}>
                    {s.tag}
                  </div>
                  <div style={{ fontSize:13, color:"var(--text-muted)",
                                 lineHeight:1.6, marginBottom:16 }}>
                    {s.desc}
                  </div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:11,
                                 color:"var(--green)", letterSpacing:1 }}>
                    {ab.students_view}
                  </div>
                </div>
              </a>
            </RevealBlock>
          ))}
        </div>
      </div>

    </section>
  );
}