import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import { Reveal, CountUp, MoreProjects } from "../components/ProjectPage";

function PhoneMockup() {
  const screens = [
    { emoji: "📐", name: "Plise / Rulon", sub: "Ip · Material · Narx", color: "#2563EB" },
    { emoji: "🪟", name: "Combo (Jalyuzi)", sub: "Kv.metr · Material", color: "#059669" },
    { emoji: "👷", name: "Ishchi paneli", sub: "Real-time zakazlar", color: "#C9A84C" },
  ];
  return (
    <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
      <div style={{
        position: "absolute", bottom: -30, width: 160, height: 30,
        background: "radial-gradient(ellipse,rgba(96,165,250,.25) 0%,transparent 70%)",
        filter: "blur(16px)"
      }} />
      <div style={{
        width: 220, background: "#0d1520", borderRadius: 32,
        border: "2px solid #1e2d40",
        boxShadow: "0 0 0 6px rgba(255,255,255,.02),0 40px 80px rgba(0,0,0,.6),0 0 40px rgba(96,165,250,.1)",
        overflow: "hidden", animation: "float 4s ease-in-out infinite"
      }}>
        {/* Status bar */}
        <div style={{ background: "#08111c", height: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 70, height: 5, background: "#1a2535", borderRadius: 3 }} />
        </div>
        <div style={{ padding: "14px 12px 18px" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: "#C9A84C" }}>Hoji Jalyuzi</span>
            <span style={{ fontSize: 8, color: "#2a4060", border: "1px solid #1a2535", padding: "3px 8px", borderRadius: 20 }}>HJ</span>
          </div>

          {/* Result card */}
          <div style={{
            background: "linear-gradient(135deg,#0a1e35,#0f2a48)",
            border: "1px solid #1a3050", borderRadius: 10,
            padding: "10px", marginBottom: 10
          }}>
            <div style={{ fontSize: 7, color: "#2563EB", letterSpacing: 1, marginBottom: 3 }}>E × B = NATIJA</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#60A5FA", lineHeight: 1, marginBottom: 2 }}>
              2.5 <span style={{ fontSize: 10, color: "#4a7aa0" }}>m²</span>
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
              <div style={{ background: "rgba(37,99,235,.2)", borderRadius: 5, padding: "4px 7px" }}>
                <div style={{ fontSize: 6, color: "#60A5FA" }}>Ip</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#60A5FA" }}>6.64m</div>
              </div>
              <div style={{ background: "rgba(217,119,6,.2)", borderRadius: 5, padding: "4px 7px" }}>
                <div style={{ fontSize: 6, color: "#F59E0B" }}>Material</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#F59E0B" }}>0.79m</div>
              </div>
            </div>
          </div>

          {/* Screens list */}
          <div style={{ fontSize: 7, color: "#2a4060", letterSpacing: 1, marginBottom: 6 }}>EKRANLAR</div>
          {screens.map(s => (
            <div key={s.name} style={{
              display: "flex", alignItems: "center", gap: 7, padding: "5px 0",
              borderBottom: "1px solid rgba(255,255,255,.03)"
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: 6,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, flexShrink: 0, background: `${s.color}18`
              }}>{s.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 8, fontWeight: 600, color: "#c8d8e8" }}>{s.name}</div>
                <div style={{ fontSize: 7, color: "#2a4060" }}>{s.sub}</div>
              </div>
              <div style={{ fontSize: 8, color: s.color, fontWeight: 700 }}>›</div>
            </div>
          ))}

          {/* Save btn */}
          <div style={{ marginTop: 10, background: "#C9A84C", borderRadius: 8, padding: "7px", textAlign: "center" }}>
            <div style={{ fontSize: 8, fontWeight: 700, color: "#000" }}>💾 Saqlash</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const STACK = [
  "FLUTTER", "DART", "RIVERPOD", "SUPABASE", "FIREBASE FCM",
  "HIVE", "POSTGRESQL", "REAL-TIME", "ANDROID", "PDF EXPORT"
];

// One colour per side of the system, in the order of the architecture columns
const ROLE_COLORS = ["#2563EB", "#C9A84C", "#059669"];

// This page's palette for the shared .pp classes
const THEME = {
  "--pp-accent": "#C9A84C",
  "--pp-accent-hover": "#E8D5A0",
  "--pp-line": "#2a1e08",
  "--pp-nav-line": "#1a1000",
  "--pp-logo": "var(--green)",
  "--pp-cell": "#050f1a",
  "--pp-cell-hover": "#0a140a",
  "--pp-dim": "#8a7850",
  "--pp-icon-radius": "10px",
};

export default function HojiJalyuziPage() {
  const { t } = useLang();
  const h = t.hoji;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pp" data-theme="dark" style={THEME}>
      <div className="pp-scanline" />

      <nav className="pp-nav">
        <Link to="/" className="pp-logo">IM<span>_DEV</span></Link>
        <Link to="/" className="nav-link pp-back">{h.back}</Link>
      </nav>

      {/* Hero */}
      <header className="pp-hero">
        <div>
          <span className="pp-tag pp-in" style={{ "--i": 0 }}>{h.tag}</span>
          <h1 className="pp-h1 pp-in" style={{ "--i": 1 }}>Hoji<br />Jalyuzi<span>_</span></h1>
          <p className="pp-lead pp-in" style={{ "--i": 2 }}>{h.desc}</p>
          <div className="pp-actions pp-in" style={{ "--i": 3 }}>
            <a href="/hoji_jalyuzi_v1.apk" download className="pp-btn pp-btn--sm">{h.v1_btn}</a>
            <a href="/hoji_jalyuzi_v2.apk" download className="pp-btn pp-btn--sm pp-btn--blue">{h.v2_btn}</a>
            <a href="https://github.com/isfandiyorTM" target="_blank" rel="noopener noreferrer" className="pp-btn pp-btn--sm pp-btn--ghost">⌥ GITHUB</a>
          </div>
          <div className="pp-notes pp-in" style={{ "--i": 4 }}>
            <span className="pp-note">{h.v1_note}</span>
            <span className="pp-note pp-note--blue">{h.v2_note}</span>
          </div>
          <div className="pp-pills pp-in" style={{ "--i": 5 }}>
            {STACK.map(s => <span key={s} className="pp-pill">{s}</span>)}
          </div>
        </div>
        <div className="pp-in" style={{ "--i": 3 }}>
          <PhoneMockup />
        </div>
      </header>

      {/* Stats */}
      <div className="pp-stats-wrap">
        <Reveal className="pp-stats">
          {h.stats.map(s => (
            <div key={s.l} className="pp-stat">
              <div className="pp-stat-n"><CountUp value={s.n} /></div>
              <div className="pp-stat-l">{s.l}</div>
            </div>
          ))}
        </Reveal>
      </div>

      {/* Features */}
      <section className="pp-section">
        <div className="pp-wrap">
          <Reveal variant="from-left">
            <span className="pp-tag">{h.feat_label}</span>
            <h2 className="pp-h2">{h.feat_title} <span>{h.feat_accent}</span></h2>
            <p className="pp-sub">{h.feat_sub}</p>
          </Reveal>
          <Reveal className="pp-grid pp-grid--3">
            {h.features.map(f => (
              <div key={f.title} className="pp-cell stagger-item">
                <div className="pp-cell-icon">{f.icon}</div>
                <div className="pp-cell-title">{f.title}</div>
                <div className="pp-cell-desc">{f.desc}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Architecture: who does what */}
      <section className="pp-section pp-section--alt">
        <div className="pp-wrap">
          <Reveal variant="from-left">
            <span className="pp-tag">{h.arch_label}</span>
            <h2 className="pp-h2">{h.arch_title} <span>{h.arch_accent}</span></h2>
          </Reveal>
          <div className="pp-cols">
            {h.arch.map((col, i) => (
              <Reveal key={col.role} variant="scale-in" delay={i * 140} className="pp-col" style={{ "--col": ROLE_COLORS[i] }}>
                <div className="pp-col-head">{col.role}</div>
                <div className="pp-col-body">
                  {col.items.map(item => <div key={item} className="pp-col-item">{item}</div>)}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Build timeline */}
      <section className="pp-section">
        <div className="pp-wrap">
          <Reveal variant="from-left">
            <span className="pp-tag">{h.build_label}</span>
            <h2 className="pp-h2">{h.build_title} <span>{h.build_accent}</span></h2>
            <p className="pp-sub">{h.build_sub}</p>
          </Reveal>
          <div>
            {h.timeline.map(item => (
              <Reveal key={item.date} variant="from-left" className="pp-tl-row">
                <div className="pp-tl-date">{item.date}</div>
                <div className="pp-tl-line"><div className="pp-tl-dot" /></div>
                <div>
                  <div className="pp-tl-title">{item.title}</div>
                  <div className="pp-tl-desc">{item.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <Reveal variant="scale-in" className="pp-cta">
        <span className="pp-tag">{h.cta_label}</span>
        <h2 className="pp-h2">{h.cta_title} <span>{h.cta_accent}</span></h2>
        <p className="pp-cta-sub">{h.cta_sub}</p>
        <div className="pp-actions">
          <a href="/hoji_jalyuzi_v1.apk" download className="pp-btn">{h.cta_v1}</a>
          <a href="/hoji_jalyuzi_v2.apk" download className="pp-btn pp-btn--blue">{h.cta_v2}</a>
          <a href="https://github.com/isfandiyorTM" target="_blank" rel="noopener noreferrer" className="pp-btn pp-btn--ghost">{h.cta_source}</a>
        </div>
        <div className="pp-notes">
          <span className="pp-note">{h.cta_v1_note}</span>
          <span className="pp-note pp-note--blue">{h.cta_v2_note}</span>
        </div>
      </Reveal>

      <MoreProjects current="hojijalyuzi" />

      <footer className="pp-footer">
        <span>{h.footer}</span>
        <Link to="/">{h.footer_home}</Link>
      </footer>
    </div>
  );
}
