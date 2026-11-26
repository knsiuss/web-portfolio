'use client';

import { motion } from 'framer-motion';
import useReducedMotion from '@/hooks/useReducedMotion';
import Image from 'next/image';
import LapKicker from '@/components/ui/LapKicker';

const expertise = [
  {
    title: "Machine Learning",
    desc: "XGBoost, scikit-learn, model evaluation",
  },
  {
    title: "Deep Learning",
    desc: "PyTorch, neural networks",
  },
  {
    title: "Gen AI",
    desc: "LLM prompting, Claude, OpenAI",
  },
  {
    title: "Web & Data",
    desc: "Next.js, TypeScript, Pandas, FastF1 API",
  },
  {
    title: "Teaching",
    desc: "AI workshops, mentoring",
  },
];

// Verifiable facts only: the award, the completed specialization, the public
// repositories, and workshop attendance. Icons were removed because a trophy
// beside "Rising Star" or a rocket beside "Stanford" told the reader nothing.
const highlights = [
  "Rising Star Top 100",
  "Stanford ML Specialization",
  "14 Public Repositories",
  "100+ Students Trained",
];

export default function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" className="relative bg-background py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-line" aria-hidden="true" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left column: the person */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <LapKicker lap="04">About Me</LapKicker>
            <h2 className="font-lando text-4xl md:text-6xl uppercase mb-6" aria-label="I build ML that actually runs">
              I build ML that{" "}
              <span aria-hidden="true" className="text-transparent" style={{ WebkitTextStroke: '2px var(--accent-text)' }}>
                actually runs
              </span>
            </h2>

            <div className="space-y-4 font-tech text-muted leading-relaxed">
              <p>
                ML engineer from Jakarta. I make data tools and machine
                learning things that run for real, most recently an{" "}
                <span className="text-foreground">F1 dashboard</span> that
                predicts pit windows across 23 races, and a project that
                turns phone video into a{" "}
                <span className="text-foreground">3D model</span>.
              </p>
              <p>
                I also run AI workshops, trying to explain this stuff
                in a way that actually makes sense.
              </p>
              <p>
                Usually I start by breaking a problem down to the
                basics, then build the simplest thing that works.
              </p>
            </div>

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="mt-8 relative max-w-sm"
            >
              <div className="relative overflow-hidden border border-line bg-panel p-3">
                <div className="relative aspect-[4/3] overflow-hidden bg-foreground/5">
                  <Image
                    src="/images/kanisius.webp"
                    alt="Kanisius Bagaskara"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between px-1">
                  <p className="font-tech text-xs uppercase tracking-wider text-muted">Kanisius Bagaskara</p>
                  <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-accent-text">Jakarta, 2026</p>
                </div>
              </div>
            </motion.div>

            <ul className="mt-8 flex flex-wrap gap-2">
              {highlights.map((text) => (
                <li
                  key={text}
                  className="font-tech text-xs bg-foreground/5 border border-line px-3.5 py-2 text-muted rounded"
                >
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right column: what I actually do */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <h3 className="font-lando text-2xl uppercase mb-6">Core Expertise</h3>

            <div className="border-t border-line">
              {expertise.map((item) => (
                <div key={item.title} className="group relative border-b border-line py-6">
                  <h4 className="font-lando text-3xl md:text-4xl text-foreground uppercase leading-[0.9] tracking-tight transition-colors duration-300 group-hover:text-accent-text">
                    {item.title}
                  </h4>
                  <p className="font-tech text-[11px] uppercase tracking-[0.15em] text-muted mt-2">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
