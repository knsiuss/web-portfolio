'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flag, ArrowLeft } from 'lucide-react';

export default function Custom404() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center overflow-hidden relative px-6">
      <div className="finish-line absolute top-0 left-0 right-0 h-2 opacity-60" aria-hidden="true" />

      <div className="relative z-10 text-center max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Flag size={40} aria-hidden="true" className="mx-auto text-accent-text" strokeWidth={1.5} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-tech text-[11px] uppercase tracking-[0.25em] text-accent-text mb-4"
        >
          Lap cancelled
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-lando text-[22vw] sm:text-[14vw] md:text-[11rem] leading-[0.8] text-foreground"
        >
          404
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <h2 className="font-lando text-3xl md:text-5xl uppercase mt-6 mb-3">
            Off track
          </h2>
          <p className="font-tech text-muted mb-10">
            This page does not exist. The rest of the site is still running.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-accent text-accent-foreground font-tech uppercase tracking-wider px-6 rounded-md hover:brightness-110 transition-[filter]"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to home
            </Link>
            <Link
              href="/blog"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-line-strong text-foreground font-tech uppercase tracking-wider px-6 rounded-md hover:bg-foreground/10 transition-colors"
            >
              Read the blog
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
