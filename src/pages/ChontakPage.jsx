import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";

// ── Phone mockup ──────────────────────────────────────────────────────────────
function PhoneMockup() {
  const rows = [
    { bg:"rgba(240,180,41,.15)", emoji:"🍕", title:"Tushlik",  cat:"Oziq-ovqat", amount:"−45,000",    income:false },
    { bg:"rgba(34,197,94,.15)",  emoji:"💰", title:"Maosh",    cat:"Daromad",    amount:"+3,200,000", income:true  },
    { bg:"rgba(96,165,250,.15)", emoji:"🚌", title:"Metro",    cat:"Transport",  amount:"−1,800",     income:false },
  ];
  return (
    <div className="ct-phone-wrap">
      <div className="ct-phone-glow" />
      <div className="ct-phone">
        <div className="ct-phone-notch">
          <div className="ct-phone-pill" />
        </div>
        <div className="ct-phone-screen">
          <div className="ct-phone-header">
            <span className="ct-phone-logo">Cho'ntak</span>
            <span className="ct-phone-month">‹ Mar 2026 ›</span>
          </div>
          <div className="ct-phone-bal-label">BALANCE</div>
          <div className="ct-phone-balance">so'm 5,278,600</div>
          <div className="ct-phone-cards">
            {[["INCOME","+8,897,000","#22C55E"],["EXPENSE","−3,618,400","#F87171"]].map(([l,v,cl]) => (
              <div key={l} className="ct-phone-card">
                <div className="ct-phone-card-label">{l}</div>
                <div className="ct-phone-card-val" style={{ color:cl }}>{v}</div>
              </div>
            ))}
          </div>
          <div className="ct-phone-txlist">
            <div className="ct-phone-tx-head">TRANSACTIONS</div>
            {rows.map(r => (
              <div key={r.title} className="ct-phone-tx-row">
                <div className="ct-phone-tx-icon" style={{ background:r.bg }}>{r.emoji}</div>
                <div className="ct-phone-tx-info">
                  <div className="ct-phone-tx-title">{r.title}</div>
                  <div className="ct-phone-tx-cat">{r.cat}</div>
                </div>
                <div className="ct-phone-tx-amount" style={{ color:r.income?"#22C55E":"#F87171" }}>
                  {r.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ChontakPage() {
  const navigate    = useNavigate();
  const { t, lang } = useLang();
  const c           = t.chontak;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const shotTitle = lang==="uz" ? "Ko'rinishi." : lang==="ru" ? "Скриншоты." : "See it in action.";

  return (
    <div className="ct-root">

      {/* ── CSS ── */}
      <style>{`
        .ct-root {
          background: #050a0f;
          color: #c8d8e8;
          min-height: 100vh;
          padding-top: 64px;
          overflow-x: hidden;
          font-family: 'Courier New', monospace;
        }

        /* Scanline */
        .ct-scanline {
          position: fixed; inset: 0; z-index: 9999;
          pointer-events: none; overflow: hidden;
        }
        .ct-scanline::after {
          content: '';
          position: absolute; left: 0; right: 0; height: 3px;
          background: linear-gradient(transparent, rgba(0,255,136,.07), transparent);
          animation: scanline 8s linear infinite;
        }

        /* Nav */
        .ct-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 40px; height: 64px;
          background: rgba(5,10,15,.93);
          border-bottom: 1px solid #0d2a1a;
          backdrop-filter: blur(12px);
        }
        .ct-nav-logo {
          font-family: var(--font-display);
          font-size: 18px; font-weight: 900;
          color: var(--green); letter-spacing: 4px;
          animation: flicker 6s infinite; cursor: pointer;
          background: none; border: none;
        }
        .ct-nav-logo span { color: var(--text); font-weight: 400; }
        .ct-back {
          font-family: var(--font-mono);
          font-size: 11px; letter-spacing: 2px;
          color: #4a8a6a; background: none;
          border: 1px solid #0d2a1a;
          padding: 7px 14px; cursor: pointer; transition: all .2s;
        }
        .ct-back:hover { border-color: var(--green); color: var(--green); }

        /* ── Section wrapper ── */
        .ct-wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 40px;
        }
        .ct-wrap--dark { background: #030608; }
        .ct-wrap--mid  { background: #060b10; }

        /* Section labels */
        .ct-tag {
          font-family: var(--font-mono);
          font-size: 11px; color: var(--green);
          letter-spacing: 3px; margin-bottom: 10px; display: block;
        }
        .ct-h2 {
          font-family: var(--font-display);
          font-size: clamp(22px, 3.5vw, 36px);
          font-weight: 700; letter-spacing: -1px;
          line-height: 1.15; margin-bottom: 10px; color: var(--text);
        }
        .ct-h2 span { color: var(--green); }
        .ct-sub {
          font-size: 15px; color: var(--text-muted);
          line-height: 1.75; margin-bottom: 44px; max-width: 520px;
        }

        /* ── HERO ── */
        .ct-hero {
          max-width: 1100px; margin: 0 auto;
          padding: 80px 40px 60px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px; align-items: center;
          animation: fadeUp .7s ease both;
        }
        .ct-hero-tag {
          font-family: var(--font-mono);
          font-size: 11px; color: var(--green);
          letter-spacing: 3px; margin-bottom: 14px;
        }
        .ct-hero-title {
          font-family: var(--font-display);
          font-size: clamp(42px, 6vw, 72px);
          font-weight: 900; line-height: 1;
          letter-spacing: -3px; margin-bottom: 14px;
          color: #F0B429;
        }
        .ct-hero-title span { color: var(--text); }
        .ct-hero-desc {
          font-size: 16px; color: var(--text-muted);
          line-height: 1.75; margin-bottom: 28px; max-width: 460px;
        }
        .ct-hero-btns {
          display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 24px;
        }
        .ct-btn-amber {
          font-family: var(--font-mono); font-weight: 700;
          font-size: 12px; letter-spacing: 2px;
          padding: 13px 26px;
          background: #F0B429; color: #000;
          border: none; cursor: pointer;
          text-decoration: none; display: inline-block;
          transition: all .2s;
        }
        .ct-btn-amber:hover {
          background: #f7c94e;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(240,180,41,.35);
        }
        .ct-btn-ghost {
          font-family: var(--font-mono);
          font-size: 12px; letter-spacing: 2px;
          padding: 13px 26px;
          background: transparent; color: #4a8a6a;
          border: 1px solid #0d2a1a;
          cursor: pointer; text-decoration: none;
          display: inline-block; transition: all .2s;
        }
        .ct-btn-ghost:hover { border-color: var(--green); color: var(--green); }
        .ct-pills {
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .ct-pill {
          font-family: var(--font-mono); font-size: 9px;
          letter-spacing: 1px; padding: 4px 10px;
          border: 1px solid #0d2a1a; color: #4a8a6a;
        }

        /* ── Phone ── */
        .ct-phone-wrap {
          display: flex; justify-content: center; position: relative;
        }
        .ct-phone-glow {
          position: absolute; bottom: -24px;
          width: 140px; height: 28px;
          background: radial-gradient(ellipse, rgba(240,180,41,.22) 0%, transparent 70%);
          filter: blur(14px);
        }
        .ct-phone {
          width: 230px;
          background: #161B26;
          border-radius: 32px;
          border: 2px solid #2a3347;
          box-shadow: 0 0 0 6px rgba(255,255,255,.025),
                      0 40px 80px rgba(0,0,0,.65),
                      0 0 40px rgba(240,180,41,.07);
          overflow: hidden;
          animation: float 4s ease-in-out infinite;
        }
        .ct-phone-notch {
          background: #0a0d14; height: 24px;
          display: flex; align-items: center; justify-content: center;
        }
        .ct-phone-pill {
          width: 60px; height: 5px;
          background: #1a2030; border-radius: 3px;
        }
        .ct-phone-screen { padding: 14px 12px 18px; }
        .ct-phone-header {
          display: flex; justify-content: space-between;
          align-items: center; margin-bottom: 12px;
        }
        .ct-phone-logo { font-family: monospace; font-size: 12px; font-weight: 700; color: #F0B429; }
        .ct-phone-month {
          font-size: 8px; color: #4a5568;
          border: 1px solid #1e2535; padding: 2px 7px; border-radius: 20px;
        }
        .ct-phone-bal-label { font-size: 8px; color: #4a5568; margin-bottom: 2px; letter-spacing: 1px; }
        .ct-phone-balance { font-family: monospace; font-size: 16px; font-weight: 700; color: #e2e8f0; margin-bottom: 10px; }
        .ct-phone-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 10px; }
        .ct-phone-card {
          background: rgba(255,255,255,.04); border: 1px solid #1e2535;
          border-radius: 8px; padding: 6px 8px;
        }
        .ct-phone-card-label { font-size: 6px; color: #4a5568; margin-bottom: 2px; }
        .ct-phone-card-val { font-family: monospace; font-size: 9px; font-weight: 700; }
        .ct-phone-txlist {
          background: rgba(255,255,255,.03); border: 1px solid #1e2535;
          border-radius: 8px; overflow: hidden;
        }
        .ct-phone-tx-head {
          padding: 5px 8px; font-size: 7px; font-weight: 700;
          color: #4a5568; border-bottom: 1px solid #1e2535;
        }
        .ct-phone-tx-row {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 8px; border-bottom: 1px solid rgba(255,255,255,.025);
        }
        .ct-phone-tx-icon {
          width: 22px; height: 22px; border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; flex-shrink: 0;
        }
        .ct-phone-tx-info { flex: 1; }
        .ct-phone-tx-title { font-size: 8px; font-weight: 600; color: #e2e8f0; }
        .ct-phone-tx-cat   { font-size: 6px; color: #4a5568; }
        .ct-phone-tx-amount { font-family: monospace; font-size: 8px; font-weight: 700; }

        /* ── Stats ── */
        .ct-stats {
          max-width: 1100px; margin: 0 auto;
          padding: 0 40px 60px;
        }
        .ct-stats-grid {
          display: grid; grid-template-columns: repeat(4,1fr);
          border: 1px solid #0d2a1a; overflow: hidden;
        }
        .ct-stat {
          padding: 32px 20px; text-align: center;
          border-right: 1px solid #0d2a1a;
          transition: background .2s;
        }
        .ct-stat:last-child { border-right: none; }
        .ct-stat:hover { background: #060e08; }
        .ct-stat-n {
          font-family: var(--font-display);
          font-size: 36px; font-weight: 900;
          color: var(--green); line-height: 1; margin-bottom: 7px;
        }
        .ct-stat-l { font-size: 10px; color: #4a8a6a; letter-spacing: 1px; }

        /* ── Features ── */
        .ct-feat-grid {
          display: grid; grid-template-columns: repeat(3,1fr);
          border: 1px solid #0d2a1a; overflow: hidden;
        }
        .ct-feat-card {
          background: #050f0a; padding: 28px 24px;
          border-right: 1px solid #0d2a1a;
          border-bottom: 1px solid #0d2a1a;
          transition: background .25s;
        }
        .ct-feat-card:nth-child(3n) { border-right: none; }
        .ct-feat-card:nth-last-child(-n+3) { border-bottom: none; }
        .ct-feat-card:hover { background: #091409; }
        .ct-feat-icon {
          width: 40px; height: 40px;
          background: rgba(240,180,41,.1);
          border: 1px solid rgba(240,180,41,.18);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; margin-bottom: 14px;
        }
        .ct-feat-title { font-size: 13px; font-weight: 700; color: #e2e8f0; margin-bottom: 7px; }
        .ct-feat-desc  { font-size: 12px; color: #7a9ab0; line-height: 1.65; }

        /* ── Screenshots ── */
        .ct-shots-row {
          display: flex; gap: 20px;
          overflow-x: auto; padding-bottom: 8px;
          scrollbar-width: none; -webkit-overflow-scrolling: touch;
        }
        .ct-shots-row::-webkit-scrollbar { display: none; }
        .ct-shot { flex-shrink: 0; text-align: center; }
        .ct-shot-frame {
          width: 156px;
          background: #161B26; border-radius: 22px;
          border: 2px solid #1e2535; overflow: hidden;
          box-shadow: 0 16px 48px rgba(0,0,0,.5);
          transition: transform .3s, box-shadow .3s;
        }
        .ct-shot-frame:hover {
          transform: translateY(-10px);
          box-shadow: 0 32px 80px rgba(0,0,0,.65), 0 0 32px rgba(240,180,41,.12);
        }
        .ct-shot-notch {
          background: #0a0d14; height: 17px;
          display: flex; align-items: center; justify-content: center;
        }
        .ct-shot-notch::after {
          content: ''; width: 42px; height: 3px;
          background: #1a2030; border-radius: 2px;
        }
        .ct-shot-img {
          width: 100%; display: block;
          height: 280px; object-fit: cover; object-position: top;
        }
        .ct-shot-label {
          font-family: var(--font-mono); font-size: 9px;
          color: #2a5a3a; letter-spacing: 1px; margin-top: 10px;
        }

        /* ── Timeline ── */
        .ct-timeline { display: flex; flex-direction: column; }
        .ct-tl-row {
          display: grid; grid-template-columns: 80px 1px 1fr;
          gap: 0 28px; padding: 24px 0; align-items: start;
          border-bottom: 1px solid #0d2a1a;
        }
        .ct-tl-row:last-child { border-bottom: none; }
        .ct-tl-date {
          font-family: var(--font-mono); font-size: 9px;
          color: #2a6040; letter-spacing: 1px;
          padding-top: 3px; text-align: right;
        }
        .ct-tl-line {
          background: #0d2a1a; position: relative;
        }
        .ct-tl-dot {
          position: absolute; top: 3px; left: 50%;
          transform: translateX(-50%);
          width: 8px; height: 8px;
          background: #F0B429; border-radius: 50%;
          border: 2px solid #050a0f;
        }
        .ct-tl-title { font-size: 14px; font-weight: 700; color: #e2e8f0; margin-bottom: 5px; }
        .ct-tl-desc  { font-size: 12px; color: #7a9ab0; line-height: 1.65; }

        /* ── CTA ── */
        .ct-cta {
          padding: 100px 40px; text-align: center;
          position: relative; overflow: hidden;
        }
        .ct-cta-glow {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          width: 500px; height: 260px;
          background: radial-gradient(ellipse, rgba(240,180,41,.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .ct-cta-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 5vw, 52px);
          font-weight: 900; letter-spacing: -2px;
          line-height: 1.1; margin-bottom: 14px; color: var(--text);
        }
        .ct-cta-title span { color: #F0B429; }
        .ct-cta-sub {
          font-size: 15px; color: var(--text-muted);
          max-width: 400px; margin: 0 auto 36px; line-height: 1.7;
        }
        .ct-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

        /* ── Footer ── */
        .ct-footer {
          border-top: 1px solid #0d2a1a; padding: 26px 40px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .ct-footer-text {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 1px; color: #1a4a2a;
          background: none; border: none; cursor: pointer; transition: color .2s;
        }
        .ct-footer-text:hover { color: var(--green); }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .ct-nav { padding: 0 24px; }

          /* Hero stacks: text then phone */
          .ct-hero {
            grid-template-columns: 1fr;
            gap: 44px;
            padding: 48px 24px 40px;
          }
          .ct-hero-title { font-size: clamp(38px, 10vw, 56px); letter-spacing: -2px; }
          .ct-hero-desc  { font-size: 15px; max-width: 100%; }

          /* Phone centers and scales down */
          .ct-phone-wrap { order: -1; }
          .ct-phone { width: 200px; }

          /* Stats: 2x2 */
          .ct-stats { padding: 0 24px 48px; }
          .ct-stats-grid { grid-template-columns: 1fr 1fr; }
          .ct-stat { border-right: 1px solid #0d2a1a; border-bottom: 1px solid #0d2a1a; padding: 22px 16px; }
          .ct-stat:nth-child(2),
          .ct-stat:nth-child(4) { border-right: none; }
          .ct-stat:nth-child(3),
          .ct-stat:nth-child(4) { border-bottom: none; }
          .ct-stat-n { font-size: 28px; }

          /* Features: single column */
          .ct-feat-grid { grid-template-columns: 1fr; }
          .ct-feat-card { border-right: none !important; border-bottom: 1px solid #0d2a1a !important; padding: 22px 20px; }
          .ct-feat-card:last-child { border-bottom: none !important; }

          /* Section wraps */
          .ct-wrap { padding: 56px 24px; }

          /* Screenshots: smaller frames, swipe hint */
          .ct-shot-frame { width: 130px; }
          .ct-shot-img   { height: 240px; }
          .ct-shots-row  { gap: 14px; padding-right: 36px; }

          /* Timeline: collapse date column */
          .ct-tl-row { grid-template-columns: 1fr; gap: 0; }
          .ct-tl-date {
            text-align: left; color: #F0B429; font-size: 9px;
            margin-bottom: 6px; padding-top: 0;
          }
          .ct-tl-line { display: none; }

          /* CTA */
          .ct-cta { padding: 72px 24px; }
          .ct-cta-title { letter-spacing: -1px; }

          /* Footer */
          .ct-footer {
            flex-direction: column; gap: 10px;
            text-align: center; padding: 20px 24px;
          }
        }

        @media (max-width: 480px) {
          .ct-hero { padding: 40px 16px 32px; gap: 36px; }
          .ct-phone { width: 180px; }
          .ct-hero-title { font-size: clamp(32px, 11vw, 46px); }
          .ct-stats { padding: 0 16px 40px; }
          .ct-wrap  { padding: 48px 16px; }
          .ct-cta   { padding: 60px 16px; }
          .ct-footer { padding: 18px 16px; }
          .ct-nav { padding: 0 16px; }
          .ct-back { padding: 6px 10px; font-size: 10px; }
          .ct-shot-frame { width: 115px; }
          .ct-shot-img   { height: 210px; }
          .ct-btn-amber,
          .ct-btn-ghost  { font-size: 11px; padding: 12px 18px; }
        }
      `}</style>

      {/* Scanline */}
      <div className="ct-scanline" />

      {/* Nav */}
      <nav className="ct-nav">
        <button className="ct-nav-logo" onClick={() => navigate("/")}>
          IM<span>_DEV</span>
        </button>
        <button className="ct-back" onClick={() => navigate("/")}>{c.back}</button>
      </nav>

      {/* ── Hero ── */}
      <div className="ct-hero">
        <div className="ct-phone-wrap">
          <PhoneMockup />
        </div>
        <div>
          <p className="ct-hero-tag">{c.tag}</p>
          <h1 className="ct-hero-title">{c.title}<span>_</span></h1>
          <p className="ct-hero-desc">{c.desc}</p>
          <div className="ct-hero-btns">
            <a href="/chontak-release.apk" download className="ct-btn-amber">{c.download}</a>
            <a href="https://github.com/isfandiyorTM/cho-ntak" target="_blank"
               rel="noopener noreferrer" className="ct-btn-ghost">{c.source}</a>
          </div>
          <div className="ct-pills">
            {["FLUTTER","DART","BLOC","SQLITE","CLEAN ARCH","ANDROID"].map(tk => (
              <span key={tk} className="ct-pill">{tk}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="ct-stats">
        <div className="ct-stats-grid">
          {c.stats.map(({ n, l }) => (
            <div key={l} className="ct-stat">
              <div className="ct-stat-n">{n}</div>
              <div className="ct-stat-l">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <div className="ct-wrap">
        <span className="ct-tag">{c.feat_label}</span>
        <h2 className="ct-h2">{c.feat_title}<br /><span>{c.feat_title2}</span></h2>
        <p className="ct-sub">{c.feat_sub}</p>
        <div className="ct-feat-grid">
          {c.features.map(f => (
            <div key={f.title} className="ct-feat-card">
              <div className="ct-feat-icon">{f.icon}</div>
              <div className="ct-feat-title">{f.title}</div>
              <div className="ct-feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Screenshots ── */}
      <div className="ct-wrap ct-wrap--dark">
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <span className="ct-tag">// SCREENSHOTS.PNG</span>
          <h2 className="ct-h2" style={{ marginBottom:36 }}>{shotTitle}</h2>
          <div className="ct-shots-row">
            {[
              { src:"/screenshots/chontak/home.png",       label:"HOME" },
              { src:"/screenshots/chontak/stats.png",      label:"STATS" },
              { src:"/screenshots/chontak/add.png",        label:"ADD TX" },
              { src:"/screenshots/chontak/savings.png",    label:"SAVINGS" },
              { src:"/screenshots/chontak/onboarding.png", label:"ONBOARDING" },
            ].map(s => (
              <div key={s.label} className="ct-shot">
                <div className="ct-shot-frame">
                  <div className="ct-shot-notch" />
                  <img src={s.src} alt={s.label} className="ct-shot-img"
                       onError={e => { e.target.style.background="#1a2030"; e.target.removeAttribute("src"); }} />
                </div>
                <div className="ct-shot-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="ct-wrap">
        <span className="ct-tag">{c.build_label}</span>
        <h2 className="ct-h2">{c.build_title}</h2>
        <p className="ct-sub">{c.build_sub}</p>
        <div className="ct-timeline">
          {c.timeline.map(item => (
            <div key={item.date} className="ct-tl-row">
              <div className="ct-tl-date">{item.date}</div>
              <div className="ct-tl-line"><div className="ct-tl-dot" /></div>
              <div>
                <div className="ct-tl-title">{item.title}</div>
                <div className="ct-tl-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="ct-cta ct-wrap--mid">
        <div className="ct-cta-glow" />
        <span className="ct-tag" style={{ display:"block", marginBottom:12 }}>{c.cta_label}</span>
        <h2 className="ct-cta-title">
          {c.cta_title}<br /><span>{c.cta_title2}</span>
        </h2>
        <p className="ct-cta-sub">{c.cta_sub}</p>
        <div className="ct-cta-btns">
          <a href="/chontak-release.apk" download className="ct-btn-amber"
             style={{ padding:"16px 40px", fontSize:13 }}>{c.download}</a>
          <a href="https://github.com/isfandiyorTM/cho-ntak" target="_blank"
             rel="noopener noreferrer" className="ct-btn-ghost"
             style={{ padding:"16px 40px", fontSize:13 }}>{c.source}</a>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="ct-footer">
        <span className="ct-footer-text">{c.footer}</span>
        <button className="ct-footer-text" onClick={() => navigate("/")}>
          {c.back} IM_DEV
        </button>
      </footer>

    </div>
  );
}