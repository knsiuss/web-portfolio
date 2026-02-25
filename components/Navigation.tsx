'use client';

import { motion } from 'framer-motion';
import MagneticButton from './ui/MagneticButton';
import StaggerText from './ui/StaggerText';

interface NavigationProps {
  onMenuOpen: () => void;
}

export default function Navigation({ onMenuOpen }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 w-full px-4 sm:px-6 md:px-12 py-4 md:py-6 z-50 flex justify-between items-start pointer-events-none">
      {/* LEFT: Logo */}
      <motion.div
        className="flex flex-col sm:flex-row sm:gap-2 leading-[0.85] pointer-events-auto"
        data-cursor
        data-cursor-text="Home"
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="font-lando text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#DFFF00] transition-colors hover-glitch"
        >
          <StaggerText text="KANISIUS" delay={0.2} />
        </motion.h1>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="font-lando text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#DFFF00] transition-colors hover-glitch"
        >
          <StaggerText text="BAGASKARA" delay={0.3} />
        </motion.h1>
      </motion.div>

      {/* CENTER: K Logo - Hidden on small mobile */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, type: 'spring' }}
        className="absolute left-1/2 -translate-x-1/2 top-4 md:top-8 hidden sm:block pointer-events-auto"
        data-cursor
        data-cursor-text="Logo"
      >
        <motion.span
          className="font-lando text-xl md:text-3xl italic tracking-tighter border-2 border-white/30 p-0.5 md:p-1 px-2 md:px-3 skew-x-[-10deg] inline-block hover:bg-[#DFFF00] hover:border-[#DFFF00] hover:text-black hover:shadow-[0_0_15px_rgba(223,255,0,0.8)] transition-all"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          K
        </motion.span>
      </motion.div>

      {/* RIGHT: Contact & Menu */}
      <div className="flex items-center gap-2 md:gap-4 pointer-events-auto">
        <MagneticButton
          className="hidden sm:flex bg-[#DFFF00] px-4 md:px-6 py-2 md:py-3 rounded-md font-lando text-sm md:text-lg tracking-wide items-center gap-2 hover:brightness-110 transition-all"
          magneticStrength={0.2}
        >
          <a href="mailto:kanisius@novar.me" className="flex items-center gap-2">
            CONTACT
          </a>
        </MagneticButton>

        {/* Mobile Contact Button (Icon only) */}
        <a
          href="mailto:kanisius@novar.me"
          className="sm:hidden w-9 h-9 bg-[#DFFF00] rounded-md flex items-center justify-center"
          aria-label="Contact"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </a>

        <MagneticButton
          className="w-9 h-9 md:w-12 md:h-12 border border-white/30 rounded-md flex flex-col items-center justify-center gap-1 md:gap-1.5 hover:bg-white/10 group transition-all"
          onClick={onMenuOpen}
          magneticStrength={0.4}
        >
          <motion.span
            className="w-4 md:w-5 h-[2px] bg-white group-hover:bg-[#DFFF00] transition-colors"
          />
          <motion.span
            className="w-4 md:w-5 h-[2px] bg-white group-hover:bg-[#DFFF00] transition-colors"
          />
        </MagneticButton>
      </div>
    </nav>
  );
}
