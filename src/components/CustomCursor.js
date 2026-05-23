"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const mouseX = useSpring(0, { stiffness: 450, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 450, damping: 28 });

  const ringX = useSpring(0, { stiffness: 180, damping: 22 });
  const ringY = useSpring(0, { stiffness: 180, damping: 22 });

  useEffect(() => {
    // Check if device supports hover/has a pointer (is a mouse-driven device)
    const mediaQuery = window.matchMedia("(any-hover: hover)");
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      const cursorTarget = target.closest("[data-cursor]");
      if (cursorTarget) {
        setIsHovered(true);
        setCursorText(cursorTarget.getAttribute("data-cursor") || "");
      } else if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("interactive")
      ) {
        setIsHovered(true);
        setCursorText("");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, [mouseX, mouseY, ringX, ringY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot - Blends with difference for readability on text */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-text rounded-full pointer-events-none z-[99999] mix-blend-difference origin-center"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovered ? 0.5 : 1,
        }}
      />
      {/* Outer Circle - Expands to show text labels if hovered over project elements */}
      <motion.div
        className="fixed top-0 left-0 border border-accent/60 rounded-full pointer-events-none z-[99998] origin-center flex items-center justify-center bg-accent/0"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: cursorText ? 80 : isHovered ? 48 : 28,
          height: cursorText ? 80 : isHovered ? 48 : 28,
          backgroundColor: cursorText ? "rgba(125, 249, 194, 0.08)" : "rgba(125, 249, 194, 0)",
          borderColor: cursorText ? "rgba(125, 249, 194, 0.8)" : "rgba(125, 249, 194, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-mono tracking-widest text-accent font-bold uppercase"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
