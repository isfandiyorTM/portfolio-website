import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import { useCountUp } from "../hooks/useCountUp";
import { useLang } from "../i18n/LanguageContext";
import { PROJECTS } from "../constants/data";
import "../styles/project-pages.css";

/* Pieces shared by the project pages */

// A block that animates in when scrolled into view.
// `variant`: from-left, from-right or scale-in (default: rise). `delay` in ms.
export function Reveal({ variant = "", delay = 0, className = "", style, children }) {
  const ref = useReveal(0.08);
  return (
    <div ref={ref} className={`reveal ${variant} ${className}`} style={{ ...style, transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// "42+" counts up from 0 when it comes into view; text like "Real-time" is shown as is
export function CountUp({ value }) {
  const { ref, display } = useCountUp(value, 1400);
  return <span ref={ref}>{display}</span>;
}

// Links to the other projects, so a project page isn't a dead end.
// `style` carries the page's --pp-* palette when the page isn't a .pp page itself.
export function MoreProjects({ current, style }) {
  const { t, lang } = useLang();
  const others = PROJECTS.filter(p => p.key !== current);

  return (
    <section className="pp-more" style={style}>
      <div className="pp-wrap">
        <Reveal variant="from-left">
          <span className="pp-tag">{t.projects.more_label}</span>
        </Reveal>
        <div className="pp-more-grid">
          {others.map((p, i) => (
            <Reveal key={p.key} delay={i * 120}>
              <Link to={p.internalLink} className="pp-more-card">
                <div className="pp-more-head">
                  <span className="pp-more-id">{p.id}</span>
                  <span className="pp-more-name">{p.name}</span>
                  <span className="pp-more-arrow" aria-hidden="true">→</span>
                </div>
                <p className="pp-more-desc">{p.desc[lang] || p.desc.en}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
