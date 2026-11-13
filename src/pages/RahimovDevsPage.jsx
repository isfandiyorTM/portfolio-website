import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import { Reveal, CountUp, MoreProjects } from "../components/ProjectPage";
import "../styles/rahimovdevs.css";

/*
 * RahimovDevs' page, drawn in rahimovdevs.tech's own look: a dark green-black
 * stage with the wall of the students' sites tilted behind it, the terminal
 * chip, "Rahimov" over a green "Devs", a typed role in Fira Code, glass
 * cards and green buttons. The words are in translations.js under
 * `rahimovdevs`; the projects shown are a few of the site's own.
 */

const SITE = "https://rahimovdevs.tech";

/* Values for rahimovdevs.stats, in the same order; a link makes the stat clickable */
const STATS = [
  { value: "500+" },
  { value: "151+", link: SITE },
  { value: "3" },
  { value: "100%" },
];

/* A few of the site's projects (its projects.json), with no student's name:
   the project, its grade and what it is. */
const PROJECTS = [
  { id: 1, name: "Zamon Ta'mlari", grade: 6, link: "https://restaran-uz-zamont-taomlar.netlify.app/",
    en: "Premium restaurant website with menu, table booking and modern design.", uz: "Premium restoran veb-sayti. Menyu, stol band qilish va zamonaviy dizayn.", ru: "Сайт премиум-ресторана. Меню, бронирование столов и современный дизайн." },
  { id: 14, name: "LogiUZ", grade: 9, link: "https://logiuz.netlify.app/",
    en: "Modern logistics: fast, reliable and smart.", uz: "Zamonaviy logistika: tez, ishonchli va aqlli.", ru: "Современная логистика: быстрая, надёжная и умная." },
  { id: 40, name: "GeoWorld", grade: 8, link: "https://geoworld123.netlify.app/",
    en: "Discover the countries of the world.", uz: "Dunyo davlatlarini kashf eting.", ru: "Откройте для себя страны мира." },
  { id: 54, name: "Typing Speed", grade: 6, link: "https://typingspeed-ab.netlify.app/",
    en: "Learn to type fast and be first in the rankings.", uz: "Tez yozishni o'rgan va reytingda birinchi bo'l.", ru: "Научитесь быстро печатать и займите первое место в рейтинге." },
  { id: 83, name: "Uz Stock Pro", grade: 6, link: "https://uz-stock-pro.netlify.app/",
    en: "Follow stocks in real time.", uz: "Aksiyalarni real vaqtda kuzating.", ru: "Отслеживайте акции в реальном времени." },
  { id: 118, name: "Calc World", grade: 7, link: "https://calcworld.netlify.app/",
    en: "Every calculator you need.", uz: "Sizga kerak bo'lgan har bir kalkulyator.", ru: "Все нужные вам калькуляторы." },
  { id: 30, name: "Garry Food", grade: 7, link: "https://garryfood.netlify.app/",
    en: "Truly delicious food: more than 50 dishes, fresh ingredients and fast delivery.", uz: "Haqiqiy mazali ovqat: 50 dan ortiq taom, yangi xomashyo va tez yetkazib berish.", ru: "По-настоящему вкусная еда: более 50 блюд, свежие продукты и быстрая доставка." },
  { id: 112, name: "Hidden Gems of Tashkent", grade: 7, link: "https://tashkenthiddenplaces.netlify.app/",
    en: "Underrated spots the guidebooks forgot, picked by locals.", uz: "Qo'llanmalar unutgan joylar, mahalliy aholi tanlovi.", ru: "Недооценённые места, о которых забыли путеводители, — выбор местных." },
  { id: 9, name: "MuzyMuz", grade: 6, link: "https://muzymuz.netlify.app/",
    en: "An ice-cream shop: flavours, prices and ordering.", uz: "Muzqaymoq do'koni: turlari, narxlari va buyurtma.", ru: "Магазин мороженого: вкусы, цены и заказ." },
];

/* The wall behind the first screen: five columns of the students' sites */
const WALL = [
  [1, 26, 14, 108, 40],
  [7, 133, 54, 12, 119],
  [30, 16, 140, 83, 13],
  [118, 28, 9, 131, 17],
  [112, 46, 26, 7, 14],
];

const STUDENTS = [
  { name: "Ahmadjon Ilhamov", init: "AI", projects: ["Finance Tracker", "Stock Simulator", "Task Manager", "Messenger"], url: "https://portfolio-ahmadjon-ilhamov.netlify.app/" },
  { name: "Muhammadaziz Mahmudjonov", init: "MM", projects: ["Portfolio Site", "Calculator App", "Quiz Game"], url: "https://muhammadaziz-programmer.netlify.app/" },
  { name: "Baxodirov Salohiddin", init: "BS", projects: ["Web Projects"], url: "https://baxodirov-salohiddin.netlify.app/" },
];

const calm = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* The site's typed line: a role is typed, held, deleted, and the next one typed */
function useTyped(words) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (calm()) { const id = setTimeout(() => setText(words[0]), 0); return () => clearTimeout(id); }
    let word = 0, at = 0, back = false, id = 0;
    const tick = () => {
      const w = words[word];
      if (!back) {
        at += 1;
        setText(w.slice(0, at));
        if (at === w.length) { back = true; id = setTimeout(tick, 1700); return; }
      } else {
        at -= 1;
        setText(w.slice(0, at));
        if (at === 0) { back = false; word = (word + 1) % words.length; }
      }
      id = setTimeout(tick, back ? 35 : 75);
    };
    id = setTimeout(tick, 600);
    return () => clearTimeout(id);
  }, [words]);
  return text;
}

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
);

export default function RahimovDevsPage() {
  const { t, lang } = useLang();
  const rd = t.rahimovdevs;
  const ui = rd.ui;
  const typed = useTyped(ui.roles);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="rd">
      {/* At the head of the page, like the portfolio's other navbars */}
      <header className="rd-top">
        <a className="rd-logo" href={SITE} target="_blank" rel="noopener noreferrer" aria-label="rahimovdevs.tech">
          <span className="rd-logo__mark" aria-hidden="true">&lt;/&gt;</span>
          <span>Rahimov<b>Devs</b></span>
        </a>
        <nav className="rd-top__nav" aria-label="RahimovDevs">
          <a href="#rd-projects">{ui.nav[0]}</a>
          <a href="#rd-students">{ui.nav[1]}</a>
          <a href="#rd-how">{ui.nav[2]}</a>
        </nav>
        <Link to="/" className="rd-glass-btn">← {ui.back}</Link>
      </header>

      <main>
        {/* The first screen, over the wall of the students' sites */}
        <section className="rd-hero">
          <div className="rd-wall" aria-hidden="true">
            {WALL.map((col, i) => (
              <div key={i} className="rd-wall__col" style={{ animationDuration: `${70 + i * 9}s`, animationDirection: i % 2 ? "reverse" : "normal" }}>
                {[...col, ...col].map((id, k) => <img key={k} src={`/rahimovdevs/snap/${id}.webp`} alt="" loading={k < 3 ? "eager" : "lazy"} width="640" height="400" />)}
              </div>
            ))}
          </div>
          <div className="rd-veil" aria-hidden="true" />

          <div className="rd-hero__in">
            <span className="rd-term" aria-hidden="true"><i /><i /><i /> rahimov-devs — bash</span>
            <p className="rd-prompt">$ student run <span>--grade 3-9</span></p>
            <h1 className="rd-title">Rahimov<br /><span>Devs</span></h1>
            <p className="rd-typed" aria-label={ui.roles[0]}><span aria-hidden="true">&gt; {typed}<i /></span></p>
            <p className="rd-lead">{rd.hero_desc}</p>
            <div className="rd-actions">
              <a className="rd-btn" href={SITE} target="_blank" rel="noopener noreferrer">{ui.visit} <Arrow /></a>
              <a className="rd-glass-btn rd-glass-btn--lg" href="#rd-projects">{ui.wall_kicker} ↓</a>
            </div>
            <dl className="rd-stats">
              {rd.stats.map((label, i) => {
                const { value, link } = STATS[i];
                const body = <><dt><CountUp value={value} /></dt><dd>{label}</dd></>;
                return link
                  ? <a key={label} className="rd-stat" href={link} target="_blank" rel="noopener noreferrer">{body}</a>
                  : <div key={label} className="rd-stat">{body}</div>;
              })}
            </dl>
          </div>
        </section>

        {/* A few of the projects on the wall */}
        <section className="rd-section" id="rd-projects">
          <div className="rd-wrap">
            <Reveal className="rd-head">
              <p className="rd-kicker">// {ui.wall_kicker}</p>
              <h2>{ui.wall_title}</h2>
              <p>{ui.wall_sub}</p>
            </Reveal>
            <Reveal className="rd-projects">
              {PROJECTS.map((p) => (
                <a key={p.id} className="rd-project stagger-item" href={p.link} target="_blank" rel="noopener noreferrer">
                  <span className="rd-project__shot"><img src={`/rahimovdevs/snap/${p.id}.webp`} alt="" loading="lazy" width="640" height="400" /></span>
                  <span className="rd-project__body">
                    <span className="rd-badge">{ui.grade.replace("{n}", p.grade)}</span>
                    <b>{p.name}</b>
                    <span className="rd-project__desc">{p[lang] || p.en}</span>
                    <span className="rd-project__go">{ui.open} ↗</span>
                  </span>
                </a>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Students with sites of their own */}
        <section className="rd-section rd-section--alt" id="rd-students">
          <div className="rd-wrap">
            <Reveal className="rd-head">
              <p className="rd-kicker">// {ui.roster_kicker}</p>
              <h2>{rd.roster_heading} <span>{rd.roster_accent}</span></h2>
              <p>{rd.roster_sub}</p>
            </Reveal>
            <div className="rd-students">
              {STUDENTS.map((s, i) => {
                const st = rd.students[i] ?? {};
                return (
                  <Reveal key={s.name} variant="scale-in" delay={i * 130}>
                    <a className="rd-card rd-student" href={s.url} target="_blank" rel="noopener noreferrer">
                      <span className="rd-avatar" aria-hidden="true">{s.init}</span>
                      <b>{s.name}</b>
                      <span className="rd-student__grade">{st.grade}</span>
                      <span className="rd-student__desc">{st.desc}</span>
                      <span className="rd-chips">{s.projects.map((p) => <span key={p}>{p}</span>)}</span>
                      <span className="rd-project__go">{rd.view_portfolio}</span>
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="rd-section" id="rd-how">
          <div className="rd-wrap">
            <Reveal className="rd-head">
              <p className="rd-kicker">// {ui.how_kicker}</p>
              <h2>{rd.how_heading} <span>{rd.how_accent}</span></h2>
              <p>{rd.how_sub}</p>
            </Reveal>
            <Reveal className="rd-how">
              {rd.how.map((item, i) => (
                <article key={item.title} className="rd-card stagger-item">
                  <span className="rd-how__n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="rd-how__icon" aria-hidden="true">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </article>
              ))}
            </Reveal>
          </div>
        </section>

        {/* The way in, in a terminal */}
        <section className="rd-section">
          <Reveal variant="scale-in" className="rd-wrap">
            <div className="rd-shell">
              <div className="rd-shell__bar" aria-hidden="true"><i /><i /><i /><span>rahimov-devs — bash</span></div>
              <div className="rd-shell__body">
                <p className="rd-shell__line"><span>$</span> open rahimovdevs.tech</p>
                <p className="rd-shell__line rd-shell__line--ok">✓ 151+ {rd.stats[1].toLowerCase()} · {ui.cta_kicker.toLowerCase()}</p>
                <h2>{rd.cta_heading} <span>{rd.cta_accent}</span></h2>
                <p className="rd-shell__sub">{rd.cta_sub}</p>
                <a className="rd-btn" href={SITE} target="_blank" rel="noopener noreferrer">rahimovdevs.tech <Arrow /></a>
              </div>
            </div>
          </Reveal>
        </section>

        <div className="rd-more"><MoreProjects current="rahimovdevs" /></div>
      </main>

      <footer className="rd-foot">
        <span>{ui.footer}</span>
        <Link to="/">{ui.footer_home}</Link>
      </footer>
    </div>
  );
}
