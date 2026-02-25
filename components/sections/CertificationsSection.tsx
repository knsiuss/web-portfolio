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

        {/* Sleek Lando Table List */}
        <div className="w-full max-w-5xl flex flex-col pt-8">
          {/* Table Header */}
          <div className="border-b border-white/20 pb-4 mb-4 justify-between text-[10px] md:text-xs font-tech text-white/40 uppercase tracking-widest hidden md:flex">
            <span className="w-1/3 pl-2">Organization</span>
            <span className="w-1/2">Certification Detail</span>
            <span className="w-1/6 text-right pr-2">Date</span>
          </div>

          {certifications.map((cert, index) => (
            <motion.a
              href={cert.link}
              download
              key={cert.title}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              className="group flex flex-col md:flex-row items-start md:items-center py-6 md:py-8 border-b border-white/10 hover:border-[#DFFF00]/50 transition-colors relative"
            >
              {/* Organization and Indicator */}
              <div className="w-full md:w-1/3 flex items-center gap-4 mb-3 md:mb-0 pl-0 md:pl-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E50000] shadow-[0_0_8px_rgba(229,0,0,0.6)] group-hover:bg-[#DFFF00] group-hover:shadow-[0_0_12px_rgba(223,255,0,0.6)] transition-all duration-300" />
                <p className="font-tech text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#888888] group-hover:text-white transition-colors duration-300">
                  {cert.org.split('•')[0].trim()}
                </p>
              </div>

              {/* Title */}
              <div className="w-full md:w-1/2 relative z-10 pr-4">
                <h3 className="font-lando text-xl md:text-2xl lg:text-3xl text-white/90 group-hover:text-[#DFFF00] uppercase tracking-wide leading-none transition-all duration-500 ease-[0.16,1,0.3,1] transform group-hover:translate-x-3">
                  {cert.title}
                </h3>
              </div>

              {/* Arrow and Date */}
              <div className="w-full md:w-1/6 flex justify-between md:justify-end items-center mt-4 md:mt-0 text-white/40 group-hover:text-white transition-colors pr-0 md:pr-2">
                <span className="font-tech text-[10px] uppercase tracking-widest block md:hidden">Date</span>
                <div className="flex items-center gap-4">
                  <span className="font-tech text-xs tracking-[0.2em]">{cert.date.split(' ')[1] || cert.date}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
