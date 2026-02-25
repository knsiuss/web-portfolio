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
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="font-tech text-xs uppercase tracking-[0.3em] text-[#DFFF00] mb-4 block">
            Continuous Learning
          </span>
          <h2 className="font-lando text-4xl md:text-6xl uppercase mb-4">
            Official <span className="text-[#DFFF00]">Credentials</span>
          </h2>
          <p className="font-tech text-white/50 max-w-xl mx-auto">
            Verified achievements from Stanford, Google, and IBM.
          </p>
        </motion.div>

        {/* Featured Certificate */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="group relative w-full overflow-hidden rounded-2xl md:rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-2 md:p-4 hover:border-[#DFFF00]/30 transition-colors">
            {/* Image Wrapper */}
            <div className="relative aspect-[1.414/1] w-full overflow-hidden rounded-xl bg-white/5">
              <Image
                src={certifications[0].image}
                alt={certifications[0].title}
                fill
                className="object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Featured Badge */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6">
                <span className={`font-tech text-xs uppercase px-3 py-1.5 ${certifications[0].badgeColor} text-white rounded-sm shadow-xl flex items-center gap-2`}>
                  <Award className="w-4 h-4" />
                  {certifications[0].badge} Featured
                </span>
              </div>

              {/* Hover Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-[0.16,1,0.3,1]">
                <a
                  href={certifications[0].link}
                  download
                  className="bg-[#DFFF00] text-black font-lando uppercase tracking-wider px-8 py-4 rounded-full flex items-center gap-3 shadow-[0_0_30px_rgba(223,255,0,0.3)] hover:scale-105 transition-transform"
                >
                  View Original <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Info */}
            <div className="mt-6 px-2 md:px-6 pb-4">
              <h3 className="font-lando text-2xl md:text-4xl uppercase mb-2 group-hover:text-[#DFFF00] transition-colors">
                {certifications[0].title}
              </h3>
              <p className="font-tech text-sm text-white/60">
                {certifications[0].org} <span className="mx-2 text-white/20">•</span> {certifications[0].date}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Certificate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {certifications.slice(1).map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              className="group relative rounded-xl md:rounded-2xl border border-white/10 bg-[#0a0a0a] p-2 hover:border-[#DFFF00]/30 transition-colors"
            >
              <div className="relative aspect-[1.414/1] w-full overflow-hidden rounded-lg bg-white/5">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`font-tech text-[10px] uppercase px-2 py-1 ${cert.badgeColor} text-white rounded-sm`}>
                    {cert.badge}
                  </span>
                </div>

                {/* Hover Action */}
                <div className="absolute bottom-4 right-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[0.16,1,0.3,1]">
                  <a
                    href={cert.link}
                    download
                    className="w-10 h-10 bg-[#DFFF00] text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="mt-4 px-2 pb-2">
                <h3 className="font-lando text-lg md:text-xl uppercase mb-1 group-hover:text-white text-white/90 transition-colors">
                  {cert.title}
                </h3>
                <p className="font-tech text-xs text-white/50">
                  {cert.org}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
