"use client";

import { motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import "devicon/devicon.min.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-[2] border-t border-glass-border pt-16 pb-10 bg-bg/90 backdrop-blur-md select-none">
      <div className="max-w-[1100px] mx-auto px-8">

        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-12 mb-16 text-left">

          {/* Column 1: Brand */}
          <div className="footer-brand space-y-4">
            <div className="font-syne font-extrabold text-[22px] tracking-tight">
              AR<span className="text-accent">.</span>
            </div>
            <p className="text-[13px] text-muted leading-relaxed max-w-[280px] font-light">
              Full-Stack Developer crafting clean, scalable, and beautiful digital experiences with the MERN stack.
            </p>
          </div>

          {/* Column 2: Navigation Map */}
          <div className="space-y-4">
            <div className="font-mono text-[10px] text-accent tracking-wider uppercase">// Sitemap</div>
            <div className="flex flex-col gap-2.5">
              <a href="#home" className="text-muted text-[13px] hover:text-accent transition-colors w-max font-light">Home</a>
              <a href="#about" className="text-muted text-[13px] hover:text-accent transition-colors w-max font-light">About</a>
              <a href="#education" className="text-muted text-[13px] hover:text-accent transition-colors w-max font-light">Education</a>
              <a href="#projects" className="text-muted text-[13px] hover:text-accent transition-colors w-max font-light">Projects</a>
              <a href="#skills" className="text-muted text-[13px] hover:text-accent transition-colors w-max font-light">Skills</a>
            </div>
          </div>

          {/* Column 3: Contact Channels */}
          <div className="space-y-4">
            <div className="font-mono text-[10px] text-accent tracking-wider uppercase">// Get In Touch</div>
            <div className="flex flex-col gap-2.5">
              <a href="mailto:atik13672@gmail.com" className="text-muted text-[13px] hover:text-accent transition-colors w-max font-light">
                atik13672@gmail.com
              </a>
              <a href="tel:+8801600690954" className="text-muted text-[13px] hover:text-accent transition-colors w-max font-light">
                +880 1600-690954
              </a>
              <div className="text-[13px] text-muted/60 font-light">
                Cumilla, Bangladesh
              </div>
            </div>
          </div>

        </div>

        {/* Bottom row */}
        <div className="border-t border-glass-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="font-mono text-[10px] text-faint">
            © {currentYear} <span className="text-accent">Atikur Rahman</span> · Designed & Engineered with ♥
          </div>

          {/* Socials with Magnetic Pull */}
          <div className="flex gap-4">
            {[
              { label: "GitHub", icon: "devicon-github-original", href: "https://github.com/atik783505" },
              { label: "LinkedIn", icon: "devicon-linkedin-plain", href: "https://www.linkedin.com/in/atikur-rahman-ar/" },
              { label: "Twitter", icon: "devicon-twitter-original", href: "https://x.com/AtikurRahm98623" },
              { label: "Facebook", icon: "devicon-facebook-plain", href: "https://facebook.com" },
            ].map((social) => (
              <Magnetic key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  className="w-10 h-10 glass flex items-center justify-center text-[15px] text-muted hover:text-accent hover:border-accent/40 shadow-sm"
                >
                  <i className={social.icon}></i>
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
