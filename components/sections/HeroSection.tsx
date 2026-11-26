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

// Role tags shown under the name; kept as data so the row stays a simple map.
const HERO_ROLES = ["ML Engineer", "Data Scientist"];

export default function HeroSection({}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0]);
  // Hoisted so every hook runs unconditionally on each render.
  const textX = useTransform(mouseX, [-1, 1], [-5, 5]);
  const bgTextY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseX.set(x);
  };

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-screen z-0 flex flex-col items-center justify-end overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Removed "KB" Watermark as it was causing visual clutter */}

      {/* Layer 1: MASSIVE TEXT - Clean and Elegant */}
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : textY,
          scale: prefersReducedMotion ? 1 : textScale,
          opacity: prefersReducedMotion ? 1 : opacity,
          x: prefersReducedMotion ? 0 : textX,
        }}
        className="absolute top-[20%] md:top-[12%] w-full flex flex-col items-center justify-center z-20 px-4"
      >
        {/* First Name */}
        <div className="font-lando text-[13vw] leading-[0.8] text-foreground tracking-tighter select-none skew-racing cursor-default">
          <SplitText text="KANISIUS" delay={0.2} />
        </div>

        {/* Last Name — the lime is the name itself, so it needs no glow */}
        <div className="font-lando text-[13vw] leading-[0.8] text-accent-text tracking-tighter -mt-1 md:-mt-3 select-none skew-racing cursor-default">
          <SplitText text="BAGASKARA" delay={0.4} />
        </div>

        {/* Subtitle Tag - Smaller text on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-4 md:mt-10 flex flex-col items-center gap-1.5 md:gap-3"
        >
          <span aria-hidden="true" className="finish-line mb-1 h-[6px] w-24 opacity-80" />
          <span className="flex flex-wrap justify-center items-center gap-x-2 md:gap-x-3 gap-y-1">
            {HERO_ROLES.map((role, index) => (
              <span key={role} className="flex items-center gap-x-2 md:gap-x-3">
                <span className="font-tech text-[11px] md:text-base uppercase tracking-[0.15em] md:tracking-[0.25em] text-foreground">
                  {role}
                </span>
                {index < HERO_ROLES.length - 1 && (
                  <span className="font-tech text-[11px] md:text-base text-accent-text">/</span>
                )}
              </span>
            ))}
          </span>
          <span className="font-tech text-[10px] md:text-sm uppercase tracking-[0.1em] md:tracking-[0.2em] text-muted">
            Jakarta, Indonesia
          </span>
        </motion.div>
      </motion.div>

      {/* BACKGROUND TEXT - Pushed to the very back, extremely subtle */}
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : bgTextY,
          opacity: prefersReducedMotion ? 1 : bgTextOpacity,
        }}
        className="absolute top-[40%] md:top-[35%] left-0 w-full z-0 pointer-events-none hidden sm:flex items-center justify-center overflow-hidden"
      >
        <motion.h2
          className="font-lando text-[14vw] md:text-[14vw] tracking-tighter text-center whitespace-nowrap"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px color-mix(in srgb, var(--foreground) 12%, transparent)",
          }}
          initial={{ x: "-5%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        >
          ML ENGINEER
        </motion.h2>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 md:gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <span className="font-tech text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-muted">
          Scroll
        </span>
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={18} aria-hidden="true" className="text-muted md:w-5 md:h-5" />
        </motion.div>
      </motion.div>

      {/* Star mark: one static accent beside the name. It used to drift on
          scroll for no reason; a fixed mark reads as a signature, not noise. */}
      <div className="absolute right-4 md:right-10 top-1/2 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center pointer-events-none">
        <Star
          size={20}
          strokeWidth={1}
          fill="var(--accent)"
          aria-hidden="true"
          className="text-foreground md:w-8 md:h-8"
        />
      </div>

      {/* Socials - Bottom Right, smaller on mobile */}
      <div className="absolute bottom-6 md:bottom-12 right-4 md:right-12 z-40 flex items-center gap-2 md:gap-4 pointer-events-auto">
        <a
          href="https://github.com/knsiuss"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          className="w-11 h-11 border border-line-strong rounded-md flex items-center justify-center text-foreground hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors"
        >
          <Github size={18} aria-hidden="true" />
        </a>
        <a
          href="https://www.linkedin.com/in/kanisiusbagas1212"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          className="w-11 h-11 border border-line-strong rounded-md flex items-center justify-center text-foreground hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors"
        >
          <Linkedin size={18} aria-hidden="true" />
        </a>
      </div>

      {/* Live project card. The tag is the real link to the deployed app, so
          it stays a plain <a>; the card itself only animates on hover. */}
      <a
        href="https://f1-lab.streamlit.app/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open the F1 Data Analytics live demo in a new tab"
        className="fixed bottom-6 md:bottom-12 left-4 md:left-12 z-40 hidden md:flex flex-col gap-2 group"
      >
        <span className="font-tech text-[9px] md:text-[10px] uppercase tracking-widest text-muted ml-3">
          Live project
        </span>

        <div className="w-32 md:w-40 h-48 md:h-64 border border-line bg-panel flex flex-col items-center p-3 md:p-4 relative skew-racing overflow-hidden transition-colors duration-300 group-hover:border-accent-soft">
          <div className="flex-1 w-full flex items-center justify-center z-10 unskew-racing">
            <svg
              viewBox="0 0 100 100"
              aria-hidden="true"
              className="w-full h-full stroke-foreground/30 fill-none stroke-[1.5px] transition-colors duration-300 group-hover:stroke-accent"
            >
              <path d="M10,80 Q30,70 40,50 T70,30 T90,20" />
              <circle cx="90" cy="20" r="3" className="fill-foreground/30 transition-colors group-hover:fill-accent" />
            </svg>
          </div>
          <div className="w-full border-t border-line pt-2 md:pt-3 mt-2 text-center z-10 unskew-racing">
            <p className="font-lando text-sm md:text-lg uppercase leading-none transition-colors group-hover:text-accent-text">
              F1 Data
              <br />
              Analytics
            </p>
            <span className="mt-2 inline-block font-tech text-[8px] uppercase tracking-widest text-faint">
              Streamlit Cloud
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
