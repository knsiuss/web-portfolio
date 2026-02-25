'use client';

import { motion } from 'framer-motion';
import { Trophy, Users, Star, GitFork, Award, Rocket } from 'lucide-react';
import useReducedMotion from '@/hooks/useReducedMotion';

const achievements = [
  {
    category: "Technical Impact",
    icon: <GitFork className="w-5 h-5" />,
    items: [
      { metric: "8+", label: "Open Source Projects", desc: "ML and data science tools" },
      { metric: "50+", label: "GitHub Stars", desc: "Across all repositories" },
      { metric: "92%", label: "Model Accuracy", desc: "F1 tire degradation predictor" },
    ],
  },
  {
    category: "Education & Teaching",
    icon: <Users className="w-5 h-5" />,
    items: [
      { metric: "Top 100", label: "GSA Rising Star", desc: "Fully funded graduation invite" },
      { metric: "5+", label: "AI Workshops", desc: "Conducted for students" },
      { metric: "100+", label: "Students Trained", desc: "In AI and data science" },
    ],
  },
  {
    category: "Recognition",
    icon: <Award className="w-5 h-5" />,
    items: [
      { metric: "Stanford", label: "ML Specialization", desc: "3 courses completed" },
      { metric: "Google", label: "Gemini Certified", desc: "Educator & Student" },
      { metric: "IBM", label: "Data Science", desc: "Professional certificate" },
    ],
  },
];

const stats = [
  { value: "8+", label: "Repositories", icon: <GitFork className="w-4 h-4" /> },
  { value: "200+", label: "GSA Top Rank", icon: <Trophy className="w-4 h-4" /> },
  { value: "35+", label: "Tech Stack", icon: <Star className="w-4 h-4" /> },
  { value: "4", label: "Major Projects", icon: <Rocket className="w-4 h-4" /> },
];

export default function AchievementsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative bg-black py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#DFFF00]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 100, skewY: 5 }}
          whileInView={{ opacity: 1, y: 0, skewY: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="font-tech text-xs uppercase tracking-[0.3em] text-[#DFFF00] mb-4 block">
            Track Record
          </span>
          <h2 className="font-lando text-4xl md:text-6xl uppercase mb-4">
            By The <span className="text-[#DFFF00]">Numbers</span>
          </h2>
          <p className="font-tech text-white/50 max-w-xl mx-auto">
            Quantifiable impact through code, education, and continuous learning.
          </p>
        </motion.div>

        {/* Big Stats Row */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 100, skewY: 5 }}
          whileInView={{ opacity: 1, y: 0, skewY: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-[#111] border border-white/10 rounded-xl p-4 md:p-6 text-center hover:border-[#DFFF00]/30 transition-colors"
            >
              <div className="w-8 h-8 bg-[#DFFF00]/10 rounded-lg flex items-center justify-center text-[#DFFF00] mx-auto mb-2">
                {stat.icon}
              </div>
              <div className="font-lando text-2xl md:text-4xl text-white mb-1">{stat.value}</div>
              <div className="font-tech text-[10px] md:text-xs uppercase tracking-wider text-white/50">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Achievement Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 100, scale: 0.95, skewY: 3 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, skewY: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: catIndex * 0.15 }}
              className="bg-[#111] border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#DFFF00]/10 rounded-lg flex items-center justify-center text-[#DFFF00]">
                  {category.icon}
                </div>
                <h3 className="font-lando text-xl uppercase">{category.category}</h3>
              </div>

              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="border-l-2 border-white/10 pl-4 hover:border-[#DFFF00] transition-colors">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-lando text-2xl text-[#DFFF00]">{item.metric}</span>
                      <span className="font-tech text-sm text-white">{item.label}</span>
                    </div>
                    <p className="font-tech text-xs text-white/50">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
