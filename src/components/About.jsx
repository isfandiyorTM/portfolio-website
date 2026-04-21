import { useReveal } from "../hooks/useReveal";
import { useCountUp } from "../hooks/useCountUp";
import { useScrollTypewriter } from "../hooks/useScrollTypewriter";
import { SKILLS } from "../constants/data";
import { useLang } from "../i18n/LanguageContext";

function StatCard({ value, label, index, link }) {
  const revealRef = useReveal();
  const { ref: countRef, display } = useCountUp(value);
  const inner = <>
    <div ref={countRef} style={{ fontFamily:"var(--font-display)", fontSize:"clamp(28px,5vw,44px)", fontWeight:900, color:"var(--green)", marginBottom:"6px" }}>{display}</div>
    <div style={{ fontFamily:"var(--font-mono)", fontSize:"11px", letterSpacing:"2px", color:"var(--text-muted)", textTransform:"uppercase" }}>{label}</div>
  </>;
  if (link) return (
    <a ref={revealRef} href={link} target="_blank" rel="noopener noreferrer"
      className="stat-card reveal" style={{ transitionDelay:`${index*120}ms`, textDecoration:"none", display:"block", cursor:"pointer" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor="var(--green)"; e.currentTarget.style.boxShadow="0 0 18px rgba(0,255,136,0.25)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor=""; e.currentTarget.style.boxShadow=""; }}
    >{inner}</a>
  );
  return (
    <div ref={revealRef} className="stat-card reveal" style={{ transitionDelay:`${index*120}ms` }}>
      {inner}
    </div>
  );
}

function SkillTag({ text, delay }) {
  const ref = useReveal(0.05);
  return (
    <span ref={ref} className="skill-tag reveal" style={{ transitionDelay:`${delay}ms` }}>{text}</span>
  );
}

function RevealBlock({ children, delay=0 }) {
  const ref = useReveal(0.05);
  return <div ref={ref} className="reveal" style={{ transitionDelay:`${delay}ms` }}>{children}</div>;
}

export default function About() {
  const { t } = useLang();
  const ab = t.about;

  const { ref: labelRef,      displayed: labelTxt,      done: labelDone }      = useScrollTypewriter(ab.label,       40);
  const { ref: h1Ref,         displayed: h1Txt,          done: h1Done }          = useScrollTypewriter(ab.heading,     28);
  const { ref: h2Ref,         displayed: h2Txt,          done: h2Done }          = useScrollTypewriter(h1Done ? ab.heading2 : "", 28);
  const { ref: stackLabelRef, displayed: stackLabelTxt, done: stackLabelDone }  = useScrollTypewriter(ab.stack_label, 40);
  const { ref: statsLabelRef, displayed: statsLabelTxt, done: statsLabelDone }  = useScrollTypewriter(ab.stats_label, 40);

  return (
    <section id="about" style={{ padding:"120px 40px", width:"100%" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
        <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"start", marginBottom:"80px" }}>

          <RevealBlock delay={0}>
            <p ref={labelRef} className="section-label">
              {labelTxt}{!labelDone && <span className="tw-cursor">▋</span>}
            </p>
            <h2 className="section-title">
              <span ref={h1Ref}>{h1Txt}{!h1Done && <span className="tw-cursor">▋</span>}</span>
              <br />
              <span ref={h2Ref}>{h2Txt}{h1Done && !h2Done && <span className="tw-cursor">▋</span>}</span>
            </h2>
            <p style={{ color:"var(--text-muted)", lineHeight:1.9, marginBottom:"20px" }}>{ab.p1}</p>
            <p style={{ color:"var(--text-muted)", lineHeight:1.9 }}>{ab.p2}</p>
          </RevealBlock>

          <RevealBlock delay={200}>
            <p ref={stackLabelRef} className="section-label">
              {stackLabelTxt}{!stackLabelDone && <span className="tw-cursor">▋</span>}
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"10px" }}>
              {SKILLS.map((s, i) => <SkillTag key={s} text={s} delay={i * 55} />)}
            </div>
          </RevealBlock>
        </div>

        <RevealBlock delay={0}>
          <p ref={statsLabelRef} className="section-label" style={{ marginBottom:"20px" }}>
            {statsLabelTxt}{!statsLabelDone && <span className="tw-cursor">▋</span>}
          </p>
        </RevealBlock>
        <div className="stats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"20px" }}>
          {ab.stats.map((s,i) => <StatCard key={s.label} value={s.value} label={s.label} index={i} link={s.link} />)}
        </div>
      </div>
    </section>
  );
}
