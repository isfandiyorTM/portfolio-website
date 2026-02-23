import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { PROJECTS, FILTER_TAGS } from "../constants/data";

function ProjectCard({ project, index }) {
  const ref = useReveal();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="project-card reveal"
      style={{ transitionDelay: `${index * 120}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "12px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span style={{
            fontFamily: "var(--font-display)", fontSize: "11px",
            color: "#1a4a2a", letterSpacing: "2px",
          }}>
            {project.id}
          </span>
          <h3 style={{
            fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700,
            color: hovered ? "var(--green)" : "var(--text)",
            transition: "color 0.3s",
          }}>
            {project.name}
          </h3>
        </div>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "3px",
          color: "var(--green)", border: "1px solid #00ff8844", padding: "4px 10px",
        }}>
          {project.status}
        </span>
      </div>

      <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "20px", fontSize: "14px" }}>
        {project.desc}
      </p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {project.stack.map((tech) => (
          <span key={tech} style={{
            fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "1px",
            color: "var(--green-dim)", background: "#001a0d",
            padding: "3px 10px", border: "1px solid var(--green-dark)",
          }}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const titleRef = useReveal();

  const filtered = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.tags.includes(activeFilter));

  return (
    <section id="projects" style={{ padding: "120px 40px", width: "100%" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <div ref={titleRef} className="reveal">
          <p className="section-label">// PROJECTS.JSON</p>
          <h2 className="section-title">
            SELECTED<br /><span>WORK_</span>
          </h2>
        </div>

        {/* Filter buttons */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "40px" }}>
          {FILTER_TAGS.map((tag) => (
            <button
              key={tag}
              className={`filter-btn ${activeFilter === tag ? "active" : ""}`}
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {filtered.length > 0 ? (
            filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))
          ) : (
            <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              // NO PROJECTS FOUND FOR THIS FILTER
            </p>
          )}
        </div>
      </div>
    </section>
  );
}