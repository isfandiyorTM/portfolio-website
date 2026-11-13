import { useEffect, useId, useRef } from "react";
import { WORDMARK, WORDMARK_DOT } from "./wordmark";

/* Drawings for the Compiland page, after Compiland's own: its logo, Compi,
   the town's car and the small icons. Only drawing here; the page decides
   where they go and what moves. */

const calm = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Compi's square with the sun and the hills (Compiland's brand/compiland-icon.svg). */
function IconMark({ x = 0, y = 0, size = 130 }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg x={x} y={y} width={size} height={size} viewBox="2 2 60 60">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7dd3fc" /><stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
        <clipPath id={`c${id}`}><rect x="2" y="2" width="60" height="60" rx="17" /></clipPath>
      </defs>
      <g clipPath={`url(#c${id})`}>
        <rect x="2" y="2" width="60" height="60" fill="#fde68a" />
        <circle cx="53" cy="12" r="4.6" fill="#fbbf24" />
        <g transform="translate(-4.8 -3.2) scale(1.15)">
          <rect x="14" y="8" width="36" height="33" rx="10.5" fill="#1e3a8a" />
          <rect x="18.5" y="12.5" width="27" height="24.5" rx="7" fill={`url(#g${id})`} />
          <path d="M22.5 16.4h6.5" stroke="#e0f2fe" strokeWidth="2.2" strokeLinecap="round" opacity=".75" />
          <path d="M23.4 23.6q3.6-4.8 7.2 0M33.4 23.6q3.6-4.8 7.2 0" fill="none" stroke="#0f172a" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="22.2" cy="29" r="2.3" fill="#f9a8d4" opacity=".9" />
          <circle cx="41.8" cy="29" r="2.3" fill="#f9a8d4" opacity=".9" />
          <path d="M26.5 27.4h11q-.6 6.6-5.5 6.6t-5.5-6.6Z" fill="#0f172a" />
          <path d="M29.4 32.3q2.6-2 5.2 0q-1 1.6-2.6 1.6t-2.6-1.6Z" fill="#f472b6" />
        </g>
        <path d="M2 45Q18 36 32 41.5T62 38V62H2Z" fill="#22c55e" />
        <path d="M2 53Q22 45 40 51T62 49V62H2Z" fill="#16a34a" />
      </g>
    </svg>
  );
}

/** The whole logo: the square, then "compiland" with the dot of its i. */
export function Logo({ className = "" }) {
  return (
    <svg className={`cl-logo ${className}`} viewBox="-2 -100.05 629.1 134" aria-hidden="true" focusable="false">
      <IconMark x={0} y={-98.05} />
      <g transform="translate(163.9 0)">
        {WORDMARK.map((p, i) => <path key={i} d={p.d} className={p.part === "compi" ? "cl-logo__compi" : "cl-logo__land"} />)}
        <g className="cl-logo__dot">
          <circle cx={WORDMARK_DOT.cx} cy={WORDMARK_DOT.cy} r="17" className="cl-logo__compi" />
          <circle cx={WORDMARK_DOT.cx} cy={WORDMARK_DOT.cy} r="12.5" fill="#fbbf24" />
        </g>
      </g>
    </svg>
  );
}

/**
 * Compi, the guide: a little computer with a face (Compiland's Kompi.jsx).
 * The eyes follow the pointer or a finger; hovering makes Compi laugh and wave.
 */
export function Compi({ className = "", say }) {
  const box = useRef(null);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    const el = box.current;
    if (!el || calm()) return;
    let frame = 0, px = 0, py = 0;
    const look = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const dx = px - (r.left + r.width / 2);
      const dy = py - (r.top + r.height * 0.38);
      const far = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, far / 240) * 3;
      el.style.setProperty("--ex", ((dx / far) * reach).toFixed(2));
      el.style.setProperty("--ey", ((dy / far) * reach).toFixed(2));
    };
    const move = (e) => { px = e.clientX; py = e.clientY; if (!frame) frame = requestAnimationFrame(look); };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("pointermove", move); };
  }, []);

  return (
    <span ref={box} className={`cl-compi ${className}`} aria-hidden="true">
      {say && <span className="cl-compi__say">{say}</span>}
      <svg viewBox="0 0 120 130">
        <defs>
          <linearGradient id={`k${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7dd3fc" /><stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <g className="cl-compi__body">
          <g className="cl-compi__arm">
            <path d="M100 62 q14 -6 14 -22" fill="none" stroke="#1e3a8a" strokeWidth="6" strokeLinecap="round" />
            <circle cx="114" cy="38" r="7" fill="#fbbf24" stroke="#1e3a8a" strokeWidth="3" />
          </g>
          <path d="M20 66 q-12 8 -10 22" fill="none" stroke="#1e3a8a" strokeWidth="6" strokeLinecap="round" />
          <circle cx="10" cy="90" r="7" fill="#fbbf24" stroke="#1e3a8a" strokeWidth="3" />
          <rect x="50" y="96" width="20" height="14" rx="3" fill="#94a3b8" />
          <rect x="32" y="108" width="56" height="10" rx="5" fill="#64748b" />
          <rect x="14" y="10" width="92" height="88" rx="18" fill="#1e3a8a" />
          <rect x="21" y="17" width="78" height="72" rx="13" fill={`url(#k${id})`} />
          <path d="M28 24 h22" stroke="#e0f2fe" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
          <g className="cl-compi__open">
            <ellipse cx="45" cy="50" rx="9" ry="11" fill="#fff" />
            <ellipse cx="75" cy="50" rx="9" ry="11" fill="#fff" />
            <circle className="cl-compi__pupil" cx="45" cy="51" r="4.8" fill="#0f172a" />
            <circle className="cl-compi__pupil" cx="75" cy="51" r="4.8" fill="#0f172a" />
          </g>
          <path className="cl-compi__glad" d="M36 52 q9 -12 18 0M66 52 q9 -12 18 0" fill="none" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="33" cy="66" r="5" fill="#f9a8d4" opacity="0.8" />
          <circle cx="87" cy="66" r="5" fill="#f9a8d4" opacity="0.8" />
          <path className="cl-compi__smile" d="M50 70 q10 9 20 0" fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
          <g className="cl-compi__grin">
            <path d="M46 67 q14 18 28 0 z" fill="#0f172a" />
            <path d="M54 75 q6 -3 12 0 q-2 3 -6 3 t-6 -3z" fill="#f472b6" />
          </g>
        </g>
      </svg>
    </span>
  );
}

/** Compi's face, small: a day of the week Compiland fills. */
export function CompiMark() {
  return (
    <svg className="cl-week__mark" viewBox="0 0 40 38" aria-hidden="true">
      <rect x="2" y="2" width="36" height="30" rx="9" fill="#1e3a8a" />
      <rect x="5.5" y="5.5" width="29" height="23" rx="6.5" fill="#60a5fa" />
      <path d="M11.5 16.5q3.5-4.5 7 0M21.5 16.5q3.5-4.5 7 0" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
      <path d="M15.5 21.5q4.5 4 9 0" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
      <rect x="15" y="32" width="10" height="4" rx="1.5" fill="#94a3b8" />
    </svg>
  );
}

/**
 * The town's white car with Compiland's green stripe, seen from above and
 * drawn nose up. The viewBox is centred on the car, so whoever moves it can
 * turn it about its middle; the headlight beams reach out past the body.
 */
export function Car() {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="-30 -60 104 198" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`b${id}`} cx="0.5" cy="1" r="1">
          <stop offset="0" stopColor="#fff8dc" stopOpacity="0.8" />
          <stop offset="0.45" stopColor="#ffeeb0" stopOpacity="0.28" />
          <stop offset="1" stopColor="#ffe066" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`p${id}`} x1="0" y1="0" x2="1" y2="0.2">
          <stop offset="0" stopColor="#ffffff" /><stop offset="0.46" stopColor="#eef1f4" /><stop offset="1" stopColor="#bcc4cd" />
        </linearGradient>
        <linearGradient id={`w${id}`} x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#8fa6bf" /><stop offset="1" stopColor="#1d2735" />
        </linearGradient>
        <radialGradient id={`r${id}`}>
          <stop offset="0" stopColor="#ff2d2d" stopOpacity="0.85" /><stop offset="1" stopColor="#ff2d2d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path className="cl-car__beam" d="M6 2 L-14 -56 L22 -56 Z M38 2 L22 -56 L58 -56 Z" fill={`url(#b${id})`} />
      <rect x="3" y="4" width="42" height="77" rx="13" fill="rgba(0,0,0,0.28)" />
      <rect x="-0.5" y="13" width="5" height="13" rx="2" fill="#1f2937" />
      <rect x="39.5" y="13" width="5" height="13" rx="2" fill="#1f2937" />
      <rect x="-0.5" y="52" width="5" height="13" rx="2" fill="#1f2937" />
      <rect x="39.5" y="52" width="5" height="13" rx="2" fill="#1f2937" />
      <rect x="2" y="0" width="40" height="78" rx="13" fill={`url(#p${id})`} stroke="#98a2ae" strokeWidth="0.8" />
      <path d="M7 22 Q22 15 37 22 L35 33 Q22 29 9 33 Z" fill={`url(#w${id})`} />
      <rect x="9" y="33" width="26" height="22" rx="4" fill="#f8fafc" />
      <path d="M9 56 Q22 59 35 56 L36 64 Q22 68 8 64 Z" fill={`url(#w${id})`} />
      <rect x="18.5" y="0.6" width="7" height="77" fill="#16a34a" opacity="0.92" />
      <rect x="5" y="1.6" width="9" height="3.4" rx="1.7" fill="#fff7cc" />
      <rect x="30" y="1.6" width="9" height="3.4" rx="1.7" fill="#fff7cc" />
      <circle className="cl-car__glow" cx="10" cy="77" r="9" fill={`url(#r${id})`} />
      <circle className="cl-car__glow" cx="34" cy="77" r="9" fill={`url(#r${id})`} />
      <rect className="cl-car__brake" x="5" y="73.6" width="9" height="2.8" rx="1.4" />
      <rect className="cl-car__brake" x="30" y="73.6" width="9" height="2.8" rx="1.4" />
    </svg>
  );
}

/* Small line icons, 24×24, drawn in the current colour */
const ICONS = {
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.6-3.6 3.3-5.6 6.5-5.6s5.9 2 6.5 5.6" /><path d="M16 4.6a3.4 3.4 0 0 1 0 6.6M18.5 14.6c1.8.7 3 2.6 3.3 5.4" /></>,
  check: <><circle cx="12" cy="12" r="9" /><path d="m8 12.5 2.7 2.7L16.2 9.6" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5.2l3.4 2" /></>,
  repeat: <><path d="M4 11V9a3 3 0 0 1 3-3h12m-3-3 3 3-3 3" /><path d="M20 13v2a3 3 0 0 1-3 3H5m3 3-3-3 3-3" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15.5" rx="3" /><path d="M3.5 10h17M8 3v4M16 3v4" /><path d="M8 14.5h2M14 14.5h2" /></>,
  offline: <><path d="M3 3l18 18" /><path d="M8.5 16.5a5 5 0 0 1 7 0M5 13a10 10 0 0 1 5-2.7M14.3 10.4A10 10 0 0 1 19 13M2 9.5a15 15 0 0 1 4.3-2.8M10.5 5.6A15 15 0 0 1 22 9.5" /><circle cx="12" cy="20" r="0.9" fill="currentColor" /></>,
  monitor: <><rect x="3" y="4" width="18" height="12" rx="2.5" /><path d="M8.5 20h7M12 16v4" /><circle cx="12" cy="10" r="2.2" /></>,
  route: <><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="6" r="2.5" /><path d="M8.5 18H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.5" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9c-2.6-2.6-3.8-5.6-3.8-9S9.4 5.6 12 3Z" /></>,
  lock: <><rect x="4.5" y="10.5" width="15" height="10" rx="2.5" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /><circle cx="12" cy="15.5" r="1.4" fill="currentColor" /></>,
  trophy: <><path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" /><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20.5h7M10 17h4" /></>,
  browser: <><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18" /><circle cx="6.5" cy="6.5" r="0.6" fill="currentColor" /><circle cx="9" cy="6.5" r="0.6" fill="currentColor" /><path d="m9.5 13-2 2 2 2M14.5 13l2 2-2 2" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12.5 9 5 9-5M3 16.5l9 5 9-5" /></>,
  bolt: <><path d="M13 2.5 4.5 13.5H12l-1 8 8.5-11H12l1-8Z" /></>,
  database: <><ellipse cx="12" cy="5.5" rx="7.5" ry="3" /><path d="M4.5 5.5v13c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-13M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" /></>,
  detour: <><path d="M4 20V10a4 4 0 0 1 4-4h9" /><path d="m14 3 3 3-3 3" /><path d="M4 14h6" strokeDasharray="2 2.5" /></>,
  sun: <><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />,
};

export function Icon({ name, size = 22 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {ICONS[name]}
    </svg>
  );
}
