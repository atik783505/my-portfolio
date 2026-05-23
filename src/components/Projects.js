"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";

const projects = [
  {
    title: "Nebula — Real-time Collaboration Platform",
    desc: "A Figma-like collaborative whiteboard with live cursors, WebSocket sync, and conflict-free replicated data structures (CRDTs). Built for 1000+ concurrent users with sub-100ms latency.",
    icon: "🌌",
    tags: ["Next.js", "WebSockets", "Redis", "CRDTs", "PostgreSQL", "Docker"],
    links: { demo: "https://tiles-gallery-a8-sable.vercel.app/", github: "#" },
    featured: true,
  },
  {
    title: "DevBot — AI Code Review Assistant",
    desc: "GitHub App that automatically reviews PRs using LLMs, flags security issues, and suggests improvements inline.",
    icon: "🤖",
    tags: ["Node.js", "OpenAI", "GitHub API", "Express"],
    links: { demo: "#", github: "#" },
    featured: false,
    color: "accent2",
  },
  {
    title: "Pulse — Analytics Dashboard",
    desc: "Privacy-first analytics platform with real-time charts, funnels, and heatmaps. Lightweight tracker script under 2kb.",
    icon: "📊",
    tags: ["React", "ClickHouse", "D3.js", "Tailwind"],
    links: { demo: "#", github: "#" },
    featured: false,
    color: "accent3",
  },
  {
    title: "VaultPass — Zero-Knowledge Password Vault",
    desc: "End-to-end encrypted password vault using AES-256 and zero-knowledge architecture. Browser extension + mobile app.",
    icon: "🔐",
    tags: ["Rust", "WebAssembly", "React Native", "Express"],
    links: { demo: "#", github: "#" },
    featured: false,
  },
  {
    title: "FluxAPI — GraphQL Gateway",
    desc: "Schema-stitching GraphQL gateway with automatic caching, rate limiting, and distributed tracing for microservices.",
    icon: "⚡",
    tags: ["GraphQL", "Node.js", "Kubernetes", "Redis"],
    links: { demo: "#", github: "#" },
    featured: false,
    color: "accent2",
  },
];

function ProjectCard({ project, idx }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const getBorderColorClass = () => {
    if (project.color === "accent2") return "group-hover:border-accent2/40";
    if (project.color === "accent3") return "group-hover:border-accent3/40";
    return "group-hover:border-accent/40";
  };

  const getSpotlightColor = () => {
    if (project.color === "accent2") return "rgba(167, 139, 250, 0.08)";
    if (project.color === "accent3") return "rgba(244, 114, 182, 0.08)";
    return "rgba(125, 249, 194, 0.08)";
  };

  const getGlowUnderlay = () => {
    if (project.color === "accent2") return "bg-accent2";
    if (project.color === "accent3") return "bg-accent3";
    return "bg-accent";
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`glass p-8 group relative flex flex-col gap-0 overflow-hidden hover:shadow-[0_24px_50px_rgba(0,0,0,0.5)] border border-glass-border ${getBorderColorClass()} ${
        project.featured ? "md:col-span-2" : ""
      }`}
      data-cursor="view"
      style={{
        "--mouse-x": "0px",
        "--mouse-y": "0px",
      }}
    >
      {/* Background Spotlight glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), ${getSpotlightColor()}, transparent 75%)`,
        }}
      />

      {/* Decorative Slide-in bottom accent line */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-accent2 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10`} 
      />

      {/* Project Icon */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border border-glass-border shadow-md bg-glass-hover`}
        >
          {project.icon}
        </div>
        
        {project.featured && (
          <span className="font-mono text-[9px] text-accent border border-accent/20 bg-accent/5 rounded-full px-2.5 py-0.5 tracking-wider uppercase font-semibold">
            ✦ Featured Product
          </span>
        )}
      </div>

      {/* Project content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <h3 className="font-syne font-bold text-xl mb-3 leading-tight text-text group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-[13px] text-muted leading-relaxed mb-6 font-light">
          {project.desc}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-7 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] px-2.5 py-0.5 rounded-md border border-glass-border bg-glass-hover/20 text-muted font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-4 relative z-20">
          <Magnetic>
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-syne text-[12px] font-semibold text-accent flex items-center gap-1.5 hover:gap-2.5 transition-all py-1"
            >
              Live Project ↗
            </a>
          </Magnetic>
          
          <Magnetic>
            <a
              href={project.links.github}
              className="font-syne text-[12px] font-semibold text-muted flex items-center gap-1.5 hover:text-text transition-all py-1"
            >
              ⌥ Repository
            </a>
          </Magnetic>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-[120px] relative overflow-hidden">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none z-0 opacity-40" />

      <div className="max-w-[1100px] mx-auto px-8 relative z-[2]">
        
        {/* Section Title */}
        <div className="flex items-center gap-2.5 font-mono text-[11px] text-accent tracking-[0.18em] uppercase mb-4 before:content-[''] before:block before:w-6 before:h-px before:bg-accent select-none">
          Projects
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-syne font-bold text-[clamp(28px,4vw,42px)] leading-[1.15] tracking-tight mb-16 select-none"
        >
          Selected <em className="italic text-accent">Creations</em>
        </motion.h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
