"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "@/components/Magnetic";

export default function ContactForm() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to dispatch email.");
      }

      setSubmitSuccess(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-[120px] relative overflow-hidden">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none z-0 opacity-40" />

      <div className="max-w-[1100px] mx-auto px-8 relative z-[2]">

        {/* Section Title */}
        <div className="flex items-center gap-2.5 font-mono text-[11px] text-accent tracking-[0.18em] uppercase mb-4 before:content-[''] before:block before:w-6 before:h-px before:bg-accent select-none">
          Contact
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-syne font-bold text-[clamp(28px,4vw,42px)] leading-[1.15] tracking-tight mb-16 select-none"
        >
          Let's Design <em className="italic text-accent">Together</em>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
          {/* Left Column: Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 lg:pr-6"
          >
            <div className="space-y-3">
              <h3 className="font-syne font-bold text-2xl text-text">
                Reach Out Directly
              </h3>
              <p className="text-[13px] text-muted leading-relaxed font-light">
                Have an idea or a project in mind? Drop a line here. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              {/* Email Card */}
              <div className="glass p-5 border border-glass-border flex items-center gap-4 hover:border-accent/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-accent/5 border border-accent/15 flex items-center justify-center text-accent group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <div className="font-mono text-[9px] text-muted/60 tracking-wider uppercase">Email Me</div>
                  <a href="mailto:atik13672@gmail.com" className="text-sm font-semibold text-text hover:text-accent transition-colors">
                    atik13672@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="glass p-5 border border-glass-border flex items-center gap-4 hover:border-accent2/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-accent2/5 border border-accent2/15 flex items-center justify-center text-accent2 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.645-5.194-4.015-6.839-6.84l1.294-.97c.362-.272.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <div className="font-mono text-[9px] text-muted/60 tracking-wider uppercase">Call Me</div>
                  <a href="tel:+8801600690954" className="text-sm font-semibold text-text hover:text-accent2 transition-colors">
                    +880 1600-690954
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="glass p-5 border border-glass-border flex items-center gap-4 hover:border-accent/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-accent/5 border border-accent/15 flex items-center justify-center text-accent group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-mono text-[9px] text-muted/60 tracking-wider uppercase">Location</div>
                  <span className="text-sm font-semibold text-text">
                    Cumilla, Bangladesh
                  </span>
                </div>
              </div>
            </div>

            {/* Social Connect */}
            <div className="space-y-4 pt-4">
              <div className="font-mono text-[10px] text-accent tracking-wider uppercase">// Connect on Socials</div>
              <div className="flex gap-4">
                {[
                  { label: "GitHub", icon: "⌥", href: "https://github.com/atik783505" },
                  { label: "LinkedIn", icon: "in", href: "https://www.linkedin.com/in/atikur-rahman-ar/" },
                  { label: "Twitter", icon: "𝕏", href: "https://x.com/AtikurRahm98623" },
                ].map((social) => (
                  <Magnetic key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.label}
                      className="w-11 h-11 glass flex items-center justify-center text-[15px] text-muted hover:text-accent hover:border-accent/40 shadow-md transition-all duration-300"
                    >
                      {social.icon}
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass p-8 md:p-10 border border-glass-border relative overflow-hidden shadow-2xl w-full"
          >
            <div className="absolute inset-[-15px] bg-gradient-to-br from-accent/5 to-accent2/5 rounded-[40px] blur-[30px] pointer-events-none opacity-40" />

            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Input */}
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder=" "
                        required
                        className="peer w-full bg-glass border border-glass-border rounded-xl px-4 pt-6 pb-2 text-[13px] text-text placeholder-transparent focus:border-accent/60 focus:bg-glass-hover/20 focus:outline-none transition-all duration-300"
                      />
                      <label
                        htmlFor="name"
                        className="absolute left-4 top-4 text-muted/60 text-xs transition-all duration-300 pointer-events-none
                                   peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-xs peer-placeholder-shown:text-muted/50
                                   peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-accent peer-focus:font-semibold
                                   peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-accent2"
                      >
                        Full Name *
                      </label>
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder=" "
                        required
                        className="peer w-full bg-glass border border-glass-border rounded-xl px-4 pt-6 pb-2 text-[13px] text-text placeholder-transparent focus:border-accent/60 focus:bg-glass-hover/20 focus:outline-none transition-all duration-300"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-4 top-4 text-muted/60 text-xs transition-all duration-300 pointer-events-none
                                   peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-xs peer-placeholder-shown:text-muted/50
                                   peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-accent peer-focus:font-semibold
                                   peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-accent2"
                      >
                        Email Address *
                      </label>
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder=" "
                      className="peer w-full bg-glass border border-glass-border rounded-xl px-4 pt-6 pb-2 text-[13px] text-text placeholder-transparent focus:border-accent/60 focus:bg-glass-hover/20 focus:outline-none transition-all duration-300"
                    />
                    <label
                      htmlFor="subject"
                      className="absolute left-4 top-4 text-muted/60 text-xs transition-all duration-300 pointer-events-none
                                 peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-xs peer-placeholder-shown:text-muted/50
                                 peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-accent peer-focus:font-semibold
                                 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-accent2"
                    >
                      Subject
                    </label>
                  </div>

                  {/* Message Input */}
                  <div className="relative">
                    <textarea
                      id="message"
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      className="peer w-full bg-glass border border-glass-border rounded-xl px-4 pt-6 pb-2 text-[13px] text-text placeholder-transparent focus:border-accent/60 focus:bg-glass-hover/20 focus:outline-none transition-all duration-300 resize-none min-h-[120px]"
                    />
                    <label
                      htmlFor="message"
                      className="absolute left-4 top-4 text-muted/60 text-xs transition-all duration-300 pointer-events-none
                                 peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-xs peer-placeholder-shown:text-muted/50
                                 peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-accent peer-focus:font-semibold
                                 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-accent2"
                    >
                      Your Message *
                    </label>
                  </div>

                  {/* Error Banner */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-accent3 font-mono"
                    >
                      ⚠ {error}
                    </motion.div>
                  )}

                  {/* Submit button wrapped in Magnetic */}
                  <div className="pt-2 flex justify-start">
                    <Magnetic>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="cursor-pointer bg-accent text-bg font-syne font-bold text-xs px-8 py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_8px_24px_rgba(125,249,194,0.3)] disabled:opacity-50 flex items-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-3.5 w-3.5 text-bg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending Message...
                          </>
                        ) : (
                          "Send Message →"
                        )}
                      </button>
                    </Magnetic>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 120, delay: 0.1 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-6 select-none"
                >
                  {/* SVG checkmark animation */}
                  <div className="w-16 h-16 rounded-full border border-accent/20 bg-accent/5 flex items-center justify-center">
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-syne font-bold text-xl text-text">Message Dispatched</h3>
                    <p className="text-[13px] text-muted max-w-[320px] leading-relaxed font-light">
                      Thanks for reaching out! Your message was received successfully. I will get back to you shortly.
                    </p>
                  </div>

                  <Magnetic>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="font-mono text-[10px] text-accent tracking-wider uppercase bg-glass hover:bg-glass-hover border border-glass-border px-5 py-2.5 rounded-lg transition-colors"
                    >
                      Send Another Message
                    </button>
                  </Magnetic>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
