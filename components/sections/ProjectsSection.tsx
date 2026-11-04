'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, BookOpen, ChevronDown, Download } from 'lucide-react';
import Link from 'next/link';
import useReducedMotion from '@/hooks/useReducedMotion';

type Project = {
  number: string;
  title: string;
  category: string;
  tagline: string;
  problem: string;
  solution: string[];
  impact: { label: string; value: string }[];
  challenges: string[];
  tech: string[];
  links: { live?: string; github: string; caseStudy?: string; release?: string };
  status?: string;
  color: string;
  borderColor: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "F1 Dashboard Analytics",
    category: "Machine Learning",
    tagline: "Real-time telemetry & ML-powered strategy predictions",
    problem: "F1 fans struggle to understand race strategies. Existing tools lack real-time ML predictions for tire degradation and optimal pit stops.",
    solution: [
      "Interactive telemetry visualization using FastF1 API",
      "XGBoost model predicting optimal pit windows (92% accuracy)",
      "Driver performance comparison across 23 race tracks",
      "Weather integration affecting strategy recommendations",
    ],
    impact: [
      { label: "Model Accuracy", value: "92%" },
      { label: "API Response", value: "<50ms" },
      { label: "Race Tracks", value: "23" },
    ],
    challenges: [
      "Handled missing telemetry data with interpolation algorithms",
      "Optimized API fetching within rate limits",
      "Built mobile-responsive UI for live race viewing",
    ],
    tech: ["Python", "Streamlit", "FastF1", "XGBoost", "FastAPI"],
    links: {
      live: "https://f1-lab.streamlit.app/",
      github: "https://github.com/knsiuss/f1lab",
      caseStudy: "/projects/f1-dashboard",
    },
    color: "from-[#DFFF00]/20 to-orange-600/10",
    borderColor: "border-[#DFFF00]/30",
  },

  {
    number: "02",
    title: "Fraud Detection",
    category: "Machine Learning",
    tagline: "Binary classification for financial transaction security",
    problem: "Financial fraud detection requires handling imbalanced datasets and complex transaction patterns.",
    solution: [
      "XGBoost classifier with comprehensive feature engineering",
      "Transaction pattern analysis & anomaly detection",
      "Handled class imbalance with SMOTE",
      "ROC-AUC optimization for fraud detection",
    ],
    impact: [
      { label: "ROC-AUC", value: "0.94" },
      { label: "Dataset", value: "590k+" },
      { label: "Features", value: "400+" },
    ],
    challenges: [
      "Extreme class imbalance (3.5% fraud cases)",
      "Feature engineering from anonymized data",
      "Time-based validation to prevent leakage",
    ],
    tech: [
      "XGBoost",
      "Pandas", 
      "Scikit-learn", 
      "Seaborn", 
      "Matplotlib"
    ],

    links: {
      live: "https://fraud-detection-simulation.netlify.app/",
      github: "https://github.com/knsiuss/IEEE_fraud_detection",
    },
    color: "from-green-500/20 to-green-600/10",
    borderColor: "border-green-500/30",
  },
  {
    number: "03",
    title: "Deep Dive into Machine Learning",
    category: "Machine Learning",
    tagline: "Machine Learning algorithms implemented from scratch (CS229)",
    problem: "Understanding the inner workings of core algorithms to build robust and optimized AI systems.",
    solution: [
      "Implemented classic ML algorithms purely in NumPy",
      "Built custom optimization engines (Gradient Descent, Adam etc.)",
      "Mathematical derivations for backpropagation and loss functions",
      "Compared performance against enterprise libraries (Scikit-Learn)",
    ],
    impact: [
      { label: "Algorithms", value: "8+" },
      { label: "vs Scikit-Learn", value: "≈ Parity" },
      { label: "From Scratch", value: "100%" },
    ],
    challenges: [
      "Deriving complex calculus for backward passes",
      "Optimizing matrix multiplications without frameworks",
      "Handling numerical instability (vanishing gradients)",
    ],
    tech: ["Python", "NumPy", "Matplotlib", "Jupyter", "Math"],
    links: {
      github: "https://github.com/knsiuss/Deep-Dive-into-ML",
    },
    color: "from-zinc-500/15 to-zinc-600/5",
    borderColor: "border-zinc-500/20",
  },

  {
    number: "04",
    title: "Spotify Downloader",
    category: "Web",
    tagline: "Real WAV/FLAC/MP3 from a playlist link — no account, verified codec",
    problem: "People want their own offline playlists in edit-friendly WAV. Most tools just wrap an MP3 in a .wav container, and lossless routes need a Spotify account or violate its ToS.",
    solution: [
      "Spotify link used as metadata source only — no account, no login",
      "Provider ladder + scoring engine picks the best match per track",
      "In-app PCM decode and mux — WAV verified as pcm_s16le before saving",
      "One TypeScript codebase serving Next.js web and Electron desktop",
    ],
    impact: [
      { label: "Formats", value: "WAV·FLAC·MP3" },
      { label: "Codec Verified", value: "pcm_s16le" },
      { label: "Release", value: "v0.3.0" },
    ],
    challenges: [
      "Rejecting fake WAV — an MP3 stream wearing a .wav container",
      "Matching tracks without the Spotify API (normalized title/artist, duration tolerance)",
      "Multi-provider quality ladder instead of one flaky source",
    ],
    tech: ["TypeScript", "Next.js", "Node.js", "Electron"],
    links: {
      github: "https://github.com/knsiuss/spotify-downloader",
      release: "https://github.com/knsiuss/spotify-downloader/releases/tag/v0.3.0",
    },
    status: "Released · v0.3.0",
    color: "from-emerald-500/20 to-emerald-600/10",
    borderColor: "border-emerald-500/30",
  },

  {
    number: "05",
    title: "Progressive Live 3D Reconstruction",
    category: "Systems",
    tagline: "Phone camera in, 3D model out — reconstructed live on the laptop, no cloud",
    problem: "Capture tools split in two: offline photogrammetry makes you wait minutes to hours, on-device scanning locks quality to phone hardware. Can the phone stay dumb and the laptop do the work, so the first shape lands in seconds?",
    solution: [
      "Phone thin client: ARCore pose, frame quality gate, JPEG over WebSocket (WiFi or USB)",
      "One mutable reconstruction state, single worker — viewers read snapshots",
      "Live 3D Gaussian Splatting via gsplat, measured 1.59 ms/frame on an RTX 2050 4 GB",
      "Exports .splat plus a self-contained Three.js viewer",
    ],
    impact: [
      { label: "Live Render", value: "1.59ms" },
      { label: "VRAM Peak", value: "5MiB" },
      { label: "Tests", value: "163" },
    ],
    challenges: [
      "4 GB VRAM is the binding constraint — anything that doesn't fit gets sequenced or dropped",
      "Dense stage stays gated: no COLMAP binary to prove it, so the exporter fails loudly instead of writing a bad mesh",
      "Scanning below ARCore's documented 0.5–5 m band — pose quality is still an open question",
    ],
    tech: ["Python", "Flutter", "gsplat", "Open3D", "WebSocket", "ARCore"],
    links: {
      github: "https://github.com/knsiuss/progressive-live-3d-reconstruction",
    },
    status: "Private · WIP",
    color: "from-sky-500/20 to-blue-600/10",
    borderColor: "border-sky-500/30",
  },

  {
    number: "06",
    title: "StarsTask",
    category: "Web",
    tagline: "One place for every class task, session, and attendance record, so nothing lives in a paper stack or a buried WhatsApp chat again.",
    problem: "Attendance is still a paper ritual — signatures get smudged and nobody trusts the numbers. Tasks live in WhatsApp and drown there, and finding out about a new task depends on luck.",
    solution: [
      "Digital check-in per session, GPS-verified within a class-defined radius, manual override audited",
      "One structured assignment per class — title, files, deadline, searchable and filterable",
      "Push to opted-in members on publish, plus 24h and 3h deadline reminders and personal week view",
      "Explicit roles, reader reports, and revision history — every change to a published brief is recorded",
    ],
    impact: [
      { label: "Lint", value: "0 warnings" },
      { label: "Build", value: "Passing" },
      { label: "Status", value: "Pre-pilot" },
    ],
    challenges: [
      "Database, Google sign-in, push delivery, and cron have not yet been verified end-to-end",
      "Check-in coordinates come from the browser and can be spoofed",
      "iOS push requires the Home Screen app; OCR reads only the PDF text layer",
    ],
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Zod", "Vercel"],
    links: {
      live: "https://starstask.vercel.app/",
      github: "https://github.com/knsiuss/starstask",
    },
    status: "Pre-pilot",
    color: "from-violet-500/20 to-violet-600/10",
    borderColor: "border-violet-500/30",
  },
];

const FILTERS = ["All", "Machine Learning", "Web", "Systems"] as const;

export default function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

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
            ML systems, web applications, and 3D vision projects. Open Details for problem, solution, and challenges.
          </p>
        </motion.div>

        {/* Filter row */}
        <div className="mb-8 md:mb-12 flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`font-tech text-xs uppercase tracking-wider px-4 py-2 rounded-full border transition-all ${
                activeFilter === filter
                  ? "bg-[#DFFF00] text-background border-[#DFFF00]"
                  : "border-foreground/20 text-foreground/60 hover:border-[#DFFF00]/50 hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid — Lando-style editorial list: title + stats first, details on demand */}
        <div className="border-t border-foreground/10">
          {filteredProjects.map((project, index) => {
            const isOpen = expanded === project.title;
            return (
              <motion.article
                key={project.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.05, 0.2) }}
                className="border-b border-foreground/10 py-8 md:py-10"
              >
                <div className={`mb-5 h-1 w-16 bg-gradient-to-r ${project.color}`} />

                <div className="grid gap-6 md:grid-cols-[110px_1fr] lg:grid-cols-[110px_1fr_auto]">
                  {/* Number */}
                  <span
                    className="font-lando text-5xl md:text-6xl leading-none text-transparent"
                    style={{ WebkitTextStroke: '1.5px var(--color-foreground)' }}
                    aria-hidden="true"
                  >
                    {project.number}
                  </span>

                  {/* Title / tagline / stats */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-lando text-2xl md:text-4xl uppercase leading-none">
                        {project.title}
                      </h3>
                      {project.status && (
                        <span className="font-tech text-[10px] uppercase tracking-wider px-2.5 py-1 border border-foreground/20 rounded-full text-foreground/50">
                          {project.status}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 font-tech text-sm md:text-base text-foreground/60 max-w-2xl">
                      {project.tagline}
                    </p>

                    <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
                      {project.impact.map((metric) => (
                        <div key={metric.label}>
                          <dt className="sr-only">{metric.label}</dt>
                          <dd className="font-lando text-xl md:text-2xl text-[#DFFF00] leading-none">{metric.value}</dd>
                          <dd className="mt-1 font-tech text-[10px] uppercase tracking-wider text-foreground/50">{metric.label}</dd>
                        </div>
                      ))}
                    </dl>

                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : project.title)}
                      aria-expanded={isOpen}
                      className="mt-5 inline-flex items-center gap-1.5 font-tech text-xs uppercase tracking-wider text-foreground/60 hover:text-[#DFFF00] transition-colors"
                    >
                      {isOpen ? 'Hide details' : 'Details'}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {/* Primary actions */}
                  <div className="flex flex-wrap items-start gap-2 md:flex-col md:items-end">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-[#DFFF00] text-black font-tech text-xs uppercase px-4 py-2 rounded-full hover:brightness-110 transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                    )}
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border border-foreground/20 text-foreground font-tech text-xs uppercase px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Code
                    </a>
                    {project.links.release && (
                      <a
                        href={project.links.release}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border border-[#DFFF00]/50 text-[#DFFF00] font-tech text-xs uppercase px-4 py-2 rounded-full hover:bg-[#DFFF00] hover:text-black transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Release v0.3.0
                      </a>
                    )}
                    {project.links.caseStudy && (
                      <Link
                        href={project.links.caseStudy}
                        className="inline-flex items-center gap-1.5 font-tech text-xs uppercase tracking-wider text-foreground/60 hover:text-[#DFFF00] transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        Case Study
                      </Link>
                    )}
                  </div>
                </div>

                {/* Details — problem / solution / challenges / tech, hidden until opened */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="details"
                      initial={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pt-6 md:grid-cols-2">
                        <div>
                          <h4 className="font-tech text-xs uppercase tracking-wider text-foreground/40 mb-2">The Problem</h4>
                          <p className="font-tech text-sm text-foreground/70">{project.problem}</p>
                          <h4 className="mt-6 font-tech text-xs uppercase tracking-wider text-foreground/40 mb-2">Challenges Solved</h4>
                          <ul className="space-y-1.5">
                            {project.challenges.map((challenge) => (
                              <li key={challenge} className="font-tech text-sm text-foreground/60 flex items-start gap-2">
                                <span className="text-[#DFFF00] mt-0.5">•</span>
                                {challenge}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-tech text-xs uppercase tracking-wider text-foreground/40 mb-2">My Solution</h4>
                          <ul className="space-y-1.5">
                            {project.solution.map((item) => (
                              <li key={item} className="font-tech text-sm text-foreground/70 flex items-start gap-2">
                                <span className="text-[#DFFF00] mt-0.5">→</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-6 flex flex-wrap gap-2">
                            {project.tech.map((tech) => (
                              <span
                                key={tech}
                                className="font-tech text-xs uppercase px-3 py-1 bg-foreground/5 border border-foreground/10 text-foreground/70 rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 50, skewY: 3 }}
          whileInView={{ opacity: 1, y: 0, skewY: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/knsiuss"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-tech uppercase tracking-wider text-foreground/60 hover:text-[#DFFF00] transition-colors group"
          >
            View More on GitHub
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
