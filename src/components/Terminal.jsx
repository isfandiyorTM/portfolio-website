import { useState, useRef, useEffect } from "react";

const PROMPT = "ISF@PORTFOLIO ~ $";

const ALL_CMDS = ["about","clear","close","contact","hack","help","ls","projects","resume","secret","skills","whoami"];

const ach = (id) => window.dispatchEvent(new CustomEvent("achievement:unlock", { detail: id }));

const HACK_LINES = [
  { t: "INITIATING HACK SEQUENCE v2.4.1",                             d: 0    },
  { t: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",          d: 80   },
  { t: "  TARGET    isfandiyormadaminov12@gmail.com",                  d: 160  },
  { t: "  VECTOR    portfolio_terminal_v2",                            d: 240  },
  { t: "",                                                             d: 320  },
  { t: "> import socket, hashlib, base64, subprocess",                 d: 500  },
  { t: "> from exploit_kit import RCEPayload, Brute",                  d: 680  },
  { t: "> target = dns.resolve('isfandiyor.dev')",                     d: 860  },
  { t: "  → 104.21.80.182",                                            d: 1020 },
  { t: "> s = socket.connect((target, 443))",                          d: 1180 },
  { t: "> payload = RCEPayload.generate(arch='x86_64')",               d: 1360 },
  { t: "> Brute.ssh(target, user='root', wordlist='rockyou.txt')",     d: 1540 },
  { t: "  [·] root:password123         → FAILED",                     d: 1760 },
  { t: "  [·] root:qwerty2024          → FAILED",                     d: 1940 },
  { t: "  [·] admin:isfandiyor1234     → FAILED",                     d: 2120 },
  { t: "  [✓] admin:m@d@m1n0v         → SUCCESS",       hi: true,    d: 2340 },
  { t: "> sudo su -",                                                   d: 2560 },
  { t: "  root@portfolio-server:~#",                                    d: 2720 },
  { t: "> ls /var/www/portfolio/src/",                                  d: 2900 },
  { t: "  App.jsx  components/  hooks/  styles/  i18n/",               d: 3060 },
  { t: "> cat .env",                                                     d: 3220 },
  { t: "  VITE_CONTACT_KEY=sk_live_••••••••••••••••",                  d: 3380 },
  { t: "  VITE_SECRET=••••••••••••••••••••••••••••••",                 d: 3480 },
  { t: "> grep -r 'password\\|secret\\|token' ./src --include='*.js'", d: 3640 },
  { t: "  ./src/config.js:apiKey = 'AIza••••••••••••••••••••'",        d: 3820 },
  { t: "  ./src/.env.local:DB_PASS = '••••••••••••'",                  d: 3960 },
  { t: "> find / -name '*.key' -o -name 'id_rsa' 2>/dev/null",         d: 4140 },
  { t: "  /root/.ssh/id_rsa              [EXTRACTED]",    hi: true,    d: 4340 },
  { t: "  /home/isfandiyor/secrets.json  [EXTRACTED]",    hi: true,    d: 4480 },
  { t: "> exfil --target pastebin --encrypt aes256",                    d: 4640 },
  { t: "  Uploading 4 files (12.3 KB)... done.",                        d: 4820 },
  { t: "",                                                              d: 4960 },
  { t: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",            d: 5060 },
  { t: "  ▸ ROOT ACCESS GRANTED",                         hi: true,    d: 5260 },
  { t: "  ▸ WELCOME BACK, ISFANDIYOR MADAMINOV",          hi: true,    d: 5440 },
  { t: "",                                                              d: 5540 },
];

function process(cmd) {
  switch (cmd.trim().toLowerCase()) {
    case "help": case "?":
      return {
        lines: [
          "  about      who I am",
          "  skills     tech stack",
          "  projects   my work",
          "  contact    get in touch",
          "  resume     view my CV",
          "  whoami     identity check",
          "  ls         list directory",
          "  secret     ???",
          "  hack       ...don't",
          "  clear      clear screen",
          "  close      close terminal",
        ],
      };

    case "whoami": case "me":
      return {
        lines: [
          "Isfandiyor Madaminov",
          "IT Teacher & Flutter Developer",
          "Location: Tashkent, Uzbekistan",
        ],
      };

    case "about":
      return {
        lines: [
          "Teaching 450+ students at Rahimov School.",
          "Flutter apps with Clean Architecture & BLoC.",
          "From computer basics to full-stack — I cover it.",
          "Available for freelance and full-time roles.",
        ],
      };

    case "skills":
      return {
        lines: [
          "LANGUAGES   Dart · JavaScript · Python",
          "FRAMEWORKS  Flutter · React",
          "BACKEND     Firebase · REST · Node.js",
          "TOOLS       Git · Figma · VS Code",
          "TEACHING    450+ students · 4+ years",
        ],
      };

    case "projects":
      setTimeout(() => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      }, 400);
      return {
        lines: [
          "→ Chontak       social platform (Flutter)",
          "→ HojiJalyuzi   business management (Flutter)",
          "→ RahimovDevs   dev agency website (React)",
          "",
          "Navigating to #projects...",
        ],
        close: true,
      };

    case "contact":
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 400);
      return {
        lines: [
          "Email    isfandiyormadaminov12@gmail.com",
          "",
          "Navigating to #contact...",
        ],
        close: true,
      };

    case "resume": case "cv":
      setTimeout(() => window.open("/resume", "_blank"), 300);
      return { lines: ["Opening resume in a new tab..."] };

    case "ls": case "dir":
      return {
        lines: [
          "drwxr-xr-x  projects/",
          "drwxr-xr-x  skills/",
          "-rw-r--r--  resume.pdf",
          "-rw-r--r--  contact.txt",
          "-rw-r--r--  about.md",
          "-r--------  secret.txt     [ACCESS DENIED]",
        ],
      };

    case "secret": case "hint":
      return {
        lines: [
          "[ CLASSIFIED ]",
          "Try typing your surname on the keyboard...",
        ],
      };

    case "hack":
      return { stream: HACK_LINES };

    case "clear": case "cls":
      return "CLEAR";

    case "close": case "exit": case "quit":
      return "CLOSE";

    case "":
      return null;

    default:
      return {
        lines: [
          `bash: ${cmd}: command not found`,
          "type 'help' for available commands.",
        ],
        error: true,
      };
  }
}

const WELCOME = [
  "ISFANDIYOR MADAMINOV — portfolio terminal",
  "──────────────────────────────────────────",
  "Type 'help' for available commands.",
  "",
];

const CSS = `
@keyframes kb-terminal-open {
  from { opacity:0; transform:translate(-50%,-50%) scale(0.96) translateY(-8px); }
  to   { opacity:1; transform:translate(-50%,-50%) scale(1)    translateY(0px); }
}
`;

export default function Terminal() {
  const [open, setOpen]       = useState(false);
  const [history, setHistory] = useState(WELCOME.map(t => ({ kind: "out", text: t })));
  const [input, setInput]     = useState("");
  const [cmdHist, setCmdHist] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);

  const inputRef  = useRef(null);
  const bottomRef = useRef(null);
  const openRef   = useRef(false);
  openRef.current = open;

  useEffect(() => {
    const h = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "/" && !openRef.current) {
        e.preventDefault();
        setOpen(true);
        ach("curious");
      }
      if (e.key === "Escape" && openRef.current) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [history]);

  const submit = (e) => {
    e.preventDefault();
    const cmd = input.trim();
    if (cmd) setCmdHist(h => [cmd, ...h].slice(0, 50));
    setHistIdx(-1);
    setInput("");
    setHistory(h => [...h, { kind: "in", text: cmd }]);
    const res = process(cmd);
    if (res === "CLEAR") { setHistory([]); return; }
    if (res === "CLOSE") { setTimeout(() => setOpen(false), 120); return; }
    if (res?.stream) {
      res.stream.forEach(({ t, d, hi }) => {
        setTimeout(() => {
          setHistory(h => [...h, { kind: hi ? "hi" : "out", text: t }]);
        }, d ?? 0);
      });
      // Achievement after last line
      setTimeout(() => ach("hacker"), (res.stream.at(-1)?.d ?? 0) + 200);
      return;
    }
    if (res) {
      setHistory(h => [
        ...h,
        ...res.lines.map(t => ({ kind: res.error ? "err" : "out", text: t })),
        { kind: "out", text: "" },
      ]);
      if (res.close) setTimeout(() => setOpen(false), 700);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") { setOpen(false); return; }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, cmdHist.length - 1);
      setHistIdx(idx);
      setInput(cmdHist[idx] ?? "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx === -1 ? "" : cmdHist[idx]);
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const lower = input.toLowerCase();
      const matches = ALL_CMDS.filter(c => c.startsWith(lower) && c !== lower);
      if (matches.length > 0) setInput(matches[0]);
    }
  };

  return (
    <>
      <style>{CSS}</style>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 9998,
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(3px)",
            }}
          />

          <div style={{
            position: "fixed", top: "50%", left: "50%",
            zIndex: 9999,
            width: "min(640px, 92vw)",
            height: "min(420px, 72vh)",
            display: "flex", flexDirection: "column",
            background: "rgba(4,12,7,0.98)",
            border: "1px solid rgba(0,255,136,0.28)",
            borderRadius: 10,
            boxShadow: "0 0 60px rgba(0,255,136,0.14), 0 40px 80px rgba(0,0,0,0.85)",
            animation: "kb-terminal-open 0.2s ease both",
            overflow: "hidden",
            fontFamily: "var(--font-mono)",
          }}>

            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 16px",
              background: "rgba(0,255,136,0.04)",
              borderBottom: "1px solid rgba(0,255,136,0.1)",
              flexShrink: 0,
            }}>
              {["#ff5f57","#febc2e","#28c840"].map(c => (
                <div
                  key={c}
                  onClick={c === "#ff5f57" ? () => setOpen(false) : undefined}
                  style={{
                    width: 12, height: 12, borderRadius: "50%", background: c,
                    cursor: c === "#ff5f57" ? "pointer" : "default",
                  }}
                />
              ))}
              <span style={{ marginLeft: 8, fontSize: 11, color: "rgba(0,255,136,0.45)", letterSpacing: "2px" }}>
                TERMINAL  ·  ESC to close  ·  TAB to autocomplete
              </span>
            </div>

            <div style={{
              flex: 1, overflowY: "auto", padding: "14px 20px 8px",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0,255,136,0.15) transparent",
            }}>
              {history.map((item, i) => (
                <div key={i} style={{
                  fontSize: 13, lineHeight: 1.75,
                  color: item.kind === "err"
                    ? "rgba(255,90,90,0.9)"
                    : item.kind === "in"
                      ? "rgba(0,255,136,1)"
                      : item.kind === "hi"
                        ? "rgba(0,255,136,1)"
                        : "rgba(0,255,136,0.6)",
                  fontWeight: item.kind === "hi" ? 700 : 400,
                  whiteSpace: "pre",
                }}>
                  {item.kind === "in" ? `${PROMPT} ${item.text}` : `  ${item.text}`}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={submit} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 20px",
              borderTop: "1px solid rgba(0,255,136,0.08)",
              flexShrink: 0,
            }}>
              <span style={{ color: "rgba(0,255,136,0.7)", fontSize: 13, whiteSpace: "nowrap" }}>
                {PROMPT}
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                style={{
                  flex: 1, background: "transparent", border: "none", outline: "none",
                  color: "#00ff88", fontSize: 13, fontFamily: "inherit",
                  caretColor: "#00ff88",
                }}
              />
            </form>
          </div>
        </>
      )}
    </>
  );
}
