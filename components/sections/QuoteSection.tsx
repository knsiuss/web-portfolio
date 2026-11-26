'use client';

import { motion } from 'framer-motion';
import useReducedMotion from '@/hooks/useReducedMotion';

// Sits between the playlist and the contact strip: one borrowed line, credited,
// as the last thing read before the page asks for an email.
export default function QuoteSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section aria-label="Quote" className="relative border-y border-line bg-panel/40">
      <div className="mx-auto max-w-4xl px-4 md:px-6 py-16 md:py-24">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span aria-hidden="true" className="block h-1 w-10 bg-accent" />
          <blockquote className="mt-6 md:mt-8">
            <p className="font-sans text-2xl md:text-4xl font-light leading-relaxed tracking-wide text-foreground">
              When something is important enough, you do it even if the odds are not in your favour.
            </p>
            <footer className="mt-6 md:mt-8">
              <cite className="font-tech text-[10px] md:text-xs uppercase tracking-[0.3em] not-italic text-accent-text">
                Elon Musk
              </cite>
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
