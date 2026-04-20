import { Suspense, lazy, useRef, useState, useEffect } from "react";
import ParticleCanvas from "./ParticleCanvas";

const Spline = lazy(() => import("@splinetool/react-spline"));

// const SPLINE_URL = "https://prod.spline.design/WCloL3Is1nvC8vYj/scene.splinecode"; // Orange planet
// const SPLINE_URL = "https://prod.spline.design/dK5jeX6o7fjApLFJ/scene.splinecode"; // shadow objects
const SPLINE_URL = "https://prod.spline.design/7COBgrhbiaDdInJ9/scene.splinecode";

export default function SplineScene({ style }) {
  const wrapRef    = useRef(null);
  const timerRef   = useRef(null);
  const [visible,  setVisible]  = useState(false);
  /* mounted controls whether the WebGL canvas exists at all.
     We delay unmounting by 1.5s so a brief scroll-away doesn't reload. */
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!wrapRef.current || !SPLINE_URL) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    clearTimeout(timerRef.current);
    if (visible) {
      timerRef.current = setTimeout(() => setMounted(true), 0);
    } else {
      /* Stop the WebGL render loop 1.5s after leaving viewport */
      timerRef.current = setTimeout(() => setMounted(false), 1500);
    }
    return () => clearTimeout(timerRef.current);
  }, [visible]);

  if (!SPLINE_URL) {
    return (
      <div style={{ width: "100%", height: "100%", position: "relative", ...style }}>
        <ParticleCanvas style={{ width: "100%", height: "100%" }} />
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      data-lenis-prevent
      style={{
        width: "100%", height: "100%",
        position: "relative",
        overflow: "hidden",
        contain: "paint layout",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
        pointerEvents: visible ? "auto" : "none",
        ...style,
      }}
    >
      {mounted ? (
        <Suspense fallback={<ParticleCanvas style={{ width: "100%", height: "100%" }} />}>
          <Spline
            scene={SPLINE_URL}
            style={{ width: "100%", height: "100%" }}
          />
        </Suspense>
      ) : (
        <ParticleCanvas style={{ width: "100%", height: "100%" }} />
      )}
    </div>
  );
}
