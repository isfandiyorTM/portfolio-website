import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ACCENT = "#00ff88";

const STUDENTS = [
  {
    name: "Ahmadjon Ilhamov",
    grade: "6th Grade",
    init: "AI",
    projects: ["Finance Tracker", "Stock Simulator", "Task Manager", "Messenger"],
    url: "https://portfolio-ahmadjon-ilhamov.netlify.app/",
    desc: "4 live projects at age 12. Started from zero, now shipping full apps.",
  },
  {
    name: "Muhammadaziz Mahmudjonov",
    grade: "Age 12",
    init: "MM",
    projects: ["Portfolio Site", "Calculator App", "Quiz Game"],
    url: "https://muhammadaziz-programmer.netlify.app/",
    desc: "HTML, CSS, JS from scratch — already deploying from Tashkent.",
  },
  {
    name: "Baxodirov Salohiddin",
    grade: "Student",
    init: "BS",
    projects: ["Web Projects"],
    url: "https://baxodirov-salohiddin.netlify.app/",
    desc: "Building web projects and growing fast with every PR review.",
  },
];

const STATS = [
  ["50+", "Students mentored"],
  ["3+",  "Live portfolios"],
  ["3",   "Years of mentoring"],
  ["100%","Real projects"],
];

const HOW = [
  { icon:"📋", title:"Structured curriculum",  desc:"Each student gets a personal roadmap — from HTML basics to shipping a live site. No fluff, just building." },
  { icon:"🔍", title:"Real code reviews",       desc:"Every project goes through proper PR reviews. Students learn to write clean, readable, production-level code." },
  { icon:"🚀", title:"Ship early, ship often",  desc:"Students deploy their first project within weeks. The goal is working software, not perfect theory." },
  { icon:"🌐", title:"Live on rahimovdevs.tech", desc:"Every finished project is published to rahimovdevs.tech — a real audience, a real portfolio, real motivation." },
];

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function BrowserMockup() {
  return (
    <div style={{ display:"flex", justifyContent:"center", position:"relative" }}>
      <div style={{
        position:"absolute", bottom:-20, width:200, height:24,
        background:`radial-gradient(ellipse,${ACCENT}30 0%,transparent 70%)`,
        filter:"blur(12px)",
      }} />
      <div style={{
        width:320, background:"#050a0f", border:`1px solid ${ACCENT}30`,
        boxShadow:`0 0 0 1px ${ACCENT}15, 0 40px 80px rgba(0,0,0,.6), 0 0 60px ${ACCENT}15`,
        animation:"float 5s ease-in-out infinite",
      }}>
        {/* Browser bar */}
        <div style={{ padding:"10px 14px", borderBottom:`1px solid ${ACCENT}20`, display:"flex", alignItems:"center", gap:10, background:`${ACCENT}05` }}>
          <div style={{ display:"flex", gap:5 }}>
            {["#ff5f57","#febc2e","#28c840"].map(c => (
              <div key={c} style={{ width:8, height:8, borderRadius:"50%", background:c }} />
            ))}
          </div>
          <div style={{ flex:1, background:"#0a1a0d", padding:"4px 10px", fontFamily:"monospace", fontSize:10, color:ACCENT, textAlign:"center", letterSpacing:1 }}>
            rahimovdevs.tech
          </div>
        </div>
        {/* Mock content */}
        <div style={{ padding:"18px 16px" }}>
          <div style={{ fontFamily:"monospace", fontSize:9, color:`${ACCENT}80`, letterSpacing:3, marginBottom:10 }}>// O'QUVCHILAR WEB LOYIHALARI</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:12 }}>
            {STUDENTS.slice(0,2).map(s => (
              <div key={s.name} style={{ background:`${ACCENT}08`, border:`1px solid ${ACCENT}20`, padding:"10px 10px" }}>
                <div style={{ width:24, height:24, borderRadius:"50%", background:`${ACCENT}15`, border:`1px solid ${ACCENT}30`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:9, fontWeight:700, color:ACCENT, marginBottom:6 }}>{s.init}</div>
                <div style={{ fontSize:9, fontWeight:700, color:"#c8d8e8", marginBottom:2 }}>{s.name.split(" ")[0]}</div>
                <div style={{ fontSize:8, color:`${ACCENT}80` }}>{s.grade}</div>
              </div>
            ))}
          </div>
          <div style={{ background:`${ACCENT}08`, border:`1px solid ${ACCENT}20`, padding:"8px 10px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ fontFamily:"monospace", fontSize:9, color:ACCENT }}>VIEW ALL PROJECTS</div>
            <div style={{ fontSize:10, color:ACCENT }}>↗</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RahimovDevsPage() {
  const navigate = useNavigate();
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal(), r4 = useReveal();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tag  = { fontFamily:"var(--font-mono)", fontSize:11, color:ACCENT, letterSpacing:3, marginBottom:10, display:"block" };
  const h2   = { fontFamily:"var(--font-display)", fontSize:"clamp(26px,4vw,40px)", fontWeight:900, letterSpacing:-1, marginBottom:12, lineHeight:1.15, color:"var(--text)" };
  const sub  = { fontSize:16, color:"var(--text-muted)", lineHeight:1.7, maxWidth:500, marginBottom:40 };

  return (
    <div style={{ background:"#050a0f", color:"#c8d8e8", minHeight:"100vh", paddingTop:64, overflowX:"hidden" }}>

      {/* Scanline */}
      <div style={{ position:"fixed", inset:0, zIndex:9999, pointerEvents:"none", overflow:"hidden" }}>
        <div style={{ position:"absolute", left:0, right:0, height:3, background:`linear-gradient(transparent,${ACCENT}08,transparent)`, animation:"scanline 8s linear infinite" }} />
      </div>

      {/* Nav */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 40px", height:64, background:"rgba(5,10,15,0.92)", borderBottom:"1px solid var(--green-dark)", backdropFilter:"blur(12px)" }}>
        <div style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:900, color:ACCENT, letterSpacing:4, animation:"flicker 6s infinite", cursor:"pointer" }} onClick={() => navigate("/")}>
          IM<span style={{ color:"var(--text)", fontWeight:400 }}>_DEV</span>
        </div>
        <button className="nav-link" style={{ fontSize:12, letterSpacing:2 }} onClick={() => navigate("/")}>← BACK</button>
      </nav>

      {/* Hero */}
      <div style={{ padding:"80px 40px 60px", maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center", animation:"fadeUp .7s ease both" }} className="chontak-hero">
        <div>
          <span style={tag}>// STUDENT_PLATFORM</span>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(36px,5.5vw,62px)", fontWeight:900, lineHeight:1, letterSpacing:-2, marginBottom:12, color:ACCENT }}>
            Rahimov<br /><span style={{ color:"var(--text)" }}>Devs</span><span style={{ color:ACCENT }}>_</span>
          </h1>
          <p style={{ fontSize:17, color:"var(--text-muted)", lineHeight:1.7, marginBottom:32, maxWidth:440 }}>
            A live platform where my students publish their web projects — built from scratch, deployed to the world, and growing with every lesson.
          </p>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:24 }}>
            <a href="https://rahimovdevs.tech" target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
              <button style={{ fontFamily:"var(--font-mono)", letterSpacing:2, fontSize:12, padding:"14px 28px", background:ACCENT, color:"#000", border:"none", cursor:"pointer", fontWeight:700, transition:"all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background="#7affcc"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background=ACCENT; e.currentTarget.style.transform="none"; }}>
                ↗ VISIT SITE
              </button>
            </a>
            <button style={{ fontFamily:"var(--font-mono)", letterSpacing:2, fontSize:12, padding:"14px 28px", background:"transparent", color:"var(--green-dim)", border:"1px solid var(--green-dark)", cursor:"pointer", transition:"all .2s" }}
              onClick={() => navigate("/")}
              onMouseEnter={e => { e.currentTarget.style.borderColor=ACCENT; e.currentTarget.style.color=ACCENT; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="var(--green-dark)"; e.currentTarget.style.color="var(--green-dim)"; }}>
              ← BACK TO PORTFOLIO
            </button>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {["HTML","CSS","JavaScript","React","Netlify"].map(t => (
              <span key={t} style={{ fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:1, padding:"5px 12px", border:"1px solid var(--green-dark)", color:"var(--green-dim)" }}>{t}</span>
            ))}
          </div>
        </div>
        <BrowserMockup />
      </div>

      {/* Stats */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 40px 60px" }}>
        <div ref={r1} className="reveal" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", border:"1px solid var(--green-dark)", overflow:"hidden" }}>
          {STATS.map(([n,l], i) => (
            <div key={l} style={{ padding:32, textAlign:"center", borderRight: i < 3 ? "1px solid var(--green-dark)" : "none" }}>
              <div style={{ fontFamily:"var(--font-display)", fontSize:32, fontWeight:900, color:ACCENT, lineHeight:1, marginBottom:6 }}>{n}</div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--text-muted)", letterSpacing:2, textTransform:"uppercase" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Students */}
      <div style={{ padding:"40px 40px 80px", maxWidth:1100, margin:"0 auto" }}>
        <div ref={r2} className="reveal">
          <span style={tag}>// STUDENT_ROSTER</span>
          <h2 style={h2}>Meet the <span style={{ color:ACCENT }}>builders.</span></h2>
          <p style={sub}>These students started from zero and now have live portfolios the world can visit.</p>
        </div>
        <div className="reveal" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }} ref={r3}>
          {STUDENTS.map(s => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
              <div style={{ padding:24, border:"1px solid var(--green-dark)", background:"#050a0f", height:"100%", transition:"all .2s", cursor:"pointer" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=ACCENT; e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 12px 40px ${ACCENT}15`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="var(--green-dark)"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
                {/* Avatar */}
                <div style={{ width:48, height:48, borderRadius:"50%", background:`${ACCENT}10`, border:`1px solid ${ACCENT}30`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-mono)", fontSize:14, fontWeight:700, color:ACCENT, marginBottom:16 }}>
                  {s.init}
                </div>
                <div style={{ fontWeight:700, fontSize:16, color:"var(--text)", marginBottom:4 }}>{s.name}</div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:2, color:ACCENT, marginBottom:12 }}>{s.grade}</div>
                <p style={{ fontSize:13, color:"var(--text-muted)", lineHeight:1.6, marginBottom:16 }}>{s.desc}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:16 }}>
                  {s.projects.map(p => (
                    <span key={p} style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:1, padding:"3px 8px", border:"1px solid var(--green-dark)", color:"var(--green-dim)" }}>{p}</span>
                  ))}
                </div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:ACCENT, letterSpacing:1 }}>view portfolio →</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ background:"#030608", padding:"80px 40px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div ref={r4} className="reveal">
            <span style={tag}>// HOW_IT_WORKS</span>
            <h2 style={h2}>The mentorship <span style={{ color:ACCENT }}>approach.</span></h2>
            <p style={sub}>Not a bootcamp, not a course. A real mentor–student relationship with real deliverables.</p>
          </div>
          <div className="reveal" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:1, border:"1px solid var(--green-dark)", overflow:"hidden" }}>
            {HOW.map((item, i) => (
              <div key={item.title} style={{ padding:"28px 24px", background:"#050a0f", borderRight: i%2===0 ? "1px solid var(--green-dark)" : "none", borderBottom: i<2 ? "1px solid var(--green-dark)" : "none", transition:"background .2s" }}
                onMouseEnter={e => e.currentTarget.style.background="#071008"}
                onMouseLeave={e => e.currentTarget.style.background="#050a0f"}>
                <div style={{ width:40, height:40, background:`${ACCENT}10`, border:`1px solid ${ACCENT}25`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, marginBottom:14 }}>{item.icon}</div>
                <div style={{ fontSize:14, fontWeight:700, marginBottom:8, color:"#e2e8f0" }}>{item.title}</div>
                <div style={{ fontSize:13, color:"var(--text-muted)", lineHeight:1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding:"100px 40px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:500, height:250, background:`radial-gradient(ellipse,${ACCENT}08 0%,transparent 70%)`, pointerEvents:"none" }} />
        <span style={tag}>// VISIT_SITE</span>
        <h2 style={{ ...h2, maxWidth:480, margin:"0 auto 12px" }}>See the students' work <span style={{ color:ACCENT }}>live.</span></h2>
        <p style={{ fontSize:15, color:"var(--text-muted)", maxWidth:400, margin:"0 auto 36px", lineHeight:1.7 }}>
          Every project on rahimovdevs.tech was built by a real student, from real mentorship sessions.
        </p>
        <a href="https://rahimovdevs.tech" target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
          <button style={{ fontFamily:"var(--font-mono)", letterSpacing:3, fontSize:13, padding:"16px 40px", background:ACCENT, color:"#000", border:"none", cursor:"pointer", fontWeight:700, transition:"all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.background="#7affcc"; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=`0 12px 40px ${ACCENT}50`; }}
            onMouseLeave={e => { e.currentTarget.style.background=ACCENT; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
            ↗ OPEN RAHIMOVDEVS.TECH
          </button>
        </a>
      </div>

      {/* Footer */}
      <footer style={{ borderTop:"1px solid var(--green-dark)", padding:"24px 40px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:1, color:"var(--green-dim)" }}>
          © 2026 ISFANDIYOR MADAMINOV — RAHIMOVDEVS
        </span>
        <button style={{ fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:1, color:"var(--green-dim)", background:"none", border:"none", cursor:"pointer", transition:"color .2s" }}
          onClick={() => navigate("/")}
          onMouseEnter={e => e.target.style.color=ACCENT}
          onMouseLeave={e => e.target.style.color="var(--green-dim)"}>
          ← IM_DEV HOME
        </button>
      </footer>
    </div>
  );
}
