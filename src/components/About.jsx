import { useReveal } from "../hooks/useReveal";
import { SKILLS, STATS } from "../constants/data";

function StatCard({ value, label, index }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="stat-card reveal"
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(32px, 5vw, 48px)",
        fontWeight: 900,
        color: "var(--green)",
        marginBottom: "8px",
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        letterSpacing: "3px",
        color: "var(--text-muted)",
        textTransform: "uppercase",
      }}>
        {label}
      </div>
    </div>
  );
}

function RevealBlock({ children, delay = 0 }) {
  const ref = useReveal(0.05);
  return (
    <div
      ref={ref}
      className="reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" style={{ padding: "120px 40px", width: "100%" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* About + Skills grid */}
        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "start",
            marginBottom: "80px",
          }}
        >
          {/* Left — about text */}
          <RevealBlock delay={0}>
            <p className="section-label">// ABOUT.EXE</p>
            <h2 className="section-title">
              WHO AM<br /><span>I_</span>
            </h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.9, marginBottom: "20px" }}>
              I'm a Flutter Mobile Developer passionate about crafting high-performance,
              beautiful applications for both iOS and Android from a single codebase.
            </p>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.9 }}>
              Beyond shipping products, I serve as an IT mentor — helping aspiring developers
              break into the industry through structured guidance, code reviews, and real-world projects.
            </p>
          </RevealBlock>

          {/* Right — skills */}
          <RevealBlock delay={200}>
            <p className="section-label">// TECH_STACK[]</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {SKILLS.map((skill) => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </RevealBlock>
        </div>

        {/* Stats */}
        <RevealBlock delay={0}>
          <p className="section-label" style={{ marginBottom: "20px" }}>// STATS.JSON</p>
        </RevealBlock>
        <div
          className="stats-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}
        >
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}