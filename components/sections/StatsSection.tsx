'use client';

import { motion } from 'framer-motion';
import useReducedMotion from '@/hooks/useReducedMotion';

const stats = [
  { number: '8', label: 'Open Source Repos', suffix: '+' },
  { number: 'Top 100', label: 'GSA Rising Star', suffix: '' },
  { number: '35', label: 'Tech Skills', suffix: '+' },
  { number: '100', label: 'Students Trained', suffix: '+' },
];

export default function StatsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-black text-white py-16 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="font-lando text-3xl sm:text-5xl md:text-7xl uppercase mb-3 md:mb-4">
            By The <span className="text-[#DFFF00]">Numbers</span>
          </h2>
          <p className="font-tech text-white/60 uppercase tracking-wider text-sm md:text-base">The journey so far</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="font-lando text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-[#DFFF00] mb-1 md:mb-2">
                {stat.number}{stat.suffix}
              </div>
              <div className="font-tech text-xs md:text-sm uppercase tracking-wider text-white/60">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
