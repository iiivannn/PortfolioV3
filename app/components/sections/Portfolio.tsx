"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePreloader } from "../Providers";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const preloaderDone = usePreloader();
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!preloaderDone) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 30%",
        },
      });

      tl.fromTo(
        ".portfolio-entry",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2", stagger: 0.2 },
      );
    },
    { scope: containerRef, dependencies: [preloaderDone] },
  );

  return (
    <section className="portfolio-section" id="portfolio" ref={containerRef}>
      <div className="portfolio-header">
        <span className="portfolio-section-label">Experience</span>
        <h2 className="portfolio-section-title">Portfolio</h2>
      </div>

      <div className="portfolio-timeline">
        <div className="portfolio-entry">
          <div className="portfolio-entry-info">
            <h3 className="portfolio-entry-role">Junior Frontend Developer</h3>
            <p className="portfolio-entry-org">Two Miss Pink Place Inc.</p>
          </div>
          <span className="portfolio-entry-period">Aug 2025 – Present</span>
        </div>

        <div className="portfolio-entry">
          <div className="portfolio-entry-info">
            <h3 className="portfolio-entry-role">Business Intelligence Developer Intern</h3>
            <p className="portfolio-entry-org">Analog Devices Inc.</p>
          </div>
          <span className="portfolio-entry-period">Feb 2025 – May 2025</span>
        </div>

        <div className="portfolio-entry">
          <div className="portfolio-entry-info">
            <h3 className="portfolio-entry-role">React.js Developer</h3>
            <p className="portfolio-entry-org">Freelance</p>
          </div>
          <span className="portfolio-entry-period">Sept 2023 – March 2024</span>
        </div>

        <div className="portfolio-entry">
          <div className="portfolio-entry-info">
            <h3 className="portfolio-entry-role">Bachelor of Science in Computer Engineering</h3>
            <p className="portfolio-entry-org">De La Salle University – Dasmariñas</p>
          </div>
          <span className="portfolio-entry-period">Aug 2021 – June 2025</span>
        </div>
      </div>
    </section>
  );
}
