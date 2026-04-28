"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";
import { SplitText } from "gsap/SplitText";
import { usePreloader } from "../Providers";

import { Moon, Sun } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const navLinks = ["Home", "Works", "Portfolio", "Contact"];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const preloaderDone = usePreloader();

  useGSAP(
    () => {
      if (!preloaderDone) return;

      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          if (isOpenRef.current) return;
          gsap.to(navRef.current, {
            y: self.direction === 1 ? "-100%" : "0%",
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
          stagger: { each: 0.02, from: "start" },
          duration: 0.4,
          ease: "power2.inOut",
        });
        tl.to(
          splitClone.chars,
          {
            yPercent: -100,
            stagger: { each: 0.02, from: "start" },
            duration: 0.4,
            ease: "power2.inOut",
          },
          0,
        );

        link.addEventListener("mouseenter", () => tl.play());
        link.addEventListener("mouseleave", () => tl.reverse());
      });

      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3" },
      );
    },
    { scope: navRef, dependencies: [preloaderDone] },
  );

  const handleThemeToggle = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  const toggleMenu = (open: boolean) => {
    isOpenRef.current = open;
    setIsOpen(open);

    if (!open) {
      gsap.to(navRef.current, { y: "0%" });
    }

    gsap.to(drawerRef.current, { x: open ? "0%" : "-100%" });
    gsap.to(backdropRef.current, {
      opacity: open ? 1 : 0,
      pointerEvents: open ? "auto" : "none",
    });
  };

  const handleDrawerLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: string,
  ) => {
    e.preventDefault();
    toggleMenu(false);
    const target = document.getElementById(link.toLowerCase());
    if (target) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__lenis?.scrollTo(target);
    }
  };

  return (
    <>
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
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="navbar-link"
            >
              <span className="original">{link}</span>
              <span className="clone">{link}</span>
            </a>
          ))}
        </nav>

        <button className="navbar-theme" onClick={handleThemeToggle}>
          <div className="icon-container">
            <Sun />
            <Moon />
          </div>
        </button>
      </header>

      <div ref={drawerRef} className="navbar-drawer" aria-hidden={!isOpen}>
        <div className="navbar-drawer-header">
          <div className="navbar-logo">IVAN ABILLON</div>
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
              onClick={(e) => handleDrawerLinkClick(e, link)}
            >
              {link}
            </a>
          ))}
        </nav>
        <div className="navbar-drawer-theme">
          <button className="navbar-theme" onClick={handleThemeToggle}>
            <div className="icon-container">
              <Sun />
              <Moon />
            </div>
          </button>
        </div>
      </div>

      <div
        ref={backdropRef}
        className="navbar-backdrop"
        onClick={() => toggleMenu(false)}
        aria-hidden="true"
      />
    </>
  );
}
