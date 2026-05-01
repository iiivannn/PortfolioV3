"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const PULSE_COUNT = 3; // comets active simultaneously
const GRID_SPACING = 50; // px between grid lines
const COMET_LEN = 120; // px length of each comet trail

type Direction = "ltr" | "rtl" | "ttb" | "btt";

interface Pulse {
  id: number;
  orientation: "h" | "v";
  direction: Direction;
  position: number;
  duration: number;
  delay: number;
}

function getLines(w: number, h: number) {
  const hLines: number[] = [];
  const vLines: number[] = [];
  for (let y = GRID_SPACING; y < h - GRID_SPACING; y += GRID_SPACING)
    hLines.push(y);
  for (let x = GRID_SPACING; x < w - GRID_SPACING; x += GRID_SPACING)
    vLines.push(x);
  return { hLines, vLines };
}

function randomPulse(
  id: number,
  hLines: number[],
  vLines: number[],
  delay = 0,
): Pulse {
  const isH = Math.random() > 0.5;
  const lines = isH ? hLines : vLines;
  const pos = lines[Math.floor(Math.random() * lines.length)];
  return {
    id,
    orientation: isH ? "h" : "v",
    direction: (isH
      ? Math.random() > 0.5
        ? "ltr"
        : "rtl"
      : Math.random() > 0.5
        ? "ttb"
        : "btt") as Direction,
    position: pos,
    duration: 2 + Math.random() * 2.5,
    delay,
  };
}

function buildPulses(w: number, h: number): Pulse[] {
  const { hLines, vLines } = getLines(w, h);
  return Array.from({ length: PULSE_COUNT }, (_, i) =>
    randomPulse(i, hLines, vLines, -(Math.random() * 6)),
  );
}

export default function HeroGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [pulses, setPulses] = useState<Pulse[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setPulses(buildPulses(el.offsetWidth, el.offsetHeight));
  }, []);

  const handleIteration = useCallback((id: number) => {
    const el = ref.current;
    if (!el) return;
    const { hLines, vLines } = getLines(el.offsetWidth, el.offsetHeight);
    if (!hLines.length && !vLines.length) return;
    setPulses((prev) =>
      prev.map((p) => (p.id !== id ? p : randomPulse(id, hLines, vLines))),
    );
  }, []);

  return (
    <div
      className="hero-grid"
      ref={ref}
      style={
        {
          "--comet-len": `${COMET_LEN}px`,
          "--grid-spacing": `${GRID_SPACING}px`,
        } as React.CSSProperties
      }
    >
      {pulses.map((p) => (
        <div
          key={p.id}
          className={`grid-comet grid-comet--${p.orientation} grid-comet--${p.direction}`}
          style={
            {
              [p.orientation === "h" ? "top" : "left"]: `${p.position}px`,
              "--comet-duration": `${p.duration}s`,
              "--comet-delay": `${p.delay}s`,
            } as React.CSSProperties
          }
          onAnimationIteration={() => handleIteration(p.id)}
        />
      ))}
    </div>
  );
}
