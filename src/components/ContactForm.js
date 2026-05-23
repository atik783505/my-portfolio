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

      <div className="max-w-[800px] mx-auto px-8 relative z-[2]">
        
        {/* Section Title */}
        <div className="flex items-center justify-center gap-2.5 font-mono text-[11px] text-accent tracking-[0.18em] uppercase mb-4 before:content-[''] before:block before:w-6 before:h-px before:bg-accent after:content-[''] after:block after:w-6 after:h-px after:bg-accent select-none">
          Contact
        </div>
        
        <h2 className="font-syne font-bold text-[clamp(28px,4vw,42px)] text-center leading-[1.15] tracking-tight mb-4 select-none">
          Let's Design <em className="italic text-accent">Together</em>
        </h2>
        
        <p className="text-[13px] text-muted text-center max-w-[480px] mx-auto mb-16 leading-relaxed font-light">
          Have an idea or a project in mind? Drop a line here. I usually respond within 24 hours.
        </p>

        {/* Card with interactive spotlight */}
        <div className="glass p-8 md:p-10 border border-glass-border relative overflow-hidden shadow-2xl">
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
        </div>

      </div>
    </section>
  );
}
