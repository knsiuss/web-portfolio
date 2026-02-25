'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedSignature from '@/components/ui/AnimatedSignature';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500; // Increased to 2500ms to allow full drawing of the signature
    const interval = 16;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const eased = 1 - Math.pow(1 - currentStep / steps, 3);
      setProgress(Math.min(eased * 100, 100));

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onLoadingComplete, 300); // Reduced from 500ms
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Animated Signature Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-6 mx-auto w-64 md:w-96 h-32 md:h-48 flex items-center justify-center"
        >
          <AnimatedSignature />
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="font-lando text-xl md:text-3xl uppercase tracking-wider text-white/90">
            P. Kanisius Bagaskara
          </h1>
          <p className="font-tech text-xs uppercase tracking-[0.2em] text-[#DFFF00] mt-2">
            Machine Learning Engineer (Student)
          </p>
          <p className="font-tech text-[10px] uppercase tracking-wider text-white/50 mt-1">
            Jakarta, Indonesia
          </p>
        </motion.div>

        {/* Simple Progress Bar */}
        <div className="w-48 mx-auto">
          <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#DFFF00]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="font-tech text-[10px] uppercase text-white/40 mt-2">
            {Math.round(progress)}%
          </p>
        </div>

        {/* Status Text */}
        <motion.p
          className="font-tech text-xs uppercase tracking-[0.3em] mt-8 text-white/40"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {progress >= 100 ? 'Go Go Go!' : 'Preparing Pit Lane...'}
        </motion.p>
      </div>

      {/* Corner Accents */}
      <motion.div
        className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-[#DFFF00]/50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      />
      <motion.div
        className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-[#DFFF00]/50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      />
      <motion.div
        className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-[#DFFF00]/50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      />
      <motion.div
        className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-[#DFFF00]/50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      />
    </motion.div>
  );
}
