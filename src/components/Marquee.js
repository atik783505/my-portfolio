"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useScroll } from "@/components/ScrollProvider";

// All 17 skills unified in a single track structure with clean branding anchors
const skills = [
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invertOnDark: true },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invertOnDark: true },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "CRUD Operations", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "JWT Verification", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg" },
  { name: "Authentication", icon: "https://img.icons8.com/isometric/50/shield.png", isCustom: true },
  { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", invertOnDark: true },
  { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg" },
  { name: "Netlify", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" },
  { name: "Thunder Client", icon: "https://img.icons8.com/external-flat-juicy-fish/60/external-thunder-weather-flat-flat-juicy-fish.png", isCustom: true },
  { name: "RESTful API", icon: "https://img.icons8.com/ios-filled/50/api.png", isCustom: true },
  { name: "UI Libraries", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" },
];

export default function Marquee() {
  const trackRef = useRef(null);
  const { lenis } = useScroll();

  useEffect(() => {
    if (!trackRef.current) return;

    // Standard infinite horizontal scrolling animation loop
    const anim = gsap.to(trackRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 32,
      repeat: -1,
    });

    // Lenis velocity responsive alignment control
    const onScroll = (e) => {
      const absVelocity = Math.abs(e.velocity);
      const targetTimeScale = 1 + absVelocity * 0.15;

      gsap.to(anim, {
        timeScale: targetTimeScale,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(anim, {
        timeScale: 1,
        duration: 1.2,
        delay: 0.1,
        ease: "power1.inOut",
        overwrite: "auto",
      });
    };

    if (lenis) {
      lenis.on("scroll", onScroll);
    }

    return () => {
      anim.kill();
      if (lenis) {
        lenis.off("scroll", onScroll);
      }
    };
  }, [lenis]);

  return (
    <div className="marquee-section py-12 border-y border-glass-border relative z-[2] bg-white/[0.01] overflow-hidden select-none flex items-center">

      {/* Soft gradient fades on both left and right edges */}
      <div className="absolute top-0 bottom-0 left-0 w-[15%] z-[3] pointer-events-none bg-gradient-to-r from-bg to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-[15%] z-[3] pointer-events-none bg-gradient-to-l from-bg to-transparent" />

      {/* Main Single-Line Track Wrapper */}
      <div ref={trackRef} className="flex w-max select-none items-center gap-6 whitespace-nowrap">
        {/* Triple array injection ensures seamless filling over widescreen loops */}
        {[...skills, ...skills, ...skills].map((skill, idx) => (
          <div
            key={idx}
            style={{
              // Staggered delay loop setup for smooth independent floating chaos behavior
              animationDelay: `${(idx % 5) * 0.4}s`,
            }}
            className="inline-flex items-center gap-4 px-8 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm transition-all duration-300 hover:border-accent group animate-anti-gravity relative"
          >
            {/* Embedded Logo Vector Container */}
            <div className="w-6 h-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
              <img
                src={skill.icon}
                alt={skill.name}
                loading="lazy"
                className={`w-full h-full object-contain pointer-events-none ${skill.invertOnDark ? "dark:invert brightness-90" : ""
                  } ${skill.isCustom ? "dark:invert dark:brightness-200" : ""}`}
              />
            </div>

            {/* Typography Definition layer */}
            <span className="font-syne font-semibold text-[15px] text-muted whitespace-nowrap transition-colors hover:text-white duration-300">
              {skill.name}
            </span>

            {/* Visual slash barrier structure */}
            <span className="text-glass-border-hover text-xl ml-2 font-normal pointer-events-none">/</span>
          </div>
        ))}
      </div>

      {/* Optimized Anti-gravity CSS Layer injections */}
      <style>{`
        @keyframes antiGravityFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-anti-gravity {
          animation: antiGravityFloat 5s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
}