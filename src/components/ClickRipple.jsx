import { useEffect, useRef } from "react";

const CSS = `
@keyframes ripple-go {
  from { transform: translate(-50%,-50%) scale(0); opacity: 1; }
  to   { transform: translate(-50%,-50%) scale(2.8); opacity: 0; }
}
`;

export default function ClickRipple() {
  const wrapRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      const wrap = wrapRef.current;
      if (!wrap) return;

      [0, 140].forEach((delay, i) => {
        setTimeout(() => {
          const el = document.createElement("div");
          const size = 44 + i * 18;
          el.style.cssText = [
            `position:fixed`,
            `left:${e.clientX}px`,
            `top:${e.clientY}px`,
            `width:${size}px`,
            `height:${size}px`,
            `border-radius:50%`,
            `border:${1.5 - i * 0.4}px solid rgba(0,255,136,${0.55 - i * 0.18})`,
            `box-shadow:0 0 8px rgba(0,255,136,0.2)`,
            `pointer-events:none`,
            `animation:ripple-go ${0.62 + i * 0.08}s ease-out forwards`,
          ].join(";");
          wrap.appendChild(el);
          setTimeout(() => el.remove(), 800);
        }, delay);
      });
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <div ref={wrapRef} style={{ position: "fixed", inset: 0, zIndex: 9989, pointerEvents: "none" }} />
    </>
  );
}
