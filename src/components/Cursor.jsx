import { useEffect, useRef, useState } from "react";

/* Spring cursor — dot follows exactly, ring follows with lerp lag.
   mix-blend-mode: difference inverts colors = ring looks good on any bg. */
export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const rafId   = useRef(null);
  const [state,   setState]   = useState("default"); // "default" | "hover" | "click"
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    /* Hide on touch / stylus devices — no mouse present */
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };

    const onDown = () => setState("click");
    const onUp   = () => setState(s => s === "click" ? "default" : s);

    const onEnter = (e) => {
      if (e.target.closest("a, button, [data-cursor='pointer'], input, textarea, select")) {
        setState("hover");
      }
    };
    const onLeave = (e) => {
      if (e.target.closest("a, button, [data-cursor='pointer'], input, textarea, select")) {
        setState("default");
      }
    };

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseover",  onEnter);
    document.addEventListener("mouseout",   onLeave);
    document.body.style.cursor = "none";

    /* Animation loop — lerp the ring toward mouse */
    const LERP = 0.095;
    const loop = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * LERP;
      ring.current.y += (mouse.current.y - ring.current.y) * LERP;

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseover",  onEnter);
      document.removeEventListener("mouseout",   onLeave);
      document.body.style.cursor = "";
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const isHover = state === "hover";
  const isClick = state === "click";

  if (!visible) return null;

  return (
    <>
      {/* Dot — exact position */}
      <div ref={dotRef} style={{
        position: "fixed", top: 0, left: 0,
        width:  isClick ? "5px"  : "6px",
        height: isClick ? "5px"  : "6px",
        borderRadius: "50%",
        background: "var(--text)",
        pointerEvents: "none",
        zIndex: 99999,
        mixBlendMode: "difference",
        willChange: "transform",
        transition: "width 0.2s, height 0.2s",
      }} />

      {/* Ring — lags behind */}
      <div ref={ringRef} style={{
        position: "fixed", top: 0, left: 0,
        width:  isHover ? "54px"  : isClick ? "28px" : "36px",
        height: isHover ? "54px"  : isClick ? "28px" : "36px",
        borderRadius: "50%",
        border: "1px solid var(--text)",
        pointerEvents: "none",
        zIndex: 99998,
        mixBlendMode: "difference",
        willChange: "transform",
        opacity: isHover ? 0.7 : 0.45,
        transition:
          "width 0.45s cubic-bezier(0.16,1,0.3,1), height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
      }} />
    </>
  );
}
