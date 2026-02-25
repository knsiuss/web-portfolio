'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Award } from 'lucide-react';
import useReducedMotion from '@/hooks/useReducedMotion';
import Image from 'next/image';

const certificates = [
  {
    issuer: "Stanford University",
    title: "Machine Learning Specialization",
    color: "bg-[#8C1515]", // Stanford Red
    textColor: "text-[#8C1515]",
    borderColor: "group-hover:border-[#8C1515]/50",
    glow: "group-hover:shadow-[0_0_30px_rgba(140,21,21,0.15)]",
    date: "Jan 2026",
    link: "/assets/certificates/stanford-supervised-learning-2026.pdf",
    isLarge: true,
    courses: [
      {
        name: "Supervised Learning",
        desc: "The math behind the magic — regression to neural nets",
      },
      {
        name: "Advanced Learning Algorithms",
        desc: "Deep dive into neural networks & decision trees",
      },
      {
        name: "Unsupervised Learning",
        desc: "Clustering, anomaly detection, and recommender systems",
      }
    ]
  },
  {
    issuer: "IBM",
    title: "Python for Data Science",
    color: "bg-[#0530AD]", // IBM Blue
    textColor: "text-[#0530AD]",
    borderColor: "group-hover:border-[#0530AD]/50",
    glow: "group-hover:shadow-[0_0_30px_rgba(5,48,173,0.15)]",
    date: "Aug 2025",
    link: "/assets/certificates/ibm-python-data-science-2025.pdf",
    isLarge: false,
    courses: [
      {
        name: "", // Not needed for small card, but we use desc
        desc: "The foundation. Where it all started.",
      }
    ]
  },
  {
    issuer: "Google for Education",
    title: "Gemini Certified Educator",
    color: "bg-[#4285F4]", // Google Blue
    textColor: "text-[#4285F4]",
    borderColor: "group-hover:border-[#4285F4]/50",
    glow: "group-hover:shadow-[0_0_30px_rgba(66,133,244,0.15)]",
    date: "Sep 2025",
    link: "/assets/certificates/google-gemini-educator-2025.pdf",
    isLarge: false,
    courses: [
      {
        name: "",
        desc: "Bridging AI tools with real teaching impact",
      }
    ]
  }
];

export default function CertificationsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="certifications" className="relative bg-black py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Header - Storytelling */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:w-1/2"
          >
            <span className="font-tech text-xs uppercase tracking-[0.4em] text-[#DFFF00] mb-4 block">
              Continuous Learning
            </span>
            <h2 className="font-lando text-4xl md:text-5xl lg:text-7xl uppercase leading-none mb-6">
              Certifications
            </h2>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="md:w-1/2 md:mt-12"
          >
            <p className="font-tech text-sm md:text-base text-white/60 leading-relaxed border-l border-[#DFFF00]/30 pl-6">
              Every certificate here was earned to solve a real problem — not just to collect badges. Stanford for the math, Google for the tools, IBM for the foundations.
            </p>
          </motion.div>
        </div>

        {/* 2-Column Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column: Stanford (Large) */}
          <div className="lg:col-span-7 flex flex-col h-full">
            {certificates.filter(c => c.isLarge).map((cert, index) => (
              <motion.a
                href={cert.link}
                download
                key={cert.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative flex-1 flex flex-col justify-between p-8 md:p-10 rounded-2xl bg-[#0a0a0a] border border-white/5 transition-all duration-500 ease-out ${cert.borderColor} ${cert.glow} overflow-hidden`}
              >
                {/* Subtle background glow on hover */}
                <div className={`absolute top-0 right-0 w-64 h-64 ${cert.color} opacity-0 group-hover:opacity-[0.03] blur-[100px] transition-opacity duration-700`} />

                <div>
                  {/* Issuer Badge */}
                  <div className="flex items-center gap-3 mb-8">
                    <span className={`w-3 h-3 rounded-full ${cert.color} shadow-[0_0_10px_currentColor]`} />
                    <span className="font-tech text-xs md:text-sm uppercase tracking-widest text-white/50">
                      {cert.issuer}
                    </span>
                  </div>

                  {/* Main Title */}
                  <h3 className="font-lando text-3xl md:text-4xl text-white mb-10 group-hover:text-white transition-colors">
                    {cert.title}
                  </h3>

                  {/* Courses List */}
                  <div className="space-y-6 mb-12 relative z-10">
                    {cert.courses.map((course) => (
                      <div key={course.name} className="flex flex-col gap-1">
                        <div className="flex items-start gap-3">
                          <span className={`text-lg mt-0.5 ${cert.textColor}`}>✦</span>
                          <span className="font-tech text-white/90 text-sm md:text-base uppercase tracking-wide">
                            {course.name}
                          </span>
                        </div>
                        <p className="font-tech text-xs text-white/40 ml-7 italic">
                          "{course.desc}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer: Date & Verify */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-auto">
                  <span className="font-tech text-xs uppercase tracking-widest text-white/40">
                    {cert.date}
                  </span>
                  <div className="flex items-center gap-2 font-tech text-xs uppercase tracking-wider text-white/60 group-hover:text-white transition-colors">
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Right Column: IBM & Google (Compact) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {certificates.filter(c => !c.isLarge).map((cert, index) => (
              <motion.a
                href={cert.link}
                download
                key={cert.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 * (index + 1) }}
                className={`group relative flex-1 flex flex-col justify-between p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 transition-all duration-500 ease-out ${cert.borderColor} ${cert.glow} overflow-hidden`}
              >
                {/* Subtle background glow on hover */}
                <div className={`absolute top-0 right-0 w-48 h-48 ${cert.color} opacity-0 group-hover:opacity-[0.03] blur-[80px] transition-opacity duration-700`} />

                <div>
                  {/* Issuer Badge */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className={`w-3 h-3 rounded-full ${cert.color} shadow-[0_0_10px_currentColor]`} />
                    <span className="font-tech text-xs uppercase tracking-widest text-white/50">
                      {cert.issuer}
                    </span>
                  </div>

                  {/* Main Title */}
                  <h3 className="font-lando text-2xl md:text-3xl text-white mb-4">
                    {cert.title}
                  </h3>

                  {/* Description Quote */}
                  <p className="font-tech text-xs text-white/40 italic mb-8 relative z-10">
                    "{cert.courses[0].desc}"
                  </p>
                </div>

                {/* Footer: Date & Verify */}
                <div className="flex items-center justify-between pt-5 border-t border-white/10 mt-auto">
                  <span className="font-tech text-xs uppercase tracking-widest text-white/40">
                    {cert.date}
                  </span>
                  <div className="flex items-center gap-2 font-tech text-xs uppercase tracking-wider text-white/60 group-hover:text-white transition-colors">
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
