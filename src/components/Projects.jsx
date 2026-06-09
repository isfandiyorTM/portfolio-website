import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import { useScrollTypewriter } from "../hooks/useScrollTypewriter";
import { useLang } from "../i18n/LanguageContext";
import { PROJECTS, FILTER_TAGS_KEYS } from "../constants/data";

function ProjectCard({ project, index }) {
  const ref     = useReveal();
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const rx = -((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * 5;
    const ry =  ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) * 5;
    setTilt({ rx, ry });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    setTilt({ rx: 0, ry: 0 });
  }, []);

  const desc = typeof project.desc === "object"
    ? (project.desc[lang] || project.desc.en)
    : project.desc;

  const status = t.projects.status[project.statusKey] || project.statusKey.toUpperCase();

  const handleClick = () => {
    if (project.internalLink) navigate(project.internalLink);
    else if (project.link) window.open(project.link, "_blank");
  };

  const tilting = tilt.rx !== 0 || tilt.ry !== 0;

  // Derive shimmer position (0–100%) from tilt angles
  const shimX     = ((tilt.ry / 5) + 1) * 50;
  const shimY     = ((-tilt.rx / 5) + 1) * 50;
  const shimAngle = Math.atan2(shimY - 50, shimX - 50) * (180 / Math.PI);

  return (
    <div
      ref={ref}
      className="project-card reveal"
      style={{ transitionDelay: `${index * 120}ms`, cursor: "pointer" }}
    >
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        position: "relative", overflow: "hidden",
        transform: tilting
          ? `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.02)`
          : undefined,
        transition: tilting ? "transform 0.08s linear" : "transform 0.5s ease",
        transformStyle: "preserve-3d",
        willChange: tilting ? "transform" : "auto",
      }}
    >
      {/* Holographic shimmer overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "inherit",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
        background: hovered ? `
          radial-gradient(circle at ${shimX}% ${shimY}%, rgba(0,255,136,0.13) 0%, transparent 55%),
          linear-gradient(${shimAngle + 90}deg,
            transparent 20%,
            rgba(0,255,180,0.06) 35%,
            rgba(80,200,255,0.09) 48%,
            rgba(180,80,255,0.06) 62%,
            transparent 78%
          )
        ` : "none",
        mixBlendMode: "screen",
      }} />
      <div style={{
        display:"flex", justifyContent:"space-between",
        alignItems:"flex-start", marginBottom:16, flexWrap:"wrap", gap:12,
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:20 }}>
          <span style={{ fontFamily:"var(--font-display)", fontSize:11, color:"var(--text-muted)", letterSpacing:2 }}>
            {project.id}
          </span>
          <h3 style={{
            fontFamily:"var(--font-display)", fontSize:20, fontWeight:700,
            color: hovered ? "var(--green)" : "var(--text)",
            transition:"color 0.3s",
          }}>
            {project.name}
          </h3>
          <span style={{
            fontFamily:"var(--font-mono)", fontSize:11,
            color: hovered ? "var(--green)" : "var(--text-muted)",
            transition:"color .3s, transform .3s",
            display:"inline-block",
            transform: hovered ? "translateX(4px)" : "none",
          }}>→</span>
        </div>
        <span style={{
          fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:3,
          color:"var(--green)", border:"1px solid #00ff8844", padding:"4px 10px",
        }}>
          {status}
        </span>
      </div>

      <p style={{ color:"var(--text-muted)", lineHeight:1.7, marginBottom:20, fontSize:14 }}>
        {desc}
      </p>

      <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
        {project.stack.map((tech) => (
          <span key={tech} style={{
            fontFamily:"var(--font-mono)", fontSize:11, letterSpacing:1,
            color:"var(--green-dim)", background:"var(--bg-card)",
            padding:"3px 10px", border:"1px solid var(--border)",
          }}>
            {tech}
          </span>
        ))}
      </div>
    </div>
    </div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const titleRef = useReveal();
  const { t, lang } = useLang();

  const { ref: labelRef,  displayed: labelTxt,  done: labelDone  } = useScrollTypewriter(t.projects.label,    40);
  const { ref: h1Ref,     displayed: h1Txt,     done: h1Done     } = useScrollTypewriter(t.projects.heading,  28);
  const { ref: h2Ref,     displayed: h2Txt,     done: h2Done     } = useScrollTypewriter(h1Done ? t.projects.heading2 : "", 28);

  const filterLabel = (key) => key === "all" ? t.projects.filter_all : key;

  const filtered = activeFilter === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.tags.includes(activeFilter));

  return (
    <section id="projects" style={{ padding:"120px 40px", width:"100%" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div ref={titleRef} className="reveal">
          <p ref={labelRef} className="section-label">
            {labelTxt}{!labelDone && <span className="tw-cursor">▋</span>}
          </p>
          <h2 className="section-title">
            <span ref={h1Ref}>{h1Txt}{!h1Done && <span className="tw-cursor">▋</span>}</span>
            <br />
            <span ref={h2Ref}>{h2Txt}{h1Done && !h2Done && <span className="tw-cursor">▋</span>}</span>
          </h2>
        </div>

        <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:40 }}>
          {FILTER_TAGS_KEYS.map((key) => (
            <button
              key={key}
              className={`filter-btn ${activeFilter === key ? "active" : ""}`}
              onClick={() => setActiveFilter(key)}
            >
              {filterLabel(key)}
            </button>
          ))}
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
          {filtered.length > 0 ? (
            filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))
          ) : (
            <p style={{ color:"var(--text-muted)", fontFamily:"var(--font-mono)" }}>
              {t.projects.no_results}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}