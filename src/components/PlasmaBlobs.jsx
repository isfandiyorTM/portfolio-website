import { memo, useEffect, useRef } from "react";

const isLowEndDevice =
  typeof window !== "undefined" &&
  (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
   window.matchMedia("(pointer: coarse)").matches);

const PlasmaBlobs = memo(function PlasmaBlobs() {
  if (isLowEndDevice) return null;
  const wrapRef = useRef(null);
  const b1Ref   = useRef(null);
  const b2Ref   = useRef(null);
  const b3Ref   = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Shared state updated by event listeners, consumed by rAF loop
    const s = {
      mx: 0.5, my: 0.5,   // normalised mouse position (0–1)
      sp: 0,               // scroll progress through middle sections (0–1)
      // current lerped blob positions (%)
      b1x: 20, b1y: 35,
      b2x: 80, b2y: 65,
      b3x: 50, b3y: 50,
    };

    // ── Scroll: update opacity + scroll progress ──
    const onScroll = () => {
      const heroH     = window.innerHeight;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const y         = window.scrollY;

      // Opacity: fade in past hero, fade out before footer
      const fadeIn  = Math.min(1, Math.max(0, (y - heroH * 0.4) / (heroH * 0.25)));
      const fadeOut = Math.min(1, Math.max(0, (maxScroll - 120 - y) / 80));
      wrap.style.opacity = String(Math.min(fadeIn, fadeOut));

      // Scroll progress through the middle sections (0 = top of About, 1 = bottom of Contact)
      const start = heroH * 0.65;
      const end   = maxScroll - 80;
      s.sp = Math.min(1, Math.max(0, (y - start) / (end - start)));
    };

    // ── Mouse: update normalised mouse ──
    const onMouse = (e) => {
      s.mx = e.clientX / window.innerWidth;
      s.my = e.clientY / window.innerHeight;
    };

    window.addEventListener("scroll",    onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse,  { passive: true });
    onScroll();

    // ── rAF loop: lerp blob positions toward scroll+mouse target ──
    let raf;
    const LERP = 0.08; // responds during scroll, not just after

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const { mx, my, sp } = s;

      // Target positions: scroll drives large sweeping motion, mouse adds local offset
      const t1x = 10 + sp * 65  + (mx - 0.5) * 18;
      const t1y = 25 + sp * 45  + (my - 0.5) * 18;

      const t2x = 88 - sp * 60  + (mx - 0.5) * 14;
      const t2y = 72 - sp * 32  + (my - 0.5) * 14;

      const t3x = 48 + (sp - 0.5) * 36 + (mx - 0.5) * 10;
      const t3y = 52 + (sp - 0.5) * 28 + (my - 0.5) * 10;

      s.b1x += (t1x - s.b1x) * LERP;
      s.b1y += (t1y - s.b1y) * LERP;
      s.b2x += (t2x - s.b2x) * LERP;
      s.b2y += (t2y - s.b2y) * LERP;
      s.b3x += (t3x - s.b3x) * LERP;
      s.b3y += (t3y - s.b3y) * LERP;

      if (b1Ref.current) { b1Ref.current.style.left = s.b1x + "%"; b1Ref.current.style.top = s.b1y + "%"; }
      if (b2Ref.current) { b2Ref.current.style.left = s.b2x + "%"; b2Ref.current.style.top = s.b2y + "%"; }
      if (b3Ref.current) { b3Ref.current.style.left = s.b3x + "%"; b3Ref.current.style.top = s.b3y + "%"; }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll",    onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  const base = {
    position: "fixed",
    pointerEvents: "none",
    transform: "translate(-50%, -50%)",
    zIndex: 0,
  };

  return (
    <div
      ref={wrapRef}
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0, opacity: 0, transition: "opacity 0.6s ease", overflow: "hidden" }}
    >
      <div ref={b1Ref} style={{ ...base, left: "20%", top: "35%", width: "min(700px,120vw)", height: "min(700px,120vw)", background: "radial-gradient(circle, rgba(0,255,136,0.18) 0%, transparent 65%)", animation: "plasma-drift-a 9s ease-in-out infinite" }} />
      <div ref={b2Ref} style={{ ...base, left: "80%", top: "65%", width: "min(600px,100vw)", height: "min(600px,100vw)", background: "radial-gradient(circle, rgba(0,200,100,0.13) 0%, transparent 65%)", animation: "plasma-drift-b 12s ease-in-out infinite" }} />
      <div ref={b3Ref} style={{ ...base, left: "50%", top: "50%", width: "min(500px,90vw)",  height: "min(500px,90vw)",  background: "radial-gradient(circle, rgba(0,255,136,0.10) 0%, transparent 70%)", animation: "plasma-drift-c 7s ease-in-out infinite" }} />
    </div>
  );
});

export default PlasmaBlobs;
