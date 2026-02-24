import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { PROJECTS, FILTER_TAGS } from "../constants/data";
import { useLang } from "../i18n/LanguageContext";

function ProjectCard({ project, index, t }) {
  const ref = useReveal();
  const [hovered, setHovered] = useState(false);
  const statusMap = { LIVE: t.projects.status.live, "OPEN SOURCE": t.projects.status.open, SHIPPED: t.projects.status.shipped };

  return (
    <div ref={ref} className="project-card reveal" style={{ transitionDelay:`${index*120}ms` }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"16px", flexWrap:"wrap", gap:"12px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"20px" }}>
          <span style={{ fontFamily:"var(--font-display)", fontSize:"11px", color:"var(--border)", letterSpacing:"2px" }}>{project.id}</span>
          <h3 style={{ fontFamily:"var(--font-display)", fontSize:"20px", fontWeight:700, color:hovered?"var(--green)":"var(--text)", transition:"color 0.3s" }}>{project.name}</h3>
        </div>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:"10px", letterSpacing:"3px", color:"var(--green)", border:"1px solid rgba(0,255,136,0.3)", padding:"4px 10px" }}>
          {statusMap[project.status] || project.status}
        </span>
      </div>
      <p style={{ color:"var(--text-muted)", lineHeight:1.7, marginBottom:"20px", fontSize:"14px" }}>{project.desc}</p>
      <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
        {project.stack.map(tech => (
          <span key={tech} style={{ fontFamily:"var(--font-mono)", fontSize:"11px", color:"var(--green-dim)", background:"rgba(0,255,136,0.04)", padding:"3px 10px", border:"1px solid var(--border)" }}>{tech}</span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const titleRef = useReveal();
  const { t } = useLang();

  const allLabel = t.projects.filter_all;
  const tags = [allLabel, ...FILTER_TAGS.slice(1)];
  const filtered = activeFilter === allLabel ? PROJECTS : PROJECTS.filter(p => p.tags.includes(activeFilter));

  return (
    <section id="projects" style={{ padding:"120px 40px", width:"100%" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
        <div ref={titleRef} className="reveal">
          <p className="section-label">{t.projects.label}</p>
          <h2 className="section-title">{t.projects.heading}<br /><span>{t.projects.heading2}</span></h2>
        </div>
        <div style={{ display:"flex", gap:"10px", flexWrap:"wrap", marginBottom:"40px" }}>
          {tags.map(tag => (
            <button key={tag} className={`filter-btn ${activeFilter===tag?"active":""}`} onClick={() => setActiveFilter(tag)}>{tag}</button>
          ))}
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:"24px" }}>
          {filtered.map((project,i) => <ProjectCard key={project.id} project={project} index={i} t={t} />)}
        </div>
      </div>
    </section>
  );
}