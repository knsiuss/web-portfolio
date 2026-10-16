'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Target, Zap, BarChart3, BookOpen } from 'lucide-react';
import Link from 'next/link';
import useReducedMotion from '@/hooks/useReducedMotion';
import { projects } from '@/content/projects';

export default function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion();
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section id="projects" className="bg-background py-20 md:py-32 pointer-events-auto">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 100, skewY: 5 }}
          whileInView={{ opacity: 1, y: 0, skewY: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-20"
        >
          <span className="font-tech text-xs uppercase tracking-[0.3em] text-racing-red mb-4 block">
            Selected Work
          </span>
          <h2 className="font-lando text-4xl md:text-6xl uppercase mb-4">
            Featured <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--color-foreground)' }}>Projects</span>
          </h2>
          <p className="font-tech text-foreground/60 max-w-xl">
            Production-ready ML systems with real-world impact. Each project includes problem analysis,
            technical implementation, and measurable results.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-8 md:space-y-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={prefersReducedMotion ? {} : {
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
            >
              <motion.article
                whileHover={prefersReducedMotion ? {} : { y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`group bg-gradient-to-br ${project.color} border ${project.borderColor} rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_15px_40px_rgba(223,255,0,0.15)] hover:border-[#DFFF00]/40 transition-colors duration-500`}
              >
                <div className="p-6 md:p-10">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-lando text-3xl md:text-4xl text-foreground/20">{project.number}</span>
                        <div className="h-[1px] flex-1 bg-white/10 md:hidden" />
                      </div>
                      <h3 className="font-lando text-2xl md:text-4xl uppercase mb-2 text-foreground flex flex-wrap items-center gap-3">
                        {project.title}
                        {project.status && (
                          <span className="font-tech text-[10px] uppercase tracking-wider px-2.5 py-1 border border-foreground/20 rounded-full text-foreground/50">
                            {project.status}
                          </span>
                        )}
                      </h3>
                      <p className="font-tech text-sm md:text-base text-foreground/60">{project.tagline}</p>
                    </div>
                    <div className="flex gap-2">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-racing-red text-background font-tech text-xs uppercase px-4 py-2 rounded-full hover:brightness-110 transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live Demo
                        </a>
                      )}
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border border-foreground/20 text-foreground font-tech text-xs uppercase px-4 py-2 rounded-full hover:bg-white hover:text-background transition-all"
                      >
                        <Github className="w-3.5 h-3.5" />
                        Code
                      </a>
                      {project.links.caseStudy && (
                        <Link
                          href={project.links.caseStudy}
                          className="inline-flex items-center gap-1.5 border border-[#DFFF00]/40 text-[#DFFF00] font-tech text-xs uppercase px-4 py-2 rounded-full hover:bg-[#DFFF00] hover:text-background transition-all"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          Case Study
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* Left Column */}
                    <div className="space-y-4">
                      {/* Problem */}
                      <div className="bg-foreground/5 backdrop-blur-md border border-foreground/10 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-racing-red" />
                          <span className="font-tech text-xs uppercase tracking-wider text-foreground/40">The Problem</span>
                        </div>
                        <p className="font-tech text-sm text-foreground/70">{project.problem}</p>
                      </div>

                      {/* Solution */}
                      <div className="bg-foreground/5 backdrop-blur-md border border-foreground/10 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-racing-red" />
                          <span className="font-tech text-xs uppercase tracking-wider text-foreground/40">My Solution</span>
                        </div>
                        <ul className="space-y-1.5">
                          {project.solution.map((item, i) => (
                            <li key={i} className="font-tech text-sm text-foreground/70 flex items-start gap-2">
                              <span className="text-racing-red mt-1">→</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      {/* Impact Metrics */}
                      <div className="bg-foreground/5 backdrop-blur-md border border-foreground/10 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <BarChart3 className="w-4 h-4 text-racing-red" />
                          <span className="font-tech text-xs uppercase tracking-wider text-foreground/40">Impact</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {project.impact.map((metric, i) => (
                            <div key={i} className="text-center p-2 bg-foreground/5 dark:bg-foreground/10 rounded-lg">
                              <div className="font-lando text-lg md:text-xl text-racing-red">{metric.value}</div>
                              <div className="font-tech text-[10px] text-foreground/60">{metric.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Challenges */}
                      <div className="bg-foreground/5 backdrop-blur-md border border-foreground/10 rounded-xl p-4">
                        <span className="font-tech text-xs uppercase tracking-wider text-foreground/40 block mb-2">Challenges Solved</span>
                        <ul className="space-y-1">
                          {project.challenges.map((challenge, i) => (
                            <li key={i} className="font-tech text-xs text-foreground/60 flex items-start gap-2">
                              <span className="text-racing-red">•</span>
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mt-6 pt-6 border-t border-foreground/10">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="font-tech text-xs uppercase px-3 py-1 bg-foreground/5 backdrop-blur-md border border-foreground/10 text-foreground/70 rounded-full border border-foreground/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 50, skewY: 3 }}
          whileInView={{ opacity: 1, y: 0, skewY: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 border border-[#DFFF00]/40 text-[#DFFF00] font-tech text-xs uppercase tracking-wider px-6 py-3 rounded-full hover:bg-[#DFFF00] hover:text-background transition-all group"
            >
              View All Projects
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <a
              href="https://github.com/knsiuss"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-foreground/20 text-foreground/60 hover:text-foreground hover:border-foreground/40 font-tech text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
