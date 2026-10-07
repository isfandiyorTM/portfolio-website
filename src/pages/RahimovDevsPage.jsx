import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import { Reveal, CountUp, MoreProjects } from "../components/ProjectPage";

const SITE = "https://rahimovdevs.tech";

const STUDENTS_META = [
  { name:"Ahmadjon Ilhamov",         init:"AI", projects:["Finance Tracker","Stock Simulator","Task Manager","Messenger"], url:"https://portfolio-ahmadjon-ilhamov.netlify.app/" },
  { name:"Muhammadaziz Mahmudjonov", init:"MM", projects:["Portfolio Site","Calculator App","Quiz Game"],                  url:"https://muhammadaziz-programmer.netlify.app/" },
  { name:"Baxodirov Salohiddin",     init:"BS", projects:["Web Projects"],                                                 url:"https://baxodirov-salohiddin.netlify.app/" },
];

// Values for rahimovdevs.stats, in the same order; a link makes that stat clickable
const STATS = [
  { value:"500+", link:SITE },
  { value:"3+" },
  { value:"3" },
  { value:"100%" },
];

// This page's palette for the shared .pp classes
const THEME = {
  "--pp-accent": "#00ff88",
  "--pp-accent-hover": "#7affcc",
  "--pp-line": "#0d2a1a",
  "--pp-cell": "#050a0f",
  "--pp-cell-hover": "#071008",
  "--pp-dim": "#4a8a6a",
};

export default function RahimovDevsPage() {
  const { t } = useLang();
  const rd = t.rahimovdevs;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pp" data-theme="dark" style={THEME}>
      <div className="pp-scanline" />

      <nav className="pp-nav">
        <Link to="/" className="pp-logo">IM<span>_DEV</span></Link>
        <Link to="/" className="nav-link pp-back">{rd.back}</Link>
      </nav>

      {/* Hero */}
      <header className="pp-hero">
        <div>
          <span className="pp-tag pp-in" style={{ "--i": 0 }}>{rd.hero_tag}</span>
          <h1 className="pp-h1 pp-in" style={{ "--i": 1 }}>Rahimov<br /><span>Devs</span>_</h1>
          <p className="pp-lead pp-in" style={{ "--i": 2 }}>{rd.hero_desc}</p>
          <div className="pp-actions pp-in" style={{ "--i": 3, marginBottom: 24 }}>
            <a href={SITE} target="_blank" rel="noopener noreferrer" className="pp-btn">{rd.visit_btn}</a>
            <Link to="/" className="pp-btn pp-btn--ghost">{rd.back_btn}</Link>
          </div>
          <div className="pp-pills pp-in" style={{ "--i": 4 }}>
            {["HTML","CSS","JavaScript","React","Netlify"].map(tech => <span key={tech} className="pp-pill">{tech}</span>)}
          </div>
        </div>

        {/* The live site, in a browser frame */}
        <div className="pp-in" style={{ "--i": 3, display: "grid" }}>
          <a href={SITE} target="_blank" rel="noopener noreferrer" className="pp-browser" aria-label="rahimovdevs.tech">
            <div className="pp-browser-bar">
              <div className="pp-browser-dots">
                {["#ff5f57","#febc2e","#28c840"].map(c => <i key={c} style={{ background: c }} />)}
              </div>
              <div className="pp-browser-url">rahimovdevs.tech</div>
            </div>
            <img src="/screenshots/rahimovdevs/home.jpg" alt="" width="960" height="600" />
          </a>
        </div>
      </header>

      {/* Stats */}
      <div className="pp-stats-wrap">
        <Reveal className="pp-stats">
          {rd.stats.map((label, i) => {
            const { value, link } = STATS[i];
            const inner = <>
              <div className="pp-stat-n"><CountUp value={value} /></div>
              <div className="pp-stat-l">{label}</div>
            </>;
            return link
              ? <a key={label} href={link} target="_blank" rel="noopener noreferrer" className="pp-stat">{inner}</a>
              : <div key={label} className="pp-stat">{inner}</div>;
          })}
        </Reveal>
      </div>

      {/* Students */}
      <section className="pp-section" style={{ paddingTop: 40 }}>
        <div className="pp-wrap">
          <Reveal variant="from-left">
            <span className="pp-tag">{rd.roster_tag}</span>
            <h2 className="pp-h2">{rd.roster_heading} <span>{rd.roster_accent}</span></h2>
            <p className="pp-sub">{rd.roster_sub}</p>
          </Reveal>
          <div className="pp-cards">
            {STUDENTS_META.map((s, i) => {
              const st = rd.students[i] ?? {};
              return (
                <Reveal key={s.name} variant="scale-in" delay={i * 140}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="pp-card">
                    <div className="pp-avatar">{s.init}</div>
                    <div className="pp-card-name">{s.name}</div>
                    <div className="pp-card-meta">{st.grade}</div>
                    <p className="pp-card-desc">{st.desc}</p>
                    <div className="pp-chips">
                      {s.projects.map(p => <span key={p} className="pp-chip">{p}</span>)}
                    </div>
                    <div className="pp-card-link">{rd.view_portfolio}</div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="pp-section pp-section--alt">
        <div className="pp-wrap">
          <Reveal variant="from-left">
            <span className="pp-tag">{rd.how_tag}</span>
            <h2 className="pp-h2">{rd.how_heading} <span>{rd.how_accent}</span></h2>
            <p className="pp-sub">{rd.how_sub}</p>
          </Reveal>
          <Reveal className="pp-grid pp-grid--2">
            {rd.how.map(item => (
              <div key={item.title} className="pp-cell stagger-item">
                <div className="pp-cell-icon">{item.icon}</div>
                <div className="pp-cell-title">{item.title}</div>
                <div className="pp-cell-desc">{item.desc}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <Reveal variant="scale-in" className="pp-cta">
        <span className="pp-tag">{rd.cta_tag}</span>
        <h2 className="pp-h2">{rd.cta_heading} <span>{rd.cta_accent}</span></h2>
        <p className="pp-cta-sub">{rd.cta_sub}</p>
        <a href={SITE} target="_blank" rel="noopener noreferrer" className="pp-btn pp-btn--lg">{rd.cta_btn}</a>
      </Reveal>

      <MoreProjects current="rahimovdevs" />

      <footer className="pp-footer">
        <span>{rd.footer_copy}</span>
        <Link to="/">{rd.footer_home}</Link>
      </footer>
    </div>
  );
}
