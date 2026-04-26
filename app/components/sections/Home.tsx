"use client";

import { useRef } from "react";
import HeroGrid from "../ui/HeroGrid";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MousePointer2 } from "lucide-react";
import { usePreloader } from "../Providers";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

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
      ".hero-subtitle",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, ease: "power2.inOut", duration: 0.6 },
    );

    tl.fromTo(
      ".hero-title span",
      { x: -20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2,
        reversed: true,
      },
    );

    gsap.fromTo(
      ".hero-annotation",
      { x: -20, opacity: 0 },
      { x: 0, delay: 1.6, opacity: 1, ease: "power2.inOut", duration: 0.6 },
    );

    gsap.fromTo(
      ".hero-cta .btn",
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, ease: "power2.inOut", stagger: 0.4, duration: 1.2 },
    );

    const splitAboutDesc = SplitText.create(".about-description", {
      type: "lines",
      mask: "lines",
    });

    gsap.from(splitAboutDesc.lines, {
      duration: 1,
      yPercent: 100,
      opacity: 0,
      stagger: 0.3,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".about-description",
        start: "top 80%",
      },
    });


    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      splitAboutDesc.revert();
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
      <div className="home" id="home">
        <section className="hero-wrapper">
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

        <section className="about-section" id="about">
          <div className="about-inner">
            <div className="about-header">
              <span className="about-index">01</span>
              <span className="about-label">About</span>
            </div>
            <div className="about-body">
              <h2 className="about-heading">
                <span className="about-heading-bold">Designer.</span>
                <span className="about-heading-accent">Developer.</span>
              </h2>
              <p className="about-description">
                Weaving design, experience, and accessibility — building
                websites with intention and understanding for its users. Before
                becoming a developer, I was a user first. I believe great
                websites fulfill user needs. That&apos;s why I focus on creating
                intuitive experiences through meaningful, modern interfaces,
                thoughtful user experience, and accessibility across all
                devices.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
