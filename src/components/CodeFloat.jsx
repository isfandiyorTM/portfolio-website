import { useEffect, useRef } from "react";

const SNIPPETS = [
  "const hero = new Portfolio();",
  "await hero.deploy({ env: 'prod' });",
  "function render(scene, camera) {",
  "  gl.clear(gl.COLOR_BUFFER_BIT);",
  "  scene.objects.forEach(draw);",
  "}",
  "// particle_field.init(120);",
  "matrix.rain({ speed: 20, cols });",
  "export default { name: 'ISF' };",
  "const px = shader.compile(frag);",
  "setInterval(glitch, 4000);",
  "canvas.requestAnimationFrame(loop);",
  "const [pos, vel] = usePhy();",
  "gl.drawArrays(gl.TRIANGLES, 0, n);",
];

export default function CodeFloat({ style }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let lineIdx = 0;
    let charIdx = 0;
    let currentDiv = null;
    const lines = [];
    let timer;

    const tick = () => {
      const snippet = SNIPPETS[lineIdx % SNIPPETS.length];

      if (charIdx === 0) {
        currentDiv = document.createElement("div");
        currentDiv.style.cssText =
          "white-space:pre;opacity:0.9;transition:opacity 0.4s;";
        el.appendChild(currentDiv);
        lines.push(currentDiv);
        // Fade older lines
        lines.forEach((d, i) => {
          d.style.opacity = String(Math.max(0.15, 0.9 - (lines.length - 1 - i) * 0.12));
        });
        if (lines.length > 11) {
          const removed = lines.shift();
          removed.style.opacity = "0";
          setTimeout(() => removed.remove(), 400);
        }
      }

      charIdx++;
      if (currentDiv) currentDiv.textContent = snippet.slice(0, charIdx);

      if (charIdx >= snippet.length) {
        charIdx = 0;
        lineIdx++;
        timer = setTimeout(tick, 400 + Math.random() * 200);
      } else {
        timer = setTimeout(tick, 30 + Math.random() * 25);
      }
    };

    tick();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        lineHeight: 2,
        color: "var(--green-dim)",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}
