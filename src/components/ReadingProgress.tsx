"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-0.5 z-[100] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#E91E90] via-[#E91E90] to-cyan-400 transition-[width] duration-150 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5),0_0_20px_rgba(139,92,246,0.3)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
