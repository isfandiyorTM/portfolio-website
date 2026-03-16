import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import { useLang } from "../i18n/LanguageContext";
import { PROJECTS, FILTER_TAGS_KEYS } from "../constants/data";

function ProjectCard({ project, index }) {
  const ref = useReveal();
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const [hovered, setHovered] = useState(false);

  const desc = typeof project.desc === "object"
    ? (project.desc[lang] || project.desc.en)
    : project.desc;

  const status = t.projects.status[project.statusKey] || project.statusKey.toUpperCase();

  const handleClick = () => {
    if (project.internalLink) navigate(project.internalLink);
    else if (project.link) window.open(project.link, "_blank");
  };

  return (
    <div
      ref={ref}
      className="project-card reveal"
      style={{ transitionDelay: `${index * 120}ms`, cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <div style={{
        display:"flex", justifyContent:"space-between",
        alignItems:"flex-start", marginBottom:16, flexWrap:"wrap", gap:12,
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:20 }}>
          <span style={{ fontFamily:"var(--font-display)", fontSize:11, color:"#1a4a2a", letterSpacing:2 }}>
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
            color: hovered ? "var(--green)" : "#1a4a2a",
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
            color:"var(--green-dim)", background:"#001a0d",
            padding:"3px 10px", border:"1px solid var(--green-dark)",
          }}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const titleRef = useReveal();
  const { t, lang } = useLang();

  const filterLabel = (key) => key === "all" ? t.projects.filter_all : key;

  const filtered = activeFilter === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.tags.includes(activeFilter));

  return (
    <section id="projects" style={{ padding:"120px 40px", width:"100%" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div ref={titleRef} className="reveal">
          <p className="section-label">{t.projects.label}</p>
          <h2 className="section-title">
            {t.projects.heading}<br /><span>{t.projects.heading2}</span>
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
              // NO PROJECTS FOUND
            </p>
          )}
        </div>
      </div>
    </section>
  );
}