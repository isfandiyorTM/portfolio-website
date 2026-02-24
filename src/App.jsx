import { useState } from "react";
import "./styles/global.css";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar    from "./components/Navbar";
import Hero      from "./components/Hero";
import About     from "./components/About";
import Projects  from "./components/Projects";
import Contact   from "./components/Contact";
import Footer    from "./components/Footer";
import GamesPage from "./pages/GamesPage";

function Scanline() {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:9999, pointerEvents:"none", overflow:"hidden" }}>
      <div style={{ position:"absolute", left:0, right:0, height:"3px", background:"linear-gradient(transparent,rgba(0,255,136,0.08),transparent)", animation:"scanline 8s linear infinite" }} />
    </div>
  );
}

function Divider() {
  return (
    <div className="divider">
      <div className="divider-line left" />
      <div className="divider-dot" />
      <div className="divider-line right" />
    </div>
  );
}

function Portfolio({ onGamesClick }) {
  return (
    <div style={{ width:"100%", minHeight:"100vh", background:"var(--bg)", overflowX:"hidden" }}>
      <Scanline />
      <Navbar onGamesClick={onGamesClick} />
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

export default function App() {
  const [page, setPage] = useState("portfolio");

  return (
    <ThemeProvider>
      {page === "portfolio"
        ? <Portfolio onGamesClick={() => setPage("games")} />
        : <GamesPage onBack={() => setPage("portfolio")} />
      }
    </ThemeProvider>
  );
}