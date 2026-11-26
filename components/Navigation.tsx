'use client';

import { motion } from 'framer-motion';
import MagneticButton from './ui/MagneticButton';
import StaggerText from './ui/StaggerText';
import { ThemeToggle } from './ui/ThemeToggle';

interface NavigationProps {
  onMenuOpen: () => void;
}

export default function Navigation({ onMenuOpen }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 w-full px-4 sm:px-6 md:px-12 py-3 md:py-4 z-50 flex justify-between items-center gap-4 border-b border-line bg-background/70 backdrop-blur-md">
      {/* LEFT: Logo. It used to be a bare div that shouted "Home" via a cursor
          tooltip while doing nothing; now it is a real link back to the top. */}
      <a
        href="#home"
        className="flex min-h-11 flex-col justify-center sm:flex-row sm:gap-2 leading-[0.85] shrink-0"
        aria-label="Kanisius Bagaskara, back to top"
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="font-lando text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight text-accent-text hover:opacity-80 transition-opacity"
        >
          <StaggerText text="KANISIUS" delay={0.2} />
        </motion.h1>
      </a>

      {/* CENTER: inline desktop links */}
      <div className="hidden lg:flex items-center gap-6">
        {[
          { label: 'Work', href: '#projects' },
          { label: 'Stack', href: '#tech-stack' },
          { label: 'About', href: '#about' },
          { label: 'Blog', href: '/blog' },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="eyebrow !text-[0.72rem] inline-flex min-h-11 items-center px-1 text-muted hover:text-accent-text transition-colors"
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* RIGHT: Contact & Menu */}
      <div className="flex items-center gap-2 md:gap-4">
        <MagneticButton
          href="mailto:kanisius@novar.me"
          magneticStrength={0.2}
          className="hidden sm:flex bg-accent px-4 md:px-6 py-2 md:py-3 rounded-md font-lando text-sm md:text-lg tracking-wide items-center gap-2 hover:brightness-110 transition-all text-accent-foreground"
        >
          CONTACT
        </MagneticButton>

        {/* Mobile Contact Button (Icon only) */}
        <a
          href="mailto:kanisius@novar.me"
          className="sm:hidden w-11 h-11 bg-accent rounded-md flex items-center justify-center text-accent-foreground"
          aria-label="Email Kanisius"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </a>

        {/* Theme Toggle — always visible */}
        <ThemeToggle />

        <MagneticButton
          className="w-11 h-11 md:w-12 md:h-12 border border-line-strong rounded-md flex flex-col items-center justify-center gap-1 md:gap-1.5 hover:bg-foreground/10 group transition-colors"
          onClick={onMenuOpen}
          magneticStrength={0.4}
          aria-label="Open menu"
          aria-haspopup="dialog"
        >
          <motion.span
            className="w-4 md:w-5 h-[2px] bg-foreground group-hover:bg-accent-text transition-colors"
          />
          <motion.span
            className="w-4 md:w-5 h-[2px] bg-foreground group-hover:bg-accent-text transition-colors"
          />
        </MagneticButton>
      </div>
    </nav>
  );
}
