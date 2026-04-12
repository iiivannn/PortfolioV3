"use client";

import { useState } from "react";
import Preloader from "../ui/Preloader";

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

  return <div>Home</div>;
}
