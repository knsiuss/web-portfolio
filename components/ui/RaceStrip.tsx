'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useReducedMotion from '@/hooks/useReducedMotion';

// Broadcast timing strip: mirrors the page's six racing "sectors".
const STAGES = [
  { id: 'projects', lap: '01', label: 'Work' },
  { id: 'tech-stack', lap: '02', label: 'Stack' },
  { id: 'certifications', lap: '03', label: 'Certs' },
  { id: 'about', lap: '04', label: 'About' },
  { id: 'currently', lap: '05', label: 'Now' },
  { id: 'contact', lap: '06', label: 'Contact' },
] as const;

export default function RaceStrip() {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setIsVisible(window.scrollY > window.innerHeight * 0.75);

      // The last sector whose top has crossed the viewport midpoint is live.
      const marker = window.innerHeight * 0.45;
      let current = 0;

      STAGES.forEach((stage, index) => {
        const section = document.getElementById(stage.id);
        if (section && section.getBoundingClientRect().top <= marker) {
          current = index;
        }
      });

      setActiveIndex(current);
    };

    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const stage = STAGES[Math.max(activeIndex, 0)];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          aria-label="Race sectors"
          initial={prefersReducedMotion ? false : { y: '100%' }}
          animate={{ y: 0 }}
          exit={prefersReducedMotion ? undefined : { y: '100%' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 hidden h-11 border-t border-line bg-background/90 backdrop-blur-md md:block"
        >
          <div className="mx-auto flex h-full max-w-6xl items-center gap-5 px-6">
            <span aria-hidden="true" className="finish-line h-3 w-3 shrink-0" />
            <span className="font-lando text-lg leading-none text-accent-text">
              LAP {stage.lap}
            </span>
            <span aria-hidden="true" className="h-4 w-px shrink-0 bg-line" />
            <span className="font-tech text-[10px] uppercase tracking-[0.3em] text-muted">
              {stage.label}
            </span>

            <div className="timing-grid flex flex-1 items-center">
              {STAGES.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-label={`Sector ${item.lap}: ${item.label}`}
                  title={item.label}
                  className="group flex h-11 flex-1 items-center justify-center"
                >
                  <span
                    className={`h-1 w-full transition-colors duration-300 group-hover:bg-accent-soft ${
                      index <= activeIndex ? 'bg-accent' : 'bg-foreground/15'
                    }`}
                  />
                </a>
              ))}
            </div>

            <span className="font-tech text-[10px] uppercase tracking-widest text-faint">
              {stage.lap} / 06 Sectors
            </span>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
