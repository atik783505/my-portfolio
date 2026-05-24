"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Magnetic from "@/components/Magnetic";
import logo from "../../public/Images/atik.png";

/* ─── Animation Variants ─────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.88, y: 24 },
  show: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
};

/* ─── Orbit ring ─────────────────────────────────────────────── */
function OrbitRing({ size, color, delay, duration, clockwise = true }) {
  return (
    <motion.div
      className="absolute rounded-full border pointer-events-none"
      style={{ width: size, height: size, top: "50%", left: "50%", x: "-50%", y: "-50%", borderColor: color, opacity: 0.18 }}
      animate={{ rotate: clockwise ? 360 : -360 }}
      transition={{ repeat: Infinity, duration, ease: "linear", delay }}
    />
  );
}

/* ─── Stats (from Skills section) ─────────────────────────────── */
const stats = [
  { label: "Projects Built", value: "5+", isText: false },
  { label: "Learning Journey", value: "1yr", isText: false },
  { label: "Tech Mindset", value: "Fluent", isText: true },
];

/* ─── Main Component ─────────────────────────────────────────── */
export default function Hero() {
  const cardRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleMouseMove = (e) => {
    if (!cardRef.current || prefersReducedMotion) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - left) / width - 0.5) * 14,
      y: -((e.clientY - top) / height - 0.5) * 14,
    });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-[110px] pb-20">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none z-0" />
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent2/5 blur-[100px] pointer-events-none translate-x-1/2 translate-y-1/2" />
      {/* Cinematic top line */}
      <div className="absolute top-[110px] left-0 right-0 h-px bg-glass-border z-[1]" />

      <div className="max-w-[1160px] mx-auto px-6 sm:px-10 w-full relative z-[2]">

        {/* Mobile: image top → text below | Desktop: text left, image right */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1fr_460px] lg:items-center gap-14 lg:gap-10">

          {/* ══ LEFT — Text + Experience ══ */}
          <div className="space-y-7">

            {/* Availability badge */}
            <motion.div variants={fadeUp} custom={0} initial="hidden" animate={mounted ? "show" : "hidden"}
              className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[11px] font-mono tracking-widest border border-accent/25 bg-accent/6 text-accent select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
              Available for Work · 2026
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} custom={0.1} initial="hidden" animate={mounted ? "show" : "hidden"}
              className="font-syne font-extrabold text-[clamp(42px,6.5vw,82px)] leading-[1.03] tracking-tighter">
              <span className="block text-text">Atikur</span>
              <span className="block text-accent">Rahman<span className="text-text">.</span></span>
              <span className="block mt-2 text-muted font-normal italic text-[0.52em] leading-snug">
                Full-Stack MERN Developer
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p variants={fadeUp} custom={0.2} initial="hidden" animate={mounted ? "show" : "hidden"}
              className="text-[15px] text-muted leading-[1.8] max-w-[520px] font-light">
              I construct fast, robust, and accessible MERN/web applications. Specializing in&nbsp;
              <span className="text-text font-medium">React, Next.js, Node.js</span>
              &nbsp;and modern cloud deployment — turning complex codebases into polished digital experiences.
            </motion.p>

            {/* Stat chips — Projects Built / Learning Journey / Tech Mindset */}
            <motion.div variants={fadeUp} custom={0.25} initial="hidden" animate={mounted ? "show" : "hidden"}
              className="flex flex-wrap gap-3">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col items-center rounded-2xl border border-glass-border bg-glass backdrop-blur-md px-5 py-2.5 text-center min-w-[88px]">
                  <span className={`font-syne font-bold text-accent leading-none mb-0.5 ${s.isText ? "text-sm tracking-wide uppercase" : "text-[1.2rem]"}`}>
                    {s.value}
                  </span>
                  <span className="font-mono text-[9.5px] text-muted/70 tracking-wider whitespace-nowrap">{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} custom={0.5} initial="hidden" animate={mounted ? "show" : "hidden"}
              className="flex items-center gap-4 flex-wrap">
              <Magnetic>
                <a id="hero-cta-primary" href="#projects"
                  className="relative inline-flex items-center gap-2.5 overflow-hidden font-syne font-bold text-sm text-bg px-8 py-3.5 rounded-xl transition-all duration-500 ease-out hover:shadow-[0_0_40px_rgba(125,249,194,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                  style={{ background: "linear-gradient(90deg,#7DF9C2 0%,#A78BFA 40%,#7DF9C2 80%,#A78BFA 100%)", backgroundSize: "200% auto" }}>
                  <span className="relative z-10">View Projects</span>
                  <svg className="relative z-10 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </Magnetic>
              <Magnetic>
                <a id="hero-cta-secondary" href="#contact"
                  className="inline-flex items-center gap-2.5 font-syne font-semibold text-sm text-text px-8 py-3.5 rounded-xl border border-glass-border bg-glass backdrop-blur-lg transition-all duration-300 hover:border-glass-border-hover hover:bg-glass-hover hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40">
                  Get In Touch
                  <span className="text-accent text-base leading-none">✦</span>
                </a>
              </Magnetic>
            </motion.div>

          </div>

          {/* ══ RIGHT — Floating image ══ */}
          <motion.div variants={imageReveal} initial="hidden" animate={mounted ? "show" : "hidden"}
            className="flex justify-center lg:justify-end">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={prefersReducedMotion ? {} : { rotateX: tilt.y, rotateY: tilt.x }}
              transition={{ type: "spring", stiffness: 140, damping: 22 }}
              style={{ perspective: 1000, transformStyle: "preserve-3d" }}
              className="animate-antigravity relative select-none">

              {/* Outer glow */}
              <div className="absolute inset-[-24px] rounded-full bg-gradient-to-br from-accent/20 to-accent2/20 blur-[40px] pointer-events-none" />

              {/* Orbit rings */}
              <div className="absolute inset-0" aria-hidden="true">
                <OrbitRing size={360} color="rgba(125,249,194,0.6)" delay={0} duration={18} />
                <OrbitRing size={300} color="rgba(167,139,250,0.5)" delay={2} duration={13} clockwise={false} />
                <OrbitRing size={240} color="rgba(244,114,182,0.4)" delay={1} duration={22} />
              </div>

              {/* Circular photo */}
              <div
                className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] rounded-full overflow-hidden border-2 border-glass-border bg-gradient-to-br from-accent/8 to-accent2/8 backdrop-blur-xl shadow-2xl group"
                style={{ transform: "translateZ(0)" }}>
                <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
                <Image
                  src={logo}
                  alt="Atikur Rahman — Full-Stack Developer"
                  fill priority
                  sizes="(max-width: 640px) 300px, 340px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating badge — top right */}
              <div className="animate-badge-pop absolute -top-3 -right-4 bg-bg/90 backdrop-blur-md border border-glass-border rounded-2xl px-3.5 py-2 font-mono text-[10px] text-accent shadow-lg whitespace-nowrap z-10" style={{ animationDelay: "0.6s" }}>
                ⚡ React · Next.js · Node
              </div>
              {/* Floating badge — bottom left */}
              <div className="animate-badge-pop absolute -bottom-3 -left-4 bg-bg/90 backdrop-blur-md border border-glass-border rounded-2xl px-3.5 py-2 font-mono text-[10px] text-accent2 shadow-lg whitespace-nowrap z-10" style={{ animationDelay: "0.8s" }}>
                ✦ Open Source Engineer
              </div>
              {/* Online indicator */}
              <div className="animate-badge-pop absolute bottom-6 -right-6 bg-bg/90 backdrop-blur-md border border-glass-border rounded-2xl px-3 py-1.5 font-mono text-[9px] text-accent3 shadow-lg whitespace-nowrap z-10 flex items-center gap-1.5" style={{ animationDelay: "1s" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-accent3 animate-pulse-slow" />
                Online Now
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted/30 text-[10px] tracking-[0.2em] uppercase font-mono select-none">
        <span>Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-accent/30 to-transparent" />
      </div>
    </section>
  );
}