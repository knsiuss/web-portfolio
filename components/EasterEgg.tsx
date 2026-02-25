'use client';

import { motion, AnimatePresence } from 'framer-motion';
import useEasterEgg from '@/hooks/useEasterEgg';

export default function EasterEgg() {
  const activated = useEasterEgg();

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 pointer-events-none"
        >
          <div className="text-center">
            <div className="font-lando text-8xl text-[#DFFF00] mb-4">🏎️</div>
            <h2 className="font-lando text-4xl text-white uppercase">Speed Unlocked!</h2>
            <p className="font-tech text-white/60 mt-2">You found the Konami Code!</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
