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
        {/* Header - Brutalist & Aggressive */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/20 pb-8">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="w-2 h-2 bg-[#DFFF00]" />
              <span className="font-tech text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/50">
                Continuous Learning
              </span>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-lando text-5xl md:text-6xl lg:text-8xl uppercase leading-[0.85] tracking-tighter text-white/90"
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
            <p className="font-tech text-xs md:text-sm text-white/40 max-w-xs md:ml-auto">
              Verified achievements from Stanford, Google, and IBM. Focus on ML optimization and deep learning.
            </p>
          </motion.div>
        </div>

        {/* Brutalist Rigid Grid - Pure Lando Norris Style ("Kotak Kotak") */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10 w-full max-w-[1400px] mx-auto">
          {certifications.map((cert, index) => (
            <motion.a
              href={cert.link}
              download
              key={cert.title}
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.1 }}
              className="group relative aspect-square border-r border-b border-white/10 bg-[#050505] overflow-hidden flex flex-col justify-between"
            >
              {/* Image Card with Clip-Path Animation inside the rigid box */}
              <motion.div
                initial={prefersReducedMotion ? {} : { clipPath: "inset(100% 0 0 0)" }}
                whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover grayscale opacity-20 transform group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-50 transition-all duration-[1.5s] ease-[0.16,1,0.3,1]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </motion.div>

              {/* Gradient Overlay for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />

              {/* Massive Background Number */}
              <div className="absolute top-4 right-6 font-lando text-7xl md:text-8xl text-white/5 group-hover:text-[#DFFF00]/10 transition-colors duration-700 ease-[0.16,1,0.3,1] pointer-events-none select-none">
                0{index + 1}
              </div>

              {/* Content Positioned Rigidly */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
                {/* Top: Org */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-none bg-white/40 group-hover:bg-[#DFFF00] transition-colors duration-300 shadow-[0_0_10px_rgba(223,255,0,0)] group-hover:shadow-[0_0_10px_rgba(223,255,0,0.5)]" />
                    <span className="font-tech text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/50 group-hover:text-white transition-colors duration-300">
                      {cert.org}
                    </span>
                  </div>
                </div>

                {/* Bottom: Title & Arrow */}
                <div className="relative">
                  <div className="font-tech text-[10px] text-[#DFFF00] mb-3 uppercase tracking-widest opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[0.16,1,0.3,1]">
                    {cert.date}
                  </div>
                  <h3 className="font-lando text-3xl md:text-4xl lg:text-5xl uppercase leading-[0.85] tracking-tight text-white/80 group-hover:text-white transform group-hover:translate-x-2 transition-all duration-700 ease-[0.16,1,0.3,1]">
                    {cert.title}
                  </h3>

                  {/* Lando Signature Arrow box inside the cell */}
                  <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-[#DFFF00] flex items-center justify-center opacity-0 transform translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700 ease-[0.16,1,0.3,1]">
                    <ExternalLink className="w-6 h-6 text-black" />
                  </div>
                </div>
              </div>

              {/* High Contrast Border on Hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#DFFF00] transition-colors duration-500 z-20 pointer-events-none" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
