"use client";

import { useEffect } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  // Handle hash-based scroll when navigating back from /projects
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      // Wait for sections to paint before scrolling
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Education />
      <Projects />
      <ContactForm />
    </>
  );
}
