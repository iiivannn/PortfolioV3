"use client";

import { useState } from "react";
import Preloader from "../ui/Preloader";
import Navbar from "../ui/Navbar";

export default function Home() {
  const [preloader, setPreloader] = useState(true);

  if (preloader) {
    return (
      <Preloader
        onAnimationDone={() => {
          setPreloader(false);
        }}
      />
    );
  }

  return (
    <>
      <Navbar />
      <main>Home</main>
    </>
  );
}
