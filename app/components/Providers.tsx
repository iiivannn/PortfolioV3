/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import Lenis from "lenis";
import gsap from "gsap";
import Preloader from "./ui/Preloader";

export const PreloaderContext = createContext(false);
export const usePreloader = () => useContext(PreloaderContext);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    (window as any).__lenis = lenis;

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <PreloaderContext.Provider value={preloaderDone}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {!preloaderDone && (
          <Preloader onAnimationDone={() => setPreloaderDone(true)} />
        )}
        {children}
      </ThemeProvider>
    </PreloaderContext.Provider>
  );
}
