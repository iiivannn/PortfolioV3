"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { usePreloader } from "../Providers";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function About() {
  const preloaderDone = usePreloader();
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!preloaderDone) return;

      const splitAboutDesc = SplitText.create(".about-description", {
        type: "lines",
        mask: "lines",
      });

      gsap.from(splitAboutDesc.lines, {
        duration: 0.6,
        yPercent: 100,
        opacity: 0,
        stagger: 0.2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".about-description",
          start: "top 80%",
        },
      });

      return () => {
        splitAboutDesc.revert();
      };
    },
    { scope: containerRef, dependencies: [preloaderDone] },
  );

  return (
    <section className="about-section" id="about" ref={containerRef}>
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
            Weaving design, experience, and accessibility — building websites
            with intention and understanding for its users. Before becoming a
            developer, I was a user first. I believe great websites fulfill user
            needs. That&apos;s why I focus on creating intuitive experiences
            through meaningful, modern interfaces, thoughtful user experience,
            and accessibility across all devices.
          </p>
        </div>
      </div>
    </section>
  );
}
