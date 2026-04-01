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
  const products = [
    { emoji:"🪟", name:"Gorizontal jalyuzi", cat:"Klassik", color:"#60A5FA" },
    { emoji:"🏠", name:"Vertikal jalyuzi",   cat:"Ofis",    color:"#34D399" },
    { emoji:"✨", name:"Rulo parda",          cat:"Zamonaviy", color:"#F0B429" },
  ];
  return (
    <div style={{ display:"flex", justifyContent:"center", position:"relative" }}>
      <div style={{ position:"absolute", bottom:-30, width:160, height:30,
                    background:"radial-gradient(ellipse,rgba(96,165,250,.25) 0%,transparent 70%)",
                    filter:"blur(16px)" }} />
      <div style={{ width:220, background:"#0d1520", borderRadius:32,
                    border:"2px solid #1e2d40",
                    boxShadow:"0 0 0 6px rgba(255,255,255,.02),0 40px 80px rgba(0,0,0,.6),0 0 40px rgba(96,165,250,.1)",
                    overflow:"hidden", animation:"float 4s ease-in-out infinite" }}>
        {/* Status bar */}
        <div style={{ background:"#08111c", height:26, display:"flex",
                      alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:70, height:5, background:"#1a2535", borderRadius:3 }} />
        </div>
        <div style={{ padding:"14px 12px 18px" }}>
          {/* Header */}
          <div style={{ display:"flex", justifyContent:"space-between",
                        alignItems:"center", marginBottom:14 }}>
            <span style={{ fontFamily:"monospace", fontSize:12, fontWeight:700,
                           color:"#60A5FA" }}>Hoji Jalyuzi</span>
            <span style={{ fontSize:8, color:"#2a4060", border:"1px solid #1a2535",
                           padding:"3px 8px", borderRadius:20 }}>🪟</span>
          </div>
          {/* Hero banner */}
          <div style={{ background:"linear-gradient(135deg,#0a1e35,#0f2a48)",
                        border:"1px solid #1a3050", borderRadius:10,
                        padding:"10px", marginBottom:10 }}>
            <div style={{ fontSize:8, color:"#60A5FA", letterSpacing:1,
                          marginBottom:4 }}>BIZ HAQIMIZDA</div>
            <div style={{ fontSize:11, fontWeight:700, color:"#e2e8f0",
                          lineHeight:1.4, marginBottom:6 }}>
              Sifatli jalyuzi va<br/>pardalar
            </div>
            <div style={{ display:"inline-block", background:"#60A5FA",
                          color:"#000", fontSize:8, fontWeight:700,
                          padding:"4px 10px", borderRadius:6 }}>
              Buyurtma →
            </div>
          </div>
          {/* Products */}
          <div style={{ fontSize:8, color:"#2a4060", letterSpacing:1,
                        marginBottom:6 }}>MAHSULOTLAR</div>
          {products.map(p => (
            <div key={p.name} style={{ display:"flex", alignItems:"center",
                                       gap:7, padding:"6px 0",
                                       borderBottom:"1px solid rgba(255,255,255,.03)" }}>
              <div style={{ width:26, height:26, borderRadius:7, display:"flex",
                             alignItems:"center", justifyContent:"center",
                             fontSize:13, flexShrink:0,
                             background:`${p.color}18` }}>{p.emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:9, fontWeight:600, color:"#c8d8e8" }}>{p.name}</div>
                <div style={{ fontSize:7, color:"#2a4060" }}>{p.cat}</div>
              </div>
              <div style={{ fontSize:8, color:p.color, fontWeight:700 }}>›</div>
            </div>
          ))}
          {/* CTA */}
          <div style={{ marginTop:10, background:"#60A5FA", borderRadius:8,
                        padding:"8px", textAlign:"center" }}>
            <div style={{ fontSize:9, fontWeight:700, color:"#000" }}>
              📞 Bog'lanish
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  { icon:"🪟", title:"Product Catalog",    desc:"Browse the full range of blinds and curtains with photos, descriptions, and available sizes — all in the app." },
  { icon:"📋", title:"Order Requests",     desc:"Customers can submit measurement requests and order inquiries directly from their phone." },
  { icon:"📐", title:"Custom Sizing",      desc:"Input room dimensions and get recommendations for the right blind type and size." },
  { icon:"📞", title:"Direct Contact",     desc:"One-tap call and WhatsApp buttons to reach the company instantly." },
  { icon:"🎨", title:"Color & Style Picker", desc:"Browse available colors and materials for each product type before ordering." },
  { icon:"📍", title:"Store & Delivery Info", desc:"View showroom location, working hours, and delivery options across the region." },
];

const TIMELINE = [
  { date:"BRIEF",   title:"Client requirements",           desc:"Built for a local blinds company needing a digital presence — product showcase, contact, and order flow." },
  { date:"UI",      title:"Custom design — blue & white",  desc:"Clean professional theme matching the brand. Light interface for easy browsing of products and colors." },
  { date:"BUILD",   title:"Flutter + GetX",                desc:"GetX for lightweight state management and navigation. Fast build time, snappy UI on mid-range Android devices." },
  { date:"RELEASE", title:"APK delivered to client",       desc:"Released as a standalone APK for direct distribution to customers via WhatsApp and the company website." },
];

export default function HojiJalyuziPage() {
  const navigate = useNavigate();
  const r1=useReveal(), r2=useReveal(), r3=useReveal(), r4=useReveal(), r5=useReveal(), r6=useReveal();

  useEffect(() => { window.scrollTo(0,0); }, []);

  const ACCENT = "#60A5FA";

  const tag = {
    fontFamily:"var(--font-mono)", fontSize:11, color:ACCENT,
    letterSpacing:3, marginBottom:10, display:"block",
  };
  const title = {
    fontSize:"clamp(26px,4vw,40px)", fontWeight:800, letterSpacing:-1,
    marginBottom:12, lineHeight:1.15, color:"var(--text)",
  };
  const sub = { fontSize:16, color:"var(--text-muted)", lineHeight:1.7, maxWidth:500, marginBottom:48 };
  const btnA = {
    fontFamily:"var(--font-mono)", letterSpacing:2, fontSize:12,
    padding:"14px 28px", background:ACCENT, color:"#000",
    border:"none", cursor:"pointer", fontWeight:700, textDecoration:"none",
    display:"inline-block", transition:"all .2s",
  };
  const btnB = {
    fontFamily:"var(--font-mono)", letterSpacing:2, fontSize:12,
    padding:"14px 28px", background:"transparent", color:"#3a6a9a",
    border:"1px solid #0d2040", cursor:"pointer", textDecoration:"none",
    display:"inline-block", transition:"all .2s",
  };

  return (
    <div style={{ background:"#050a0f", color:"#c8d8e8", minHeight:"100vh",
                  paddingTop:64, overflowX:"hidden" }}>

      {/* Scanline */}
      <div style={{ position:"fixed", inset:0, zIndex:9999, pointerEvents:"none", overflow:"hidden" }}>
        <div style={{ position:"absolute", left:0, right:0, height:3,
                      background:"linear-gradient(transparent,rgba(96,165,250,.06),transparent)",
                      animation:"scanline 8s linear infinite" }} />
      </div>

      {/* Nav */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200,
                    display:"flex", alignItems:"center", justifyContent:"space-between",
                    padding:"0 40px", height:64,
                    background:"rgba(5,10,15,0.92)", borderBottom:"1px solid #0d2040",
                    backdropFilter:"blur(12px)" }}>
        <div style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:900,
                      color:"var(--green)", letterSpacing:4,
                      animation:"flicker 6s infinite", cursor:"pointer" }}
             onClick={() => navigate("/")}>
          IM<span style={{ color:"var(--text)", fontWeight:400 }}>_DEV</span>
        </div>
        <button className="nav-link" style={{ fontSize:12, letterSpacing:2 }}
                onClick={() => navigate("/")}>
          ← BACK
        </button>
      </nav>

      {/* Hero */}
      <div style={{ padding:"80px 40px 60px", maxWidth:1100, margin:"0 auto",
                    display:"grid", gridTemplateColumns:"1fr 1fr", gap:80,
                    alignItems:"center", animation:"fadeUp .7s ease both" }}
           className="chontak-hero">
        <div>
          <span style={tag}>// PROJECT.FLUTTER</span>
          <h1 style={{ fontFamily:"var(--font-display)",
                       fontSize:"clamp(36px,5.5vw,62px)", fontWeight:900,
                       lineHeight:1, letterSpacing:-2, marginBottom:12,
                       color:ACCENT }}>
            Hoji<br />Jalyuzi<span style={{ color:"var(--text)" }}>_</span>
          </h1>
          <p style={{ fontSize:17, color:"var(--text-muted)", lineHeight:1.7,
                      marginBottom:32, maxWidth:460 }}>
            A mobile app for a blinds and curtains company — product catalog,
            custom order requests, and direct customer contact. Built with Flutter + GetX.
          </p>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:28 }}>
            <a href="/hoji__jalyuzi.apk" download style={{ textDecoration:"none" }}>
              <span style={btnA}
                onMouseEnter={e => { e.currentTarget.style.background="#93C5FD"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background=ACCENT; e.currentTarget.style.transform="none"; }}>
                ↓ DOWNLOAD APK
              </span>
            </a>
            <a href="https://github.com/isfandiyorTM" target="_blank"
               rel="noopener noreferrer" style={{ textDecoration:"none" }}>
              <span style={btnB}
                onMouseEnter={e => { e.currentTarget.style.borderColor=ACCENT; e.currentTarget.style.color=ACCENT; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="#0d2040"; e.currentTarget.style.color="#3a6a9a"; }}>
                ⌥ GITHUB
              </span>
            </a>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {["FLUTTER","DART","GETX","ANDROID","UI/UX","CLIENT APP"].map(t => (
              <span key={t} style={{ fontFamily:"var(--font-mono)", fontSize:10,
                                     letterSpacing:1, padding:"5px 12px",
                                     border:"1px solid #0d2040", color:"#3a6a9a" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <PhoneMockup />
      </div>

      {/* Stats */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 40px 60px" }}>
        <div ref={r1} className="reveal"
             style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)",
                      border:"1px solid #0d2040", overflow:"hidden" }}>
          {[["3+","Screen types"],["100%","Offline ready"],["1","Company client"],["Android","Platform"]].map(([n,l],i) => (
            <div key={l} style={{ padding:32, textAlign:"center",
                                  borderRight: i<3 ? "1px solid #0d2040" : "none" }}>
              <div style={{ fontFamily:"var(--font-display)", fontSize:32, fontWeight:900,
                             color:ACCENT, lineHeight:1, marginBottom:6 }}>{n}</div>
              <div style={{ fontSize:11, color:"#3a6a9a", letterSpacing:1 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ padding:"60px 40px", maxWidth:1100, margin:"0 auto" }}>
        <div ref={r2} className="reveal">
          <span style={tag}>// FEATURES.SH</span>
          <h2 style={title}>Built for the <span style={{ color:ACCENT }}>showroom floor.</span></h2>
          <p style={sub}>Simple, fast, and easy for customers to browse products and get in touch.</p>
        </div>
        <div ref={r3} className="reveal chontak-feat-grid"
             style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)",
                      border:"1px solid #0d2040", overflow:"hidden" }}>
          {FEATURES.map((f,i) => (
            <div key={f.title}
                 style={{ background:"#050f1a", padding:"26px 22px",
                           borderRight: i%3<2 ? "1px solid #0d2040" : "none",
                           borderBottom: i<3 ? "1px solid #0d2040" : "none",
                           transition:"background .2s" }}
                 onMouseEnter={e => e.currentTarget.style.background="#0a1a2d"}
                 onMouseLeave={e => e.currentTarget.style.background="#050f1a"}>
              <div style={{ width:40, height:40, background:`${ACCENT}18`,
                             border:`1px solid ${ACCENT}30`, borderRadius:10,
                             display:"flex", alignItems:"center", justifyContent:"center",
                             fontSize:18, marginBottom:12 }}>{f.icon}</div>
              <div style={{ fontSize:13, fontWeight:700, marginBottom:6,
                             color:"#e2e8f0" }}>{f.title}</div>
              <div style={{ fontSize:12, color:"#7a9ab0", lineHeight:1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ background:"#030608", padding:"80px 40px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div ref={r4} className="reveal">
            <span style={tag}>// BUILD.LOG</span>
            <h2 style={title}>From brief to <span style={{ color:ACCENT }}>delivery.</span></h2>
            <p style={sub}>How the project was scoped, built, and handed off to the client.</p>
          </div>
          <div ref={r5} className="reveal">
            {TIMELINE.map((item,i) => (
              <div key={item.date}
                   style={{ display:"grid", gridTemplateColumns:"90px 1px 1fr",
                             gap:"0 28px", padding:"22px 0",
                             borderBottom: i<TIMELINE.length-1 ? "1px solid #0d2040" : "none",
                             alignItems:"start" }}>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:10,
                               color:"#3a6a9a", letterSpacing:1,
                               paddingTop:4, textAlign:"right" }}>{item.date}</div>
                <div style={{ background:"#0d2040", position:"relative" }}>
                  <div style={{ position:"absolute", top:4, left:"50%",
                                 transform:"translateX(-50%)", width:8, height:8,
                                 background:ACCENT, borderRadius:"50%",
                                 border:"2px solid #030608" }} />
                </div>
                <div>
                  <div style={{ fontSize:14, fontWeight:700, marginBottom:5,
                                 color:"#e2e8f0" }}>{item.title}</div>
                  <div style={{ fontSize:12, color:"#7a9ab0", lineHeight:1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div ref={r6} className="reveal"
           style={{ padding:"100px 40px", textAlign:"center",
                    position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%",
                      transform:"translate(-50%,-50%)", width:500, height:250,
                      background:`radial-gradient(ellipse,${ACCENT}10 0%,transparent 70%)`,
                      pointerEvents:"none" }} />
        <span style={tag}>// INSTALL.APK</span>
        <h2 style={{ ...title, maxWidth:480, margin:"0 auto 12px" }}>
          Try it on your <span style={{ color:ACCENT }}>Android</span> device.
        </h2>
        <p style={{ fontSize:15, color:"var(--text-muted)", maxWidth:400,
                    margin:"0 auto 36px", lineHeight:1.7 }}>
          Direct APK download. Works on Android 6.0+.
        </p>
        <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          <a href="/hoji__jalyuzi.apk" download style={{ textDecoration:"none" }}>
            <span style={{ ...btnA, padding:"16px 40px", fontSize:13 }}
              onMouseEnter={e => { e.currentTarget.style.background="#93C5FD"; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=`0 12px 40px ${ACCENT}50`; }}
              onMouseLeave={e => { e.currentTarget.style.background=ACCENT; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
              ↓ DOWNLOAD APK
            </span>
          </a>
          <a href="https://github.com/isfandiyorTM" target="_blank"
             rel="noopener noreferrer" style={{ textDecoration:"none" }}>
            <span style={{ ...btnB, padding:"16px 40px", fontSize:13 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=ACCENT; e.currentTarget.style.color=ACCENT; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="#0d2040"; e.currentTarget.style.color="#3a6a9a"; }}>
              ⌥ VIEW SOURCE
            </span>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop:"1px solid #0d2040", padding:"24px 40px",
                        display:"flex", justifyContent:"space-between",
                        alignItems:"center" }}>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:10,
                        letterSpacing:1, color:"#1a3050" }}>
          © 2026 ISFANDIYOR MADAMINOV — HOJI JALYUZI v1.0
        </span>
        <button style={{ fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:1,
                          color:"#1a3050", background:"none", border:"none",
                          cursor:"pointer", transition:"color .2s" }}
          onClick={() => navigate("/")}
          onMouseEnter={e => e.target.style.color=ACCENT}
          onMouseLeave={e => e.target.style.color="#1a3050"}>
          ← IM_DEV HOME
        </button>
      </footer>
    </div>
  );
}
