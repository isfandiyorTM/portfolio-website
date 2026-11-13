import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import { Reveal, CountUp, MoreProjects } from "../components/ProjectPage";
import "../styles/hoji.css";

/*
 * Hoji Jalyuzi's page, drawn in the app's own look: its sign-in screen's
 * near-black, the gold of its buttons, the "HJ" tile with its glow, Inter,
 * and inputs with an icon at the start. The calculator in the phone works,
 * with the app's two formulas. The words are in translations.js under `hoji`.
 */

const REPO = "https://github.com/isfandiyorTM";
const APK = { v1: "/hoji_jalyuzi_v1.apk", v2: "/hoji_jalyuzi_v2.apk" };
const STACK = ["Flutter", "Dart", "Riverpod", "Supabase", "Firebase FCM", "Hive", "PostgreSQL", "PDF"];

/* The app's formulas; E is the width and B the height, in metres. Blue for
   pleated and green for combo, as the app colours them. */
const KINDS = {
  plise: { tone: "#3b82f6", calc: (e, b) => ({ area: e * b, cord: (e + b) * 2 + 0.5, material: b * 0.46 }) },
  combo: { tone: "#10b981", calc: (e, b) => ({ area: e * b, material: b * 2 + 0.1 }) },
};
const ROLE_TONES = ["#3b82f6", "#c9a84c", "#10b981"];

const sum = (n) => new Intl.NumberFormat("ru-RU").format(Math.round(n));
const two = (n) => n.toFixed(2);

/* Line icons, drawn in the current colour */
const ICON = {
  back: <path d="M15 18l-6-6 6-6" />,
  down: <><path d="M12 4v11" /><path d="M7 10l5 5 5-5" /><path d="M5 20h14" /></>,
  code: <><path d="M9 8l-4 4 4 4" /><path d="M15 8l4 4-4 4" /></>,
  wifiOff: <><path d="M3 3l18 18" /><path d="M8.5 16.5a5 5 0 0 1 7 0" /><path d="M5 13a10 10 0 0 1 5.2-2.8" /><path d="M14.5 10.4A10 10 0 0 1 19 13" /><path d="M2 9.5a15 15 0 0 1 4.3-2.8" /><path d="M10.5 5.6A15 15 0 0 1 22 9.5" /></>,
  width: <><path d="M3 12h18" /><path d="M7 8l-4 4 4 4" /><path d="M17 8l4 4-4 4" /></>,
  height: <><path d="M12 3v18" /><path d="M8 7l4-4 4 4" /><path d="M8 17l4 4 4-4" /></>,
  tag: <><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" /><circle cx="7.5" cy="7.5" r="1.4" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
};
const Icon = ({ name, size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {ICON[name]}
  </svg>
);

/* An input as the app draws them: an icon, the value, and a slider under it */
function Field({ label, icon, value, onChange, step, min, max, unit, show = two }) {
  const set = (v) => onChange(Math.min(max, Math.max(min, Math.round(v / step) * step)));
  return (
    <div className="hj-field">
      <span className="hj-field__label">{label}</span>
      <div className="hj-field__box">
        <span className="hj-field__icon"><Icon name={icon} /></span>
        <output className="hj-field__value">{show(value)} <small>{unit}</small></output>
        <button type="button" className="hj-field__step" onClick={() => set(value - step)} aria-label={`${label} −`}>−</button>
        <button type="button" className="hj-field__step" onClick={() => set(value + step)} aria-label={`${label} +`}>+</button>
      </div>
      <input className="hj-range" type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(Number(e.target.value))} aria-label={label} />
    </div>
  );
}

/* The calculator, in a phone */
function Calculator({ ui }) {
  const a = ui.app;
  const [kind, setKind] = useState("plise");
  const [e, setE] = useState(1.5);
  const [b, setB] = useState(2);
  const [price, setPrice] = useState(150000);
  const [saved, setSaved] = useState(false);
  const r = KINDS[kind].calc(e, b);

  useEffect(() => {
    if (!saved) return;
    const id = setTimeout(() => setSaved(false), 2400);
    return () => clearTimeout(id);
  }, [saved]);

  return (
    <div className="hj-phone">
      <div className="hj-phone__status" aria-hidden="true"><span>8:30</span><span>5G ▮▮▮ 40%</span></div>
      <div className="hj-app">
        <header className="hj-app__head">
          <span className="hj-tile hj-tile--sm" aria-hidden="true">HJ</span>
          <span><b>Hoji Jalyuzi</b><small>{a.calc}</small></span>
        </header>

        <div className="hj-seg" role="group" aria-label={ui.types_kicker}>
          {Object.keys(KINDS).map((k) => (
            <button key={k} type="button" aria-pressed={kind === k} style={{ "--tone": KINDS[k].tone }} onClick={() => setKind(k)}>
              {ui[k].split(" (")[0]}
            </button>
          ))}
        </div>

        <Field label={a.width} icon="width" value={e} onChange={setE} step={0.05} min={0.3} max={4} unit={a.m} />
        <Field label={a.height} icon="height" value={b} onChange={setB} step={0.05} min={0.3} max={4} unit={a.m} />

        <div className="hj-result" style={{ "--tone": KINDS[kind].tone }} aria-live="polite">
          <span className="hj-result__label">{a.result}</span>
          <b className="hj-result__n">{two(r.area)} <small>m²</small></b>
          <span className="hj-result__chips">
            {r.cord !== undefined && <span>{a.cord} <b>{two(r.cord)} {a.m}</b></span>}
            <span>{a.material} <b>{two(r.material)} {a.m}</b></span>
          </span>
        </div>

        <Field label={a.price} icon="tag" value={price} onChange={setPrice} step={10000} min={50000} max={500000} unit={a.sum} show={sum} />
        <p className="hj-total"><span>{a.total}</span><b>{sum(r.area * price)} {a.sum}</b></p>

        <button type="button" className={`hj-gold hj-gold--block${saved ? " is-done" : ""}`} onClick={() => setSaved(true)}>
          {saved ? <><Icon name="check" /> {a.saved}</> : a.save}
        </button>
      </div>
    </div>
  );
}

export default function HojiJalyuziPage() {
  const { t } = useLang();
  const h = t.hoji;
  const ui = h.ui;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="hj">
      {/* At the head of the page, like the portfolio's other navbars */}
      <header className="hj-top">
        <Link to="/" className="hj-chip"><Icon name="back" size={16} /> {ui.back}</Link>
        <a className="hj-chip" href={REPO} target="_blank" rel="noopener noreferrer"><Icon name="code" size={16} /> GitHub</a>
      </header>

      <main>
        {/* The sign-in screen's look: the tile, the gold name, and the app itself */}
        <section className="hj-hero">
          <div className="hj-wrap hj-hero__in">
            <div className="hj-hero__text">
              <span className="hj-tile" aria-hidden="true">HJ</span>
              <h1 className="hj-hero__title">Hoji Jalyuzi</h1>
              <p className="hj-hero__sub">{ui.subtitle}</p>
              <p className="hj-hero__lead">{h.desc}</p>
              <div className="hj-actions">
                <a className="hj-gold" href={APK.v1} download><Icon name="down" /> {ui.dl_v1}</a>
                <a className="hj-line" href={APK.v2} download><Icon name="down" /> {ui.dl_v2}</a>
              </div>
              <ul className="hj-notes">
                <li>{h.v1_note}</li>
                <li className="is-blue">{h.v2_note}</li>
              </ul>
              <ul className="hj-pills">{STACK.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
            <div className="hj-hero__show">
              <Calculator ui={ui} />
              <p className="hj-hint">{ui.try_hint}</p>
            </div>
          </div>
        </section>

        <div className="hj-wrap">
          <Reveal className="hj-stats">
            {h.stats.map((s) => (
              <div key={s.l} className="hj-stat stagger-item">
                <b><CountUp value={s.n} /></b>
                <span>{s.l}</span>
              </div>
            ))}
          </Reveal>
        </div>

        {/* The two kinds of blinds, and what is worked out for each */}
        <section className="hj-section">
          <div className="hj-wrap">
            <Reveal className="hj-head">
              <p className="hj-kicker">{ui.types_kicker}</p>
              <h2>{ui.types_title}</h2>
            </Reveal>
            <div className="hj-types">
              {[
                { key: "plise", img: "/hoji/plisse.webp", f: [`${ui.app.cord} = (E + B) × 2 + 0.5`, `${ui.app.material} = B × 0.46`, "m² = E × B"] },
                { key: "combo", img: "/hoji/combo.webp", f: [`${ui.app.material} = B × 2 + 0.10`, "m² = E × B"] },
              ].map((k, i) => (
                <Reveal key={k.key} variant="scale-in" delay={i * 140}>
                  <article className="hj-type" style={{ "--tone": KINDS[k.key].tone }}>
                    <img src={k.img} alt={ui[k.key]} loading="lazy" width="1000" height="723" />
                    <div className="hj-type__body">
                      <h3><i aria-hidden="true" />{ui[k.key]}</h3>
                      <p>{ui[`${k.key}_d`]}</p>
                      <ul>{k.f.map((f) => <li key={f}><code>{f}</code></li>)}</ul>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="hj-section hj-section--alt">
          <div className="hj-wrap">
            <Reveal className="hj-head">
              <p className="hj-kicker">{ui.feat_kicker}</p>
              <h2>{h.feat_title} <span>{h.feat_accent}</span></h2>
              <p>{h.feat_sub}</p>
            </Reveal>
            <Reveal className="hj-grid">
              {h.features.map((f) => (
                <article key={f.title} className="hj-card stagger-item">
                  <span className="hj-card__icon" aria-hidden="true">{f.icon}</span>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </article>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Seller, server, worker */}
        <section className="hj-section">
          <div className="hj-wrap">
            <Reveal className="hj-head">
              <p className="hj-kicker">{ui.arch_kicker}</p>
              <h2>{h.arch_title} <span>{h.arch_accent}</span></h2>
            </Reveal>
            <div className="hj-roles">
              {h.arch.map((col, i) => (
                <Reveal key={col.role} variant="scale-in" delay={i * 140}>
                  <article className={`hj-role${i === 1 ? " hj-role--mid" : ""}`} style={{ "--tone": ROLE_TONES[i] }}>
                    <h3>{col.role}</h3>
                    <ul>{col.items.map((it) => <li key={it}><Icon name="check" size={15} />{it}</li>)}</ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="hj-section hj-section--alt">
          <div className="hj-wrap hj-wrap--narrow">
            <Reveal className="hj-head">
              <p className="hj-kicker">{ui.build_kicker}</p>
              <h2>{h.build_title} <span>{h.build_accent}</span></h2>
              <p>{h.build_sub}</p>
            </Reveal>
            <ol className="hj-steps">
              {h.timeline.map((s) => (
                <Reveal key={s.date} variant="from-left" className="hj-step">
                  <span className="hj-step__tag">{s.date}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* The way in, drawn as the app's sign-in card */}
        <section className="hj-section">
          <Reveal variant="scale-in" className="hj-wrap">
            <div className="hj-signin">
              <span className="hj-tile" aria-hidden="true">HJ</span>
              <h2>{h.cta_title} <span>{h.cta_accent}</span></h2>
              <p>{h.cta_sub}</p>
              <a className="hj-gold hj-gold--block" href={APK.v1} download><Icon name="down" /> {ui.dl_v1}</a>
              <a className="hj-line hj-line--block" href={APK.v2} download><Icon name="down" /> {ui.dl_v2}</a>
              <a className="hj-link" href={REPO} target="_blank" rel="noopener noreferrer">{ui.source} →</a>
              <p className="hj-offline"><Icon name="wifiOff" size={16} /> {ui.offline}</p>
            </div>
          </Reveal>
        </section>

        <div className="hj-more"><MoreProjects current="hojijalyuzi" /></div>
      </main>

      <footer className="hj-foot">
        <span>{ui.footer}</span>
        <Link to="/">{ui.footer_home}</Link>
      </footer>
    </div>
  );
}
