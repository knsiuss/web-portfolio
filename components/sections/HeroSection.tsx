"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { Star, ChevronDown, Github, Linkedin } from "lucide-react";
import useReducedMotion from "@/hooks/useReducedMotion";
import SplitText from "@/components/ui/SplitText";

interface HeroSectionProps {
  onMenuOpen: () => void;
}

export default function HeroSection({ onMenuOpen }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseX.set(x);
  };

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-screen z-0 flex flex-col items-center justify-end overflow-hidden pointer-events-none"
      onMouseMove={handleMouseMove}
    >
      {/* Removed "KB" Watermark as it was causing visual clutter */}

      {/* Layer 1: MASSIVE TEXT - Clean and Elegant */}
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : textY,
          scale: prefersReducedMotion ? 1 : textScale,
          opacity: prefersReducedMotion ? 1 : opacity,
          x: prefersReducedMotion ? 0 : useTransform(mouseX, [-1, 1], [-5, 5]),
        }}
        className="absolute top-[20%] md:top-[12%] w-full flex flex-col items-center justify-center z-20 px-4"
      >
        {/* First Name */}
        <div
          className="font-lando text-[13vw] sm:text-[13vw] md:text-[13vw] leading-[0.8] text-white tracking-tighter select-none skew-racing cursor-default"
          style={{ filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.8))" }}
        >
          <SplitText text="KANISIUS" delay={0.2} />
        </div>

        {/* Last Name */}
        <div
          className="font-lando text-[13vw] sm:text-[13vw] md:text-[13vw] leading-[0.8] text-[#DFFF00] tracking-tighter -mt-1 md:-mt-3 select-none skew-racing cursor-default"
          style={{ textShadow: "0px 10px 30px rgba(223, 255, 0, 0.2)" }}
        >
          <SplitText text="BAGASKARA" delay={0.4} />
        </div>

        {/* Subtitle Tag - Smaller text on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-4 md:mt-10 flex flex-col items-center gap-1.5 md:gap-3"
        >
          <div className="flex justify-center items-center gap-2 md:gap-4">
            <span className="w-8 md:w-16 h-[1.5px] bg-white" />
            <span className="font-tech text-[10px] md:text-sm uppercase tracking-[0.15em] md:tracking-[0.3em]">
              Google Student Ambassador
            </span>
            <span className="w-8 md:w-16 h-[1.5px] bg-white" />
          </div>
          <span className="font-tech text-[9px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.2em] text-white/60">
            Jakarta, Indonesia • Machine Learning Engineer
          </span>
          <div className="mt-2 md:mt-4 inline-flex items-center gap-2 px-3 max-md:py-1 py-1.5 rounded-full border border-[#DFFF00]/50 bg-[#DFFF00]/10 backdrop-blur-md shadow-[0_0_15px_rgba(223,255,0,0.15)]">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#DFFF00] animate-pulse" style={{ boxShadow: "0 0 8px rgba(223,255,0,0.8)" }}></span>
            <span className="font-tech text-[9px] md:text-xs text-[#DFFF00] uppercase tracking-wider font-bold">Open to Work (Internships)</span>
          </div>
        </motion.div>
      </motion.div>

      {/* BACKGROUND TEXT - Pushed to the very back, extremely subtle */}
      <motion.div
        style={{
          y: prefersReducedMotion
            ? 0
            : useTransform(scrollYProgress, [0, 0.5], [0, -30]),
          opacity: prefersReducedMotion
            ? 1
            : useTransform(scrollYProgress, [0, 0.3], [1, 0]),
        }}
        className="absolute top-[40%] md:top-[35%] left-0 w-full z-0 pointer-events-none hidden sm:flex items-center justify-center overflow-hidden"
      >
        <motion.h2
          className="font-lando text-[14vw] md:text-[14vw] tracking-tighter text-center whitespace-nowrap"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.06)", // Extremely faint ghost text
          }}
          initial={{ x: "-5%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        >
          DATA SCIENTIST
        </motion.h2>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 md:gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <span className="font-tech text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/60">
          Scroll
        </span>
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-white/40 md:w-5 md:h-5" />
        </motion.div>
      </motion.div>

      {/* Floating Star - Smaller on mobile */}
      <motion.div
        style={{
          y: prefersReducedMotion
            ? 0
            : useTransform(scrollYProgress, [0, 1], [0, -150]),
        }}
        className="absolute right-4 md:right-10 top-1/2 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center pointer-events-none"
      >
        <Star
          size={20}
          strokeWidth={1}
          fill="#DFFF00"
          className="text-white md:w-8 md:h-8"
        />
      </motion.div>

      {/* Socials - Bottom Right, smaller on mobile */}
      <div className="absolute bottom-6 md:bottom-12 right-4 md:right-12 z-40 flex items-center gap-2 md:gap-4 pointer-events-auto">
        <a
          href="https://github.com/knsiuss"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 md:w-10 md:h-10 border border-white/30 rounded-full flex items-center justify-center hover:bg-[#DFFF00] hover:border-[#DFFF00] hover:text-black transition-all"
          data-cursor
          data-cursor-text="GitHub"
        >
          <Github size={14} className="md:w-[18px] md:h-[18px]" />
        </a>
        <a
          href="https://www.linkedin.com/in/kanisiusbagas1212"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 md:w-10 md:h-10 border border-white/30 rounded-full flex items-center justify-center hover:bg-[#DFFF00] hover:border-[#DFFF00] hover:text-black transition-all"
          data-cursor
          data-cursor-text="LinkedIn"
        >
          <Linkedin size={14} className="md:w-[18px] md:h-[18px]" />
        </a>
      </div>

      {/* WIDGET: CURRENT FOCUS - Hidden on mobile, show on md+ */}
      <div className="fixed bottom-6 md:bottom-12 left-4 md:left-12 z-40 hidden md:flex flex-col gap-2 pointer-events-auto">
        <span className="font-tech text-glow-neon text-[9px] md:text-[10px] uppercase tracking-widest text-[#DFFF00] ml-3">
          Current Focus
        </span>

        <div className="w-32 md:w-40 h-48 md:h-64 border border-white/10 rounded-lg bg-white/[0.02] backdrop-blur-md hover:bg-[#DFFF00]/10 hover:border-[#DFFF00]/50 transition-all cursor-pointer group flex flex-col items-center p-3 md:p-4 relative skew-racing overflow-hidden hover:shadow-[0_0_30px_rgba(223,255,0,0.15)]">
          {/* Carbon Fiber overlay on hover */}
          <div className="absolute inset-0 bg-carbon opacity-0 border border-white/30 group-hover:border-[#DFFF00]/50 transition-colors group-hover:opacity-100 mix-blend-overlay z-0" />

          <div className="absolute -top-[1px] -right-[1px] w-3 md:w-4 h-3 md:h-4 bg-[#050505] border-b border-l border-white/30 group-hover:border-[#DFFF00]/50 transition-colors z-10" />
          <div className="flex-1 w-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 z-10 unskew-racing">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full stroke-white/30 group-hover:stroke-[#DFFF00] fill-none stroke-[1.5px] transition-colors"
            >
              <path d="M10,80 Q30,70 40,50 T70,30 T90,20" />
              <circle
                cx="90"
                cy="20"
                r="3"
                className="fill-white/30 group-hover:fill-[#DFFF00] transition-colors"
              />
            </svg>
          </div>
          <div className="w-full border-t border-white/30 group-hover:border-[#DFFF00]/30 pt-2 md:pt-3 mt-2 text-center z-10 unskew-racing">
            <h4 className="font-lando text-sm md:text-lg uppercase leading-none group-hover:text-[#DFFF00] transition-colors">
              F1 Data
              <br />
              Analytics
            </h4>
            <div className="flex justify-center items-center gap-1 md:gap-2 mt-2 md:mt-3 opacity-60 group-hover:opacity-100 transition-opacity">
              <div className="flex flex-col items-center">
                <span className="font-tech text-glow-neon text-[7px] md:text-[8px] uppercase font-bold text-[#DFFF00]">
                  V2.0 Live
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
