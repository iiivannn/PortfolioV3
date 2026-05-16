"use client";

import { useState, useEffect, useRef } from "react";
import { X, Maximize2 } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const getThemeSrc = (darkSrc: string, lightSrc: string): string =>
  document.documentElement.classList.contains("light") ? lightSrc : darkSrc;

export default function Works() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSrc, setActiveSrc] = useState("");
  const [activeTitle, setActiveTitle] = useState("");
  const containerRef = useRef<HTMLElement>(null);
  const isPinnedRef = useRef(false);

  const openLightbox = (src: string, title: string) => {
    if (!isPinnedRef.current) return;
    setActiveSrc(src);
    setActiveTitle(title);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".work-card");
      const DELAY = 0.25;
      const TRANSITION = 1;

      gsap.set(cards.slice(1), { yPercent: 100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${(cards.length - 1) * (DELAY + TRANSITION + DELAY) * window.innerHeight}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
          onToggle: (self) => {
            isPinnedRef.current = self.isActive;
            if (!self.isActive) setIsOpen(false);
          },
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        tl.to({}, { duration: DELAY });

        tl.to(card, {
          yPercent: 0,
          ease: "expo.inOut",
          duration: TRANSITION,
        });

        tl.to(
          cards[i - 1],
          {
            scale: 0.85,
            ease: "none",
            duration: TRANSITION,
          },
          "<",
        );
      });

      tl.to({}, { duration: DELAY });
    },
    { scope: containerRef },
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__lenis?.stop();
    document.body.style.overflow = "hidden";
    document.body.classList.add("lightbox-open");
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__lenis?.start();
      document.body.style.overflow = "";
      document.body.classList.remove("lightbox-open");
    };
  }, [isOpen]);

  return (
    <section className="works-section" id="works" ref={containerRef}>
      <div className="works-header">
        <span className="works-section-label">Projects</span>
        <h2 className="works-section-title">Featured Works</h2>
      </div>

      <div className="works-list">
        <article className="work-card">
          <div className="work-info">
            <span className="work-number">01 / 04</span>
            <span className="work-category">Task Manager</span>
            <h3 className="work-title">Project Board</h3>
            <p className="work-desc">
              Project Board is a full-stack Kanban-style task manager where you
              track projects across four status stages: To Do, In Progress,
              Complete, and Obsolete. It features drag-and-drop reordering,
              activity logs per project, optional completion rewards, and a
              persistent light/dark theme.
            </p>
            <div className="work-tags">
              <span className="work-tag">Next.js</span>
              <span className="work-tag">SCSS</span>
              <span className="work-tag">TypeScript</span>
              <span className="work-tag">PostgreSQL</span>
              <span className="work-tag">Prisma</span>
              <span className="work-tag">NextAuth</span>
            </div>
            <div className="work-links">
              <a
                href="https://the-project-board.vercel.app/"
                className="work-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Website
              </a>
              <a
                href="https://github.com/iiivannn/Project-Board"
                className="work-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github Repository
              </a>
            </div>
            <p className="work-quote">
              &ldquo;Where projects stay organized and progress stays
              visible.&rdquo;
            </p>
          </div>
          <div
            className="work-image-panel"
            onClick={() =>
              openLightbox(
                getThemeSrc(
                  "/project-board-preview-dark.webp",
                  "/project-board-preview-light.webp",
                ),
                "Project Board",
              )
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="work-img-dark"
              src="/project-board-preview-dark.webp"
              alt="Project Board screenshot"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="work-img-light"
              src="/project-board-preview-light.webp"
              alt="Project Board screenshot"
            />
            <div className="work-image-overlay" />
          </div>
          <button
            className="work-view-btn"
            onClick={(e) => {
              e.stopPropagation();
              openLightbox(
                getThemeSrc(
                  "/project-board-preview-dark.webp",
                  "/project-board-preview-light.webp",
                ),
                "Project Board",
              );
            }}
          >
            <Maximize2 size={12} />
            <span className="work-view-btn-label">View</span>
          </button>
        </article>

        <article className="work-card">
          <div className="work-info">
            <span className="work-number">02 / 04</span>
            <span className="work-category">Notepad Application</span>
            <h3 className="work-title">NoteFixr</h3>
            <p className="work-desc">
              NoteFixr is a full-stack note-taking app that transforms
              disorganized notes into structured, actionable content. It
              features a sidebar-based workspace with AI-powered tools and a
              built-in chat prompt. Authentication is handled via NextAuth and
              Google OAuth, ensuring a seamless and secure sign-in experience.
            </p>
            <div className="work-tags">
              <span className="work-tag">Next.js</span>
              <span className="work-tag">SCSS</span>
              <span className="work-tag">TypeScript</span>
              <span className="work-tag">PostgreSQL</span>
              <span className="work-tag">Prisma</span>
              <span className="work-tag">NextAuth</span>
              <span className="work-tag">Groq</span>
              <span className="work-tag">Tiptap</span>
            </div>
            <div className="work-links">
              <a
                href="https://note-fixr.vercel.app/"
                className="work-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Website
              </a>
              <a
                href="https://github.com/iiivannn/NoteFixr"
                className="work-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github Repository
              </a>
            </div>
            <p className="work-quote">
              &ldquo;Smart notes for busy minds.&rdquo;
            </p>
          </div>
          <div
            className="work-image-panel"
            onClick={() =>
              openLightbox(
                getThemeSrc(
                  "/notefixr-preview-dark.webp",
                  "/notefixr-preview-light.webp",
                ),
                "NoteFixr",
              )
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="work-img-dark"
              src="/notefixr-preview-dark.webp"
              alt="NoteFixr screenshot"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="work-img-light"
              src="/notefixr-preview-light.webp"
              alt="NoteFixr screenshot"
            />
            <div className="work-image-overlay" />
          </div>
          <button
            className="work-view-btn"
            onClick={(e) => {
              e.stopPropagation();
              openLightbox(
                getThemeSrc(
                  "/notefixr-preview-dark.webp",
                  "/notefixr-preview-light.webp",
                ),
                "NoteFixr",
              );
            }}
          >
            <Maximize2 size={10} />
            <span className="work-view-btn-label">View</span>
          </button>
        </article>

        <article className="work-card">
          <div className="work-info">
            <span className="work-number">03 / 04</span>
            <span className="work-category">Coffee Shop Website</span>
            <h3 className="work-title">Cozy Grounds</h3>
            <p className="work-desc">
              Cozy Grounds is a coffee shop landing page with interactive
              product filtering, a blog section, a premium showcase, and smooth
              scroll animations. Built with semantic HTML, CSS, and vanilla
              JavaScript, it uses a mobile-first approach and is designed to be
              accessible and user-friendly across all devices.
            </p>
            <div className="work-tags">
              <span className="work-tag">HTML5</span>
              <span className="work-tag">CSS3</span>
              <span className="work-tag">JavaScript</span>
              <span className="work-tag">Responsive</span>
              <span className="work-tag">Accessible</span>
              <span className="work-tag">Semantic</span>
            </div>
            <div className="work-links">
              <a
                href="https://cozy-grounds.vercel.app/"
                className="work-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Website
              </a>
              <a
                href="https://github.com/iiivannn/Coffee-Website"
                className="work-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github Repository
              </a>
            </div>
            <p className="work-quote">
              &ldquo;Built on solid grounds, crafted with warmth.&rdquo;
            </p>
          </div>
          <div
            className="work-image-panel"
            onClick={() =>
              openLightbox("/cozy-grounds-preview.webp", "Cozy Grounds")
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/cozy-grounds-preview.webp"
              alt="Cozy Grounds screenshot"
            />
            <div className="work-image-overlay" />
          </div>
          <button
            className="work-view-btn"
            onClick={(e) => {
              e.stopPropagation();
              openLightbox("/cozy-grounds-preview.webp", "Cozy Grounds");
            }}
          >
            <Maximize2 size={10} />
            <span className="work-view-btn-label">View</span>
          </button>
        </article>

        <article className="work-card">
          <div className="work-info">
            <span className="work-number">04 / 04</span>
            <span className="work-category">Electric Vehicle Dealership</span>
            <h3 className="work-title">NexDrive</h3>
            <p className="work-desc">
              NexDrive is a luxury electric vehicle dealership website built to
              showcase and browse high-performance EVs. It features an
              interactive vehicle catalog with brand filtering, a touch-enabled
              carousel, detailed specs per model, a newsletter subscription
              section, and scroll-triggered animations.
            </p>
            <div className="work-tags">
              <span className="work-tag">HTML5</span>
              <span className="work-tag">CSS3</span>
              <span className="work-tag">JavaScript</span>
              <span className="work-tag">ScrollReveal</span>
              <span className="work-tag">Swiper.js</span>
              <span className="work-tag">Responsive</span>
              <span className="work-tag">Accessible</span>
              <span className="work-tag">Semantic</span>
            </div>
            <div className="work-links">
              <a
                href="https://nexdrive-ev.vercel.app/"
                className="work-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Website
              </a>
              <a
                href="https://github.com/iiivannn/Car-Website"
                className="work-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github Repository
              </a>
            </div>
            <p className="work-quote">
              &ldquo;Where performance meets electric innovation.&rdquo;
            </p>
          </div>
          <div
            className="work-image-panel"
            onClick={() => openLightbox("/nexdrive-preview.webp", "NexDrive")}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nexdrive-preview.webp" alt="NexDrive screenshot" />
            <div className="work-image-overlay" />
          </div>
          <button
            className="work-view-btn"
            onClick={(e) => {
              e.stopPropagation();
              openLightbox("/nexdrive-preview.webp", "NexDrive");
            }}
          >
            <Maximize2 size={10} />
            <span className="work-view-btn-label">View</span>
          </button>
        </article>
      </div>

      <div className="works-scroll-hint" aria-hidden="true">
        <span className="works-scroll-hint-label">Scroll</span>
        <div className="works-scroll-hint-line" />
      </div>

      <div
        className={`lightbox-overlay${isOpen ? " is-open" : ""}`}
        onClick={closeLightbox}
      >
        <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
          <div className="lightbox-meta">
            <span className="lightbox-title">{activeTitle}</span>
            <button className="lightbox-close" onClick={closeLightbox}>
              <X size={12} />
              Close
            </button>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {activeSrc && <img src={activeSrc} alt={activeTitle} />}
        </div>
      </div>
    </section>
  );
}
