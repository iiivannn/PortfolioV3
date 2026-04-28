"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader({
  onAnimationDone,
}: {
  onAnimationDone: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const totalImages = 7;
  const imageAnimationDuration = 0.9;
  const imageStagger = 0.2;

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          const preloaderCard = cardRef.current!.getBoundingClientRect();

          gsap.set(".preloader-card", {
            position: "fixed",
            top: preloaderCard.top,
            left: preloaderCard.left,
            width: preloaderCard.width,
            height: preloaderCard.height,
          });

          gsap.to(".preloader-card-overlay", {
            opacity: 1,
            ease: "power4.out",
            duration: 0.8,
          });

          gsap.to(".preloader-card", {
            top: 0,
            left: 0,
            width: "100dvw",
            height: "100dvh",
            delay: 0.2,
            ease: "expo.inOut",
            duration: 1.5,
            onComplete: onAnimationDone,
          });
        },
      });

      tl.fromTo(
        ".image-wrapper",
        {
          clipPath: "inset(100% 0 0 0)",
          visibility: "visible",
        },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: imageAnimationDuration,
          stagger: imageStagger,
          ease: "power2",
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div className="preloader-container" ref={containerRef}>
      <div className="preloader-card" ref={cardRef}>
        {Array.from({ length: totalImages }, (_, i) => i + 1).map((index) => (
          <div key={index} className="image-wrapper" style={{ zIndex: index }}>
            <Image
              key={index}
              src={`/preloader${index}.webp`}
              alt="Preloader Image"
              width={300}
              height={400}
              loading="eager"
            />
          </div>
        ))}
        <div className="preloader-card-overlay"></div>
      </div>
    </div>
  );
}
