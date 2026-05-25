"use client";

import { motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";

export default function About() {
  return (
    <section id="about" className="py-[120px] relative overflow-hidden bg-bg/40">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none z-0 opacity-30" />
      
      {/* Ambient decorative glow */}
      <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] rounded-full bg-accent3/5 blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-[1100px] mx-auto px-8 relative z-[2]">
        
        {/* Section Header */}
        <div className="flex items-center gap-2.5 font-mono text-[11px] text-accent tracking-[0.18em] uppercase mb-4 before:content-[''] before:block before:w-6 before:h-px before:bg-accent select-none">
          About Me
        </div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-syne font-bold text-[clamp(28px,4vw,42px)] leading-[1.15] tracking-tight mb-16 select-none"
        >
          My Story & <em className="italic text-accent">Personality</em>
        </motion.h2>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
          
          {/* Left Column: Biography & Journey */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 text-[15px] text-muted leading-[1.8] font-light"
          >
            <h3 className="font-syne font-bold text-2xl text-text leading-tight mb-2">
              Building the Future, One Line of Code at a Time.
            </h3>
            
            <p>
              Hello! I'm <span className="text-text font-medium">Atikur Rahman</span>, a passionate Full-Stack MERN Developer based in Cumilla, Bangladesh. My fascination with computers started during my early academic years, which led me to pursue a <span className="text-accent font-mono font-medium">Diploma in Computer Science & Technology</span> at Feni Polytechnic Institute. 
            </p>
            
            <p>
              My coding journey took off in earnest when I dove into web technologies. Realizing the sheer power of JavaScript to bring static canvases to life, I enrolled in programming bootcamps and specialized courses, including the comprehensive <span className="text-accent2 font-semibold">MERN Stack Web Development Course</span> by Programming Hero. Since then, I have been constructing high-performance, responsive web architectures that blend robust backends with pixel-perfect interfaces.
            </p>

            <p>
              I truly enjoy solving complex problems, building secure session authentication systems, designing RESTful APIs, and implementing delightful custom micro-animations (like custom cursors, magnetic physics, and spring-loaded transitions). To me, code is not just a tool to build logic—it is an art form to deliver memorable user experiences.
            </p>

            <div className="pt-4 flex justify-start">
              <Magnetic>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2.5 font-syne font-bold text-xs bg-glass hover:bg-glass-hover border border-glass-border px-6 py-3 rounded-xl transition-all duration-300"
                >
                  Let's Collaborate
                  <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </Magnetic>
            </div>
          </motion.div>

          {/* Right Column: Personality Cards & Hobbies */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Card 1: Hobbies */}
            <div className="glass p-6 border border-glass-border hover:border-accent/30 glow-box transition-all duration-300 select-none">
              <div className="w-9 h-9 rounded-lg bg-accent/5 border border-accent/15 flex items-center justify-center text-accent mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48z" />
                </svg>
              </div>
              <h4 className="font-syne font-bold text-base text-text mb-2">Sports & Hype</h4>
              <p className="text-[12px] text-muted leading-relaxed font-light">
                When I am not debugging code, you will find me playing competitive cricket or football with friends. I love the physical energy and strategic teamwork!
              </p>
            </div>

            {/* Card 2: Nature & Outing */}
            <div className="glass p-6 border border-glass-border hover:border-accent2/30 glow-box transition-all duration-300 select-none">
              <div className="w-9 h-9 rounded-lg bg-accent2/5 border border-accent2/15 flex items-center justify-center text-accent2 mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <h4 className="font-syne font-bold text-base text-text mb-2">Nature & Travel</h4>
              <p className="text-[12px] text-muted leading-relaxed font-light">
                I am deeply inspired by scenic landscapes and natural environments. Taking long walks, traveling, and taking photos keeps my mind creative.
              </p>
            </div>

            {/* Card 3: Code Preference */}
            <div className="glass p-6 border border-glass-border hover:border-accent3/30 glow-box transition-all duration-300 select-none">
              <div className="w-9 h-9 rounded-lg bg-accent3/5 border border-accent3/15 flex items-center justify-center text-accent3 mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
              </div>
              <h4 className="font-syne font-bold text-base text-text mb-2">My Sweet Spot</h4>
              <p className="text-[12px] text-muted leading-relaxed font-light">
                I love full-stack Next.js and Tailwind CSS. Crafting robust APIs on the backend while building seamless layouts on the client keeps me in the zone.
              </p>
            </div>

            {/* Card 4: Work Philosophy */}
            <div className="glass p-6 border border-glass-border hover:border-accent/30 glow-box transition-all duration-300 select-none">
              <div className="w-9 h-9 rounded-lg bg-accent/5 border border-accent/15 flex items-center justify-center text-accent mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h4 className="font-syne font-bold text-base text-text mb-2">Value Delivery</h4>
              <p className="text-[12px] text-muted leading-relaxed font-light">
                For me, writing clean, well-commented, and scalable code is key. I aim to create projects that perform flawlessly and satisfy all design standards.
              </p>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
