'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Linkedin, Mail } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

import { ThemeToggle } from './ui/ThemeToggle';

const menuItems = ['Home', 'Projects', 'About', 'Contact'];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-background flex flex-col"
        >
          {/* Header with Theme Toggle & Close Button */}
          <div className="flex justify-between items-center p-4 md:p-6">
            <ThemeToggle />
            <MagneticButton
              className="w-10 h-10 md:w-12 md:h-12 border border-foreground/30 rounded-full flex items-center justify-center text-foreground hover:bg-racing-red hover:border-racing-red hover:text-background transition-all"
              onClick={onClose}
            >
              <X size={20} className="md:w-6 md:h-6" />
            </MagneticButton>
          </div>

          {/* Menu Items - Centered */}
          <nav className="flex-1 flex flex-col items-center justify-center gap-6 md:gap-8 px-4">
            {menuItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: index * 0.08 }}
                onClick={onClose}
                className="font-lando text-4xl sm:text-5xl md:text-7xl uppercase text-foreground hover:text-[#DFFF00] transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </nav>

          {/* Footer with Contact & Social */}
          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            {/* Quick Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
            >
              <a
                href="mailto:kanisius@novar.me"
                className="flex items-center gap-2 text-foreground/60 hover:text-[#DFFF00] transition-colors font-tech text-sm"
              >
                <Mail size={16} />
                <span>kanisius@novar.me</span>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-4 md:gap-6"
            >
              <a
                href="https://github.com/knsiuss"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-12 md:h-12 border border-foreground/20 rounded-full flex items-center justify-center text-foreground/60 hover:text-[#DFFF00] hover:border-[#DFFF00] transition-all"
                aria-label="GitHub"
              >
                <Github size={18} className="md:w-5 md:h-5" />
              </a>
              <a
                href="https://linkedin.com/in/kanisiusbagas1212"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-12 md:h-12 border border-foreground/20 rounded-full flex items-center justify-center text-foreground/60 hover:text-[#DFFF00] hover:border-[#DFFF00] transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="md:w-5 md:h-5" />
              </a>
            </motion.div>

            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center font-tech text-[10px] text-foreground/30 uppercase tracking-widest"
            >
              © 2026 Kanisius Bagaskara
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
