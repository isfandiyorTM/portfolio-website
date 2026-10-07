import { useRef, useEffect, useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { useCountUp } from "../hooks/useCountUp";
import { useScrollTypewriter } from "../hooks/useScrollTypewriter";
import { SKILLS, SKILL_METERS } from "../constants/data";
import { useLang } from "../i18n/LanguageContext";

function SkillMeter({ label, level, delay }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ marginBottom:10 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:1, color:"var(--text-muted)" }}>{label}</span>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--green)", opacity:visible?1:0, transition:`opacity 0.3s ${delay+900}ms` }}>{level}%</span>
      </div>
      <div style={{ height:3, background:"var(--border)", overflow:"hidden" }}>
        <div style={{
          height:"100%",
          background:"linear-gradient(90deg, var(--green-dark), var(--green))",
          boxShadow:"0 0 8px rgba(0,255,136,0.4)",
          width: visible ? `${level}%` : "0%",
          transition: visible ? `width 1.1s cubic-bezier(0.4,0,0.2,1) ${delay}ms` : "none",
        }} />
      </div>
    </div>
  );
}

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

// `variant` picks the entrance: from-left, from-right or scale-in (default: rise)
function RevealBlock({ children, delay=0, variant="" }) {
  const ref = useReveal(0.05);
  return <div ref={ref} className={`reveal ${variant}`} style={{ transitionDelay:`${delay}ms` }}>{children}</div>;
}

// Draws an element in step with scroll: --draw goes from 0 when the element's
// top is 88% of the way down the screen to 1 when its bottom gets there — low
// enough that the line arrives at each entry about when the entry appears.
function useScrollDraw() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r    = el.getBoundingClientRect();
      const mark = window.innerHeight * 0.88;
      const p    = Math.min(1, Math.max(0, (mark - r.top) / r.height));
      el.style.setProperty("--draw", p.toFixed(3));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return ref;
}

// A section label that types itself out when scrolled into view
function TypedLabel({ text, style }) {
  const { ref, displayed, done } = useScrollTypewriter(text, 40);
  return (
    <p ref={ref} className="section-label" style={style}>
      {displayed}{!done && <span className="tw-cursor">▋</span>}
    </p>
  );
}

export default function About() {
  const { t } = useLang();
  const ab = t.about;
  const timelineRef = useScrollDraw();

  const { ref: labelRef,      displayed: labelTxt,      done: labelDone }      = useScrollTypewriter(ab.label,       40);
  const { ref: h1Ref,         displayed: h1Txt,          done: h1Done }          = useScrollTypewriter(ab.heading,     28);
  const { ref: h2Ref,         displayed: h2Txt,          done: h2Done }          = useScrollTypewriter(h1Done ? ab.heading2 : "", 28);
  const { ref: stackLabelRef, displayed: stackLabelTxt, done: stackLabelDone }  = useScrollTypewriter(ab.stack_label, 40);
  const { ref: statsLabelRef, displayed: statsLabelTxt, done: statsLabelDone }  = useScrollTypewriter(ab.stats_label, 40);

  return (
    <section id="about" style={{ padding:"120px 40px", width:"100%" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
        <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"start", marginBottom:"80px" }}>

          <RevealBlock delay={0} variant="from-left">
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

          <RevealBlock delay={200} variant="from-right">
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

        {/* ── Testimonials ── */}
        <TypedLabel text={ab.testimonials_label} style={{ marginTop:"80px", marginBottom:"28px" }} />
        <div className="testimonial-grid">
          {ab.testimonials.map((tm, i) => (
            <RevealBlock key={tm.name} delay={i * 140} variant="scale-in">
              <figure className="testimonial">
                <blockquote>{tm.quote}</blockquote>
                <figcaption>
                  <span className="testimonial-name">{tm.name}</span>
                  <span className="testimonial-role">{tm.role}</span>
                </figcaption>
              </figure>
            </RevealBlock>
          ))}
        </div>

        {/* ── Skill Meters ── */}
        <TypedLabel text={ab.proficiency_label} style={{ marginTop:"80px", marginBottom:"28px" }} />
        <RevealBlock delay={0}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 60px" }}>
            {SKILL_METERS.map((sk, i) => (
              <SkillMeter key={sk.label} label={sk.label} level={sk.level} delay={i * 80} />
            ))}
          </div>
        </RevealBlock>

        {/* ── Experience Timeline ── */}
        <TypedLabel text={ab.experience_label} style={{ marginTop:"80px", marginBottom:"40px" }} />
        <div ref={timelineRef} className="timeline">
          {/* Vertical line — draws itself downward as the timeline scrolls through the screen */}
          <div className="timeline-line" />

          {ab.experience?.map((item, i) => (
            <RevealBlock key={i} delay={i * 80} variant="from-left">
              <div style={{ position:"relative", marginBottom: i < ab.experience.length - 1 ? "40px" : 0 }}>
                {/* Diamond dot — pops in once its entry has arrived */}
                <div className="timeline-dot" />

                <div style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"3px", color:"var(--green)", marginBottom:"5px" }}>
                  {item.period}
                </div>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"15px", fontWeight:700, color:"var(--text)", marginBottom:"2px" }}>
                  {item.role}
                </div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"11px", color:"var(--green-dim)", marginBottom:"10px" }}>
                  {item.place}
                </div>
                <p style={{ color:"var(--text-muted)", fontSize:"13px", lineHeight:1.8, marginBottom:"12px" }}>
                  {item.desc}
                </p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                  {item.tags.map(tag => (
                    <span key={tag} style={{ fontFamily:"var(--font-mono)", fontSize:"9px", letterSpacing:"1px", padding:"3px 9px", border:"1px solid var(--border)", color:"var(--text-muted)", background:"var(--bg-card)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
