import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function PhoneMockup() {
  const screens = [
    { emoji: "📐", name: "Plise / Rulon", sub: "Ip · Material · Narx", color: "#2563EB" },
    { emoji: "🪟", name: "Combo (Jalyuzi)", sub: "Kv.metr · Material", color: "#059669" },
    { emoji: "👷", name: "Ishchi paneli", sub: "Real-time zakazlar", color: "#C9A84C" },
  ];
  return (
    <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
      <div style={{
        position: "absolute", bottom: -30, width: 160, height: 30,
        background: "radial-gradient(ellipse,rgba(96,165,250,.25) 0%,transparent 70%)",
        filter: "blur(16px)"
      }} />
      <div style={{
        width: 220, background: "#0d1520", borderRadius: 32,
        border: "2px solid #1e2d40",
        boxShadow: "0 0 0 6px rgba(255,255,255,.02),0 40px 80px rgba(0,0,0,.6),0 0 40px rgba(96,165,250,.1)",
        overflow: "hidden", animation: "float 4s ease-in-out infinite"
      }}>
        {/* Status bar */}
        <div style={{ background: "#08111c", height: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 70, height: 5, background: "#1a2535", borderRadius: 3 }} />
        </div>
        <div style={{ padding: "14px 12px 18px" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: "#C9A84C" }}>Hoji Jalyuzi</span>
            <span style={{ fontSize: 8, color: "#2a4060", border: "1px solid #1a2535", padding: "3px 8px", borderRadius: 20 }}>HJ</span>
          </div>

          {/* Result card */}
          <div style={{
            background: "linear-gradient(135deg,#0a1e35,#0f2a48)",
            border: "1px solid #1a3050", borderRadius: 10,
            padding: "10px", marginBottom: 10
          }}>
            <div style={{ fontSize: 7, color: "#2563EB", letterSpacing: 1, marginBottom: 3 }}>E × B = NATIJA</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#60A5FA", lineHeight: 1, marginBottom: 2 }}>
              2.5 <span style={{ fontSize: 10, color: "#4a7aa0" }}>m²</span>
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
              <div style={{ background: "rgba(37,99,235,.2)", borderRadius: 5, padding: "4px 7px" }}>
                <div style={{ fontSize: 6, color: "#60A5FA" }}>Ip</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#60A5FA" }}>6.64m</div>
              </div>
              <div style={{ background: "rgba(217,119,6,.2)", borderRadius: 5, padding: "4px 7px" }}>
                <div style={{ fontSize: 6, color: "#F59E0B" }}>Material</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#F59E0B" }}>0.79m</div>
              </div>
            </div>
          </div>

          {/* Screens list */}
          <div style={{ fontSize: 7, color: "#2a4060", letterSpacing: 1, marginBottom: 6 }}>EKRANLAR</div>
          {screens.map(s => (
            <div key={s.name} style={{
              display: "flex", alignItems: "center", gap: 7, padding: "5px 0",
              borderBottom: "1px solid rgba(255,255,255,.03)"
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: 6,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, flexShrink: 0, background: `${s.color}18`
              }}>{s.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 8, fontWeight: 600, color: "#c8d8e8" }}>{s.name}</div>
                <div style={{ fontSize: 7, color: "#2a4060" }}>{s.sub}</div>
              </div>
              <div style={{ fontSize: 8, color: s.color, fontWeight: 700 }}>›</div>
            </div>
          ))}

          {/* Save btn */}
          <div style={{ marginTop: 10, background: "#C9A84C", borderRadius: 8, padding: "7px", textAlign: "center" }}>
            <div style={{ fontSize: 8, fontWeight: 700, color: "#000" }}>💾 Saqlash</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    icon: "📐",
    title: "Aniq hisob-kitob",
    desc: "Plise va Combo pardalar uchun ip, material, kvadrat metr avtomatik hisoblanadi. O'rnatuvchilar uchun maxsus yaxlitlash qoidasi (< 1.0 uchun)."
  },
  {
    icon: "👥",
    title: "Mijoz va xona bo'yicha saqlash",
    desc: "Har bir o'lcham mijoz ismi, xona nomi, material nomi va karniz rangi bilan saqlanadi. Tarix mijozlar bo'yicha guruhlanadi."
  },
  {
    icon: "👷",
    title: "Ishchi paneli (real-time)",
    desc: "Sotuvchi zakaz yaratganda ishchilar darhol ko'radi — Supabase WebSocket orqali. Status: Yangi → Ishda → Tayyor → Yetkazildi."
  },
  {
    icon: "🔔",
    title: "Push bildirishnomalar",
    desc: "Sotuvchi zakaz yaratganda barcha ishchilar Firebase FCM orqali bildirishnoma oladi. Foreground va background holatda ham ishlaydi."
  },
  {
    icon: "🌐",
    title: "Offline / Online sync",
    desc: "Internet bo'lmasa lokal Hive bazaga saqlanadi. Internet kelganda avtomatik Supabase ga yuboriladi. Hech qanday ma'lumot yo'qolmaydi."
  },
  {
    icon: "📊",
    title: "Statistika va PDF export",
    desc: "Davriy statistika (bugun/hafta/oy), mijozlar reytingi, va professional PDF hisobot — ulashish yoki arxiv uchun."
  },
  {
    icon: "🌙",
    title: "Dark / Light / System tema",
    desc: "Uch xil tema rejimi. Inter font — professional o'qilish. UZ / RU ikki tilli interfeys, har bir matn lokalizatsiya qilingan."
  },
  {
    icon: "💰",
    title: "Narx kalkulyatori",
    desc: "Birlik narxini kiritib, avtomatik jami narxni hisoblang. Natija nusxalanishi va WhatsApp ga yuborilishi mumkin."
  },
  {
    icon: "🔐",
    title: "Rol tizimi (Auth)",
    desc: "Supabase Auth bilan login/signup/forgot password. Seller — to'liq kirish. Worker — faqat zakazlar va shaxsiy hisob. Row Level Security."
  },
];

const TIMELINE = [
  {
    date: "DIZAYN",
    title: "Professional UI/UX",
    desc: "Inter font, dark navy header, rang tizimlari: plise uchun ko'k, combo uchun yashil, primary — oltin. Fieldwork uchun katta o'qiladigan raqamlar."
  },
  {
    date: "HISOB",
    title: "O'rnatuvchilar uchun formulalar",
    desc: "Plise: Ip = (E+B)×2+0.5, Material = B×0.46, Sq.m = E×B. Combo: Kv.metr = E×B, Material = B×2+0.10. Yaxlitlash faqat < 1.0 uchun."
  },
  {
    date: "BACKEND",
    title: "Supabase + offline sync",
    desc: "PostgreSQL, Row Level Security, real-time WebSocket. Hive lokal baza + connectivity_plus orqali sync queue. Internet kelganda avtomatik yuboriladi."
  },
  {
    date: "ROLES",
    title: "Seller va Worker rollari",
    desc: "Seller — to'liq app. Worker — 3 tab: real-time zakazlar, shaxsiy hisob, sozlamalar. Rol asosida avtomatik routing _AuthGate orqali."
  },
  {
    date: "FCM",
    title: "Firebase push notifications",
    desc: "Seller zakaz saqlash → NotificationService → Supabase Edge Function → FCM → barcha worker telefonlari. Background handler ro'yxatdan o'tilgan."
  },
  {
    date: "EXPORT",
    title: "PDF va clipboard export",
    desc: "Professional A4 PDF: navy header, o'lcham kartalar, rangli pill badge'lar. Clipboard uchun emoji formatlangan matn — WhatsApp uchun tayyor."
  },
];

const STACK = [
  "FLUTTER", "DART", "RIVERPOD", "SUPABASE", "FIREBASE FCM",
  "HIVE", "POSTGRESQL", "REAL-TIME", "ANDROID", "PDF EXPORT"
];

export default function HojiJalyuziPage() {
  const navigate = useNavigate();
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal();
  const r4 = useReveal(), r5 = useReveal(), r6 = useReveal();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const ACCENT = "#C9A84C";
  const BLUE   = "#2563EB";

  const tag = {
    fontFamily: "var(--font-mono)", fontSize: 11, color: ACCENT,
    letterSpacing: 3, marginBottom: 10, display: "block",
  };
  const title = {
    fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, letterSpacing: -1,
    marginBottom: 12, lineHeight: 1.15, color: "var(--text)",
  };
  const sub = {
    fontSize: 16, color: "var(--text-muted)", lineHeight: 1.7,
    maxWidth: 500, marginBottom: 48
  };
  const btnA = {
    fontFamily: "var(--font-mono)", letterSpacing: 2, fontSize: 12,
    padding: "14px 28px", background: ACCENT, color: "#000",
    border: "none", cursor: "pointer", fontWeight: 700,
    textDecoration: "none", display: "inline-block", transition: "all .2s",
  };
  const btnB = {
    fontFamily: "var(--font-mono)", letterSpacing: 2, fontSize: 12,
    padding: "14px 28px", background: "transparent", color: "#5a4a2a",
    border: "1px solid #2a1e08", cursor: "pointer",
    textDecoration: "none", display: "inline-block", transition: "all .2s",
  };

  return (
    <div style={{
      background: "#050a0f", color: "#c8d8e8",
      minHeight: "100vh", paddingTop: 64, overflowX: "hidden"
    }}>

      {/* Scanline */}
      <div style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", left: 0, right: 0, height: 3,
          background: "linear-gradient(transparent,rgba(201,168,76,.05),transparent)",
          animation: "scanline 8s linear infinite"
        }} />
      </div>

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px", height: 64,
        background: "rgba(5,10,15,0.92)", borderBottom: "1px solid #1a1000",
        backdropFilter: "blur(12px)"
      }}>
        <div
          style={{
            fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 900,
            color: "var(--green)", letterSpacing: 4,
            animation: "flicker 6s infinite", cursor: "pointer"
          }}
          onClick={() => navigate("/")}
        >
          IM<span style={{ color: "var(--text)", fontWeight: 400 }}>_DEV</span>
        </div>
        <button className="nav-link" style={{ fontSize: 12, letterSpacing: 2 }}
          onClick={() => navigate("/")}>
          ← BACK
        </button>
      </nav>

      {/* Hero */}
      <div style={{
        padding: "80px 40px 60px", maxWidth: 1100, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80,
        alignItems: "center", animation: "fadeUp .7s ease both"
      }} className="chontak-hero">
        <div>
          <span style={tag}>// PROJECT.FLUTTER</span>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px,5.5vw,62px)", fontWeight: 900,
            lineHeight: 1, letterSpacing: -2, marginBottom: 12,
            color: ACCENT
          }}>
            Hoji<br />Jalyuzi<span style={{ color: "var(--text)" }}>_</span>
          </h1>
          <p style={{
            fontSize: 17, color: "var(--text-muted)", lineHeight: 1.7,
            marginBottom: 32, maxWidth: 460
          }}>
            O'rnatuvchilar uchun professional parda o'lchov va hisob-kitob tizimi.
            Seller zakazlari real-time ishchilarga yetadi. Offline ham ishlaydi.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
            <a href="/hoji_jalyuzi.apk" download style={{ textDecoration: "none" }}>
              <span style={btnA}
                onMouseEnter={e => { e.currentTarget.style.background = "#E8D5A0"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.transform = "none"; }}>
                ↓ DOWNLOAD APK
              </span>
            </a>
            <a href="https://github.com/isfandiyorTM" target="_blank"
              rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <span style={btnB}
                onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a1e08"; e.currentTarget.style.color = "#5a4a2a"; }}>
                ⌥ GITHUB
              </span>
            </a>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {STACK.map(t => (
              <span key={t} style={{
                fontFamily: "var(--font-mono)", fontSize: 10,
                letterSpacing: 1, padding: "5px 12px",
                border: "1px solid #2a1e08", color: "#7a6a40"
              }}>{t}</span>
            ))}
          </div>
        </div>
        <PhoneMockup />
      </div>

      {/* Stats */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px 60px" }}>
        <div ref={r1} className="reveal" style={{
          display: "grid", gridTemplateColumns: "repeat(4,1fr)",
          border: "1px solid #2a1e08", overflow: "hidden"
        }}>
          {[
            ["2", "Parda turi"],
            ["3", "Foydalanuvchi roli"],
            ["100%", "Offline ready"],
            ["Real-time", "Ishchi paneli"],
          ].map(([n, l], i) => (
            <div key={l} style={{
              padding: 32, textAlign: "center",
              borderRight: i < 3 ? "1px solid #2a1e08" : "none"
            }}>
              <div style={{
                fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 900,
                color: ACCENT, lineHeight: 1, marginBottom: 6
              }}>{n}</div>
              <div style={{ fontSize: 11, color: "#5a4a2a", letterSpacing: 1 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: "60px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div ref={r2} className="reveal">
          <span style={tag}>// FEATURES.SH</span>
          <h2 style={title}>O'rnatuvchilar uchun <span style={{ color: ACCENT }}>qurilgan.</span></h2>
          <p style={sub}>Maydon sharoitida tez, aniq va ishonchli. Bir qo'lda ushlab hisoblash mumkin.</p>
        </div>
        <div ref={r3} className="reveal chontak-feat-grid"
          style={{
            display: "grid", gridTemplateColumns: "repeat(3,1fr)",
            border: "1px solid #2a1e08", overflow: "hidden"
          }}>
          {FEATURES.map((f, i) => (
            <div key={f.title}
              style={{
                background: "#050f1a", padding: "26px 22px",
                borderRight: i % 3 < 2 ? "1px solid #2a1e08" : "none",
                borderBottom: i < 6 ? "1px solid #2a1e08" : "none",
                transition: "background .2s"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#0a140a"}
              onMouseLeave={e => e.currentTarget.style.background = "#050f1a"}>
              <div style={{
                width: 40, height: 40, background: `${ACCENT}18`,
                border: `1px solid ${ACCENT}30`, borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, marginBottom: 12
              }}>{f.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, color: "#e2e8f0" }}>{f.title}</div>
              <div style={{ fontSize: 12, color: "#7a9ab0", lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture diagram */}
      <div style={{ background: "#030608", padding: "80px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div ref={r4} className="reveal">
            <span style={tag}>// ARCHITECTURE.SH</span>
            <h2 style={title}>Qanday <span style={{ color: ACCENT }}>ishlaydi.</span></h2>
          </div>
          <div className="reveal" style={{
            display: "grid", gridTemplateColumns: "repeat(3,1fr)",
            gap: 16, marginTop: 32
          }}>
            {[
              {
                role: "SELLER 📱",
                color: BLUE,
                items: ["Hisoblash (Plise/Combo)", "Zakaz yaratish + saqlash", "Barcha zakazlar tarixi", "Statistika va PDF", "Material hisobi"]
              },
              {
                role: "BACKEND ☁️",
                color: ACCENT,
                items: ["Supabase PostgreSQL", "Row Level Security", "Real-time WebSocket", "Offline sync queue", "FCM Edge Function"]
              },
              {
                role: "WORKER 👷",
                color: "#059669",
                items: ["Real-time zakazlar ko'rish", "Status yangilash", "Push bildirishnoma", "Shaxsiy hisob-kitob", "Chiqish"]
              }
            ].map(col => (
              <div key={col.role} style={{
                border: `1px solid ${col.color}30`,
                borderRadius: 12, overflow: "hidden"
              }}>
                <div style={{
                  background: `${col.color}15`, padding: "14px 18px",
                  borderBottom: `1px solid ${col.color}20`
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: col.color, letterSpacing: 1 }}>
                    {col.role}
                  </div>
                </div>
                <div style={{ padding: "14px 18px" }}>
                  {col.items.map(item => (
                    <div key={item} style={{
                      fontSize: 12, color: "#7a9ab0", padding: "5px 0",
                      borderBottom: "1px solid rgba(255,255,255,.03)",
                      display: "flex", alignItems: "center", gap: 8
                    }}>
                      <span style={{ color: col.color, fontSize: 10 }}>▸</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ padding: "80px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div ref={r5} className="reveal">
            <span style={tag}>// BUILD.LOG</span>
            <h2 style={title}>Qisqadan <span style={{ color: ACCENT }}>to'liq sistema.</span></h2>
            <p style={sub}>Sodda kalkulyatordan real backend, real-time va push notification li sistemaga.</p>
          </div>
          <div className="reveal">
            {TIMELINE.map((item, i) => (
              <div key={item.date} style={{
                display: "grid", gridTemplateColumns: "90px 1px 1fr",
                gap: "0 28px", padding: "22px 0",
                borderBottom: i < TIMELINE.length - 1 ? "1px solid #2a1e08" : "none",
                alignItems: "start"
              }}>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: 10,
                  color: ACCENT, letterSpacing: 1,
                  paddingTop: 4, textAlign: "right", opacity: 0.7
                }}>{item.date}</div>
                <div style={{ background: "#2a1e08", position: "relative" }}>
                  <div style={{
                    position: "absolute", top: 4, left: "50%",
                    transform: "translateX(-50%)", width: 8, height: 8,
                    background: ACCENT, borderRadius: "50%",
                    border: "2px solid #030608"
                  }} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 5, color: "#e2e8f0" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 12, color: "#7a9ab0", lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div ref={r6} className="reveal" style={{
        padding: "100px 40px", textAlign: "center",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)", width: 500, height: 250,
          background: `radial-gradient(ellipse,${ACCENT}10 0%,transparent 70%)`,
          pointerEvents: "none"
        }} />
        <span style={tag}>// INSTALL.APK</span>
        <h2 style={{ ...title, maxWidth: 480, margin: "0 auto 12px" }}>
          Android qurilmangizda <span style={{ color: ACCENT }}>sinab ko'ring.</span>
        </h2>
        <p style={{
          fontSize: 15, color: "var(--text-muted)", maxWidth: 400,
          margin: "0 auto 36px", lineHeight: 1.7
        }}>
          To'g'ridan-to'g'ri APK. Android 7.0+ da ishlaydi.
          Offline ham to'liq ishlaydi.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/hoji_jalyuzi.apk" download style={{ textDecoration: "none" }}>
            <span style={{ ...btnA, padding: "16px 40px", fontSize: 13 }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#E8D5A0";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = `0 12px 40px ${ACCENT}50`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = ACCENT;
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
              }}>
              ↓ DOWNLOAD APK
            </span>
          </a>
          <a href="https://github.com/isfandiyorTM" target="_blank"
            rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <span style={{ ...btnB, padding: "16px 40px", fontSize: 13 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a1e08"; e.currentTarget.style.color = "#5a4a2a"; }}>
              ⌥ VIEW SOURCE
            </span>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid #2a1e08", padding: "24px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 1, color: "#3a2a10" }}>
          © 2026 ISFANDIYOR MADAMINOV — HOJI JALYUZI v1.0.0
        </span>
        <button
          style={{
            fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 1,
            color: "#3a2a10", background: "none", border: "none",
            cursor: "pointer", transition: "color .2s"
          }}
          onClick={() => navigate("/")}
          onMouseEnter={e => e.target.style.color = ACCENT}
          onMouseLeave={e => e.target.style.color = "#3a2a10"}>
          ← IM_DEV HOME
        </button>
      </footer>
    </div>
  );
}