// App.jsx
import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./styles/global.css";

import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./i18n/LanguageContext";

import LoadingScreen from "./components/Loadingscreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import GamesPage from "./pages/GamesPage";
import ChontakPage from "./pages/ChontakPage";

/* Small UI bits kept from your original file */
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

/* Portfolio component (keeps same structure so Navbar/Hero/... remain) */
function Portfolio({ onGamesClick }) {
  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "var(--bg)", overflowX: "hidden" }}>
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

/* Routes component so we can use useNavigate (must be inside BrowserRouter) */
function AppRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Portfolio onGamesClick={() => navigate("/games")} />} />
      <Route path="/games" element={<GamesPage onBack={() => navigate("/")} />} />
      <Route path="/chontak" element={<ChontakPage />} />
      {/* Add more routes here as needed */}
    </Routes>
  );
}

/* Top-level App: providers + loading screen + router */
export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <ThemeProvider>
      <LanguageProvider>
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