import { useEffect, useRef, useState } from "react";
import { Car } from "./art";
import { Rich, Screen } from "./parts";

/*
 * "How it works" as compiland.uz draws it: a road down the page with a stop
 * for each part of the product, and the town's car driving along it as the
 * page scrolls. The car is wherever the middle of the window is, so it
 * reaches a stop's marker just as that stop is in the middle of the screen,
 * and drives back when the page goes up. Its brake lights come on when the
 * page stops.
 *
 * The road is worked out once per layout from where the stops' pins are
 * (cubic bends, one way then the other), and sampled into points, so a
 * scroll only looks a height up in a list.
 */

const SAMPLES = 40; // points per bend

function cubic(a, b, c, d, t) {
  const u = 1 - t;
  return {
    x: u * u * u * a.x + 3 * u * u * t * b.x + 3 * u * t * t * c.x + t * t * t * d.x,
    y: u * u * u * a.y + 3 * u * u * t * b.y + 3 * u * t * t * c.y + t * t * t * d.y,
  };
}

/* The road from the top of the stops to their foot through every pin. At a pin
   it leans right or left in turn (`lean` is its slope); between two pins it bends. */
function plan(height, pins, wide) {
  const x = pins[0].x;
  const lean = wide ? 0.4 : 0.07;
  const most = wide ? 70 : 16;
  const stops = [{ x, y: 0, side: 0 }, ...pins.map((p, i) => ({ ...p, side: i % 2 ? -1 : 1 })), { x, y: height, side: 0 }];

  let d = `M${x} 0`;
  const pts = [{ x, y: 0 }];
  for (let i = 1; i < stops.length; i++) {
    const a = stops[i - 1], b = stops[i];
    const h = (b.y - a.y) * 0.42;
    const off = Math.min(lean * h, most);
    const c1 = { x: a.x + a.side * off, y: a.y + h };
    const c2 = { x: b.x - b.side * off, y: b.y - h };
    d += ` C${c1.x.toFixed(1)} ${c1.y.toFixed(1)} ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
    for (let s = 1; s <= SAMPLES; s++) pts.push(cubic(a, c1, c2, b, s / SAMPLES));
  }
  return { d, pts };
}

/* Where on the road a height falls, and which way the road goes there. */
function place(pts, y) {
  const last = pts.length - 1;
  if (y <= pts[0].y) return { ...pts[0], a: 90 };
  if (y >= pts[last].y) return { ...pts[last], a: 90 };
  let lo = 0, hi = last;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (pts[mid].y < y) lo = mid; else hi = mid;
  }
  const p = pts[lo], q = pts[hi];
  const k = (y - p.y) / (q.y - p.y || 1);
  return { x: p.x + (q.x - p.x) * k, y, a: (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI };
}

export default function Stops({ stops, words, night, peek }) {
  const wrap = useRef(null);
  const car = useRef(null);
  const items = useRef([]);
  const marks = useRef([]);
  const geo = useRef(null);
  const drive = useRef(null);
  const [road, setRoad] = useState(null);

  // The road follows the layout: measured again whenever the stops change size
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = () => {
      const box = el.getBoundingClientRect();
      const wide = window.matchMedia("(min-width: 821px)").matches;
      const pins = items.current.map((li) => {
        const r = li.querySelector(".cl-stop__pin").getBoundingClientRect();
        return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
      });
      if (!pins.length) return;
      const { d, pts } = plan(box.height, pins, wide);
      geo.current = { pts, pins };
      setRoad({ w: box.width, h: box.height, d, pins, lane: wide ? 34 : 22 });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // The car: wherever the middle of the window is, on the road
  useEffect(() => {
    const el = wrap.current, c = car.current;
    if (!el || !c) return;
    let frame = 0, rest = 0;
    const go = () => {
      frame = 0;
      const g = geo.current;
      if (!g) return;
      const want = window.innerHeight / 2 - el.getBoundingClientRect().top;
      const { x, y, a } = place(g.pts, want);
      c.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${(a + 90).toFixed(1)}deg)`;
      c.classList.add("is-placed");
      g.pins.forEach((p, i) => {
        const reached = y >= p.y - 1;
        items.current[i]?.classList.toggle("is-reached", reached);
        marks.current[i]?.classList.toggle("is-reached", reached);
      });
    };
    const moved = () => {
      c.classList.remove("is-stopped");
      clearTimeout(rest);
      rest = setTimeout(() => c.classList.add("is-stopped"), 160);
      if (!frame) frame = requestAnimationFrame(go);
    };
    drive.current = go;
    c.classList.add("is-stopped");
    window.addEventListener("scroll", moved, { passive: true });
    window.addEventListener("resize", moved);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(rest);
      window.removeEventListener("scroll", moved);
      window.removeEventListener("resize", moved);
    };
  }, []);

  // A new road (first layout, a resize): put the car back on it
  useEffect(() => { if (road) drive.current?.(); }, [road]);

  return (
    <div className="cl-stops" ref={wrap}>
      {road && (
        <svg className="cl-road" width={road.w} height={road.h} viewBox={`0 0 ${road.w} ${road.h}`} aria-hidden="true" focusable="false">
          <g className="cl-tarmac">
            <path d={road.d} style={{ strokeWidth: road.lane }} />
            <path className="cl-tarmac__edge" d={road.d} style={{ strokeWidth: road.lane - 6 }} />
            <path d={road.d} style={{ strokeWidth: road.lane - 10 }} />
          </g>
          <path className="cl-road__dash" d={road.d} />
          {road.pins.map((p, i) => (
            <circle key={i} ref={(n) => { marks.current[i] = n; }} className="cl-road__stop" cx={p.x} cy={p.y} r={road.lane > 30 ? 10 : 7} />
          ))}
        </svg>
      )}
      <div className="cl-car" ref={car} aria-hidden="true"><Car /></div>

      <ol className="cl-stops__list">
        {stops.map((s, i) => (
          <li key={s.clip} ref={(n) => { items.current[i] = n; }} className={`cl-stop${i % 2 ? " cl-stop--flip" : ""}`}>
            <div className="cl-stop__words">
              <span className="cl-stop__n" aria-hidden="true">{i + 1}</span>
              <h3>{words[i].t}</h3>
              <p><Rich text={words[i].d} /></p>
            </div>
            <span className="cl-stop__pin" aria-hidden="true" />
            <Screen clip={s.clip} url={s.url} night={night} href={s.href} label={s.href ? `${words[i].t} — ${peek}` : undefined} />
          </li>
        ))}
      </ol>
    </div>
  );
}
