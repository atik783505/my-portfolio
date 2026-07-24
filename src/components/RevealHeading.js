"use client";

import { motion } from "framer-motion";

/**
 * RevealHeading — splits text into words and reveals each one
 * with a staggered upward clip animation on scroll.
 *
 * Props:
 *   text      — plain string (non-italic part)
 *   italicText — optional string that renders in italic accent color
 *   italicFirst — if true, italicText comes before text
 *   as        — tag to render ("h2" | "h1"), default "h2"
 *   className — extra classes
 */
export default function RevealHeading({
  text = "",
  italicText = "",
  italicFirst = false,
  as: Tag = "h2",
  className = "",
}) {
  const wordVariants = {
    hidden: { y: "105%", opacity: 0 },
    show: (i) => ({
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
        delay: i * 0.08,
      },
    }),
  };

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0 } },
  };

  const renderWords = (str, isItalic = false) =>
    str.split(" ").map((word, i) => (
      <span key={`${isItalic ? "i" : "n"}-${i}`} className="inline-block overflow-hidden leading-[1.2]">
        <motion.span
          custom={i}
          variants={wordVariants}
          className={`inline-block ${isItalic ? "italic text-accent" : ""}`}
        >
          {word}
          {/* non-breaking space to preserve word gaps */}
          &nbsp;
        </motion.span>
      </span>
    ));

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <Tag className={className}>
        {italicFirst ? (
          <>
            {italicText && renderWords(italicText, true)}
            {text && renderWords(text, false)}
          </>
        ) : (
          <>
            {text && renderWords(text, false)}
            {italicText && renderWords(italicText, true)}
          </>
        )}
      </Tag>
    </motion.div>
  );
}
