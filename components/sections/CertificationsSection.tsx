'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import useReducedMotion from '@/hooks/useReducedMotion';
import LapKicker from '@/components/ui/LapKicker';

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
        desc: "The math behind the magic: regression to neural nets",
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
            <LapKicker lap="03">Continuous Learning</LapKicker>
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
            className="font-tech text-sm md:text-base text-muted leading-relaxed md:w-1/2 md:mt-12"
          >
            Every certificate here was earned to solve a real problem, not to collect badges. Stanford for the math, Google for the tools, IBM for the foundations.
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
                <span className="absolute inset-x-0 top-0 h-px bg-line" aria-hidden="true" />

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
                  <span className="font-tech text-xs uppercase tracking-widest text-muted">
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
                  <p className="font-tech text-xs text-faint mt-3">
                    {cert.courses[0].desc}
                  </p>

                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : cert.title)}
                    aria-expanded={isOpen}
                    aria-controls={`courses-${number}`}
                    className="mt-3 inline-flex min-h-11 items-center gap-1.5 font-tech text-xs uppercase tracking-wider text-muted hover:text-accent-text transition-colors"
                  >
                    {isOpen ? 'Hide courses' : `${cert.courses.length} ${cert.courses.length === 1 ? 'course' : 'courses'}`}
                    <ChevronDown aria-hidden="true" className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                <div className="flex flex-wrap items-start gap-3 md:flex-col md:items-end">
                  <span className="font-lando text-xl md:text-2xl text-accent-text leading-none">{cert.date}</span>
                  <a
                    href={cert.link}
                    download
                    className="inline-flex min-h-11 items-center gap-1.5 border border-line-strong text-foreground font-tech text-xs uppercase px-4 rounded-md hover:bg-foreground hover:text-background transition-colors"
                  >
                    Certificate
                    <ExternalLink aria-hidden="true" className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Courses — hidden until opened */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="courses"
                      id={`courses-${number}`}
                      initial={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden md:col-span-3"
                    >
                      <ul className="grid gap-3 pt-4 sm:grid-cols-3">
                        {cert.courses.map((course) => (
                          <li key={course.name || course.desc}>
                            <a
                              href={course.link}
                              download
                              className="group/course block border border-line p-4 hover:border-accent-soft transition-colors"
                            >
                              {course.name && (
                                <span className="font-tech text-sm uppercase tracking-wide text-foreground group-hover/course:text-accent-text transition-colors">
                                  {course.name}
                                </span>
                              )}
                              <span className="font-tech text-xs text-muted block mt-1.5">
                                {course.desc}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
