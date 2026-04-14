"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";
import { SplitText } from "gsap/SplitText";

import { Moon, Sun } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const navLinks = ["Home", "Works", "Portfolio", "Contact"];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          gsap.to(navRef.current, {
            y: self.direction === 1 ? "0%" : "-100%",
          });
        },
      });

      document.querySelectorAll(".navbar-link").forEach((link) => {
        const original = link.querySelector(".original");
        const clone = link.querySelector(".clone");

        const splitOriginal = SplitText.create(original, { type: "chars" });
        const splitClone = SplitText.create(clone, { type: "chars" });

        const tl = gsap.timeline({ paused: true });

        tl.to(splitOriginal.chars, {
          yPercent: -100,
          stagger: { each: 0.03, from: "end" },
          duration: 0.3,
        });
        tl.to(
          splitClone.chars,
          {
            yPercent: -100,
            stagger: { each: 0.03, from: "end" },
            duration: 0.3,
          },
          0,
        );

        link.addEventListener("mouseenter", () => tl.play());
        link.addEventListener("mouseleave", () => tl.reverse());
      });
    },
    { scope: navRef },
  );

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMenu = (isOpen: boolean) => {
    setIsOpen(isOpen);
    gsap.to(drawerRef.current, { x: isOpen ? "0%" : "-100%" });
    gsap.to(backdropRef.current, {
      opacity: isOpen ? 1 : 0,
      pointerEvents: isOpen ? "auto" : "none",
    });
  };

  return (
    <header ref={navRef} className="navbar">
      <button
        className="navbar-burger"
        onClick={() => toggleMenu(!isOpen)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </button>

      <div className="navbar-logo">IVAN ABILLON</div>

      <nav className="navbar-links" aria-label="Main navigation">
        {navLinks.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`} className="navbar-link">
            <span className="original">{link}</span>
            <span className="clone">{link}</span>
          </a>
        ))}
      </nav>

      <button className="navbar-theme" onClick={handleThemeToggle}>
        <div className="icon-container">
          {theme === "light" ? <Sun /> : <Moon />}
        </div>
      </button>

      <div ref={drawerRef} className="navbar-drawer" aria-hidden={!isOpen}>
        <div className="navbar-drawer-header">
          <span className="navbar-drawer-name">IVAN ABILLON</span>
          <button
            className="navbar-drawer-close"
            onClick={() => toggleMenu(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>
        <nav className="navbar-drawer-links" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="navbar-drawer-link"
              onClick={() => toggleMenu(false)}
            >
              {link}
            </a>
          ))}
        </nav>
      </div>

      <div
        ref={backdropRef}
        className="navbar-backdrop"
        onClick={() => toggleMenu(false)}
        aria-hidden="true"
      />
    </header>
  );
}
