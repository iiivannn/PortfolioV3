"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePreloader } from "../Providers";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TimelineEntry = {
  role: string;
  org: string;
  period: string;
};

const timeline: TimelineEntry[] = [
  {
    role: "Junior Frontend Developer",
    org: "Two Miss Pink Place Inc.",
    period: "Aug 2025 – Present",
  },
  {
    role: "Business Intelligence Developer Intern",
    org: "Analog Devices Inc.",
    period: "Feb 2025 – May 2025",
  },
  {
    role: "React.js Developer",
    org: "Freelance",
    period: "Sept 2023 – March 2024",
  },
  {
    role: "Bachelor of Science in Computer Engineering",
    org: "De La Salle University – Dasmariñas",
    period: "Aug 2021 – June 2025",
  },
];

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
        {timeline.map((entry, i) => (
          <div key={i} className="portfolio-entry">
            <div className="portfolio-entry-info">
              <h3 className="portfolio-entry-role">{entry.role}</h3>
              <p className="portfolio-entry-org">{entry.org}</p>
            </div>
            <span className="portfolio-entry-period">{entry.period}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
