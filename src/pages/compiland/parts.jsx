import { Fragment, useEffect, useRef, useState } from "react";
import { Icon } from "./art";
import { calm, useInView } from "./hooks";

/* Building blocks of the Compiland page */

/** A block that comes up when it comes into sight; `delay` (ms) puts it after the ones before it. */
export function Rise({ as = "div", className = "", delay = 0, style, children, ...rest }) {
  const Tag = as;
  const ref = useRef(null);
  const seen = useInView(ref);
  return (
    <Tag ref={ref} className={`cl-rise${seen ? " is-in" : ""}${className ? ` ${className}` : ""}`} style={{ ...style, "--wait": `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

/** Text where `backticks` mark code: =SUM(B2:B4), Ctrl+C. */
export function Rich({ text }) {
  return text.split(/(`[^`]+`)/).map((part, i) =>
    part.startsWith("`") && part.endsWith("`")
      ? <code key={i}>{part.slice(1, -1)}</code>
      : <Fragment key={i}>{part}</Fragment>
  );
}

/** A number that counts up once it is seen, written the way the page's language writes numbers. */
export function Count({ to, suffix = "", locale, onDone }) {
  const ref = useRef(null);
  const seen = useInView(ref, { margin: "0px 0px -8% 0px" });
  const [n, setN] = useState(0);
  const done = useRef(onDone);
  useEffect(() => { done.current = onDone; });

  useEffect(() => {
    if (!seen) return;
    const still = calm();
    let frame = 0, start = 0;
    const step = (t) => {
      if (!start) start = t;
      const p = still ? 1 : Math.min(1, (t - start) / 1500);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(step);
      else done.current?.();
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [seen, to]);

  return <span ref={ref}>{new Intl.NumberFormat(locale).format(n)}{suffix}</span>;
}

/* the clips that have a night version, filmed in the site's dark theme */
const HAS_NIGHT = new Set(["town", "lesson", "me", "class", "race"]);

/**
 * A few silent seconds of the real site in a browser window: the clip plays
 * while it is in sight and stops when it leaves; by night, the night version.
 * With `href` the window opens what it shows on compiland.uz.
 */
export function Screen({ clip, url, night, href, label, eager = false }) {
  const box = useRef(null);
  const video = useRef(null);
  const near = useInView(box, { margin: "80px 0px", once: false, threshold: 0.2 });
  const src = `/compiland/${night && HAS_NIGHT.has(clip) ? `${clip}-dark` : clip}`;

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (near && !calm()) v.play().catch(() => { /* the poster stays */ });
    else v.pause();
  }, [near, src]);

  const inner = <>
    <div className="cl-screen__bar" aria-hidden="true">
      <i /><i /><i />
      <span className="cl-screen__url"><Icon name="lock" size={12} /><span>{url}</span></span>
    </div>
    <div className="cl-screen__view">
      <video key={src} ref={video} muted loop playsInline preload={eager ? "auto" : "none"} poster={`${src}.webp`} aria-hidden="true" tabIndex={-1}>
        <source src={`${src}.mp4`} type="video/mp4" />
      </video>
      {href && <span className="cl-screen__go" aria-hidden="true">compiland.uz ↗</span>}
    </div>
  </>;

  return href
    ? <a ref={box} className="cl-screen cl-screen--link" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>{inner}</a>
    : <figure ref={box} className="cl-screen">{inner}</figure>;
}
