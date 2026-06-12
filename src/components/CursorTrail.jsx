import { useEffect, useRef } from "react";

export default function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });

    const pts = [];
    let raf;

    const onMove = (e) => {
      for (let i = 0; i < 3; i++) {
        pts.push({
          x:     e.clientX + (Math.random() - 0.5) * 7,
          y:     e.clientY + (Math.random() - 0.5) * 7,
          vx:    (Math.random() - 0.5) * 1.2,
          vy:    -(Math.random() * 0.4 + 0.1),
          r:     Math.random() * 1.8 + 0.7,
          life:  1,
          decay: 0.028 + Math.random() * 0.022,
        });
      }
    };

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i];
        p.x    += p.vx;
        p.y    += p.vy;
        p.vy   += 0.055;
        p.life -= p.decay;
        if (p.life <= 0) { pts.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,136,${(p.life * 0.7).toFixed(2)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize",    onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 9988, pointerEvents: "none" }}
    />
  );
}
