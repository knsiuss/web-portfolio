'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Award } from 'lucide-react';
import useReducedMotion from '@/hooks/useReducedMotion';
import Image from 'next/image';

const certifications = [
  {
    title: "Machine Learning Specialization",
    org: "Stanford University • DeepLearning.AI",
    date: "January 2026",
    badge: "Stanford",
    badgeColor: "bg-[#8C1515]",
    image: "/assets/certificates/previews/stanford-supervised-learning-2026.jpg",
    link: "/assets/certificates/stanford-supervised-learning-2026.pdf",
    featured: true,
  },
  {
    title: "Advanced Learning Algorithms",
    org: "Stanford University",
    date: "January 2026",
    badge: "Stanford",
    badgeColor: "bg-[#8C1515]",
    image: "/assets/certificates/previews/stanford-advanced-algorithms-2026.jpg",
    link: "/assets/certificates/stanford-advanced-algorithms-2026.pdf",
  },
  {
    title: "Unsupervised Learning",
    org: "Stanford University",
    date: "January 2026",
    badge: "Stanford",
    badgeColor: "bg-[#8C1515]",
    image: "/assets/certificates/previews/stanford-unsupervised-learning-2026.jpg",
    link: "/assets/certificates/stanford-unsupervised-learning-2026.pdf",
  },
  {
    title: "Python for Data Science",
    org: "IBM • Coursera",
    date: "August 2025",
    badge: "IBM",
    badgeColor: "bg-[#DFFF00]",
    image: "/assets/certificates/previews/ibm-python-data-science-2025.jpg",
    link: "/assets/certificates/ibm-python-data-science-2025.pdf",
  },
  {
    title: "Gemini Certified Educator",
    org: "Google for Education",
    date: "September 2025",
    badge: "Google",
    badgeColor: "bg-[#4285F4]",
    image: "/assets/certificates/previews/google-gemini-educator-2025.jpg",
    link: "/assets/certificates/google-gemini-educator-2025.pdf",
  }
];

export default function CertificationsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="certifications" className="relative bg-black py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header - Sleek & Compact */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16 border-b border-white/10 pb-8">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-tech text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#DFFF00] mb-3 block">
              Continuous Learning
            </span>
            <div className="overflow-hidden">
              <motion.h2
                className="font-lando text-4xl md:text-5xl uppercase leading-none flex"
              >
                {"Certifications".split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: '120%', opacity: 0 }}
                    whileInView={{ y: '0%', opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: index * 0.04
                    }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h2>
            </div>
          </motion.div>
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="md:text-right"
          >
            <p className="font-tech text-xs md:text-sm text-white/50 max-w-sm md:ml-auto">
              Verified achievements from Stanford, Google, and IBM. Focus on ML optimization and deep learning algorithms.
            </p>
          </motion.div>
        </div>

        {/* Certificate List - Minimal First Principles Lando Style */}
        <div className="flex flex-col space-y-12 md:space-y-16 max-w-5xl w-full">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
            >
              <a
                href={cert.link}
                download
                className="group block relative"
              >
                {/* Org & Dot */}
                <div className="flex items-center gap-4 mb-2 md:mb-4">
                  <span className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-[#E50000] group-hover:bg-[#DFFF00] transition-colors duration-300 shadow-[0_0_10px_rgba(229,0,0,0.4)] group-hover:shadow-[0_0_15px_rgba(223,255,0,0.6)]" />
                  <p className="font-tech text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#888888] group-hover:text-white transition-colors duration-300">
                    {cert.org}
                  </p>
                </div>

                {/* Main Title - Italicized Racing Style */}
                <div className="overflow-hidden">
                  <h3 className="font-lando text-4xl md:text-5xl lg:text-7xl text-[#DFFF00] uppercase leading-[0.85] tracking-tight italic transform group-hover:translate-x-6 transition-transform duration-700 ease-[0.16,1,0.3,1] opacity-90 group-hover:opacity-100 drop-shadow-[0_0_15px_rgba(223,255,0,0)] group-hover:drop-shadow-[0_0_15px_rgba(223,255,0,0.3)]">
                    {cert.title}
                  </h3>
                </div>

                {/* Sub-info / Date (Optional subtle tech text) */}
                <div className="mt-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out flex items-center gap-4">
                  <span className="font-tech text-[10px] md:text-xs text-white/40 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">
                    {cert.date}
                  </span>
                  <span className="font-tech text-[10px] md:text-xs text-[#DFFF00]/60 uppercase tracking-widest flex items-center gap-2">
                    <ExternalLink className="w-3 h-3" /> View Source
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
