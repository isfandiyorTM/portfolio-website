import { useEffect, useRef } from "react";

const CHARS = "01><[]{}#$%∑∆∏∫アイウエオカキクケコ?!";
const FS = 13;

export default function MatrixRain({ style }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, drops;

    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drops = Array.from({ length: Math.floor(W / FS) }, () => -(Math.random() * 60));
    };
    init();

    const ro = new ResizeObserver(init);
    ro.observe(canvas);

    let raf, last = 0;
    const draw = (ts) => {
      raf = requestAnimationFrame(draw);
      if (ts - last < 180) return; // ~5-6 fps — slow, deliberate fall
      last = ts;

      ctx.fillStyle = "rgba(5,10,15,0.12)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${FS}px 'Share Tech Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        const y = drops[i] * FS;
        // Lead char bright white-green, trail is darker green
        const isLead = drops[i] > 0 && Math.random() > 0.85;
        ctx.fillStyle = isLead ? "#ccffdd" : (drops[i] > 0 ? "#00cc66" : "#00ff88");
        ctx.fillText(ch, i * FS, y);

        if (y > H && Math.random() > 0.975) drops[i] = 0;
        else drops[i] += 1;
      }
    };

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ width: "100%", height: "100%", display: "block", ...style }}
    />
  );
}
