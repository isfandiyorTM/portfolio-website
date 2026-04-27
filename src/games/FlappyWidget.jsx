import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n/LanguageContext";
import { saveScore } from "../lib/scores";

const W = 380, H = 420;
const BIRD_X = 70, BIRD_W = 28, BIRD_H = 22;
const GRAVITY = 0.09, FLAP_V = -3.6;
const PIPE_W = 46, PIPE_GAP = 185, PIPE_SPEED = 0.85;
const PIPE_INTERVAL = 150; // frames between pipes

export default function FlappyWidget() {
  const { t } = useLang();
  const g = t.games;
  const canvasRef  = useRef(null);
  const stateRef   = useRef(null);  // mutable game state
  const rafRef     = useRef(null);
  const [phase,    setPhase]  = useState("idle");  // idle | playing | dead
  const [score,    setScore]  = useState(0);
  const [best,     setBest]   = useState(() => { try { return parseInt(localStorage.getItem("flappyBest") || "0"); } catch { return 0; } });

  const initState = () => ({
    bird: { y: H / 2, vy: 0 },
    pipes: [],
    frame: 0,
    score: 0,
  });

  const flap = () => {
    if (phase === "idle") {
      const s = initState();
      s.bird.vy = FLAP_V; // give initial upward kick so bird doesn't fall immediately
      stateRef.current = s;
      setPhase("playing");
      setScore(0);
      return;
    }
    if (phase === "dead") {
      const s = initState();
      s.bird.vy = FLAP_V;
      stateRef.current = s;
      setPhase("playing");
      setScore(0);
      return;
    }
    if (stateRef.current) stateRef.current.bird.vy = FLAP_V;
  };

  useEffect(() => {
    const handleKey = (e) => { if (e.code === "Space") { e.preventDefault(); flap(); } };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [phase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const GREEN  = "#00ff88";
    const GREEN2 = "#00aa55";
    const DARK   = "#050a0f";
    const PIPE_C = "#0d2a1a";
    const PIPE_B = "#1a4a2a";
    const RED    = "#ff3c3c";

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Background grid
      ctx.fillStyle = DARK;
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(0,255,136,0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      if (phase !== "playing" || !stateRef.current) {
        // idle / dead overlay
        ctx.fillStyle = "rgba(5,10,15,0.75)";
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = GREEN;
        ctx.font = "900 13px 'Orbitron', sans-serif";
        ctx.textAlign = "center";
        ctx.letterSpacing = "4px";

        if (phase === "idle") {
          ctx.fillText(g.flappy.label.toUpperCase(), W / 2, H / 2 - 28);
          ctx.fillStyle = "rgba(0,255,136,0.6)";
          ctx.font = "11px 'Share Tech Mono', monospace";
          ctx.fillText(g.fly_start, W / 2, H / 2 + 4);
          ctx.fillText(g.fly_dodge, W / 2, H / 2 + 22);
          if (best > 0) {
            ctx.fillStyle = "#4a8a6a";
            ctx.font = "10px 'Share Tech Mono', monospace";
            ctx.fillText(`${g.best}: ${best}`, W / 2, H / 2 + 48);
          }
        } else if (phase === "dead") {
          ctx.fillStyle = RED;
          ctx.fillText(g.fly_dead, W / 2, H / 2 - 32);
          ctx.fillStyle = "rgba(255,60,60,0.7)";
          ctx.font = "10px 'Share Tech Mono', monospace";
          ctx.fillText(g.fly_error, W / 2, H / 2 - 8);
          ctx.fillStyle = GREEN;
          ctx.font = "11px 'Share Tech Mono', monospace";
          ctx.fillText(`${g.score}: ${score}  ${g.best}: ${best}`, W / 2, H / 2 + 16);
          ctx.fillStyle = "rgba(0,255,136,0.5)";
          ctx.fillText(g.fly_retry, W / 2, H / 2 + 38);
        }
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const s = stateRef.current;
      s.frame++;

      // Physics
      s.bird.vy += GRAVITY;
      s.bird.y  += s.bird.vy;

      // Spawn pipes
      if (s.frame % PIPE_INTERVAL === 0) {
        const topH = 60 + Math.random() * (H - PIPE_GAP - 100);
        s.pipes.push({ x: W, topH });
      }

      // Move pipes + score
      let passed = 0;
      s.pipes = s.pipes.map(p => {
        const next = { ...p, x: p.x - PIPE_SPEED };
        if (p.x > BIRD_X && next.x <= BIRD_X) passed++;
        return next;
      }).filter(p => p.x + PIPE_W > -10);

      if (passed > 0) {
        s.score += passed;
        setScore(s.score);
      }

      // Draw pipes
      s.pipes.forEach(p => {
        // Top pipe
        ctx.fillStyle = PIPE_C;
        ctx.fillRect(p.x, 0, PIPE_W, p.topH);
        ctx.strokeStyle = PIPE_B;
        ctx.lineWidth = 1;
        ctx.strokeRect(p.x, 0, PIPE_W, p.topH);

        // Bottom pipe
        const botY = p.topH + PIPE_GAP;
        ctx.fillStyle = PIPE_C;
        ctx.fillRect(p.x, botY, PIPE_W, H - botY);
        ctx.strokeStyle = PIPE_B;
        ctx.strokeRect(p.x, botY, PIPE_W, H - botY);

        // Exception label on pipes
        ctx.save();
        ctx.fillStyle = "#1a4a2a";
        ctx.font = "8px 'Share Tech Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("Exception", p.x + PIPE_W / 2, Math.min(p.topH - 6, p.topH - 2));
        ctx.restore();
      });

      // Draw bird
      const birdY = s.bird.y;
      const tilt = Math.min(Math.max(s.bird.vy * 3, -30), 60);
      ctx.save();
      ctx.translate(BIRD_X + BIRD_W / 2, birdY + BIRD_H / 2);
      ctx.rotate((tilt * Math.PI) / 180);

      // Bird body
      ctx.fillStyle = GREEN;
      ctx.fillRect(-BIRD_W / 2, -BIRD_H / 2, BIRD_W, BIRD_H);
      // Bird shine
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.fillRect(-BIRD_W / 2 + 3, -BIRD_H / 2 + 3, BIRD_W / 2, BIRD_H / 3);
      // Label
      ctx.fillStyle = "#000";
      ctx.font = "bold 8px monospace";
      ctx.textAlign = "center";
      ctx.fillText("W", 0, 3);
      ctx.restore();

      // Score HUD
      ctx.fillStyle = GREEN;
      ctx.font = "900 20px 'Orbitron', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(s.score, W / 2, 32);
      ctx.fillStyle = "#1a4a2a";
      ctx.font = "9px 'Share Tech Mono', monospace";
      ctx.fillText(`BEST ${best}`, W / 2, 46);

      // Collision: floor / ceiling
      if (birdY + BIRD_H >= H || birdY <= 0) {
        handleDeath(s.score);
        return;
      }

      // Collision: pipes
      for (const p of s.pipes) {
        const bx1 = BIRD_X + 3, bx2 = BIRD_X + BIRD_W - 3;
        const by1 = birdY  + 3, by2 = birdY  + BIRD_H - 3;
        const px1 = p.x,        px2 = p.x + PIPE_W;
        if (bx2 > px1 && bx1 < px2) {
          if (by1 < p.topH || by2 > p.topH + PIPE_GAP) {
            handleDeath(s.score);
            return;
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const handleDeath = (finalScore) => {
      const newBest = Math.max(best, finalScore);
      if (newBest > best) {
        setBest(newBest);
        saveScore("flappy", newBest);
      }
      stateRef.current = null;
      setPhase("dead");
    };

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase, score, best]);

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        onClick={flap}
        onTouchStart={e => { e.preventDefault(); flap(); }}
        style={{ display:"block", cursor:"pointer", border:"1px solid var(--green-dark)", maxWidth:"100%", height:"auto", touchAction:"none" }}
      />
      <button
        onTouchStart={e => { e.preventDefault(); flap(); }}
        onClick={flap}
        style={{ fontFamily:"var(--font-mono)", fontSize:13, letterSpacing:2, color:"var(--green)", background:"rgba(0,255,136,0.08)", border:"1px solid var(--green)", padding:"10px 32px", cursor:"pointer", display:"block" }}
      >
        ▲ {g.fly_tap ?? "TAP / SPACE"}
      </button>
    </div>
  );
}
