import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import { MoreProjects } from "../components/ProjectPage";
import { Compi, CompiMark, Icon, Logo } from "./compiland/art";
import { Count, Rich, Rise, Screen } from "./compiland/parts";
import { calm, useInView } from "./compiland/hooks";
import Stops from "./compiland/Road";
import "../styles/compiland.css";

/*
 * Compiland's page, drawn in Compiland's own look: the town's sky over the
 * first screen (by day or by night, and the real season falling through it),
 * the hills, Compi, a road with the town's car on it, and clips of the real
 * site. The words are in translations.js under `compiland`.
 */

const SITE = "https://compiland.uz";
const DEMO = "https://compiland.uz/demo";
const LOCALE = { en: "en-US", uz: "uz-Latn-UZ", ru: "ru-RU" };

const nightNow = () => { const h = new Date().getHours(); return h < 6 || h >= 19; };
const seasonNow = () => { const m = new Date().getMonth(); return m === 11 || m < 2 ? "winter" : m < 5 ? "spring" : m < 8 ? "summer" : "autumn"; };

/* "72 lessons", "72 урока", "72 dars" */
const plural = (lang, n, forms) => forms[new Intl.PluralRules(LOCALE[lang]).select(n)] ?? forms.other;

const STATS = [
  { n: 279, icon: "users", tone: "#16a34a" },
  { n: 37806, icon: "check", tone: "#3b82f6" },
  { n: 660, icon: "clock", tone: "#f59e0b" },
  { n: 94, suffix: "%", icon: "repeat", tone: "#8b5cf6" },
  { n: 32, suffix: "%", icon: "calendar", tone: "#ec4899" },
];

const STOPS = [
  { clip: "town", url: "compiland.uz/learn", href: `${SITE}/learn` },
  { clip: "lesson", url: "compiland.uz/learn/office/off-3-1", href: `${SITE}/learn/office/off-3-1` },
  { clip: "me", url: "compiland.uz/me", href: DEMO },
  { clip: "class", url: "compiland.uz/me", href: DEMO },
  { clip: "race", url: "compiland.uz/me", href: DEMO },
  { clip: "teacher", url: "compiland.uz/admin" },
];

/* each course's three buildings, in the town's colours, and the signs on them */
const COURSES = [
  { n: 72, tones: ["#60a5fa", "#3b82f6", "#a78bfa"], chips: [null, "PC", null] },
  { n: 61, tones: ["#38bdf8", "#f97316", "#c084fc"], chips: [null, "Ctrl", null] },
  { n: 39, tones: ["#38bdf8", "#6366f1", "#22c55e"], chips: [null, "www", null] },
  { n: 88, pro: 15, tones: ["#2563eb", "#16a34a", "#ea580c"], chips: ["W", "X", "P"] },
  { n: 61, tones: ["#a78bfa", "#0ea5e9", "#22c55e"], chips: [null, "AI", null] },
  { n: 83, tones: ["#ef4444", "#3b82f6", "#eab308"], chips: ["#", "</>", "{ }"] },
];

const CLASSROOM = [
  { icon: "offline", tone: "#0ea5e9" },
  { icon: "monitor", tone: "#8b5cf6" },
  { icon: "route", tone: "#f59e0b" },
  { icon: "globe", tone: "#16a34a" },
  { icon: "lock", tone: "#ec4899" },
  { icon: "trophy", tone: "#eab308" },
];

const ARCH = [
  { icon: "browser", tone: "#3b82f6" },
  { icon: "layers", tone: "#14b8a6" },
  { icon: "bolt", tone: "#f97316" },
  { icon: "database", tone: "#8b5cf6" },
];
const TECH_TONES = ["#16a34a", "#ef4444", "#f59e0b", "#3b82f6"];
const STACK = ["React 19", "React Router 7", "Vite 8", "i18next", "Cloudflare Workers", "Cloudflare D1", "Netlify", "Service worker", "Hand-written CSS"];

/* ── the sky, the season and the land ─────────────────────────────────────── */

/* [left %, top %, size px, delay s] — the night's stars */
const STARS = [
  [6, 14, 2, 0], [13, 38, 1.5, 1.2], [21, 9, 2.5, 2.1], [28, 26, 1.5, 0.6], [36, 12, 2, 3],
  [44, 33, 1.5, 1.7], [51, 7, 2, 0.3], [58, 22, 2.5, 2.6], [64, 40, 1.5, 1.1], [71, 15, 2, 3.4],
  [77, 31, 1.5, 0.9], [83, 8, 2.5, 2.2], [89, 24, 1.5, 1.5], [94, 42, 2, 0.4], [40, 46, 1.5, 2.9], [17, 50, 2, 1.9],
];
/* [top %, size, seconds to cross, how far across at the start] */
const CLOUDS = [[11, 1, 110, 0.35], [26, 0.7, 150, 0.75], [5, 0.55, 190, 0.1]];
const Cloud = () => (
  <svg viewBox="0 0 200 80"><path d="M36 74h132a28 28 0 0 0 2-56 40 40 0 0 0-74-6 30 30 0 0 0-50 22 26 26 0 0 0-10 40z" /></svg>
);

function Sky({ season }) {
  return (
    <div className="cl-sky" aria-hidden="true">
      <i className="cl-sun" />
      {CLOUDS.map(([top, size, s, at], i) => (
        <span key={i} className="cl-cloud" style={{ top: `${top}%`, "--size": size, animationDuration: `${s}s`, animationDelay: `${-s * at}s` }}><Cloud /></span>
      ))}
      {STARS.map(([left, top, size, wait], i) => (
        <b key={i} className="cl-star" style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, animationDelay: `${wait}s` }} />
      ))}
      <em className="cl-shoot" />
      <div className={`cl-fall cl-fall--${season}`}>
        {Array.from({ length: 12 }, (_, i) => (
          <i key={i} style={{
            left: `${(i * 8.4 + (i % 3) * 2.5) % 100}%`,
            "--dx": `${(i % 2 ? 1 : -1) * (30 + (i % 4) * 18)}px`,
            "--spin": `${(i % 2 ? 1 : -1) * (200 + i * 25)}deg`,
            animationDuration: `${10 + (i % 4) * 2.5}s`,
            animationDelay: `${-i * 1.35}s`,
          }} />
        ))}
      </div>
    </div>
  );
}

/* [x, y, width] of the town's buildings behind the hills, and their windows at night */
const TOWN = [[110, 96, 34], [150, 58, 28], [184, 104, 40], [230, 26, 24], [260, 74, 36], [302, 112, 30], [338, 62, 26], [370, 92, 42], [418, 120, 28]];
const LIGHTS = [[157, 72], [166, 96], [236, 44], [236, 70], [268, 90], [282, 112], [345, 80], [380, 108], [192, 120]];

function Land() {
  return (
    <div className="cl-land" aria-hidden="true">
      <svg viewBox="0 0 1440 260" preserveAspectRatio="xMinYMax meet">
        <g className="cl-town__shape">
          {TOWN.map(([x, y, w]) => <rect key={x} x={x} y={y} width={w} height={260 - y} rx="3" />)}
          <path d="M242 26V6" strokeWidth="3" />
        </g>
        <g className="cl-town__lights">
          {LIGHTS.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="5" height="6" />)}
        </g>
      </svg>
      <svg viewBox="0 0 1440 260" preserveAspectRatio="none"><path className="cl-hill--far" d="M0 118Q240 40 520 96T1040 74T1440 92V260H0Z" /></svg>
      <svg viewBox="0 0 1440 260" preserveAspectRatio="none"><path className="cl-hill--near" d="M0 186Q360 128 760 176T1440 158V260H0Z" /></svg>
    </div>
  );
}

/* ── the top row ──────────────────────────────────────────────────────────── */

/* At the head of the page, over the sky, like the portfolio's other navbars: it scrolls away with the hero */
function Top({ c, night, onSky }) {
  return (
    <header className="cl-top">
      <Link to="/" className="cl-top__back"><span aria-hidden="true">←</span><span className="cl-top__back-t">{c.back}</span></Link>
      <div className="cl-top__end">
        <button type="button" className="cl-top__sky" onClick={onSky} aria-label={night ? c.to_day : c.to_night} title={night ? c.to_day : c.to_night}>
          <Icon name={night ? "sun" : "moon"} size={19} />
        </button>
        <a className="cl-btn cl-btn--small cl-top__open" href={SITE} target="_blank" rel="noopener noreferrer">{c.open} <span aria-hidden="true">↗</span></a>
      </div>
    </header>
  );
}

/* ── results ──────────────────────────────────────────────────────────────── */

/* [x, y, turn, colour] for each piece of confetti */
const PIECES = Array.from({ length: 22 }, (_, i) => {
  const a = (-160 + (i * 140) / 21) * (Math.PI / 180);
  const reach = 70 + (i % 5) * 22;
  return [Math.cos(a) * reach, Math.sin(a) * reach, (i % 2 ? 1 : -1) * (180 + i * 30), ["#34d399", "#fbbf24", "#60a5fa", "#f472b6", "#a78bfa"][i % 5]];
});

function Confetti() {
  return (
    <span className="cl-confetti" aria-hidden="true">
      {PIECES.map(([x, y, r, bg], i) => (
        <i key={i} style={{ "--x": `${x.toFixed(0)}px`, "--y": `${y.toFixed(0)}px`, "--r": `${r}deg`, background: bg, animationDelay: `${(i % 4) * 25}ms` }} />
      ))}
    </span>
  );
}

function Results({ c, locale }) {
  const [party, setParty] = useState(false);
  return (
    <section className="cl-results" aria-labelledby="cl-results-h">
      <div className="cl-wrap">
        <Rise className="cl-head">
          <p className="cl-kicker">{c.res_kicker}</p>
          <h2 id="cl-results-h">{c.res_title}</h2>
          <p>{c.res_sub}</p>
        </Rise>
        <ul className="cl-stats">
          {STATS.map((s, i) => (
            <Rise as="li" key={s.icon} className="cl-stat" delay={i * 70}>
              <span className="cl-stat__ico" style={{ "--tone": s.tone }}><Icon name={s.icon} /></span>
              <b className="cl-stat__n">
                <Count to={s.n} suffix={s.suffix} locale={locale} onDone={i === 0 ? () => setParty(true) : undefined} />
              </b>
              <span className="cl-stat__l">{c.stats[i].l}</span>
              <span className="cl-stat__s">{c.stats[i].s}</span>
              {i === 0 && party && !calm() && <Confetti />}
            </Rise>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── the gap in the week ──────────────────────────────────────────────────── */

const LESSON_DAYS = [1, 3];
const FILL_ORDER = [0, 2, 4, 5, 6];

function Week({ c }) {
  const box = useRef(null);
  const seen = useInView(box, { margin: "0px 0px -25% 0px" });
  const [filled, setFilled] = useState(0);

  // the empty days fill with Compi one by one, then the line under them lights up
  useEffect(() => {
    if (!seen) return;
    const still = calm();
    let n = 0;
    const tick = setInterval(() => {
      n = still ? FILL_ORDER.length + 1 : n + 1;
      setFilled(n);
      if (n > FILL_ORDER.length) clearInterval(tick);
    }, still ? 1 : 300);
    return () => clearInterval(tick);
  }, [seen]);

  return (
    <div ref={box} className="cl-week">
      <ul>
        {c.days.map((day, i) => {
          const lesson = LESSON_DAYS.includes(i);
          const at = FILL_ORDER.indexOf(i);
          const compi = !lesson && at >= 0 && at < filled;
          return (
            <li key={day} className={lesson ? "is-lesson" : compi ? "is-compi" : "is-empty"}>
              <b>{day}</b>
              {lesson ? <span>{c.lesson_min}</span> : compi ? <CompiMark /> : <span>—</span>}
            </li>
          );
        })}
      </ul>
      <p className="cl-week__key">
        <span><i />{c.key_lesson}</span>
        <span><i className="is-compi" />{c.key_compi}</span>
      </p>
      <p className={`cl-week__turn${filled > FILL_ORDER.length ? " is-on" : ""}`}>{c.gap_turn}</p>
    </div>
  );
}

/* ── the page ─────────────────────────────────────────────────────────────── */

/* [left %, size px, seconds, wait s] — fireflies over the last green */
const FLIES = [[8, 5, 9, 0], [17, 4, 11, 3.5], [29, 6, 10, 1.2], [41, 4, 12, 6], [55, 5, 9.5, 2.4], [66, 4, 11.5, 4.8], [78, 6, 10.5, 0.8], [90, 4, 12.5, 5.5], [35, 3, 13, 7.2], [72, 3, 9, 8.4]];

export default function CompilandPage() {
  const { t, lang } = useLang();
  const c = t.compiland;
  const locale = LOCALE[lang] || LOCALE.en;
  const [night, setNight] = useState(nightNow);
  const [season] = useState(seasonNow);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="cl" data-sky={night ? "night" : "day"}>
      <Top c={c} night={night} onSky={() => setNight((n) => !n)} />

      <main>
        {/* The first screen: the town's sky, the words, the town itself, Compi */}
        <section className="cl-hero" id="top">
          <Sky season={season} />
          <div className="cl-wrap cl-hero__in">
            <div className="cl-hero__text">
              <p className="cl-eyebrow"><i className="cl-live" aria-hidden="true" />{c.eyebrow}</p>
              <h1 className="cl-hero__logo"><span className="cl-sr">Compiland</span><Logo /></h1>
              <p className="cl-hero__tag">{c.tag_a} <em>{c.tag_b}</em></p>
              <p className="cl-hero__lead">{c.lead}</p>
              <div className="cl-actions">
                <a className="cl-btn" href={SITE} target="_blank" rel="noopener noreferrer">{c.visit} <span aria-hidden="true">→</span></a>
                <a className="cl-btn cl-btn--ghost" href={DEMO} target="_blank" rel="noopener noreferrer">{c.demo}</a>
              </div>
              <ul className="cl-chips">{c.chips.map((chip) => <li key={chip}>{chip}</li>)}</ul>
            </div>
            <div className="cl-hero__show">
              <Screen clip="town" url="compiland.uz/learn" night={night} href={`${SITE}/learn`} label={`${c.stops[0].t} — ${c.peek}`} eager />
              <Compi className="cl-hero__compi" say={c.compi_hi} />
            </div>
          </div>
          <Land />
        </section>

        <Results c={c} locale={locale} />

        {/* The problem: a week with one or two lessons in it */}
        <section className="cl-gap" aria-labelledby="cl-gap-h">
          <div className="cl-wrap cl-gap__in">
            <Rise className="cl-gap__words">
              <p className="cl-kicker">{c.gap_kicker}</p>
              <h2 id="cl-gap-h">{c.gap_title}</h2>
              <p>{c.gap_text}</p>
              <p className="cl-gap__note">{c.gap_note}</p>
            </Rise>
            <Rise delay={120}><Week c={c} /></Rise>
          </div>
        </section>

        {/* How it works: the road, its six stops and the car */}
        <section className="cl-how" aria-labelledby="cl-how-h">
          <div className="cl-wrap">
            <Rise className="cl-head">
              <p className="cl-kicker">{c.how_kicker}</p>
              <h2 id="cl-how-h">{c.how_title}</h2>
              <p>{c.how_sub}</p>
            </Rise>
            <Stops stops={STOPS} words={c.stops} night={night} peek={c.peek} />
          </div>
        </section>

        {/* Courses: each a campus of three buildings that go up as it comes into sight */}
        <section className="cl-courses" aria-labelledby="cl-courses-h">
          <div className="cl-wrap">
            <Rise className="cl-head">
              <p className="cl-kicker">{c.courses_kicker}</p>
              <h2 id="cl-courses-h">{c.courses_title}</h2>
              <p>{c.courses_sub}</p>
            </Rise>
            <ol className="cl-course-grid">
              {COURSES.map((course, i) => {
                const words = c.courses[i];
                return (
                  <Rise as="li" key={words.name} className="cl-course" delay={(i % 3) * 90}>
                    <div className="cl-bld" aria-hidden="true">
                      {course.tones.map((tone, b) => (
                        <span key={b} className="cl-bld__b" style={{ "--c": tone }}>
                          {course.chips[b] && <b className="cl-bld__chip">{course.chips[b]}</b>}
                        </span>
                      ))}
                    </div>
                    <h3>{words.name}</h3>
                    <p className="cl-course__meta">
                      <span>{new Intl.NumberFormat(locale).format(course.n)} {plural(lang, course.n, c.lessons_word)}{course.pro && <> <em>+{course.pro} Pro</em></>}</span>
                      <span>{words.time}</span>
                    </p>
                    <p><Rich text={words.d} /></p>
                  </Rise>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Built for real classrooms */}
        <section className="cl-class" aria-labelledby="cl-class-h">
          <div className="cl-wrap">
            <Rise className="cl-head">
              <p className="cl-kicker">{c.class_kicker}</p>
              <h2 id="cl-class-h">{c.class_title}</h2>
            </Rise>
            <ul className="cl-class-grid">
              {CLASSROOM.map((f, i) => (
                <Rise as="li" key={f.icon} className="cl-feat" delay={(i % 3) * 90}>
                  <span className="cl-feat__ico" style={{ "--tone": f.tone }}><Icon name={f.icon} size={24} /></span>
                  <h3>{c.class_items[i].t}</h3>
                  <p>{c.class_items[i].d}</p>
                </Rise>
              ))}
            </ul>
          </div>
        </section>

        {/* Under the hood: how a request travels, and what it was built to survive */}
        <section className="cl-tech" aria-labelledby="cl-tech-h">
          <div className="cl-wrap">
            <Rise className="cl-head">
              <p className="cl-kicker">{c.tech_kicker}</p>
              <h2 id="cl-tech-h">{c.tech_title}</h2>
              <p>{c.tech_sub}</p>
            </Rise>
            <ol className="cl-arch">
              {ARCH.map((node, i) => (
                <Rise as="li" key={node.icon} delay={i * 110}>
                  <span className="cl-arch__ico" style={{ "--tone": node.tone }}><Icon name={node.icon} size={26} /></span>
                  <h3>{c.arch[i].t}</h3>
                  <p>{c.arch[i].d}</p>
                </Rise>
              ))}
            </ol>
            <p className="cl-arch__note"><Icon name="detour" size={18} />{c.arch_note}</p>
            <div className="cl-tech-grid">
              {c.tech_cards.map((card, i) => (
                <Rise key={card.t} className="cl-tech-card" delay={(i % 2) * 90} style={{ "--tone": TECH_TONES[i] }}>
                  <h3><i aria-hidden="true" />{card.t}</h3>
                  <p>{card.d}</p>
                </Rise>
              ))}
            </div>
            <ul className="cl-pills" aria-label={c.stack_label}>{STACK.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        </section>

        {/* The road so far */}
        <section className="cl-trip" aria-labelledby="cl-trip-h">
          <div className="cl-wrap">
            <Rise className="cl-head">
              <p className="cl-kicker">{c.road_kicker}</p>
              <h2 id="cl-trip-h">{c.road_title}</h2>
            </Rise>
            <ol className="cl-trip__list">
              {c.road.map((step, i) => (
                <Rise as="li" key={step.t} className={`cl-trip__item${i === c.road.length - 1 ? " cl-trip__item--next" : ""}`} delay={i * 100}>
                  <span className="cl-trip__flag" aria-hidden="true" />
                  <p className="cl-trip__when">{step.when}</p>
                  <h3>{step.t}</h3>
                  <p>{step.d}</p>
                </Rise>
              ))}
            </ol>
          </div>
        </section>

        {/* The way in: the green, Compi waving, fireflies */}
        <section className="cl-end" aria-labelledby="cl-end-h">
          <div className="cl-end__hills" aria-hidden="true">
            <svg viewBox="0 0 1440 170" preserveAspectRatio="none">
              <path className="cl-hill--far" d="M0 120Q240 50 520 100T1040 80T1440 96V170H0Z" />
              <path className="cl-hill--near" d="M0 150Q360 104 760 140T1440 128V170H0Z" />
            </svg>
          </div>
          <div className="cl-end__fly" aria-hidden="true">
            {FLIES.map(([left, size, s, wait], i) => (
              <i key={i} style={{ left: `${left}%`, width: size, height: size, animationDuration: `${s}s`, animationDelay: `${-wait}s` }} />
            ))}
            <span className="cl-plane">
              <svg viewBox="0 0 48 40"><path d="M2 18 46 2 34 38 22 26Z" fill="#fff" /><path d="M46 2 22 26l-2 12 6-8" fill="#dcfce7" /><path d="M46 2 22 26" stroke="#bbf7d0" strokeWidth="1.5" /></svg>
            </span>
          </div>
          <Compi className="cl-end__compi" />
          <Rise className="cl-wrap">
            <h2 id="cl-end-h">{c.end_title}</h2>
            <p>{c.end_text}</p>
            <div className="cl-actions">
              <a className="cl-btn cl-btn--light" href={DEMO} target="_blank" rel="noopener noreferrer">{c.end_demo} <span aria-hidden="true">→</span></a>
              <a className="cl-btn cl-btn--line" href={SITE} target="_blank" rel="noopener noreferrer">{c.end_visit}</a>
            </div>
          </Rise>
        </section>

        <div className="cl-more"><MoreProjects current="compiland" /></div>
      </main>

      <footer className="cl-foot">
        <span>{c.footer}</span>
        <Link to="/">{c.footer_home}</Link>
      </footer>
    </div>
  );
}
