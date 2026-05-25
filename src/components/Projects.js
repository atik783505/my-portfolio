"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import Image from "next/image";

const projects = [
  {
    title: "Idea Vault — Secure Project & Concept Repository",
    desc: "A full-stack secure repository for developers to log, categorize, and track project concepts. Built with a decoupled architecture featuring structured JWT-based authentication, complete RESTful CRUD operations, and a polished dashboard for asset management.",
    icon: "/Images/ideavault.png",
    tags: ["Next.js", "HeroUI", "JWT", "Express.js", "Node.js", "MongoDB"], // Decoupled Stack
    links: { demo: "https://a09-ideavault.vercel.app/", github: "https://github.com/atik783505/a09-ideavault" },
    featured: true
  },
  {
    title: "Tiles Gallery — Full-Stack Authentication Showcase", // Namer sathe detail title text add kora hoyeche
    desc: "A responsive full-stack platform featuring custom category filtering, dynamic image galleries, and secure session management.",
    icon: "/Images/tiles-gallery.png", // Apnar exact image path ta intact rakhlam
    tags: ["Next.js", "Better Auth", "MongoDB", "Tailwind CSS"],
    links: {
      demo: "https://tiles-gallery-a8-sable.vercel.app/", // Live URL link
      github: "https://github.com/atik783505/A05-tiles-gallery"
    },
    color: "accent2"
  },
  {
    title: "BookVibe — Book Exploration & Tracking App", // Updated project title
    desc: "A client-side book management application built with React, featuring dynamic book lists, interactive detail views, and responsive reading logs.",
    icon: "/Images/book-vibe.png", // Kept your semantic asset path
    tags: ["React.js", "ES6+", "Recharts", "Tailwind CSS"], // Dynamic UI configuration tags
    links: {
      demo: "https://book-vibe-website010.netlify.app/", // Kept your live production URL
      github: "https://github.com/atik783505/book-vibe" // Kept your repository link
    },
    color: "accent3" // Maintained your layout configuration token
  },
  {
    title: "DigiTools — All-in-One Utility Platform", // Dynamic multi-tool descriptive title
    desc: "A responsive multi-category platform grouping essential utility tools, text/image editors, and AI processors into a single unified workspace.",
    icon: "/Images/digi-tools.png", // Kept your exact asset path reference
    tags: ["React.js", "Tailwind CSS", "ES6+", "State Management"], // Accurate tech stack array
    links: {
      demo: "https://radiant-axolotl-145853.netlify.app/", // Live link placeholder
      github: "https://github.com/atik783505/B-13-A06-Digilogs"
    },
    featured: false, // Set to false based on your layout blueprint pattern
    color: "accent1" // Standard theme design system color key
  },
  {
    title: "English Janala — Language Learning Platform", // Core learning site title
    desc: "An interactive English learning platform built using vanilla architectural patterns, featuring dynamic DOM rendering and responsive educational layouts.",
    icon: "/Images/english-janala.png", // Semantic asset path structure
    tags: ["Vanilla JS", "HTML5", "CSS3", "DOM Manipulation"], // Showcasing your foundational core skills
    links: {
      demo: "https://atik783505.github.io/english-janala-resources/", // Live production build placeholder
      github: "https://github.com/atik783505/english-janala-resources"
    },
    featured: false, // Standard layout distribution flow
    color: "accent5" // Context design system token sequence color
  }
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

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`glass group relative flex flex-col justify-between h-full overflow-hidden hover:shadow-[0_24px_50px_rgba(0,0,0,0.5)] border border-glass-border ${getBorderColorClass()} ${project.featured ? "md:col-span-2" : ""
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
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-accent2 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10"
      />

      {/* Top Section: Full Width Image Banner */}
      <div className="relative w-full h-52 overflow-hidden border-b border-glass-border bg-glass-hover">
        <Image
          src={project.icon}
          alt={`${project.title} screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Featured Badge on Top of Image */}
        {project.featured && (
          <span className="absolute top-4 right-4 z-20 font-mono text-[9px] text-accent border border-accent/30 bg-black/60 backdrop-blur-md rounded-full px-2.5 py-0.5 tracking-wider uppercase font-semibold">
            ✦ Featured Product
          </span>
        )}
      </div>

      {/* Bottom Section: Content (Padding added here so image remains full width) */}
      <div className="p-6 flex-1 flex flex-col justify-between relative z-10">
        {/* Project Content */}
        <div>
          <h3 className="font-syne font-bold text-xl mb-3 leading-tight text-text group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-[13px] text-muted leading-relaxed mb-6 font-light">
            {project.desc}
          </p>
        </div>

        {/* Tags & Action Links */}
        <div className="mt-auto">
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
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

        {/* Grid layout with dense flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-flow-dense">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}