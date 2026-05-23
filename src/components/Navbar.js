"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "@/components/Magnetic";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Education", href: "#education" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const scrollToContact = () => {
    setIsOpen(false);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLinkClick = (e, href) => {
    setIsOpen(false);
    // Let smooth scroll handle it
  };

  return (
    <>
      {/* Floating Navbar Pill */}
      <motion.nav
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-5 left-1/2 z-[100] w-[90%] max-w-[1100px] flex items-center justify-between bg-[rgba(5,5,10,0.7)] backdrop-blur-[24px] border border-glass-border rounded-[50px] p-2 px-5 md:pl-6 shadow-xl select-none"
      >
        {/* Left Side: Brand Logo */}
        <Magnetic range={30} actionShift={0.2}>
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, "#home")}
            className="font-syne font-extrabold text-[15px] tracking-tight whitespace-nowrap"
          >
            AR<span className="text-accent">.</span>
          </a>
        </Magnetic>

        {/* Center: Desktop links */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={`block text-[12px] font-medium px-4 py-1.5 rounded-[30px] transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? "bg-accent text-bg font-semibold shadow-sm"
                    : "text-muted hover:text-text hover:bg-glass"
                }`}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Side: Desktop CTA */}
        <div className="hidden md:block">
          <Magnetic range={30} actionShift={0.2}>
            <button
              onClick={scrollToContact}
              className="cursor-pointer bg-accent text-bg font-syne font-bold text-[12px] px-5 py-2.5 rounded-[30px] transition-all duration-300 hover:bg-[#5ef0ab] hover:scale-105 shadow-sm"
            >
              Hire Me
            </button>
          </Magnetic>
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex flex-col gap-1.5 justify-center items-center w-8 h-8 rounded-full border border-glass-border bg-glass-hover"
            aria-label="Toggle Menu"
          >
            <span 
              className={`w-4.5 h-0.5 bg-text rounded-full transition-transform duration-300 ${
                isOpen ? "rotate-45 translate-y-1" : ""
              }`} 
            />
            <span 
              className={`w-4.5 h-0.5 bg-text rounded-full transition-transform duration-300 ${
                isOpen ? "-rotate-45 -translate-y-1" : ""
              }`} 
            />
          </button>
        </div>
      </motion.nav>

      {/* Immersive Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-[#05050a]/98 backdrop-blur-2xl md:hidden flex flex-col justify-center items-center px-10"
          >
            {/* Background grids */}
            <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

            <div className="flex flex-col items-center justify-center space-y-6 w-full relative z-[2]">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, type: "spring", stiffness: 120 }}
                  className="w-full text-center"
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`block font-syne font-bold text-3xl py-2 tracking-tight transition-colors ${
                      activeSection === link.href.slice(1)
                        ? "text-accent"
                        : "text-text hover:text-accent"
                    }`}
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08, type: "spring", stiffness: 120 }}
                className="pt-6 w-full flex justify-center"
              >
                <Magnetic>
                  <button
                    onClick={scrollToContact}
                    className="cursor-pointer bg-accent text-bg font-syne font-extrabold text-sm px-8 py-3.5 rounded-2xl shadow-lg w-[200px]"
                  >
                    Hire Me
                  </button>
                </Magnetic>
              </motion.div>
            </div>
            
            {/* Mobile Footer Meta */}
            <div className="absolute bottom-8 font-mono text-[9px] text-muted/40 tracking-wider">
              ATIKUR RAHMAN // DESIGN ENGINEERING 2026
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
