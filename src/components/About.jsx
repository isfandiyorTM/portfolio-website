import { useReveal } from "../hooks/useReveal";
import { SKILLS } from "../constants/data";
import { useLang } from "../i18n/LanguageContext";

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
    </section>
  );
}