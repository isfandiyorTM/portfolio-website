import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LINES = [
  "$ cd /page-not-found",
  "bash: cd: /page-not-found: No such file or directory",
  "$ ls -la ./requested-route",
  "ls: cannot access './requested-route': No such file or directory",
  "$ ping destination.dev",
  "ping: destination.dev: Name or service not known",
  "$ sudo find / -name 'page.jsx'",
  "find: permission denied (404)",
  "$ echo $EXIT_CODE",
  "404",
];

function TerminalCursor() {
  const [v, setV] = useState(true);
  useEffect(() => { const t = setInterval(() => setV(x => !x), 530); return () => clearInterval(t); }, []);
  return <span style={{ display:"inline-block", width:9, height:"1em", background: v ? "var(--green)" : "transparent", verticalAlign:"middle", marginLeft:2 }} />;
}

export default function NotFoundPage() {
  const navigate = useNavigate();
  const [visibleLines, setVisibleLines] = useState([]);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      if (i < LINES.length) { setVisibleLines(l => [...l, LINES[i]]); i++; }
      else clearInterval(iv);
    }, 320);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 180);
    }, 3500);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg)", display: "flex",
      flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "40px 24px", position: "relative", overflow: "hidden",
    }}>
      {/* Grid background */}
      <div className="grid-bg" style={{ position:"absolute", inset:0, opacity:0.5 }} />

      {/* 404 */}
      <div style={{
        fontFamily: "var(--font-display)", fontSize: "clamp(80px,18vw,180px)",
        fontWeight: 900, color: "var(--green)", lineHeight: 1,
        animation: glitch ? "glitch 0.18s steps(2) forwards" : "none",
        marginBottom: 8, position: "relative", zIndex: 1,
        textShadow: "0 0 40px rgba(0,255,136,0.3)",
      }}>
        404
      </div>

      <div style={{
        fontFamily: "var(--font-mono)", fontSize: "clamp(11px,2vw,14px)",
        letterSpacing: 4, color: "var(--text-muted)", marginBottom: 40,
        position: "relative", zIndex: 1,
      }}>
        // PAGE_NOT_FOUND
      </div>

      {/* Terminal window */}
      <div style={{
        width: "100%", maxWidth: 560, border: "1px solid var(--green-dark)",
        background: "rgba(0,10,5,0.7)", position: "relative", zIndex: 1,
        marginBottom: 40,
      }}>
        {/* Title bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "8px 14px", borderBottom: "1px solid var(--green-dark)",
          background: "rgba(0,255,136,0.03)",
        }}>
          {["#ff5f57","#febc2e","#28c840"].map(c => (
            <div key={c} style={{ width:10, height:10, borderRadius:"50%", background:c, opacity:0.7 }} />
          ))}
          <span style={{ fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:2, color:"var(--text-muted)", marginLeft:8 }}>
            bash — 404
          </span>
        </div>

        {/* Terminal output */}
        <div style={{ padding: "16px 18px", minHeight: 200 }}>
          {visibleLines.map((line, i) => (
            <div key={i} style={{
              fontFamily: "var(--font-mono)", fontSize: "clamp(10px,1.6vw,13px)",
              lineHeight: 1.8,
              color: line.startsWith("$") ? "var(--green)" : "var(--text-muted)",
            }}>
              {line}
            </div>
          ))}
          {visibleLines.length < LINES.length && (
            <div style={{ fontFamily:"var(--font-mono)", fontSize:13, color:"var(--green)", lineHeight:1.8 }}>
              $ <TerminalCursor />
            </div>
          )}
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => navigate("/")}
        style={{ position: "relative", zIndex: 1, letterSpacing: 3 }}
      >
        ← RETURN HOME
      </button>
    </div>
  );
}
