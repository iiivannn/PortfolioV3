"use client";

import { useRef } from "react";
import HeroGrid from "../ui/HeroGrid";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MousePointer2 } from "lucide-react";
import { usePreloader } from "../Providers";

export default function Home() {
  const preloaderDone = usePreloader();
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!preloaderDone) return;

    let hasEnteredViewport = false;
    const tl = gsap.timeline();

    const cursorXTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.08,
      ease: "power2",
    });
    const cursorYTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.08,
      ease: "power2",
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!hasEnteredViewport) {
        hasEnteredViewport = true;
        gsap.set(cursorRef.current, { x: e.clientX, y: e.clientY });
        gsap.to(cursorRef.current, { opacity: 1, duration: 0.3 });
      }
      cursorXTo(e.clientX);
      cursorYTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    tl.fromTo(
      ".hero-annotation",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, ease: "power2.inOut", duration: 0.6 },
    );

    tl.fromTo(
      ".hero-title span",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.2, ease: "power3.inOut", duration: 1 },
      "<0.25",
    );

    tl.fromTo(
      ".hero-subtitle",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, ease: "power2.inOut", duration: 1 },
      "<0.35",
    );

    tl.fromTo(
      ".hero-cta .btn",
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, ease: "power2.inOut", duration: 1 },
      "<0.35",
    );

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [preloaderDone]);

  return (
    <>
      <div className="cursor" ref={cursorRef}>
        <MousePointer2
          size={20}
          fill="var(--color-accent-primary)"
          stroke="var(--bg-primary)"
          strokeWidth={1.5}
        />
      </div>
      <section className="hero-wrapper" id="home">
        <HeroGrid />
        <div className="hero-content">
          <div className="hero-annotation">
            Web Designer &amp; Software Developer
          </div>
          <h1 className="hero-title">
            <span className="hero-first">Ivan</span>
            <span className="hero-last">Abillon</span>
          </h1>
          <p className="hero-subtitle">
            Building with intention. Designing for people.
          </p>
        </div>
        <div className="hero-bottom">
          <div className="hero-cta">
            <a href="#works" className="btn btn-ghost">
              View Works
            </a>
            <a href="#contact" className="btn btn-primary">
              Let&apos;s Talk
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
