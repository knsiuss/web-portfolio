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
            <h2 className="font-lando text-4xl md:text-5xl uppercase leading-none">
              Certifications
            </h2>
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

        {/* Certificate Grid - Compact Lando Style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {certifications.map((cert, index) => (
            <motion.a
              href={cert.link}
              download
              key={cert.title}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
              className="group block relative"
            >
              {/* Image Card */}
              <div className="relative aspect-[1.414/1] w-full overflow-hidden rounded-md border border-white/10 bg-[#0a0a0a] transition-all duration-500 ease-[0.16,1,0.3,1] group-hover:border-[#DFFF00]/50 group-hover:shadow-[0_0_20px_rgba(223,255,0,0.1)]">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover grayscale-[80%] opacity-60 transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />

                {/* Overlay / vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 group-hover:opacity-0 transition-opacity duration-500 ease-[0.16,1,0.3,1]" />

                {/* Hover UI */}
                <div className="absolute top-2 right-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[0.16,1,0.3,1]">
                  <div className="w-6 h-6 rounded bg-[#DFFF00] text-black flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>

                {/* Badge inside image (bottom left) */}
                <div className="absolute bottom-2 left-2 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <span className={`w-1.5 h-1.5 rounded-full inline-block ${cert.badgeColor} shadow-[0_0_5px_currentColor]`} />
                </div>
              </div>

              {/* Text underneath */}
              <div className="mt-3 px-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${cert.badgeColor} hidden group-hover:inline-block transition-all`} />
                  <p className="font-tech text-[8px] md:text-[9px] text-white/40 uppercase tracking-[0.2em] truncate">
                    {cert.org.split('•')[0].trim()}
                  </p>
                </div>
                <h3 className="font-lando text-sm md:text-base text-white/90 group-hover:text-[#DFFF00] transition-colors leading-tight uppercase tracking-wide truncate">
                  {cert.title}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
