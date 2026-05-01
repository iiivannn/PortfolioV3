"use client";

import { Copyright, ExternalLink } from "lucide-react";

declare global {
  interface Window {
    __lenis?: { scrollTo: (target: string | number) => void };
  }
}

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Portfolio", href: "#portfolio" },
];

const projectLinks = [
  { label: "Project Board", href: "https://project-board-eosin.vercel.app/" },
  { label: "NoteFixr", href: "https://note-fixr.vercel.app/" },
  {
    label: "Cozy Grounds",
    href: "https://coffee-website-seven-indol.vercel.app/",
  },
  { label: "NexDrive", href: "https://car-website-wheat.vercel.app/" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (window.__lenis) {
      window.__lenis.scrollTo(href);
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer" id="contact">
      <div className="footer-upper">
        <p className="footer-tagline">
          Ready to build
          <br />
          something together?
        </p>
        <span className="footer-monogram" aria-hidden="true">
          IA
        </span>
      </div>

      <div className="footer-lower">
        <h2 className="footer-headline">Let&apos;s Talk!</h2>

        <div className="footer-columns">
          <div className="footer-col">
            <p className="footer-col-label">Navigate</p>
            <div className="footer-col-links">
              {navLinks.map(({ label, href }) => (
                <button
                  key={href}
                  className="footer-col-link"
                  onClick={() => scrollTo(href)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <p className="footer-col-label">Projects</p>
            <div className="footer-col-links">
              {projectLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-col-link"
                >
                  {label}
                  <ExternalLink size={11} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <p className="footer-col-label">Contact</p>
            <div className="footer-col-links">
              <a
                href="mailto:ivanfallabillon@gmail.com"
                className="footer-col-link"
              >
                ivanfallabillon@gmail.com
              </a>
              <a
                href="https://github.com/iiivannn"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-col-link"
              >
                GitHub <ExternalLink size={11} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.linkedin.com/in/ivan-abillon-287b54342/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-col-link"
              >
                LinkedIn <ExternalLink size={11} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-locale">
          <span>Cavite, PH</span>
          <span>UTC+8</span>
        </span>
        <span className="footer-credits">
          <Copyright size={16} strokeWidth={1.5} />
          2026 Ivan Abillon
        </span>
      </div>
    </footer>
  );
}
