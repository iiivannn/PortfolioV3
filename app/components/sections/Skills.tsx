"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { usePreloader } from "../Providers";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const preloaderDone = usePreloader();

  useGSAP(
    () => {
      if (!preloaderDone) return;

      [
        ...gsap.utils.toArray<HTMLElement>(".skill-comment"),
        ...gsap.utils.toArray<HTMLElement>(".skill-pill"),
      ].forEach((el) => {
        const original = el.textContent || "";
        gsap.to(el, {
          scrambleText: {
            text: original,
            chars: "upperCase",
            speed: 0.5,
            revealDelay: 0.2,
          },
          duration: 6,
          scrollTrigger: {
            trigger: el,
            start: "top 100%",
          },
        });
      });
    },
    { scope: containerRef, dependencies: [preloaderDone] },
  );

  return (
    <section className="skills-section" id="skills" ref={containerRef}>
      <div className="skills-header">
        <span className="skills-section-label">Skills</span>
        <h2 className="skills-section-title">What I Work With</h2>
      </div>

      <div className="skills-grid">
        <div className="skills-category">
          <span className="skill-comment">Frontend</span>
          <div className="skills-pills">
            <span className="skill-pill">HTML5</span>
            <span className="skill-pill">CSS3</span>
            <span className="skill-pill">SCSS</span>
            <span className="skill-pill">JavaScript</span>
            <span className="skill-pill">TypeScript</span>
            <span className="skill-pill">React</span>
            <span className="skill-pill">Next.js</span>
            <span className="skill-pill">GSAP</span>
          </div>
        </div>

        <div className="skills-category">
          <span className="skill-comment">Backend</span>
          <div className="skills-pills">
            <span className="skill-pill">Node.js</span>
            <span className="skill-pill">Python</span>
            <span className="skill-pill">Flask</span>
            <span className="skill-pill">PostgreSQL</span>
            <span className="skill-pill">Prisma</span>
            <span className="skill-pill">NextAuth</span>
          </div>
        </div>

        <div className="skills-category">
          <span className="skill-comment">Tools</span>
          <div className="skills-pills">
            <span className="skill-pill">VS Code</span>
            <span className="skill-pill">Git</span>
            <span className="skill-pill">GitHub</span>
            <span className="skill-pill">Figma</span>
            <span className="skill-pill">Vercel</span>
            <span className="skill-pill">Neon</span>
          </div>
        </div>
      </div>
    </section>
  );
}
