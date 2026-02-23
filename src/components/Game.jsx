import { useState, useEffect } from "react";
import { useReveal } from "../hooks/useReveal";

const TECH_CARDS = [
  { id: "flutter",  label: "Flutter",  emoji: "🐦" },
  { id: "dart",     label: "Dart",     emoji: "🎯" },
  { id: "firebase", label: "Firebase", emoji: "🔥" },
  { id: "git",      label: "Git",      emoji: "🌿" },
  { id: "figma",    label: "Figma",    emoji: "🎨" },
  { id: "sql",      label: "SQL",      emoji: "🗄️" },
  { id: "api",      label: "REST API", emoji: "🔌" },
  { id: "mobile",   label: "Mobile",   emoji: "📱" },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createDeck() {
  return shuffle(
    TECH_CARDS.flatMap((card) => [
      { ...card, uid: card.id + "_a" },
      { ...card, uid: card.id + "_b" },
    ])
  );
}

function Card({ card, isFlipped, isMatched, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{ width: "100%", aspectRatio: "1", perspective: "600px", cursor: isMatched ? "default" : "pointer" }}
    >
      <div style={{
        width: "100%", height: "100%", position: "relative",
        transformStyle: "preserve-3d",
        transform: isFlipped || isMatched ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        {/* Back */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          background: "#050f0a", border: "1px solid #0d2a1a",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "inset 0 0 20px #00ff8808",
        }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(16px, 4vw, 28px)", color: "#1a4a2a", letterSpacing: "2px" }}>?</span>
        </div>

        {/* Front */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background: isMatched ? "linear-gradient(135deg, #001a0d, #002a15)" : "linear-gradient(135deg, #050f0a, #0a1a10)",
          border: `1px solid ${isMatched ? "var(--green)" : "#1a4a2a"}`,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "6px",
          boxShadow: isMatched ? "0 0 20px #00ff8844" : "none",
          transition: "all 0.3s",
        }}>
          <span style={{ fontSize: "clamp(18px, 5vw, 32px)" }}>{card.emoji}</span>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(8px, 2vw, 11px)",
            letterSpacing: "1px",
            color: isMatched ? "var(--green)" : "var(--text-muted)",
            textTransform: "uppercase",
            textAlign: "center",
            padding: "0 4px",
          }}>
            {card.label}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Game() {
  const titleRef = useReveal();

  const [deck, setDeck]           = useState(createDeck);
  const [flipped, setFlipped]     = useState([]);
  const [matched, setMatched]     = useState([]);
  const [moves, setMoves]         = useState(0);
  const [locked, setLocked]       = useState(false);
  const [won, setWon]             = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    try { const s = localStorage.getItem("memoryBest"); return s ? parseInt(s) : null; } catch { return null; }
  });
  const [time, setTime]   = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setTime((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  useEffect(() => {
    if (matched.length === TECH_CARDS.length * 2 && matched.length > 0) {
      setWon(true);
      setRunning(false);
      if (!bestScore || moves < bestScore) {
        setBestScore(moves);
        try { localStorage.setItem("memoryBest", moves); } catch {}
      }
    }
  }, [matched]);

  useEffect(() => {
    if (flipped.length !== 2) return;
    setLocked(true);
    const [a, b] = flipped;
    if (deck[a].id === deck[b].id) {
      setMatched((m) => [...m, deck[a].uid, deck[b].uid]);
      setFlipped([]);
      setLocked(false);
    } else {
      setTimeout(() => { setFlipped([]); setLocked(false); }, 900);
    }
    setMoves((m) => m + 1);
  }, [flipped]);

  const handleCardClick = (index) => {
    if (locked || flipped.includes(index) || matched.includes(deck[index].uid) || flipped.length === 2) return;
    if (!running) setRunning(true);
    setFlipped((f) => [...f, index]);
  };

  const restart = () => {
    setDeck(createDeck());
    setFlipped([]); setMatched([]); setMoves(0);
    setLocked(false); setWon(false); setTime(0); setRunning(false);
  };

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <>
      <style>{`
        .game-section {
          padding: 80px 40px;
          width: 100%;
        }
        .game-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 10px;
        }
        .stats-row {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
          flex-wrap: nowrap;
        }
        .stat-box {
          border: 1px solid var(--green-dark);
          background: #050f0a;
          padding: 8px 12px;
          flex: 1;
          text-align: center;
        }

        @media (max-width: 768px) {
          .game-section {
            padding: 0 !important;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          .game-inner {
            max-width: 100% !important;
            padding: 16px !important;
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          .game-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 8px !important;
            flex: 1;
          }
          .stats-row {
            gap: 6px;
          }
          .stat-box {
            padding: 6px 4px;
          }
          .game-header {
            margin-bottom: 12px !important;
          }
        }
      `}</style>

      <section id="game" className="game-section">
        <div className="game-inner" style={{ maxWidth: "900px", margin: "0 auto", width: "100%" }}>

          {/* Header */}
          <div ref={titleRef} className="reveal game-header" style={{ marginBottom: "20px" }}>
            <p className="section-label">// GAME.EXE</p>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(18px, 3vw, 30px)",
              fontWeight: 700, marginBottom: "4px",
            }}>
              MEMORY <span style={{ color: "var(--green)" }}>CHALLENGE_</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>
              Match all tech pairs — fewest moves wins!
            </p>
          </div>

          {/* Stats row */}
          <div className="stats-row">
            {[
              { label: "MOVES",   value: moves },
              { label: "TIME",    value: formatTime(time) },
              { label: "MATCHED", value: `${matched.length / 2}/${TECH_CARDS.length}` },
              { label: "BEST",    value: bestScore ? `${bestScore}` : "---" },
            ].map(({ label, value }) => (
              <div key={label} className="stat-box">
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "2px", color: "var(--green-dim)", marginBottom: "2px" }}>
                  {label}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(13px, 3vw, 18px)", fontWeight: 700, color: "var(--green)" }}>
                  {value}
                </div>
              </div>
            ))}
            <button onClick={restart} className="btn btn-secondary" style={{ padding: "6px 16px", fontSize: "11px", letterSpacing: "2px", whiteSpace: "nowrap" }}>
              ↺ RESET
            </button>
          </div>

          {/* Card grid */}
          <div className="game-grid">
            {deck.map((card, i) => (
              <Card
                key={card.uid}
                card={card}
                isFlipped={flipped.includes(i)}
                isMatched={matched.includes(card.uid)}
                onClick={() => handleCardClick(i)}
              />
            ))}
          </div>
        </div>

        {/* Win overlay */}
        {won && (
          <div style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(5,10,15,0.95)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{
              border: "1px solid var(--green)", background: "#050f0a",
              padding: "40px 32px", textAlign: "center",
              boxShadow: "0 0 60px #00ff8833",
              maxWidth: "360px", width: "90%",
            }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>🏆</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "26px", fontWeight: 900, color: "var(--green)", marginBottom: "8px" }}>
                YOU WIN!
              </h3>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "2px", color: "var(--text-muted)", marginBottom: "24px" }}>
                {moves} MOVES &nbsp;|&nbsp; {formatTime(time)}
                {bestScore === moves && (
                  <span style={{ color: "var(--green)", display: "block", marginTop: "8px" }}>★ NEW BEST!</span>
                )}
              </p>
              <button onClick={restart} className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                PLAY AGAIN
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}