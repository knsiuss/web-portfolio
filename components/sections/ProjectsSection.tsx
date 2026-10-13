'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Target, Zap, BarChart3, BookOpen } from 'lucide-react';
import Link from 'next/link';
import useReducedMotion from '@/hooks/useReducedMotion';

type Project = {
  number: string;
  title: string;
  tagline: string;
  problem: string;
  solution: string[];
  impact: { label: string; value: string }[];
  challenges: string[];
  tech: string[];
  links: { live?: string; github: string; caseStudy?: string };
  status?: string;
  color: string;
  borderColor: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "F1 Dashboard Analytics",
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
      github: "https://github.com/knsiuss",
      caseStudy: "/projects/f1-dashboard",
    },
    color: "from-[#DFFF00]/20 to-orange-600/10",
    borderColor: "border-[#DFFF00]/30",
  },

  {
    number: "02",
    title: "Fraud Detection",
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
      { label: "Milestone", value: "MVP E2E" },
    ],
    challenges: [
      "Rejecting fake WAV — an MP3 stream wearing a .wav container",
      "Matching tracks without the Spotify API (normalized title/artist, duration tolerance)",
      "Multi-provider quality ladder instead of one flaky source",
    ],
    tech: ["TypeScript", "Next.js", "Node.js", "Electron"],
    links: {
      github: "https://github.com/knsiuss/spotify-downloader",
    },
    color: "from-emerald-500/20 to-emerald-600/10",
    borderColor: "border-emerald-500/30",
  },

  {
    number: "05",
    title: "Progressive Live 3D Reconstruction",
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
];

export default function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion();

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
          {projects.map((project, index) => (
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
