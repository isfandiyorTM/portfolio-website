import { useState, useRef } from "react";
import { useReveal } from "../hooks/useReveal";
import { SOCIAL_LINKS } from "../constants/data";
import emailjs from "@emailjs/browser";

// ─── Replace these with your real EmailJS credentials ───────────────────────
const EMAILJS_SERVICE_ID  = "service_x2eglwf";
const EMAILJS_TEMPLATE_ID = "template_ej7w0ws";
const EMAILJS_PUBLIC_KEY  = "qzyvhsmpQWDWTr_Pl";
// ────────────────────────────────────────────────────────────────────────────

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function Contact() {
  const formRef  = useRef(null);
  const titleRef = useReveal();
  const formRevealRef = useReveal();

  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="grid-bg" style={{ padding: "120px 40px", width: "100%" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <div ref={titleRef} className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p className="section-label" style={{ justifyContent: "center" }}>// CONNECT.SH</p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 5vw, 56px)",
            fontWeight: 900, lineHeight: 1.2,
          }}>
            LET'S<br /><span style={{ color: "var(--green)" }}>COLLABORATE_</span>
          </h2>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "60px", alignItems: "start",
        }}>

          {/* Left — info */}
          <div ref={titleRef} className="reveal">
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "40px" }}>
              Whether you have a project in mind, need a Flutter developer,
              or want mentorship — my inbox is open. Fill out the form or
              reach me directly on any of the platforms below.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: "none" }}>
                <button className="btn btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
                  <GithubIcon /> GitHub
                </button>
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: "none" }}>
                <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  <LinkedinIcon /> LinkedIn
                </button>
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div ref={formRevealRef} className="reveal" style={{ transitionDelay: "150ms" }}>
            <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  className="form-input"
                  name="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ justifyContent: "center", opacity: status === "sending" ? 0.7 : 1 }}
                disabled={status === "sending"}
              >
                {status === "sending" ? "SENDING..." : "SEND MESSAGE"}
              </button>

              {status === "success" && (
                <p style={{ color: "var(--green)", fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "2px" }}>
                  ✓ MESSAGE SENT SUCCESSFULLY
                </p>
              )}
              {status === "error" && (
                <p style={{ color: "#ff4466", fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "2px" }}>
                  ✗ FAILED TO SEND — TRY AGAIN
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}