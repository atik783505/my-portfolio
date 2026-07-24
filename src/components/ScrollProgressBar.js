"use client";

import { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      setProgress((scrollTop / docHeight) * 100);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] h-[2px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-accent via-accent2 to-accent3 transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
