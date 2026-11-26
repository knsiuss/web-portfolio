'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedSignature from '@/components/ui/AnimatedSignature';
import useReducedMotion from '@/hooks/useReducedMotion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const duration = 1200;
    const interval = 16;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const eased = 1 - Math.pow(1 - currentStep / steps, 3);
      setProgress(Math.min(eased * 100, 100));

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onLoadingComplete, 200);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-6 mx-auto w-64 md:w-96 h-32 md:h-48 flex items-center justify-center"
        >
          <AnimatedSignature />
        </motion.div>

        {/* Start lights come on one by one; the real value of the loader is
            this progress readout, so the lights track it rather than loop. */}
        <div className="mb-8 flex items-center justify-center gap-3" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((light) => {
            const isLit = progress >= (light + 1) * 18;
            return (
              <span
                key={light}
                className={`h-3 w-3 rounded-full transition-opacity duration-200 md:h-4 md:w-4 ${
                  progress >= 100
                    ? 'bg-accent opacity-0'
                    : isLit
                      ? 'bg-accent opacity-100'
                      : 'bg-line-strong opacity-40'
                }`}
              />
            );
          })}
        </div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="font-lando text-xl md:text-3xl uppercase tracking-wider text-foreground">
            P. Kanisius Bagaskara
          </h1>
          <p className="font-tech text-xs uppercase tracking-[0.2em] text-accent-text mt-2">
            Machine Learning Engineer (Student)
          </p>
          <p className="font-tech text-[10px] uppercase tracking-wider text-muted mt-1">
            Jakarta, Indonesia
          </p>
        </motion.div>

        <div className="w-48 mx-auto">
          <div className="h-[2px] bg-line overflow-hidden">
            <div
              className="h-full bg-accent transition-[width] duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="font-tech text-[10px] uppercase text-faint mt-2">
            {Math.round(progress)}%
          </p>
        </div>

        <p className="font-tech text-xs uppercase tracking-[0.3em] mt-8 text-muted">
          {progress >= 100 ? 'Lights out' : 'Preparing pit lane'}
        </p>
      </div>
    </motion.div>
  );
}
