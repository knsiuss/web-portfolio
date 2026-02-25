'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flag, Home, ChevronRight } from 'lucide-react';

export default function Custom404() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-foreground text-foreground flex flex-col items-center justify-center overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a0000] to-black" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#DFFF00]/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#DFFF00]/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Checkered Flag Animation */}
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 1, type: 'spring', stiffness: 100 }}
          className="mb-8"
        >
          <Flag size={80} className="mx-auto text-racing-red" strokeWidth={1.5} />
        </motion.div>

        {/* 404 Number */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-lando text-[20vw] md:text-[15vw] leading-none text-racing-red mb-4"
        >
          404
        </motion.h1>

        {/* Pit Stop Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="font-lando text-4xl md:text-6xl uppercase mb-4">
            Pit Stop
          </h2>
          <p className="font-tech text-xl md:text-2xl text-foreground/60 mb-2">
            Looks like you&apos;ve gone off track!
          </p>
          <p className="font-tech text-lg text-foreground/40 uppercase tracking-wider">
            Page Not Found
          </p>
        </motion.div>

        {/* Lap Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 mb-8"
        >
          <div className="font-tech text-sm uppercase tracking-wider text-foreground/40 mb-2">
            Returning to pits in
          </div>
          <div className="font-lando text-6xl text-racing-red">
            {count === 0 ? 'GO!' : `0${count}`}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-[#DFFF00] text-foreground font-tech uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white hover:text-background transition-all duration-300 group"
          >
            <Home size={20} />
            <span>Back to Home</span>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Tire Marks Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20">
          <svg viewBox="0 0 1200 120" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0,60 Q300,0 600,60 T1200,60"
              fill="none"
              stroke="#DFFF00"
              strokeWidth="40"
              strokeDasharray="60 40"
            />
          </svg>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-[#DFFF00]/30" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-[#DFFF00]/30" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-[#DFFF00]/30" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-[#DFFF00]/30" />
    </div>
  );
}
