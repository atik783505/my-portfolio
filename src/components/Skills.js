"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

/* ─── Skill progress bars ────────────────────────────────────── */
const skillBars = [
  { name: "React / Next.js", level: 95, category: "Frontend" },
  { name: "JavaScript (ES6)", level: 93, category: "Frontend" },
  { name: "CSS / Tailwind", level: 92, category: "Frontend" },
  { name: "Node.js / Express", level: 93, category: "Backend" },
  { name: "MongoDB", level: 88, category: "Backend" },
  { name: "Better Auth", level: 85, category: "Backend" },
  { name: "Google Cloud Platform", level: 82, category: "Cloud" },
];

/* ─── Tech stack icons — all via CDN for next/image optimisation ─ */
const staticSkills = [
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", w: 18, h: 18 },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", w: 18, h: 18 },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", w: 18, h: 18 },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", w: 18, h: 18 },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", w: 18, h: 18, invert: true },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", w: 18, h: 18 },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", w: 18, h: 18, invert: true },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", w: 18, h: 18 },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", w: 18, h: 18 },
  { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg", w: 18, h: 18 },
  { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", w: 18, h: 18, invert: true },
  { name: "Netlify", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg", w: 18, h: 18 },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", w: 18, h: 18 },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", w: 18, h: 18, invert: true },
  { name: "RESTful API", icon: "https://img.icons8.com/ios-filled/50/api.png", w: 18, h: 18, invert: true },
  { name: "UI Libraries", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg", w: 18, h: 18 },
  { name: "Better Auth", icon: "https://img.icons8.com/isometric/50/shield.png", w: 18, h: 18 },
];

/* ─── Animated count-up number ──────────────────────────────── */
function CountUp({ value, duration = 1.2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(value, 10);
    if (isNaN(num)) return;
    let start = 0;
    const stepTime = Math.max(Math.floor((duration * 1000) / num), 20);
    const timer = setInterval(() => {
      start += 1;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(start);
    }, stepTime);
    return () => clearInterval(timer);
  }, [value, duration, isInView]);

  const suffix = value.replace(/[0-9]/g, "");
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Framer Motion shared variants ─────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 110, damping: 18 } },
};

/* ─── Skill icon using next/image ────────────────────────────── */
function SkillIcon({ icon, name, invert }) {
  return (
    <div className="relative w-[18px] h-[18px] shrink-0 flex items-center justify-center">
      <Image
        src={icon}
        alt={name}
        width={18}
        height={18}
        className={`object-contain pointer-events-none transition-transform duration-300 group-hover:scale-110${invert ? " brightness-0 invert" : ""}`}
        loading="lazy"
        unoptimized={icon.endsWith(".svg")}  // SVGs served as-is; rasters get optimised
      />
    </div>
  );
}

/* ─── Main Section ───────────────────────────────────────────── */
export default function Skills() {
  const categories = ["Frontend", "Backend", "DevOps & Cloud"];

  return (
    <section id="skills" className="py-[120px] relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay pointer-events-none z-0 opacity-40" />

      <div className="max-w-[1100px] mx-auto px-8 relative z-[2]">

        {/* Section label */}
        <div className="flex items-center gap-2.5 font-mono text-[11px] text-accent tracking-[0.18em] uppercase mb-4 before:content-[''] before:block before:w-6 before:h-px before:bg-accent select-none">
          Skills
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-syne font-bold text-[clamp(28px,4vw,42px)] leading-[1.15] tracking-tight mb-16 select-none"
        >
          My Technical <em className="italic text-accent">Expertise</em>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ══ Left — Progress bars ══ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-9"
          >
            {categories.map((cat) => {
              const filtered = skillBars.filter((s) =>
                cat.includes("Cloud") ? s.category === "Cloud" : s.category === cat
              );
              if (filtered.length === 0) return null;
              return (
                <motion.div key={cat} variants={itemVariants} className="space-y-4">
                  <div className="font-mono text-[11px] text-accent tracking-wider uppercase select-none">
                    // {cat}
                  </div>
                  <div className="space-y-4">
                    {filtered.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center text-[13px]">
                          <span className="font-medium text-text/90">{skill.name}</span>
                          <span className="font-mono text-[11px] text-accent font-semibold">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 bg-glass-border rounded-full overflow-hidden">
                          <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full bg-gradient-to-r from-accent to-accent2 origin-left rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* ══ Right — Tech icons + stats ══ */}
          <div className="space-y-12">

            <div className="space-y-4">
              <div className="font-mono text-[11px] text-accent tracking-wider uppercase select-none">
                // Tools & Technologies
              </div>

              {/* Icon chips grid — next/image optimised */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="flex flex-wrap gap-3"
              >
                {staticSkills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ scale: 1.06, borderColor: "var(--color-accent)" }}
                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.02] border border-glass-border backdrop-blur-sm transition-colors duration-300 group cursor-default"
                  >
                    <SkillIcon icon={skill.icon} name={skill.name} invert={skill.invert} />
                    <span className="font-syne font-medium text-[13px] text-muted group-hover:text-white transition-colors duration-300 select-none">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Stats cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-3 gap-4 sm:gap-5 select-none"
            >
              {[
                { label: "Projects Built", val: "5+", isText: false },
                { label: "Learning Journey", val: "1yr", isText: false },
                { label: "Tech Mindset", val: "Fluent", isText: true },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="glass p-4 sm:p-5 text-center border border-glass-border hover:border-accent2/30 glow-box transition-all duration-300 cursor-default flex flex-col justify-center min-h-[95px] sm:min-h-[110px]"
                >
                  <div className={`font-syne font-extrabold text-accent leading-tight mb-2 ${stat.isText ? "text-sm sm:text-base tracking-wide uppercase" : "text-2xl sm:text-3xl"}`}>
                    {stat.isText ? stat.val : <CountUp value={stat.val} />}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-muted tracking-wider uppercase font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}