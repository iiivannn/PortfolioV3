/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";

export default function Certificates() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const hoveredIdRef = useRef<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    hoveredIdRef.current = hoveredId;
  }, [hoveredId]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!previewRef.current) return;
      previewRef.current.style.left = `${e.clientX}px`;
      previewRef.current.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!hoveredIdRef.current) return;
      const el = document.elementFromPoint(mousePos.current.x, mousePos.current.y);
      if (!el?.closest(".cert-item")) setHoveredId(null);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="certs-section" id="certificates">
      <div className="certs-header">
        <span className="certs-section-label">Credentials</span>
        <h2 className="certs-section-title">Certificates</h2>
      </div>

      <div className="certs-list">
        <div className="certs-col-header">
          <span>Provider</span>
          <span>Certificate</span>
          <span>Year</span>
        </div>

        <a
          href="https://certificates.cs50.io/91f8c7c2-22fc-4b69-b559-600e175819a6"
          className={`cert-item${hoveredId === "cs50" ? " is-active" : ""}`}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredId("cs50")}
          onMouseLeave={() => setHoveredId(null)}
        >
          <span className="cert-item-label">Harvard University</span>
          <h3 className="cert-title">CS50</h3>
          <span className="cert-item-year">2024</span>
        </a>

        <a
          href="https://www.freecodecamp.org/certification/iiivannn/responsive-web-design"
          className={`cert-item${hoveredId === "freecodecamp" ? " is-active" : ""}`}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredId("freecodecamp")}
          onMouseLeave={() => setHoveredId(null)}
        >
          <span className="cert-item-label">freeCodeCamp</span>
          <h3 className="cert-title">Responsive Web Design</h3>
          <span className="cert-item-year">2023</span>
        </a>
      </div>

      <div
        ref={previewRef}
        className={`cert-cursor-preview${hoveredId ? " is-visible" : ""}`}
        aria-hidden="true"
      >
        <img
          src="/certs/CS50-certificate.webp"
          alt="CS50 Certificate"
          className={hoveredId === "cs50" ? "is-active" : ""}
        />
        <img
          src="/certs/freeCodeCamp-certificate.webp"
          alt="freeCodeCamp Certificate"
          className={hoveredId === "freecodecamp" ? "is-active" : ""}
        />
      </div>
    </section>
  );
}
