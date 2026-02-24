import { useLang } from "../i18n/LanguageContext";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer style={{ borderTop:"1px solid var(--border)", padding:"32px 40px", textAlign:"center", fontFamily:"var(--font-mono)", fontSize:"11px", letterSpacing:"2px", color:"var(--text-muted)", opacity:0.5, width:"100%" }}>
      © 2025 ISFANDIYOR MADAMINOV — {t.footer.built}
      <span style={{ color:"var(--green)", marginLeft:"8px", opacity:0.6 }}>// {t.footer.status}</span>
    </footer>
  );
}