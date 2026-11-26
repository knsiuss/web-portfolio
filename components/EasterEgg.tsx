'use client';

import { motion, AnimatePresence } from 'framer-motion';
import useEasterEgg from '@/hooks/useEasterEgg';

// Drawn, not emoji: the egg is a racing flag on the site's own token colours,
// so it belongs to the design instead of borrowing a system glyph.
function CheckeredFlagMark() {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 text-accent-text"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M10 42V6" strokeLinecap="square" />
      <path d="M10 8h28v14H10" fill="currentColor" fillOpacity="0.12" />
      <path d="M10 8h7v7h-7zM24 8h7v7h-7zM17 15h7v7h-7zM31 15h7v7h-7z" fill="currentColor" />
    </svg>
  );
}

export default function EasterEgg() {
  const activated = useEasterEgg();

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/95 pointer-events-none"
          role="status"
          aria-live="polite"
        >
          <div className="text-center px-6">
            <CheckeredFlagMark />
            <h2 className="font-lando text-4xl md:text-6xl text-accent-text uppercase">
              Speed unlocked
            </h2>
            <p className="font-tech text-muted mt-2">You found the Konami code.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
