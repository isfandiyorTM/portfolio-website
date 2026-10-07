import { createContext, useContext, useEffect, useState } from "react";
import translations from "./translations";

const LanguageContext = createContext();

// ?lang=ru in the URL wins over the saved choice, so a link can open the site
// (or the printable resume) in a given language.
function initialLang() {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (fromUrl && translations[fromUrl]) return fromUrl;
    const saved = localStorage.getItem("lang");
    if (saved && translations[saved]) return saved;
  } catch { /* storage unavailable */ }
  return "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  const t = translations[lang];

  // Screen readers and the browser's translate prompt both go by <html lang>
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const switchLang = (l) => {
    setLang(l);
    try { localStorage.setItem("lang", l); } catch { /* storage unavailable */ }
  };

  return (
    <LanguageContext.Provider value={{ lang, t, switchLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
