import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./styles/global.css";

import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./i18n/LanguageContext";

import Cursor from "./components/Cursor";
import LoadingScreen from "./components/Loadingscreen";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PlasmaBlobs from "./components/PlasmaBlobs";

import GamesPage from "./pages/GamesPage";
import ChontakPage from "./pages/ChontakPage";
import HojiJalyuziPage from "./pages/HojiJalyuziPage";
import RahimovDevsPage from "./pages/RahimovDevsPage";
import ResumePage from "./pages/ResumePage";
import NotFoundPage from "./pages/NotFoundPage";

/* Cursor spotlight — direct DOM writes, zero re-renders */
function CursorSpotlight() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      el.style.background = `radial-gradient(700px circle at ${e.clientX}px ${e.clientY}px, rgba(0,255,136,0.055) 0%, transparent 70%)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div ref={ref} style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:1 }} />;
}

/* UI effects */
function Scanline() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(transparent,rgba(0,255,136,0.08),transparent)",
          animation: "scanline 8s linear infinite",
        }}
      />
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

/* Portfolio page */
function Portfolio({ onGamesClick }) {
  return (
    <div style={{ width: "100%", maxWidth: "100vw", minHeight: "100vh", background: "var(--bg)", overflowX: "hidden" }}>
      <Scanline />
      <PlasmaBlobs />
      <ScrollProgress />
      <Navbar onGamesClick={onGamesClick} />
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Projects />
      <Divider />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

/* Page transition wrapper */
function PageTransition({ children }) {
  const location = useLocation();
  return (
    <div key={location.pathname} style={{ animation: "pageFade 0.45s ease both" }}>
      {children}
    </div>
  );
}

/* Routes */
function AppRoutes() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <Routes>
        <Route path="/" element={<Portfolio onGamesClick={() => navigate("/games")} />} />
        <Route path="/games" element={<GamesPage onBack={() => navigate("/")} />} />
        <Route path="/chontak" element={<ChontakPage />} />
        <Route path="/hoji-jalyuzi" element={<HojiJalyuziPage />} />
        <Route path="/rahimovdevs" element={<RahimovDevsPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PageTransition>
  );
}

/* Main App */
export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Cursor />
        <CursorSpotlight />
        {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}

        <div
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.5s ease",
            pointerEvents: loaded ? "all" : "none",
          }}
        >
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
