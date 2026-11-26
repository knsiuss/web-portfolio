'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import { ThemeToggle } from './ui/ThemeToggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Every target is a section or page that exists. Contact is the footer link,
// which is where the contact form area actually lives.
const menuItems = [
  { label: 'Work', href: '#projects' },
  { label: 'Stack', href: '#tech-stack' },
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '#contact' },
];

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>('a, button')?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-background flex flex-col"
        >
          <div className="flex justify-between items-center p-4 md:p-6">
            <ThemeToggle />
            <MagneticButton
              onClick={onClose}
              aria-label="Close menu"
              className="w-11 h-11 md:w-12 md:h-12 border border-line-strong rounded-md flex items-center justify-center text-foreground hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
                className="md:w-6 md:h-6"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </MagneticButton>
          </div>

          <nav className="flex-1 flex flex-col items-center justify-center gap-5 md:gap-6 px-4">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ delay: index * 0.06 }}
                onClick={onClose}
                className="font-lando text-4xl sm:text-5xl md:text-6xl uppercase text-foreground hover:text-accent-text transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            <motion.a
              href="mailto:kanisius@novar.me"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 text-muted hover:text-accent-text transition-colors font-tech text-sm"
            >
              <Mail size={16} aria-hidden="true" />
              <span>kanisius@novar.me</span>
            </motion.a>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex justify-center gap-4 md:gap-6"
            >
              <a
                href="https://github.com/knsiuss"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 md:w-12 md:h-12 border border-line-strong rounded-md flex items-center justify-center text-muted hover:text-accent-text hover:border-accent-soft transition-colors"
                aria-label="GitHub profile"
              >
                <Github size={18} aria-hidden="true" className="md:w-5 md:h-5" />
              </a>
              <a
                href="https://linkedin.com/in/kanisiusbagas1212"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 md:w-12 md:h-12 border border-line-strong rounded-md flex items-center justify-center text-muted hover:text-accent-text hover:border-accent-soft transition-colors"
                aria-label="LinkedIn profile"
              >
                <Linkedin size={18} aria-hidden="true" className="md:w-5 md:h-5" />
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center font-tech text-[10px] text-faint uppercase tracking-widest"
            >
              © {new Date().getFullYear()} Kanisius Bagaskara
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
