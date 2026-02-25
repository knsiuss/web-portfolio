'use client';

import { motion } from 'framer-motion';
import { Code2, Database, Brain, Users, Trophy, Rocket, ExternalLink, LineChart, Github, Bot } from 'lucide-react';
import useReducedMotion from '@/hooks/useReducedMotion';
import Image from 'next/image';

const expertise = [
  {
    icon: <Bot className="w-6 h-6" />,
    title: "AI Integration",
    desc: "Claude AI, OpenAI Codex, LLM Prompting",
  },
  {
    icon: <LineChart className="w-6 h-6" />,
    title: "Data Research",
    desc: "First Principles Thinking, Statistical Modeling",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "MLOps",
    desc: "Docker, CI/CD, Model Deployment",
  },
  {
    icon: <Github className="w-6 h-6" />,
    title: "Data Engineering",
    desc: "FastF1 API, Version Control, Pipelines",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Leadership",
    desc: "Google Student Ambassador, Tech Overviews",
  },
];

const highlights = [
  { icon: <Trophy className="w-4 h-4 text-racing-red" />, text: "GSA Rising Star + Top 100" },
  { icon: <Rocket className="w-4 h-4 text-racing-red" />, text: "Stanford ML Specialization" },
  { icon: <Code2 className="w-4 h-4 text-racing-red" />, text: "8+ Open Source Projects" },
  { icon: <Users className="w-4 h-4 text-racing-red" />, text: "100+ Students Trained" },
];

export default function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" className="relative bg-foreground py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#DFFF00]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#DFFF00]/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Main Content */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 100, skewY: 5 }}
            whileInView={{ opacity: 1, y: 0, skewY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-tech text-xs uppercase tracking-[0.3em] text-racing-red mb-4 block">
              About Me
            </span>
            <h2 className="font-lando text-4xl md:text-6xl uppercase mb-6">
              Turning Data Into{" "}
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #DFFF00' }}>
                Racing Insights
              </span>
            </h2>

            <div className="space-y-4 font-tech text-foreground/70 leading-relaxed">
              <p>
                Machine Learning Engineer focused on building production-ready ML systems
                and real-time analytics. Currently developing an{" "}
                <span className="text-racing-red">F1 tire degradation predictor</span> with
                weather integration using Python, FastF1 API, and XGBoost.
              </p>
              <p>
                As a{" "}
                <span className="text-foreground">Google Student Ambassador Rising Star + Top 100</span>,
                I&apos;ve conducted AI workshops for 100+ students, making complex AI concepts
                accessible through hands-on learning.
              </p>
              <p>
                My approach combines rigorous data research analysis with{" "}
                <span className="text-racing-red">First Principles Thinking</span>{" "}
                —stripping complex problems down to their fundamental truths
                before building scalable ML architectures.
              </p>
            </div>

            {/* GSA Highlight Card (Photo) */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="mt-8 relative group max-w-sm"
            >
              <motion.div
                whileHover={prefersReducedMotion ? {} : { y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl overflow-hidden border border-foreground/20 bg-foreground/5 backdrop-blur-md border border-foreground/10 p-3 shadow-2xl group-hover:border-[#DFFF00]/50 transition-colors"
              >
                {/* Photo Wrapper */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white/5">
                  <Image
                    src="/images/profile-kanisius.jpeg"
                    alt="Kanisius Bagaskara"
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-[0.16,1,0.3,1]"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />

                  {/* Racing overlay line */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Badge Overlay */}
                  <div className="absolute bottom-3 left-3 bg-[#DFFF00] text-background font-lando uppercase text-xs px-2 py-1 flex items-center gap-1 leading-none rounded-sm">
                    <Trophy className="w-3 h-3" />
                    GSA '25
                  </div>
                </div>

                {/* Caption */}
                <div className="mt-3 flex items-center justify-between px-1">
                  <p className="font-tech text-xs uppercase tracking-wider text-foreground/50">Official Representation</p>
                  <ExternalLink className="w-4 h-4 text-foreground/30 group-hover:text-[#DFFF00] transition-colors" />
                </div>
              </motion.div>
            </motion.div>

            {/* Quick Highlights */}
            <div className="mt-8 flex flex-wrap gap-3">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                  className="flex items-center gap-2 bg-white/5 border border-foreground/10 rounded-full px-4 py-2 hover:border-[#DFFF00] hover:bg-[#DFFF00]/10 transition-colors"
                >
                  {item.icon}
                  <span className="font-tech text-xs text-foreground/80">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Expertise Grid */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 100, skewY: 5 }}
            whileInView={{ opacity: 1, y: 0, skewY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="font-lando text-2xl uppercase mb-6">Core Expertise</h3>

            {/* Minimalist Expertise List - Refined First Principles Style */}
            <div className="flex flex-col space-y-8 md:space-y-12">
              {expertise.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 + (index * 0.1) }}
                  className="group relative cursor-default"
                >
                  {/* Subtle Top Metadata */}
                  <div className="flex items-center gap-3 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E50000] group-hover:bg-[#DFFF00] transition-colors duration-300 shadow-[0_0_8px_rgba(229,0,0,0.5)] group-hover:shadow-[0_0_12px_rgba(223,255,0,0.5)]" />
                    <p className="font-tech text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#888888] group-hover:text-foreground transition-colors duration-300">
                      {item.desc}
                    </p>
                  </div>

                  {/* Main Title - Italicized Lando Style */}
                  <div className="overflow-hidden">
                    <h4 className="font-lando text-3xl md:text-5xl text-racing-red uppercase leading-[0.85] tracking-tight italic transform group-hover:translate-x-4 transition-transform duration-700 ease-[0.16,1,0.3,1] opacity-90 group-hover:opacity-100">
                      {item.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Availability Badge */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="mt-6 flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl p-4"
            >
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
              </div>
              <div>
                <span className="font-tech text-sm text-green-400">Open for Opportunities</span>
                <p className="font-tech text-xs text-foreground/40">ML Engineering internships & freelance projects</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div >
    </section >
  );
}
