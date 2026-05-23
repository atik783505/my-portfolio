import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Education />
      <Projects />
      <Skills />
      <ContactForm />
    </>
  );
}

