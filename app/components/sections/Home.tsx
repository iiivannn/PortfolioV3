"use client";

import { useState, useRef } from "react";
import Preloader from "../ui/Preloader";
import Navbar from "../ui/Navbar";
import HeroGrid from "../ui/HeroGrid";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MousePointer2 } from "lucide-react";

export default function Home() {
  const [preloader, setPreloader] = useState(true);
  const cursorRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const isInAboutRef = useRef(false);
  const isOverTextRef = useRef(false);

  useGSAP(() => {
    if (preloader) return;

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

      if (descriptionRef.current && isInAboutRef.current) {
        const rect = descriptionRef.current.getBoundingClientRect();
        descriptionRef.current.style.setProperty(
          "--mouse-x",
          `${e.clientX - rect.left}px`,
        );
        descriptionRef.current.style.setProperty(
          "--mouse-y",
          `${e.clientY - rect.top}px`,
        );
      }
    };

    const handleAboutEnter = () => {
      isInAboutRef.current = true;
    };

    const handleAboutLeave = () => {
      isInAboutRef.current = false;
      isOverTextRef.current = false;
      if (descriptionRef.current) {
        descriptionRef.current.style.setProperty("--mouse-x", "-9999px");
        descriptionRef.current.style.setProperty("--mouse-y", "-9999px");
      }
      gsap.to(cursorRef.current, { opacity: 1, duration: 0.3 });
    };

    const handleTextEnter = () => {
      isOverTextRef.current = true;
      gsap.to(cursorRef.current, { opacity: 0, duration: 0.3 });
    };

    const handleTextLeave = () => {
      isOverTextRef.current = false;
      gsap.to(cursorRef.current, { opacity: 1, duration: 0.3 });
    };

    aboutRef.current?.addEventListener("mouseenter", handleAboutEnter);
    aboutRef.current?.addEventListener("mouseleave", handleAboutLeave);
    descriptionRef.current?.addEventListener("mouseenter", handleTextEnter);
    descriptionRef.current?.addEventListener("mouseleave", handleTextLeave);
    window.addEventListener("mousemove", handleMouseMove);

    tl.fromTo(
      ".hero-title",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power1.out", stagger: 0.4 },
    );

    tl.fromTo(
      ".hero-job-title",
      { opacity: 0 },
      { opacity: 1, ease: "power2.in", duration: 0.6 },
    );

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      aboutRef.current?.removeEventListener("mouseenter", handleAboutEnter);
      aboutRef.current?.removeEventListener("mouseleave", handleAboutLeave);
      descriptionRef.current?.removeEventListener(
        "mouseenter",
        handleTextEnter,
      );
      descriptionRef.current?.removeEventListener(
        "mouseleave",
        handleTextLeave,
      );
    };
  }, [preloader]);

  if (preloader) {
    return (
      <Preloader
        onAnimationDone={() => {
          setPreloader(false);
        }}
      />
    );
  }

  return (
    <>
      <Navbar />
      <div className="cursor" ref={cursorRef}>
        <MousePointer2
          size={20}
          fill="var(--color-accent-primary)"
          stroke="var(--bg-primary)"
          strokeWidth={1.5}
        />
      </div>
      <main className="home">
        <section className="hero-wrapper">
          <HeroGrid />
          <div className="hero-title-container">
            <p className="hero-title">Ivan</p>
            <p className="hero-title">Abillon</p>
          </div>
          <div className="hero-job-title">
            Software Developer / Web Designer
          </div>
        </section>

        <section className="about-wrapper" ref={aboutRef}>
          <p className="about-description" ref={descriptionRef}>
            Weaving design, experience, and accessibility — building websites
            with intention and understanding for its users. Before becoming a
            developer, I was a user first. I believe great websites fulfill user
            needs. That&apos;s why I focus on creating intuitive experiences
            through meaningful, modern interfaces, thoughtful user experience,
            and accessibility across all devices.
          </p>
        </section>
      </main>
    </>
  );
}
