import "./styles/global.css";
import Navbar   from "./components/Navbar";
import Hero     from "./components/Hero";
import About    from "./components/About";
import Projects from "./components/Projects";
import Contact  from "./components/Contact";
import Footer   from "./components/Footer";

// Scanline overlay component
function Scanline() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      pointerEvents: "none", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", left: 0, right: 0, height: "3px",
        background: "linear-gradient(transparent, rgba(0,255,136,0.08), transparent)",
        animation: "scanline 8s linear infinite",
      }} />
    </div>
  );
}

// Section divider
function Divider() {
  return (
    <div className="divider">
      <div className="divider-line left" />
      <div className="divider-dot" />
      <div className="divider-line right" />
    </div>
  );
}

export default function App() {
  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "var(--bg)", overflowX: "hidden" }}>
      <Scanline />
      <Navbar />
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Projects />
      <Divider />
      <Contact />
      <Footer />
    </div>
  );
}