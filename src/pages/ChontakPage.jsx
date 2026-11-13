import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import { Reveal, CountUp, MoreProjects } from "../components/ProjectPage";
import "../styles/chontak.css";

/*
 * Cho'ntak's page, drawn in the app's own look (lib/core/theme/app_theme.dart):
 * the navy-black base, the card surfaces, the warm amber, green for income
 * and coral for spending, Roboto. The first screen is the app's onboarding,
 * and "Try it" is its home screen, working. The words are in translations.js
 * under `chontak`.
 */

const APK = "/cho'ntak.apk";
const REPO = "https://github.com/isfandiyorTM/cho-ntak";
/* (no flags: Windows draws flag emoji as two bare letters) */
const LANGS = [["uz", "O'zbek"], ["ru", "Русский"], ["en", "English"]];

/* The app's category palette (AppColors.categoryColors) */
const PALETTE = ["#F0B429", "#22C55E", "#F87171", "#60A5FA", "#A78BFA", "#FB923C", "#34D399", "#F472B6"];
const STAT_TONES = ["#60A5FA", "#A78BFA", "#F0B429", "#22C55E"];
const SHOTS = ["home", "stats", "add", "savings", "onboarding"];

/* The month the home screen opens on, from the app's own screenshot */
const START = { income: 8897000, expense: 3867400, limit: 12000000 };

const som = (n, cents = false) =>
  "so'm " + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 });

/* A number that glides to its new value, as the app's balance does */
function useGlide(value, ms = 650) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const a = from.current;
    let frame = 0, start = 0;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / ms);
      const v = a + (value - a) * (1 - Math.pow(1 - p, 3));
      from.current = v;
      setShown(v);
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value, ms]);
  return shown;
}

const Wallet = ({ size = 44 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <rect x="2.5" y="5" width="19" height="15" rx="4.5" /><path d="M6.5 9.5h5" /><path d="M21.5 11h-4a2 2 0 0 0 0 4h4" />
  </svg>
);
const Arrow = ({ up }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {up ? <><path d="M12 19V5" /><path d="M6 11l6-6 6 6" /></> : <><path d="M12 5v14" /><path d="M6 13l6 6 6-6" /></>}
  </svg>
);

/* One row of the transactions list */
function Row({ tx }) {
  const plus = tx.a > 0;
  return (
    <li className="ch-tx">
      <span className="ch-tx__icon" style={{ "--c": tx.tone }} aria-hidden="true">{tx.e}</span>
      <span className="ch-tx__body"><b>{tx.t}</b><small>{tx.c}</small></span>
      <span className={`ch-tx__amt ${plus ? "is-in" : "is-out"}`}>{plus ? "+" : "−"}{som(tx.a, true)}</span>
    </li>
  );
}

/* The app's home screen, working: tap an entry and everything moves */
function TryIt({ ui }) {
  const a = ui.app;
  const toned = (list) => list.map((x, i) => ({ ...x, tone: PALETTE[(i * 3 + 1) % PALETTE.length] }));
  const [txs, setTxs] = useState(() => toned(a.start).map((x, i) => ({ ...x, id: `s${i}` })));
  const [extra, setExtra] = useState({ income: 0, expense: 0 });
  const seq = useRef(0);

  const income = START.income + extra.income;
  const expense = START.expense + extra.expense;
  const balance = useGlide(income - expense);
  const shownIn = useGlide(income);
  const shownOut = useGlide(expense);
  const used = Math.min(1, expense / START.limit);

  const add = (s, i) => {
    seq.current += 1;
    const tx = { ...s, tone: PALETTE[(i * 2 + 3) % PALETTE.length], id: `n${seq.current}` };
    setTxs((list) => [tx, ...list].slice(0, 5));
    setExtra((x) => (s.a > 0 ? { ...x, income: x.income + s.a } : { ...x, expense: x.expense - s.a }));
  };
  const reset = () => {
    setTxs(toned(a.start).map((x, i) => ({ ...x, id: `s${i}` })));
    setExtra({ income: 0, expense: 0 });
  };

  return (
    <div className="ch-try__app">
      <div className="ch-home">
        <header className="ch-home__head">
          <b>Cho'ntak</b>
          <span className="ch-pill" aria-hidden="true">‹ {a.month} ›</span>
        </header>
        <p className="ch-home__label">{a.balance}</p>
        <p className="ch-home__balance" aria-live="polite">{som(balance, true)}</p>
        <div className="ch-home__cards">
          <div className="ch-mini"><span className="ch-mini__icon is-in"><Arrow /></span><span><small>{a.income}</small><b className="is-in">{som(shownIn)}</b></span></div>
          <div className="ch-mini"><span className="ch-mini__icon is-out"><Arrow up /></span><span><small>{a.expense}</small><b className="is-out">{som(shownOut)}</b></span></div>
        </div>
        <div className="ch-budget">
          <p className="ch-budget__head"><span aria-hidden="true">▥</span> {a.budget}</p>
          <div className="ch-bar" role="progressbar" aria-valuenow={Math.round(used * 100)} aria-valuemin={0} aria-valuemax={100} aria-label={a.budget}>
            <i style={{ width: `${used * 100}%`, background: used > 0.85 ? "#F87171" : used > 0.6 ? "#F0B429" : "#22C55E" }} />
          </div>
          <p className="ch-budget__pct">{Math.round(used * 100)}%</p>
          <div className="ch-budget__nums">
            <span><b className="is-out">{som(expense)}</b><small>{a.spent}</small></span>
            <span><b className="is-in">{som(Math.max(0, START.limit - expense))}</b><small>{a.left}</small></span>
            <span><b className="is-amber">{som(START.limit)}</b><small>{a.limit}</small></span>
          </div>
        </div>
        <p className="ch-home__tx">{a.tx}</p>
        <ul className="ch-txs">{txs.map((tx) => <Row key={tx.id} tx={tx} />)}</ul>
      </div>
      <div className="ch-try__pick">
        {a.samples.map((s, i) => (
          <button key={s.t} type="button" className="ch-sample" onClick={() => add(s, i)}>
            <span aria-hidden="true">{s.e}</span> {s.t}
            <b className={s.a > 0 ? "is-in" : "is-out"}>{s.a > 0 ? "+" : "−"}{Math.abs(s.a).toLocaleString("en-US")}</b>
          </button>
        ))}
        <button type="button" className="ch-sample ch-sample--reset" onClick={reset}>↺ {ui.reset}</button>
      </div>
    </div>
  );
}

export default function ChontakPage() {
  const { t, lang, switchLang } = useLang();
  const c = t.chontak;
  const ui = c.ui;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="ch">
      {/* At the head of the page, like the portfolio's other navbars */}
      <header className="ch-top">
        <Link to="/" className="ch-pill ch-pill--link">‹ {ui.back}</Link>
        <a className="ch-pill ch-pill--link" href={REPO} target="_blank" rel="noopener noreferrer">GitHub ›</a>
      </header>

      <main>
        {/* The onboarding screen: the wallet, the languages, the name in amber */}
        <section className="ch-hero">
          <div className="ch-wrap ch-hero__in">
            <div className="ch-hero__text">
              <span className="ch-coin" aria-hidden="true"><Wallet /></span>
              <div className="ch-langs" role="group" aria-label="Language">
                {LANGS.map(([code, name]) => (
                  <button key={code} type="button" aria-pressed={lang === code} onClick={() => switchLang(code)}>
                    {name}
                  </button>
                ))}
              </div>
              <h1 className="ch-hero__title">Cho'ntak</h1>
              <p className="ch-hero__tag">{ui.tagline}</p>
              <p className="ch-hero__lead">{c.desc}</p>
              <ul className="ch-chips">{ui.chips.map((x) => <li key={x}>{x}</li>)}</ul>
              <div className="ch-actions">
                <a className="ch-amber" href={APK} download>{ui.download} <span aria-hidden="true">→</span></a>
                <a className="ch-ghost" href={REPO} target="_blank" rel="noopener noreferrer">{ui.source}</a>
              </div>
            </div>

            <div className="ch-hero__show">
              <div className="ch-phone"><img src="/screenshots/chontak/home.jpg" alt={ui.screens[0]} width="1080" height="2400" /></div>
              <div className="ch-float ch-float--in" aria-hidden="true">
                <span className="ch-mini__icon is-in"><Arrow /></span>
                <span><small>{ui.app.income}</small><b className="is-in">so'm 8,897,000</b></span>
              </div>
              <div className="ch-float ch-float--budget" aria-hidden="true">
                <small>{ui.app.budget}</small>
                <span className="ch-bar"><i style={{ width: "32%" }} /></span>
                <b className="is-in">32%</b>
              </div>
            </div>
          </div>
        </section>

        <div className="ch-wrap">
          <Reveal className="ch-stats">
            {c.stats.map((s, i) => (
              <div key={s.l} className="ch-mini ch-stat stagger-item">
                <span className="ch-mini__icon" style={{ "--c": STAT_TONES[i] }} aria-hidden="true">{["◫", "▣", "◍", "✓"][i]}</span>
                <span><small>{s.l}</small><b style={{ color: STAT_TONES[i] }}><CountUp value={s.n} /></b></span>
              </div>
            ))}
          </Reveal>
        </div>

        <section className="ch-section">
          <div className="ch-wrap">
            <Reveal className="ch-head">
              <p className="ch-kicker">{ui.feat_kicker}</p>
              <h2>{c.feat_title} <span>{c.feat_title2}</span></h2>
              <p>{c.feat_sub}</p>
            </Reveal>
            <Reveal className="ch-grid">
              {c.features.map((f, i) => (
                <article key={f.title} className="ch-card stagger-item">
                  <span className="ch-tx__icon" style={{ "--c": PALETTE[i % PALETTE.length] }} aria-hidden="true">{f.icon}</span>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </article>
              ))}
            </Reveal>
          </div>
        </section>

        {/* The home screen, working */}
        <section className="ch-section ch-section--alt">
          <div className="ch-wrap ch-try">
            <Reveal className="ch-head ch-try__words">
              <p className="ch-kicker">{ui.try_kicker}</p>
              <h2>{ui.try_title}</h2>
              <p>{ui.try_sub}</p>
            </Reveal>
            <Reveal variant="scale-in"><TryIt ui={ui} /></Reveal>
          </div>
        </section>

        <section className="ch-section">
          <div className="ch-wrap">
            <Reveal className="ch-head">
              <p className="ch-kicker">{ui.shots_kicker}</p>
              <h2>{ui.shots_title}</h2>
            </Reveal>
            <Reveal className="ch-shots">
              {SHOTS.map((s, i) => (
                <figure key={s} className="ch-shot stagger-item">
                  <div className="ch-phone ch-phone--sm"><img src={`/screenshots/chontak/${s}.jpg`} alt={ui.screens[i]} loading="lazy" width="1080" height="2400" /></div>
                  <figcaption>{ui.screens[i]}</figcaption>
                </figure>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="ch-section ch-section--alt">
          <div className="ch-wrap ch-wrap--narrow">
            <Reveal className="ch-head">
              <p className="ch-kicker">{ui.build_kicker}</p>
              <h2>{c.build_title}</h2>
              <p>{c.build_sub}</p>
            </Reveal>
            <ol className="ch-txs ch-txs--build">
              {c.timeline.map((s, i) => (
                <Reveal key={s.date} variant="from-left" className="ch-tx ch-tx--build">
                  <span className="ch-tx__icon ch-tx__icon--tag" style={{ "--c": PALETTE[(i * 2) % PALETTE.length] }}>{s.date}</span>
                  <span className="ch-tx__body"><b>{s.title}</b><small>{s.desc}</small></span>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* The way in: the onboarding's last step */}
        <section className="ch-section">
          <Reveal variant="scale-in" className="ch-wrap">
            <div className="ch-end">
              <span className="ch-coin ch-coin--sm" aria-hidden="true"><Wallet size={34} /></span>
              <p className="ch-kicker">{ui.cta_kicker}</p>
              <h2>{c.cta_title} <span>{c.cta_title2}</span></h2>
              <p>{c.cta_sub}</p>
              <div className="ch-actions">
                <a className="ch-amber" href={APK} download>{ui.download} <span aria-hidden="true">→</span></a>
                <a className="ch-ghost" href={REPO} target="_blank" rel="noopener noreferrer">{ui.source}</a>
              </div>
              <span className="ch-dots" aria-hidden="true"><i /><i /><i /><i /><i /></span>
            </div>
          </Reveal>
        </section>

        <div className="ch-more"><MoreProjects current="chontak" /></div>
      </main>

      <footer className="ch-foot">
        <span>{ui.footer}</span>
        <Link to="/">{ui.footer_home}</Link>
      </footer>
    </div>
  );
}
