"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const education = [
  {
    year: "2023 — Present",
    degree: "Diploma in Computer Science & Technology",
    school: "🏛 Feni Polytechnic Institute",
    desc: "Specializing in software engineering fundamentals, database design, object-oriented programming, and computer networks.",
    badge: "🎓 Computer Tech",
  },
  {
    year: "2025 — Present",
    degree: "MERN Stack Web Development Course",
    school: "🚀 Programming Hero",
    desc: "Comprehensive training in MongoDB, Express.js, React, Node.js, Firebase Auth, Tailwind CSS, and web performance optimization.",
    badge: "💻 Fullstack MERN",
  },
];

function EducationCard({ item, idx }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="glass p-8 group relative overflow-hidden border border-glass-border hover:border-accent/30 hover:shadow-[0_20px_45px_rgba(0,0,0,0.45)]"
      style={{
        "--mouse-x": "0px",
        "--mouse-y": "0px",
      }}
    >
      {/* Background Spotlight Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: "radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(125, 249, 194, 0.07), transparent 75%)",
        }}
      />

      {/* Slide-in Top Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      {/* Year */}
      <div className="relative z-10 flex items-center gap-2 font-mono text-[10px] text-accent tracking-wider mb-4 before:flex-grow before:h-px before:bg-glass-border order-2 flex-row-reverse select-none">
        <span className="order-1 font-semibold">{item.year}</span>
      </div>

      {/* Card Info */}
      <div className="relative z-10 space-y-3.5">
        <h3 className="font-syne font-bold text-lg leading-tight text-text group-hover:text-accent transition-colors duration-300">
          {item.degree}
        </h3>

        <div className="text-xs text-muted/80 font-medium select-none">
          {item.school}
        </div>

        <p className="text-[13px] text-muted/65 leading-relaxed font-light">
          {item.desc}
        </p>

        <div className="pt-2">
          <span className="inline-flex items-center gap-1.5 bg-accent/5 border border-accent/20 rounded-md px-3 py-1 font-mono text-[10px] text-accent font-semibold select-none">
            {item.badge}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Education() {
  return (
    <section id="education" className="py-[120px] relative overflow-hidden">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none z-0 opacity-40" />

      <div className="max-w-[1100px] mx-auto px-8 relative z-[2]">

        {/* Section Header */}
        <div className="flex items-center gap-2.5 font-mono text-[11px] text-accent tracking-[0.18em] uppercase mb-4 before:content-[''] before:block before:w-6 before:h-px before:bg-accent select-none">
          Education
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-syne font-bold text-[clamp(28px,4vw,42px)] leading-[1.15] tracking-tight mb-16 select-none"
        >
          Academic <em className="italic text-accent">Journey</em>
        </motion.h2>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((item, idx) => (
            <EducationCard key={idx} item={item} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
