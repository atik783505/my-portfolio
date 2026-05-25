"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useScroll } from "@/components/ScrollProvider";
import "devicon/devicon.min.css";

/* ─── Tech stack data ─────────────────────────────────────────── */
const skills = [
  { name: "React", iconClass: "devicon-react-original colored" },
  { name: "Next.js", iconClass: "devicon-nextjs-original colored" },
  { name: "MongoDB", iconClass: "devicon-mongodb-plain colored" },
  { name: "Node.js", iconClass: "devicon-nodejs-plain colored" },
  { name: "Express", iconClass: "devicon-express-original colored" },
  { name: "Tailwind CSS", iconClass: "devicon-tailwindcss-original colored" },
  { name: "JavaScript", iconClass: "devicon-javascript-plain colored" },
  { name: "GitHub", iconClass: "devicon-github-original colored" },
];

/* ─── Marquee Component ───────────────────────────────────────── */
export default function Marquee() {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const { lenis } = useScroll();
  const [paused, setPaused] = useState(false);

  /* ── Build the GSAP animation once ── */
  useEffect(() => {
    if (!trackRef.current) return;

    const anim = gsap.to(trackRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 34,
      repeat: -1,
    });
    animRef.current = anim;

    /* Speed up during scroll */
    const onScroll = (e) => {
      if (paused) return;
      const absVel = Math.abs(e.velocity);
      gsap.to(anim, { timeScale: 1 + absVel * 0.15, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      gsap.to(anim, { timeScale: 1, duration: 1.2, delay: 0.1, ease: "power1.inOut", overwrite: "auto" });
    };

    if (lenis) lenis.on("scroll", onScroll);

    return () => {
      anim.kill();
      if (lenis) lenis.off("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis]);

  /* ── Pause / resume on hover ── */
  const handleMouseEnter = () => {
    setPaused(true);
    if (animRef.current) gsap.to(animRef.current, { timeScale: 0, duration: 0.4, ease: "power2.out" });
  };
  const handleMouseLeave = () => {
    setPaused(false);
    if (animRef.current) gsap.to(animRef.current, { timeScale: 1, duration: 0.6, ease: "power2.inOut" });
  };

  return (
    <div
      className="marquee-section py-12 border-y border-glass-border relative z-[2] bg-white/[0.01] overflow-hidden select-none flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Edge fades */}
      <div className="absolute top-0 bottom-0 left-0 w-[15%] z-[3] pointer-events-none bg-gradient-to-r from-bg to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-[15%] z-[3] pointer-events-none bg-gradient-to-l from-bg to-transparent" />

      {/* Scrolling track — tripled for seamless infinite loop */}
      <div ref={trackRef} className="flex w-max items-center gap-6 whitespace-nowrap">
        {[...skills, ...skills, ...skills].map((skill, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-3.5 px-7 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm transition-all duration-300 hover:border-accent hover:bg-white/[0.05] group cursor-default"
          >
            <i className={`${skill.iconClass} text-4xl`}></i>

            <span className="font-syne font-semibold text-[15px] text-muted whitespace-nowrap transition-colors duration-300 group-hover:text-white">
              {skill.name}
            </span>

            <span className="text-glass-border-hover text-xl ml-1 font-normal pointer-events-none">/</span>
          </div>
        ))}
      </div>
    </div>
  );
}