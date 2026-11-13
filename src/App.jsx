import { lazy, Suspense, useState, useEffect, useRef, useCallback } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./styles/global.css";

import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./i18n/LanguageContext";
import { useSeo } from "./hooks/useSeo";
import { useReveal } from "./hooks/useReveal";

import Cursor from "./components/Cursor";
import LoadingScreen from "./components/Loadingscreen";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import { IdleProvider } from "./context/IdleContext";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PlasmaBlobs from "./components/PlasmaBlobs";

import Terminal from "./components/Terminal";
import VisitorScan from "./components/VisitorScan";
import KonamiCode from "./components/KonamiCode";
import AchievementSystem from "./components/AchievementSystem";

/* Everything but the home page loads on demand */
const GamesPage       = lazy(() => import("./pages/GamesPage"));
const ScoresPage      = lazy(() => import("./pages/ScoresPage"));
const ChontakPage     = lazy(() => import("./pages/ChontakPage"));
const HojiJalyuziPage = lazy(() => import("./pages/HojiJalyuziPage"));
const RahimovDevsPage = lazy(() => import("./pages/RahimovDevsPage"));
const ResumePage      = lazy(() => import("./pages/ResumePage"));
const NotFoundPage    = lazy(() => import("./pages/NotFoundPage"));

/* The intro plays once per browser session, not on every page load */
const INTRO_SEEN_KEY = "intro_seen_v1";

/* Cursor spotlight — direct DOM writes, rAF-throttled, skipped on touch */
function CursorSpotlight() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    let pending = false;
    let cx = 0, cy = 0;
    const move = (e) => {
      cx = e.clientX; cy = e.clientY;
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        el.style.background = `radial-gradient(700px circle at ${cx}px ${cy}px, rgba(0,255,136,0.055) 0%, transparent 70%)`;
        pending = false;
      });
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div ref={ref} style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:1 }} />;
}

function Divider() {
  const ref = useReveal(0.5);
  return (
    <div ref={ref} className="divider">
      <div className="divider-line left" />
      <div className="divider-dot" />
      <div className="divider-line right" />
    </div>
  );
}

/* Portfolio page */
function Portfolio({ onGamesClick }) {
  return (
    <IdleProvider>
      <div style={{ width: "100%", maxWidth: "100vw", minHeight: "100vh", background: "var(--bg)", overflowX: "hidden" }}>
        <PlasmaBlobs />
        <ScrollProgress />
        <Navbar onGamesClick={onGamesClick} />
        <main>
          <Hero />
          <Divider />
          <About />
          <Divider />
          <Projects />
          <Divider />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </IdleProvider>
  );
}

/* Page transition wrapper */
function PageTransition({ children }) {
  const location = useLocation();
  return (
    // `backwards`, not `both`: a fill that outlives the fade leaves an identity transform and
    // blur(0) on this wrapper, which makes it the containing block of every position:fixed
    // child, so the project pages' fixed nav bars scrolled away with the page
    <div key={location.pathname} style={{ animation: "pageFade 0.45s ease backwards" }}>
      {children}
    </div>
  );
}

/* Routes */
function AppRoutes() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useSeo(pathname);

  return (
    <PageTransition>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Portfolio onGamesClick={() => navigate("/games")} />} />
          <Route path="/games" element={<GamesPage onBack={() => navigate("/")} />} />
          <Route path="/scores" element={<ScoresPage />} />
          <Route path="/chontak" element={<ChontakPage />} />
          <Route path="/hoji-jalyuzi" element={<HojiJalyuziPage />} />
          <Route path="/rahimovdevs" element={<RahimovDevsPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </PageTransition>
  );
}

/* Main App */
export default function App() {
  const [loaded, setLoaded] = useState(() => {
    try { return sessionStorage.getItem(INTRO_SEEN_KEY) === "1"; } catch { return false; }
  });

  const handleLoaded = useCallback(() => {
    setLoaded(true);
    try { sessionStorage.setItem(INTRO_SEEN_KEY, "1"); } catch { /* storage unavailable */ }
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Cursor />
        <CursorSpotlight />
        <AchievementSystem />
        <Terminal />
        <VisitorScan />
        <KonamiCode />
        {!loaded && <LoadingScreen onDone={handleLoaded} />}

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
