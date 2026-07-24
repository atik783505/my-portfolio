"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Magnetic from "@/components/Magnetic";

/* ─── Project Data (single source of truth — keep in sync with Projects.js) ─ */
const projects = [
  {
    title: "Idea Vault — Secure Project & Concept Repository",
    desc: "A full-stack secure repository for developers to log, categorize, and track project concepts. Built with a decoupled architecture featuring structured JWT-based authentication, complete RESTful CRUD operations, and a polished dashboard for asset management.",
    icon: "/Images/ideavault.png",
    tags: ["Next.js", "HeroUI", "JWT", "Express.js", "Node.js", "MongoDB"],
    links: { demo: "https://a09-ideavault.vercel.app/", github: "https://github.com/atik783505/a09-ideavault" },
    challenges: "Implementing a highly secure session lifespan with a decoupled architecture. Preventing CSRF exploits while maintaining access tokens safely on custom client cookies. Configuring custom middleware in Express to intercept unauthorized routing and handle real-time resource validation without latency.",
    improvements: "Introduce Multi-Factor Authentication (MFA) using webauthn standards, integrate automatic concept generation suggestions using AI integration, and construct a real-time collaborative concept board featuring interactive markdown editing using CRDT algorithms.",
  },
  {
    title: "SkillSwap — Freelance Micro-Task Marketplace",
    desc: "A full-stack freelancing micro-task platform where users can post tasks and complete tasks posted by others. Features role-based authentication (admin, task-poster, worker), dedicated dashboards per role, and a complete task lifecycle from posting to completion and review.",
    icon: "/Images/skillswap.png",
    tags: ["Next.js", "Express.js", "Better Auth", "JWT", "Framer Motion", "MongoDB"],
    links: { demo: "https://skillswap-client-beryl-three.vercel.app/", github: "https://github.com/atik783505/skillswap-client" },
    featured: true,
    color: "accent2",
    challenges: "Designing a robust role-based access control system where three distinct user roles (admin, poster, worker) each have isolated permissions and dashboard views. Coordinating real-time task state transitions — from open to in-progress to completed — without race conditions. Implementing secure JWT session management alongside Better Auth for seamless role resolution.",
    improvements: "Integrate Stripe payment gateway for secure milestone-based payouts, add a real-time chat system between poster and worker using WebSockets, implement an AI-powered task recommendation engine, and build a reputation scoring system based on completed task reviews.",
  },
  {
    title: "VoltNet — EV Charging Station Slot Booking Platform",
    desc: "A TypeScript-powered full-stack platform that enables electric vehicle drivers to discover and book charging slots at various EV stations. Features real-time slot availability, station browsing, and a seamless booking flow — my most deployment-challenging build to date.",
    icon: "/Images/voltnet.PNG",
    tags: ["TypeScript", "Next.js", "Node.js", "Express.js", "Framer Motion"],
    links: { demo: "https://voltnet-mu.vercel.app/", github: "https://github.com/atik783505/voltnet" },
    color: "accent3",
    challenges: "This was my first serious TypeScript project — strict type definitions across both the Next.js frontend and Express backend introduced a steep learning curve. Deployment was the hardest part: resolving TypeScript compilation errors in CI, handling environment variable mismatches between local and Vercel, and debugging cold-start issues on the Node.js API layer consumed significant time.",
    improvements: "Add real-time slot availability updates using WebSockets so drivers see live occupancy changes, integrate map-based station discovery with geolocation filtering, implement payment gateway support for pre-paid slot reservations, and build an admin dashboard for station operators to manage schedules.",
  },
  {
    title: "Tiles Gallery — Full-Stack Authentication Showcase",
    desc: "A responsive full-stack platform featuring custom category filtering, dynamic image galleries, and secure session management.",
    icon: "/Images/tiles-gallery.png",
    tags: ["Next.js", "Better Auth", "MongoDB", "Tailwind CSS"],
    links: { demo: "https://a05-tiles-gallery.vercel.app/", github: "https://github.com/atik783505/A05-tiles-gallery" },
    color: "accent2",
    challenges: "Integrating Better Auth seamlessly with custom session configurations on a MongoDB adapter. Handling heavy media loading grids and reducing layout shifts (CLS) when performing batch-level category filtering dynamically on the client side.",
    improvements: "Add comprehensive social OAuth integration (Google & GitHub), construct real-time visual comment threads under tile assets, and build an automated content tagging system powered by image recognition models.",
  },
  {
    title: "BookVibe — Book Exploration & Tracking App",
    desc: "A client-side book management application built with React, featuring dynamic book lists, interactive detail views, and responsive reading logs.",
    icon: "/Images/book-vibe.png",
    tags: ["React.js", "ES6+", "Recharts", "Tailwind CSS"],
    links: { demo: "https://book-vibe-website010.netlify.app/", github: "https://github.com/atik783505/book-vibe" },
    color: "accent3",
    challenges: "Managing robust visual state synchronization across local storage persistence and rendering highly complex analytics charts responsively using Recharts without disrupting the core app performance or causing rendering loops.",
    improvements: "Implement real-time book search by querying third-party APIs (Google Books API), enable user-curated reading lists, and add interactive offline reading mode support via robust service worker caching.",
  },
  {
    title: "DigiTools — All-in-One Utility Platform",
    desc: "A responsive multi-category platform grouping essential utility tools, text/image editors, and AI processors into a single unified workspace.",
    icon: "/Images/digi-tools.png",
    tags: ["React.js", "Tailwind CSS", "ES6+", "State Management"],
    links: { demo: "https://radiant-axolotl-145853.netlify.app/", github: "https://github.com/atik783505/B-13-A06-Digilogs" },
    featured: false,
    color: "accent1",
    challenges: "Designing a modular state system where tools operate independently in a single workspace. Preventing heavy DOM updates when running browser-side tasks such as image parsing and format compression using HTML5 Canvas APIs.",
    improvements: "Integrate built-in local AI inference processors (such as WebGPU-based models) for secure offline summarization, add batch file conversion queues, and expand tool categories with real-time markdown editors.",
  },
  {
    title: "English Janala — Language Learning Platform",
    desc: "An interactive English learning platform built using vanilla architectural patterns, featuring dynamic DOM rendering and responsive educational layouts.",
    icon: "/Images/english-janala.png",
    tags: ["Vanilla JS", "HTML5", "CSS3", "DOM Manipulation"],
    links: { demo: "https://atik783505.github.io/english-janala-resources/", github: "https://github.com/atik783505/english-janala-resources" },
    featured: false,
    color: "accent5",
    challenges: "Building an immersive educational experience with dynamic, fast learning cards entirely in Vanilla JavaScript without relying on high-level framework reactive lifecycles. Preventing memory leaks during frequent state cleanups.",
    improvements: "Migrate the codebase to Next.js App Router to enable SEO features, build real-time speech assessment tools using Web Speech API for pronunciation scoring, and implement a gamified daily scorecard system.",
  },
];

/* ─── Project Card ─────────────────────────────────────────────────────────── */
function ProjectCard({ project, idx, onViewDetails }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - top}px`);
  };

  const borderHover =
    project.color === "accent2" ? "group-hover:border-accent2/40" :
    project.color === "accent3" ? "group-hover:border-accent3/40" :
    "group-hover:border-accent/40";

  const spotlightColor =
    project.color === "accent2" ? "rgba(167,139,250,0.08)" :
    project.color === "accent3" ? "rgba(244,114,182,0.08)" :
    "rgba(125,249,194,0.08)";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`glass group relative flex flex-col justify-between h-full overflow-hidden hover:shadow-[0_24px_50px_rgba(0,0,0,0.5)] border border-glass-border ${borderHover}`}
      style={{ "--mouse-x": "0px", "--mouse-y": "0px" }}
    >
      {/* Spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{ background: `radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), ${spotlightColor}, transparent 75%)` }}
      />
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-accent2 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />

      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden border-b border-glass-border bg-glass-hover">
        <Image
          src={project.icon}
          alt={`${project.title} screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {project.featured && (
          <span className="absolute top-4 right-4 z-20 font-mono text-[9px] text-accent border border-accent/30 bg-black/60 backdrop-blur-md rounded-full px-2.5 py-0.5 tracking-wider uppercase font-semibold">
            ✦ Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between relative z-10">
        <div>
          <h3 className="font-syne font-bold text-xl mb-3 leading-tight text-text group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-[13px] text-muted leading-relaxed mb-6 font-light line-clamp-3">
            {project.desc}
          </p>
        </div>
        <div className="mt-auto">
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="font-mono text-[9px] px-2.5 py-0.5 rounded-md border border-glass-border bg-glass-hover/20 text-muted font-medium">
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="font-mono text-[9px] px-2.5 py-0.5 rounded-md border border-glass-border bg-glass-hover/10 text-muted/60 font-medium">
                +{project.tags.length - 4} More
              </span>
            )}
          </div>
          <div className="flex items-center justify-between gap-4 pt-2 relative z-20">
            <div className="flex items-center gap-4">
              <Magnetic>
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                  className="font-syne text-[12px] font-semibold text-accent flex items-center gap-1.5 hover:gap-2 transition-all py-1">
                  Live Project ↗
                </a>
              </Magnetic>
              <Magnetic>
                <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                  className="font-syne text-[12px] font-semibold text-muted flex items-center gap-1.5 hover:text-text transition-all py-1">
                  ⌥ Repository
                </a>
              </Magnetic>
            </div>
            <button
              onClick={() => onViewDetails(project)}
              className="cursor-pointer font-syne text-[11px] font-bold text-accent2 hover:text-[#c0a9fc] transition-all flex items-center gap-1 group/btn"
            >
              Details
              <span className="transform translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */
export default function AllProjectsPage() {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject]);

  const handleBack = () => {
    // Navigate home and scroll to projects section after a short delay
    router.push("/#projects");
  };

  return (
    <>
      <section className="relative min-h-screen pt-[130px] pb-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 grid-overlay pointer-events-none z-0 opacity-40" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-[1100px] mx-auto px-8 relative z-[2]">

          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <button
              onClick={handleBack}
              className="cursor-pointer inline-flex items-center gap-2 font-mono text-[11px] text-muted hover:text-accent tracking-wider uppercase transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Back to Portfolio
            </button>
          </motion.div>

          {/* Header */}
          <div className="flex items-center gap-2.5 font-mono text-[11px] text-accent tracking-[0.18em] uppercase mb-4 before:content-[''] before:block before:w-6 before:h-px before:bg-accent select-none">
            All Projects
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-syne font-bold text-[clamp(28px,4vw,52px)] leading-[1.1] tracking-tight mb-4 select-none"
          >
            Every <em className="italic text-accent">Creation</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[14px] text-muted leading-relaxed max-w-[520px] font-light mb-16"
          >
            A complete archive of projects — from full-stack MERN applications to interactive front-end experiments.
          </motion.p>

          {/* Projects grid — 3 columns on large, 2 on medium, 1 on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} idx={idx} onViewDetails={setSelectedProject} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Details Modal ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-[850px] max-h-[90vh] bg-bg/95 border border-glass-border rounded-3xl overflow-y-auto overscroll-contain shadow-2xl flex flex-col pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 cursor-pointer w-8 h-8 rounded-full border border-glass-border bg-glass hover:bg-glass-hover flex items-center justify-center text-muted hover:text-text transition-colors"
                aria-label="Close Modal"
              >
                ✕
              </button>

              {/* Banner */}
              <div className="relative w-full h-[220px] sm:h-[320px] shrink-0 border-b border-glass-border bg-glass-hover">
                <Image src={selectedProject.icon} alt={`${selectedProject.title} snapshot`} fill priority className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-syne font-extrabold text-xl sm:text-3xl text-text leading-tight drop-shadow-md">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 space-y-6 sm:space-y-8 overflow-y-auto">

                <div className="space-y-3">
                  <h4 className="font-mono text-[10px] text-accent tracking-wider uppercase">// Brief Description</h4>
                  <p className="text-[14px] text-muted leading-relaxed font-light">{selectedProject.desc}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-mono text-[10px] text-accent tracking-wider uppercase">// Main Technology Stack</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[10px] px-3 py-1 rounded-md border border-glass-border bg-glass-hover/30 text-text font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="glass p-5 border border-glass-border hover:border-accent3/20 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-accent3 animate-pulse" />
                      <h4 className="font-syne font-bold text-sm text-text">Challenges Faced</h4>
                    </div>
                    <p className="text-[12px] text-muted/80 leading-relaxed font-light">{selectedProject.challenges}</p>
                  </div>
                  <div className="glass p-5 border border-glass-border hover:border-accent2/20 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-accent2 animate-pulse" />
                      <h4 className="font-syne font-bold text-sm text-text">Potential Improvements</h4>
                    </div>
                    <p className="text-[12px] text-muted/80 leading-relaxed font-light">{selectedProject.improvements}</p>
                  </div>
                </div>

                <div className="border-t border-glass-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <Magnetic>
                      <a href={selectedProject.links.demo} target="_blank" rel="noopener noreferrer"
                        className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 font-syne font-bold text-xs bg-accent text-bg px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-[0_8px_20px_rgba(125,249,194,0.3)]">
                        Live Project Site ↗
                      </a>
                    </Magnetic>
                    <Magnetic>
                      <a href={selectedProject.links.github} target="_blank" rel="noopener noreferrer"
                        className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 font-syne font-semibold text-xs border border-glass-border bg-glass hover:bg-glass-hover text-text px-6 py-3 rounded-xl transition-all duration-300">
                        ⌥ Client Repository
                      </a>
                    </Magnetic>
                  </div>
                  <span className="text-[10px] font-mono text-muted/40 uppercase hidden sm:inline">AR · Design Engineering 2026</span>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
