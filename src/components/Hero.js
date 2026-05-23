"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image"; // Next.js Optimized Image component import
import Magnetic from "@/components/Magnetic";
import logo from '../../public/Images/atik.png'

export default function Hero() {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;

    // Calculate mouse position relative to card center (-0.5 to 0.5)
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    // Set rotation degrees
    setTilt({ x: x * 15, y: -y * 15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-[120px] pb-16">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none z-0" />

      {/* Decorative Cinematic Layout Lines */}
      <div className="absolute top-[120px] left-0 right-0 h-px bg-glass-border origin-left scale-x-0 hero-line-x z-[1]" />
      <div className="absolute top-0 bottom-0 left-[max(40px,calc((100vw-1100px)/2))] w-px bg-glass-border origin-top scale-y-0 hero-line-y z-[1] hidden md:block" />

      <div className="max-w-[1100px] mx-auto px-8 w-full relative z-[2]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-[60px] md:pl-10">

          {/* Left Text Column */}
          <div className="hero-text">
            {/* Availability Badge */}
            <div className="hero-reveal opacity-0 select-none inline-flex items-center gap-2 bg-accent/8 border border-accent/20 rounded-[30px] px-3.5 py-1.5 font-mono text-[11px] text-accent mb-7">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-slow" />
              Available for Work · 2026
            </div>

            {/* Main Header Reveal */}
            <h1 className="font-syne font-extrabold text-[clamp(44px,7vw,84px)] leading-[1.02] tracking-tighter mb-6">
              <span className="hero-reveal opacity-0 block">Atikur</span>
              <span className="hero-reveal opacity-0 text-accent block">Rahman<span className="text-text">.</span></span>
              <span className="hero-reveal opacity-0 text-muted font-normal italic text-[0.55em] block mt-2">
                Full-Stack MERN Developer
              </span>
            </h1>

            {/* Description paragraph */}
            <p className="hero-reveal opacity-0 text-[15px] text-muted leading-[1.75] max-w-[480px] mb-9 font-light">
              I construct fast, robust, and accessible MERN/web applications. 
              Specializing in React, Next.js, Node.js, and modern cloud deployment — turning complex codebases into polished digital experiences.
            </p>

            {/* CTAs with Magnetic triggers */}
            <div className="hero-reveal opacity-0 flex items-center gap-4 flex-wrap">
              <Magnetic>
                <a 
                  href="#projects" 
                  className="inline-flex items-center gap-2 bg-accent text-bg font-syne font-bold text-sm px-7 py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_12px_32px_rgba(125,249,194,0.3)]"
                  data-cursor="explore"
                >
                  View Projects →
                </a>
              </Magnetic>
              
              <Magnetic>
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-2 text-text font-syne font-semibold text-sm px-7 py-3.5 rounded-xl border border-glass-border bg-glass backdrop-blur-lg hover:border-glass-border-hover hover:bg-glass-hover"
                >
                  Get In Touch
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Right Interactive Developer Card */}
          <div className="hero-card-reveal opacity-0 relative hidden lg:block select-none" style={{ perspective: 1000 }}>
            {/* Glowing Background Glow */}
            <div className="absolute inset-[-15px] bg-gradient-to-br from-accent/10 to-accent2/10 rounded-[40px] blur-[30px] pointer-events-none opacity-60" />

            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ rotateX: tilt.y, rotateY: tilt.x }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="w-[300px] h-[300px] rounded-[28px] bg-gradient-to-br from-accent/8 to-accent2/8 border border-glass-border backdrop-blur-lg flex items-center justify-center relative overflow-hidden group shadow-2xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Internal decorative gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent2/10 pointer-events-none" />
              
              {/* Dynamic Grid Overlay Inside Card */}
              <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

              {/* Next.js Optimized Image Frame */}
              <div 
                className="relative z-[1] group-hover:scale-105 transition-transform duration-500 w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-accent/40 shadow-xl bg-bg/50"
                style={{ transform: "translateZ(40px)" }}
              >
                <Image 
                  src={logo} // Public folder e ei name e chobi thakbe
                  alt="Atikur Rahman Profile"
                  fill
                  priority
                  sizes="120px"
                  className="object-cover"
                />
              </div>

              {/* Float code tags */}
              <div 
                className="absolute top-4 right-4 bg-bg/85 backdrop-blur-md border border-glass-border rounded-xl px-3 py-1.5 font-mono text-[9px] text-accent tracking-wider"
                style={{ transform: "translateZ(20px)" }}
              >
                React · Next.js · Node
              </div>

              {/* Code window overlay */}
              <div 
                className="absolute bottom-4 left-4 right-4 bg-bg/85 border border-glass-border rounded-xl p-3 font-mono text-[10px] text-accent leading-relaxed"
                style={{ transform: "translateZ(30px)" }}
              >
                <div className="flex gap-1.5 mb-1">
                  <span className="text-accent2">const</span> 
                  <span className="text-text">dev</span> = {"{"}
                </div>
                <div className="pl-3"><span className="text-accent3">"name"</span>: <span className="text-accent3">"Atikur"</span>,</div>
                <div className="pl-3"><span className="text-accent3">"role"</span>: <span className="text-accent3">"MERN Stack"</span>,</div>
                <div className="pl-3"><span className="text-accent3">"stars"</span>: <span className="text-accent">340+</span></div>
                <div>{"}"}</div>
              </div>
            </motion.div>

            {/* Extra Floating Badge */}
            <div className="absolute bottom-[24px] left-[-42px] bg-bg/85 backdrop-blur-md border border-glass-border rounded-xl px-3.5 py-2 text-[10px] font-mono text-accent2 whitespace-nowrap z-10 shadow-lg animate-bounce">
              ✦ Open Source Engineer
            </div>
          </div>

        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted/30 text-[10px] tracking-[0.2em] uppercase font-mono select-none">
        <span>Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-accent/30 to-transparent" />
      </div>
    </section>
  );
}