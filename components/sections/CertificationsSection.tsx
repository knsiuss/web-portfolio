'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import useReducedMotion from '@/hooks/useReducedMotion';

const certificates = [
  {
    issuer: "Stanford University",
    title: "Machine Learning Specialization",
    date: "Jan 2026",
    link: "/assets/certificates/stanford-supervised-learning-2026.pdf",
    isLarge: true,
    courses: [
      {
        name: "Supervised Learning",
        desc: "The math behind the magic — regression to neural nets",
        link: "/assets/certificates/stanford-supervised-learning-2026.pdf"
      },
      {
        name: "Advanced Learning Algorithms",
        desc: "Deep dive into neural networks & decision trees",
        link: "/assets/certificates/stanford-advanced-algorithms-2026.pdf"
      },
      {
        name: "Unsupervised Learning",
        desc: "Clustering, anomaly detection, and recommender systems",
        link: "/assets/certificates/stanford-unsupervised-learning-2026.pdf"
      }
    ]
  },
  {
    issuer: "IBM",
    title: "Python for Data Science",
    date: "Aug 2025",
    link: "/assets/certificates/ibm-python-data-science-2025.pdf",
    isLarge: false,
    courses: [
      {
        name: "",
        desc: "The foundation. Where it all started.",
        link: "/assets/certificates/ibm-python-data-science-2025.pdf"
      }
    ]
  },
  {
    issuer: "Google for Education",
    title: "Gemini Certified Educator",
    date: "Sep 2025",
    link: "/assets/certificates/google-gemini-educator-2025.pdf",
    isLarge: false,
    courses: [
      {
        name: "",
        desc: "Bridging AI tools with real teaching impact",
        link: "/assets/certificates/google-gemini-educator-2025.pdf"
      }
    ]
  },
];

// Cinematic cascade for the course list inside an opened certificate.
const courseList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const courseItem: Variants = {
  hidden: { opacity: 0, x: -32, scale: 0.9, rotate: -3 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CertificationsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [expanded, setExpanded] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  // Parallax layers drift at different speeds as the section scrolls past.
  const bgX = useTransform(scrollYProgress, [0, 1], [40, -160]);
  const headerX = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={sectionRef} id="certifications" className="relative overflow-hidden bg-background py-20 md:py-32 pointer-events-auto">
      {/* Giant parallax watermark behind everything */}
      <motion.span
        style={prefersReducedMotion ? undefined : { x: bgX }}
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-0 font-lando text-[20vw] leading-none uppercase text-transparent opacity-[0.04] select-none whitespace-nowrap"
      >
        Certified Certified
      </motion.span>

      <div className="relative container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Header — cinematic parallax + skew entrance */}
        <motion.div
          style={prefersReducedMotion ? undefined : { x: headerX }}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 120, skewY: 6, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, skewY: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16 will-change-transform"
        >
          <div className="md:w-1/2">
            <span className="font-tech text-xs uppercase tracking-[0.4em] text-racing-red mb-4 block">
              Continuous Learning
            </span>
            <span className="overflow-hidden block">
              <motion.h2
                initial={prefersReducedMotion ? {} : { y: '110%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="font-lando text-4xl md:text-5xl lg:text-7xl uppercase leading-none mb-6"
              >
                Certifications
              </motion.h2>
            </span>
          </div>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="font-tech text-sm md:text-base text-foreground/60 leading-relaxed border-l border-[#DFFF00]/30 pl-6 md:w-1/2 md:mt-12"
          >
            Every certificate here was earned to solve a real problem — not just to collect badges. Stanford for the math, Google for the tools, IBM for the foundations.
          </motion.p>
        </motion.div>

        {/* Editorial list — one row per certificate, details on demand */}
        <div className="border-t border-foreground/10">
          {certificates.map((cert, index) => {
            const number = String(index + 1).padStart(2, '0');
            const isOpen = expanded === cert.title;
            return (
              <motion.article
                key={cert.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 80, skewY: 4, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, skewY: 0, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.08, 0.24) }}
                className="group relative border-b border-foreground/10 py-8 md:py-10 grid gap-6 md:grid-cols-[110px_1fr_auto]"
              >
                {/* Accent line grows left-to-right as the row enters */}
                <motion.div
                  initial={prefersReducedMotion ? {} : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                  className="absolute inset-x-0 top-0 h-px origin-left bg-[#DFFF00]/70"
                  aria-hidden="true"
                />

                <motion.span
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -80, scale: 1.4, rotate: -6 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  className="font-lando text-6xl md:text-7xl leading-none text-transparent"
                  style={{ WebkitTextStroke: '1.5px var(--color-foreground)' }}
                  aria-hidden="true"
                >
                  {number}
                </motion.span>

                <div className="min-w-0">
                  <span className="font-tech text-xs uppercase tracking-widest text-foreground/50">
                    {cert.issuer}
                  </span>
                  <span className="overflow-hidden block mt-2">
                    <motion.h3
                      initial={prefersReducedMotion ? {} : { y: '110%' }}
                      whileInView={{ y: '0%' }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                      className="font-lando text-2xl md:text-4xl uppercase leading-none"
                    >
                      {cert.title}
                    </motion.h3>
                  </span>
                  <p className="font-tech text-xs text-foreground/40 italic mt-3">
                    &ldquo;{cert.courses[0].desc}&rdquo;
                  </p>

                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : cert.title)}
                    aria-expanded={isOpen}
                    className="mt-5 inline-flex items-center gap-1.5 font-tech text-xs uppercase tracking-wider text-foreground/60 hover:text-[#DFFF00] transition-colors"
                  >
                    {isOpen ? 'Hide courses' : 'Courses'}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                <div className="flex flex-wrap items-start gap-3 md:flex-col md:items-end">
                  <span className="font-lando text-xl md:text-2xl text-[#DFFF00] leading-none">{cert.date}</span>
                  <a
                    href={cert.link}
                    download
                    className="inline-flex items-center gap-1.5 border border-foreground/20 text-foreground font-tech text-xs uppercase px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all"
                  >
                    Verify
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Courses — hidden until opened, cascade in one-by-one */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="courses"
                      initial={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden md:col-span-3"
                    >
                      <motion.ul
                        variants={courseList}
                        initial={prefersReducedMotion ? false : 'hidden'}
                        animate="show"
                        className="grid gap-3 pt-4 sm:grid-cols-3"
                      >
                        {cert.courses.map((course) => (
                          <motion.li key={course.name || course.desc} variants={courseItem}>
                            <a
                              href={course.link}
                              download
                              className="group/course block border border-foreground/10 p-4 hover:border-[#DFFF00]/50 transition-colors"
                            >
                              {course.name && (
                                <span className="font-tech text-sm uppercase tracking-wide text-foreground group-hover/course:text-[#DFFF00] transition-colors flex items-center gap-2">
                                  {course.name}
                                  <ExternalLink className="w-3 h-3 opacity-0 group-hover/course:opacity-100 transition-opacity" />
                                </span>
                              )}
                              <span className="font-tech text-xs text-foreground/50 italic block mt-1.5">
                                &ldquo;{course.desc}&rdquo;
                              </span>
                            </a>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>

        {/* Cinematic marquee */}
        <div className="mt-14 overflow-hidden border-t border-foreground/10 pt-6" aria-hidden="true">
          <motion.div
            animate={prefersReducedMotion ? undefined : { x: ['0%', '-50%'] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="flex w-max whitespace-nowrap will-change-transform"
          >
            {[0, 1].map((copy) => (
              <span
                key={copy}
                className="font-lando text-4xl md:text-6xl uppercase leading-none text-foreground/80 pr-10"
              >
                Stanford IBM Google&nbsp;
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
