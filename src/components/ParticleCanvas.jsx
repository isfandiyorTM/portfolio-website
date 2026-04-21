import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

/* ── 3D Particle Field ─────────────────────────────────────────────────
   Pure canvas, zero dependencies.
   - 120 particles in a 3D sphere, projected with perspective
   - Lines drawn between nearby particles
   - Auto-rotates slowly on Y axis
   - Mouse movement tilts the camera (smooth lerp)
   ───────────────────────────────────────────────────────────────────── */

const NUM_PARTICLES = 120;
const CONNECTION_DIST = 160;   // max 3D distance to draw a line
const FOV = 420;               // perspective field of view
const SPHERE_R = 280;          // bounding sphere radius
const AUTO_ROTATE_SPEED = 0.0004;
const MOUSE_INFLUENCE = 0.35;  // how much mouse tilts the scene

function randomSphere(r) {
  /* Uniform distribution on sphere surface */
  const u = Math.random(), v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi   = Math.acos(2 * v - 1);
  return {
    x: r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.sin(phi) * Math.sin(theta),
    z: r * Math.cos(phi),
  };
}

export default function ParticleCanvas({ style }) {
  const canvasRef = useRef(null);
  const mouse     = useRef({ x: 0, y: 0 });
  const camera    = useRef({ rotX: 0, rotY: 0 });
  const targetCam = useRef({ rotX: 0, rotY: 0 });
  const rafId     = useRef(null);
  const time      = useRef(0);
  const { dark }  = useTheme();
  const darkRef   = useRef(dark);
  darkRef.current = dark;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    /* Generate particles */
    const particles = Array.from({ length: NUM_PARTICLES }, () => ({
      ...randomSphere(SPHERE_R * (0.4 + Math.random() * 0.6)),
    }));

    /* Resize handler */
    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* Mouse move — normalise to [-1, 1] relative to canvas */
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      mouse.current.y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    /* 3D rotation helpers */
    const rotateY = (p, a) => ({
      x:  p.x * Math.cos(a) + p.z * Math.sin(a),
      y:  p.y,
      z: -p.x * Math.sin(a) + p.z * Math.cos(a),
    });
    const rotateX = (p, a) => ({
      x:  p.x,
      y:  p.y * Math.cos(a) - p.z * Math.sin(a),
      z:  p.y * Math.sin(a) + p.z * Math.cos(a),
    });

    /* Perspective projection → canvas coords */
    const project = (p, W, H) => {
      const scale = FOV / (FOV + p.z);
      return {
        x: p.x * scale + W / 2,
        y: p.y * scale + H / 2,
        s: scale,  // depth-based scale for size/opacity
      };
    };

    /* Lerp helper */
    const lerp = (a, b, t) => a + (b - a) * t;

    /* Main render loop */
    const draw = () => {
      time.current += AUTO_ROTATE_SPEED;

      /* Lerp camera toward mouse target */
      targetCam.current.rotY = mouse.current.x * MOUSE_INFLUENCE;
      targetCam.current.rotX = mouse.current.y * MOUSE_INFLUENCE * 0.6;
      camera.current.rotX = lerp(camera.current.rotX, targetCam.current.rotX, 0.04);
      camera.current.rotY = lerp(camera.current.rotY, targetCam.current.rotY, 0.04);

      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      /* Transform all particles */
      const transformed = particles.map(p => {
        let tp = rotateY(p, time.current + camera.current.rotY);
        tp = rotateX(tp, camera.current.rotX);
        const proj = project(tp, W, H);
        return { ...proj, z: tp.z };
      });

      /* Sort back-to-front for correct depth rendering */
      const sorted = transformed.map((p, i) => ({ ...p, i }))
                                 .sort((a, b) => a.z - b.z);

      /* Draw connections */
      for (let a = 0; a < sorted.length; a++) {
        for (let b = a + 1; b < sorted.length; b++) {
          const pa = transformed[sorted[a].i];
          const pb = transformed[sorted[b].i];
          const dx = particles[sorted[a].i].x - particles[sorted[b].i].x;
          const dy = particles[sorted[a].i].y - particles[sorted[b].i].y;
          const dz = particles[sorted[a].i].z - particles[sorted[b].i].z;
          const dist3d = Math.sqrt(dx*dx + dy*dy + dz*dz);

          if (dist3d < CONNECTION_DIST) {
            const opacity = (1 - dist3d / CONNECTION_DIST) * 0.18
                          * Math.min(pa.s, pb.s) * 1.6;
            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.strokeStyle = darkRef.current
              ? `rgba(255,255,255,${opacity})`
              : `rgba(0,100,50,${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      /* Draw particles */
      sorted.forEach(({ i, x, y, s }) => {
        const depth = (s - 0.3) / 0.7;  // normalise depth 0–1
        const opacity = Math.max(0.08, depth * 0.7);
        const radius  = Math.max(0.8, s * 2.4);

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = darkRef.current
          ? `rgba(255,255,255,${opacity})`
          : `rgba(0,120,60,${opacity})`;
        ctx.fill();
      });

      rafId.current = requestAnimationFrame(draw);
    };

    rafId.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        ...style,
      }}
    />
  );
}
