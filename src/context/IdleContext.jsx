import { createContext, useContext, useState, useEffect, useRef } from "react";

const IdleContext = createContext(false);

export const IDLE_SECS = 90;

// Shared look of the idle state, so the hero and the nav fade in step
export const DIM_TEXT = 0.12;
export const DIM_NAV  = 0.15;
export const DIM_BG   = 0.25; // multiplier on a background layer's own opacity
export const DIM_EASE = "opacity 2s ease";

export function IdleProvider({ children }) {
  const [idle, setIdle] = useState(false);
  const lastActive = useRef(0); // stamped on mount; Date.now() is impure in render
  const idleTimer  = useRef(null);

  // Idle detection — resets on any interaction
  useEffect(() => {
    if (lastActive.current === 0) lastActive.current = Date.now();
    const bump = () => { lastActive.current = Date.now(); if (idle) setIdle(false); };
    const tick = () => {
      if (Date.now() - lastActive.current >= IDLE_SECS * 1000) setIdle(true);
    };
    window.addEventListener("mousemove",  bump, { passive: true });
    window.addEventListener("keydown",    bump, { passive: true });
    window.addEventListener("scroll",     bump, { passive: true });
    window.addEventListener("click",      bump, { passive: true });
    window.addEventListener("touchstart", bump, { passive: true });
    idleTimer.current = setInterval(tick, 5000);
    return () => {
      window.removeEventListener("mousemove",  bump);
      window.removeEventListener("keydown",    bump);
      window.removeEventListener("scroll",     bump);
      window.removeEventListener("click",      bump);
      window.removeEventListener("touchstart", bump);
      clearInterval(idleTimer.current);
    };
  }, [idle]);

  return <IdleContext.Provider value={idle}>{children}</IdleContext.Provider>;
}

export const useIdle = () => useContext(IdleContext);
