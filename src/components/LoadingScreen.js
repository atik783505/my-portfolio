"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

const keywords = [
  "INITIALIZING PORTFOLIO",
  "COMPILING SKILLS",
  "CONNECTING WEBSOCKETS",
  "RENDERING MERN ENGINE",
  "LOADING CREATIVE INTERFACE",
  "READY"
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [keywordIndex, setKeywordIndex] = useState(0);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    // Simulate progress counter
    const progressTimeline = gsap.timeline({
      onComplete: () => {
        // Dismiss loading screen with a premium transition
        gsap.timeline()
          .to(".loading-bar", {
            scaleY: 0,
            transformOrigin: "bottom",
            duration: 0.4,
            ease: "power2.inOut"
          })
          .to(".loading-content", {
            opacity: 0,
            y: -50,
            duration: 0.5,
            ease: "power2.in"
          })
          .to(".loading-panel", {
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            duration: 1.2,
            ease: "power4.inOut"
          })
          .to(".loading-screen", {
            display: "none",
            onComplete: () => {
              // Re-enable scrolling — Hero entrance handled by Framer Motion
              document.body.style.overflow = "";

              // Animate navbar in
              gsap.fromTo(
                "nav",
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
              );
            }
          });
      }
    });

    const obj = { val: 0 };
    progressTimeline.to(obj, {
      val: 100,
      duration: 3.2,
      ease: "power2.out",
      onUpdate: () => {
        const currentProgress = Math.floor(obj.val);
        setProgress(currentProgress);
        
        // Cycle keywords based on progress threshold
        const index = Math.min(
          Math.floor((currentProgress / 100) * keywords.length),
          keywords.length - 1
        );
        setKeywordIndex(index);
      }
    });

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="loading-screen fixed inset-0 z-[99999] pointer-events-auto flex items-center justify-center">
      {/* Visual panels that slide/clip */}
      <div className="loading-panel absolute inset-0 bg-[#030306] [clip-path:polygon(0_0,_100%_0,_100%_100%,_0_100%)]" />

      {/* Loading Content */}
      <div className="loading-content relative z-[2] flex flex-col items-center px-8 w-full max-w-[600px] text-center select-none">
        
        <div className="font-mono text-accent text-[9px] sm:text-[11px] tracking-[0.25em] uppercase mb-4 opacity-80">
          SYSTEM STATUS: <span className="font-bold">{keywords[keywordIndex]}</span>
        </div>

        <div className="flex items-baseline justify-center font-syne font-extrabold text-[clamp(65px,12vw,120px)] leading-none text-text mb-6">
          <span>{String(progress).padStart(3, "0")}</span>
          <span className="text-accent text-[clamp(20px,3.5vw,36px)] font-normal">%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-[2px] bg-glass-border relative overflow-hidden rounded-full max-w-[280px] mx-auto">
          <div 
            className="loading-bar absolute top-0 left-0 h-full bg-gradient-to-r from-accent to-accent2 transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="font-mono text-[9px] text-muted tracking-wider mt-5">
          ATIKUR RAHMAN // DESIGN ENGINEERING PORTFOLIO 2026
        </div>
      </div>
    </div>
  );
}
