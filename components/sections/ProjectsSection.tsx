'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, BookOpen, ChevronDown, Download, Package, Brain } from 'lucide-react';
import Link from 'next/link';
import useReducedMotion from '@/hooks/useReducedMotion';
import LapKicker from '@/components/ui/LapKicker';

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
  links: {
    live?: string;
    github?: string;
    privateNote?: string;
    caseStudy?: string;
    release?: string;
    releaseLabel?: string;
    npm?: string;
    model?: string;
  };
  status?: string;
  image?: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "F1 Race Intelligence",
    category: "AI / ML",
    tagline: "Eight pages of race analysis that explain the strategy, and publish the model's own weakness next to its forecast",
    problem: "Broadcast coverage tells you who pitted, not why. The data to answer why is public through OpenF1 and FastF1, but it arrives as raw timing frames, partial telemetry, and sport jargon, so it stays unreadable to the fans who ask the question.",
    solution: [
      "Ridge regression on lagged features (grid, team pace, form, positions gained, DNF rate), each row built only from rounds before the race it predicts",
      "Walk-forward backtest against the naive result-equals-grid baseline, so the forecast is scored rather than asserted",
      "Documented heuristic fallback when history is too short to fit, and every derived figure labelled estimated",
      "Eight pages: championship, race centre, replay player, strategy simulator, setup fingerprint, competitor watchlist",
      "Bilingual explainer layer (30 glossary terms in English and Indonesian) so a newcomer can read the charts",
    ],
    impact: [
      { label: "Pages", value: "8" },
      { label: "Test Files", value: "46" },
      { label: "Telemetry", value: "4 Hz" },
    ],
    challenges: [
      "A grid-heavy sport makes the naive baseline strong, so the model has to earn its place rather than look clever",
      "Position on track is estimated from lap progress, and the page says so instead of drawing a confident car icon",
      "OpenF1 telemetry coverage is incomplete, so a driver without data is labelled rather than shown reading zero",
    ],
    tech: ["Python", "Streamlit", "FastF1", "OpenF1", "Plotly", "Pandas"],
    links: {
      live: "https://f1-lab.streamlit.app/",
      github: "https://github.com/knsiuss/f1lab",
      caseStudy: "/projects/f1-dashboard",
    },
    status: "Live · sleeps when idle",
  },

  {
    number: "02",
    title: "Sentinel Fraud Detection",
    category: "AI / ML",
    tagline: "A tuned LightGBM behind a FastAPI service, with a reviewer console that shows why a transaction was flagged",
    problem: "The IEEE-CIS dataset is built to punish shortcuts: about 3.5% of 590,000 transactions are fraud, many columns are over half missing, and a random train/test split flatters every model that uses one.",
    solution: [
      "LightGBM classifier scored with a time-ordered split, so the reported number reflects performance on genuinely unseen transactions",
      "SHAP explanations rendered per decision, so a reviewer sees which features pushed a transaction toward fraud",
      "Scenario scoring, batch CSV scoring, and reviewer feedback feeding a gated retraining loop",
      "Leakage audit and drift monitoring documented alongside the model card",
    ],
    impact: [
      { label: "ROC-AUC", value: "0.909" },
      { label: "Transactions", value: "590K" },
      { label: "Fraud Rate", value: "3.5%" },
    ],
    challenges: [
      "A random split reports a much better score than the honest time-ordered evaluation, so the weaker number is the one shown",
      "The identity table covers only about a quarter of transactions, so imputation cannot be uniform across features",
      "Reviewer feedback has to be captured without letting the retraining loop drift away from the evaluated baseline",
    ],
    tech: ["LightGBM", "FastAPI", "SHAP", "Pandas", "React", "TypeScript"],
    links: {
      live: "https://fraud-detection-simulation.netlify.app/",
      github: "https://github.com/knsiuss/ieee-fraud-detection",
    },
    status: "Completed",
  },
  {
    number: "03",
    title: "Deep Dive into Machine Learning",
    category: "AI / ML",
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
  },

  {
    number: "04",
    title: "Spotify Downloader",
    category: "Web",
    tagline: "Real WAV/FLAC/MP3 from a playlist link, no account, verified codec",
    problem: "People want their own offline playlists in edit-friendly WAV. Most tools just wrap an MP3 in a .wav container, and lossless routes need a Spotify account or violate its ToS.",
    solution: [
      "Spotify link used as metadata source only, no account, no login",
      "Provider ladder + scoring engine picks the best match per track",
      "In-app PCM decode and mux, WAV verified as pcm_s16le before saving",
      "One TypeScript codebase serving Next.js web and Electron desktop",
    ],
    impact: [
      { label: "Formats", value: "WAV·FLAC·MP3" },
      { label: "Codec Verified", value: "pcm_s16le" },
      { label: "Release", value: "v0.3.0" },
    ],
    challenges: [
      "Rejecting fake WAV: an MP3 stream wearing a .wav container",
      "Matching tracks without the Spotify API (normalized title/artist, duration tolerance)",
      "Multi-provider quality ladder instead of one flaky source",
    ],
    tech: ["TypeScript", "Next.js", "Node.js", "Electron"],
    links: {
      github: "https://github.com/knsiuss/spotify-downloader",
      release: "https://github.com/knsiuss/spotify-downloader/releases/tag/v0.3.0",
    },
    status: "Released · v0.3.0",
  },

  {
    number: "05",
    title: "Aphelion Engine",
    category: "Systems",
    tagline: "A gateway that sits in front of every model provider and keeps the prompt prefix byte-identical, so the cache actually hits",
    problem: "Agentic coding loops resend the same system prompt and tool list on every turn. One reordered key or a trimmed middle message and the upstream cache misses, so the same tokens get billed at full price over and over.",
    solution: [
      "PrefixLedger freezes the turn-zero system prompt and sorted tool list, then replays history byte-for-byte so the prefix score stays at 1.00",
      "Ingress pass deduplicates repeated file reads by hash and collapses repeated log lines before first dispatch",
      "Cache-drop circuit breaker watches the real cached_read to uncached_input ratio and locks into a frozen-prefix pass when the hit rate falls under 0.70",
      "Routes agentic loops, single-turn RAG, and structured JSON separately, with an explicit bypass header for anything that should pass through untouched",
      "Ships as a Rust binary, an npm CLI, and in-process middleware for Node routers",
    ],
    impact: [
      { label: "Payload Cut", value: "81.9%" },
      { label: "Prefix Score", value: "1.00" },
      { label: "Median Latency", value: "1.35ms" },
    ],
    challenges: [
      "Optimising the prompt without changing the last user message is the whole constraint, so every transform has to be append-only",
      "Six provider dialects (OpenAI Chat, OpenAI Responses, Anthropic, Gemini, Ollama) each need their own cache-telemetry field names",
      "Cache savings are only real if the upstream reports them, so the breaker reacts to upstream counters rather than its own accounting",
    ],
    tech: ["Rust", "TypeScript", "Node.js", "SSE", "OpenAI API", "Anthropic API"],
    links: {
      github: "https://github.com/knsiuss/aphelion-engine",
      release: "https://github.com/knsiuss/aphelion-engine/releases/tag/v3.3.0",
      releaseLabel: "Release v3.3.0",
      npm: "https://www.npmjs.com/package/aphelion-engine",
    },
    status: "Released · v3.3.0",
  },

  {
    number: "06",
    title: "Vektor",
    category: "AI / ML",
    tagline: "An AI operations assistant that answers from your own runbooks, checks its own citations, and only runs tools that cannot change anything",
    problem: "Ops questions live in runbooks, PDFs, and scattered docs. A chat assistant bolted on top will answer confidently from memory, and an assistant that can change infrastructure on a guess is worse than no assistant.",
    solution: [
      "Hybrid retrieval (semantic plus lexical, then reranked) over uploaded PDF, DOCX, Markdown, CSV, and images",
      "Citation verification without a second model call: bracket references are matched against retrieved sources, and hosts, commands, and error codes are checked against the context",
      "Read-only tools by default, with anything that mutates blocked unless the request opts in explicitly",
      "Multi-tenant isolation where a cross-tenant read returns 404 rather than a forbidden error that confirms the record exists",
      "Admin access to other users' conversations is written to an audit log, and every upstream model call is metered per tenant",
    ],
    impact: [
      { label: "Test Functions", value: "51" },
      { label: "Tools", value: "Read-only" },
      { label: "Version", value: "v0.1.0" },
    ],
    challenges: [
      "Grounding checks had to work without spending a second LLM call per answer, so they are string and value matching against the retrieved context",
      "Fetched web pages are untrusted input, so they are treated as data and sized and type-limited behind an SSRF guard",
      "Metering must survive failures: a call that errors upstream still needs to be counted",
    ],
    tech: ["Python", "FastAPI", "Next.js", "PostgreSQL", "Alembic", "OpenRouter"],
    links: {
      live: "https://vektor-frontend-dun.vercel.app",
      github: "https://github.com/knsiuss/vektor",
    },
    status: "Early · v0.1.0",
  },

  {
    number: "07",
    title: "Dolphin",
    category: "AI Skills",
    tagline: "A multi-agent orchestration skill pack where the pod lives inside the session you already have, not in a second runtime you have to babysit",
    problem: "Most agent orchestrators ask you to run extra processes, a tmux grid, and a message bus before anything gets done. Almost every modern harness can already spawn a subagent, so the external runtime is overhead with a maintenance cost.",
    solution: [
      "A router skill scopes the task, spawns worker and review delegates through the harness's own subagent mechanism, and reports back once",
      "Twelve satellite skills behind one numbered rule core, each citing rules by number instead of restating them",
      "Per-dimension review gates, two independent test oracles, and deterministic package checks instead of a single pass or fail",
      "Installs with one command across 75+ harnesses, and deleted the board, signal vocabulary, and launcher that version three needed",
    ],
    impact: [
      { label: "Skills", value: "13" },
      { label: "Runtime", value: "None" },
      { label: "Version", value: "v4.1.8" },
    ],
    challenges: [
      "Keeping twelve role skills from drifting apart required a core that owns the rules and satellites that only reference them",
      "The whole architecture depends on each harness exposing a usable subagent primitive, so the design is narrower than a standalone daemon and says so",
      "Review quality had to be evidence-based, since a delegate grading its own work proves nothing",
    ],
    tech: ["Node.js", "TypeScript", "Agent Skills", "Claude Code", "OpenCode"],
    links: {
      github: "https://github.com/knsiuss/dolphin",
    },
    status: "v4.1.8",
  },

  {
    number: "08",
    title: "Progressive Live 3D Reconstruction",
    category: "Systems",
    tagline: "Phone camera in, 3D model out, reconstructed live on the laptop with no cloud",
    problem: "Capture tools split in two: offline photogrammetry makes you wait minutes to hours, on-device scanning locks quality to phone hardware. Can the phone stay dumb and the laptop do the work, so the first shape lands in seconds?",
    solution: [
      "Phone thin client: ARCore pose, frame quality gate, JPEG over WebSocket (WiFi or USB)",
      "One mutable reconstruction state, single worker, so viewers read snapshots",
      "Live 3D Gaussian Splatting via gsplat, measured 1.59 ms/frame on an RTX 2050 4 GB",
      "Exports .splat plus a self-contained Three.js viewer",
    ],
    impact: [
      { label: "Live Render", value: "1.59ms" },
      { label: "VRAM Peak", value: "5MiB" },
      { label: "Tests", value: "163" },
    ],
    challenges: [
      "4 GB VRAM is the binding constraint, so anything that doesn't fit gets sequenced or dropped",
      "Dense stage stays gated: no COLMAP binary to prove it, so the exporter fails loudly instead of writing a bad mesh",
      "Scanning below ARCore's documented 0.5–5 m band; pose quality is still an open question",
    ],
    tech: ["Python", "Flutter", "gsplat", "Open3D", "WebSocket", "ARCore"],
    links: {
      privateNote: "Private repository, available on request",
    },
    status: "Private · WIP",
  },

  {
    number: "09",
    title: "StarsTask",
    category: "Web",
    tagline: "One place for every class task, session, and attendance record, so nothing lives in a paper stack or a buried WhatsApp chat again.",
    problem: "Attendance is still a paper ritual: signatures get smudged and nobody trusts the numbers. Tasks live in WhatsApp and drown there, and finding out about a new task depends on luck.",
    solution: [
      "Digital check-in per session, GPS-verified within a class-defined radius, manual override audited",
      "One structured assignment per class: title, files, deadline, searchable and filterable",
      "Push to opted-in members on publish, plus 24h and 3h deadline reminders and personal week view",
      "Explicit roles, reader reports, and revision history, so every change to a published brief is recorded",
    ],
    impact: [
      { label: "Roles", value: "Lecturer·Student" },
      { label: "Core", value: "GPS + Push" },
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
  },

  {
    number: "10",
    title: "Aphelion Judge 3.8B",
    category: "AI / ML",
    tagline: "A 3.8B judge that checks an answer against the retrieved context and returns a JSON verdict, instead of trusting the answer",
    problem: "A RAG pipeline ships whatever the generator wrote, and nothing in the loop checks it against the passages that were retrieved. Asking a second large model to grade the first one costs a full generation per answer, and a fluent wrong answer is exactly the kind a grader waves through.",
    solution: [
      "Fine-tuned microsoft/Phi-3.5-mini-instruct with QLoRA on single-sentence micro chain-of-thought supervision, so the model reasons once per verdict instead of producing a long rationale",
      "Verdicts come back as schema-validated JSON with a grounded flag and one sentence of reason, at 99.79% strict JSON compliance on the out-of-distribution test set (n=468)",
      "One SDK, two backends: Transformers in FP16 on a GPU, or a Q4_K_M GGUF build through llama.cpp on CPU",
      "Benchmark harness compares the judge against Phi-3.5 zero-shot, Flow-Judge-v0.1, a direct-JSON ablation, and a two-stage cascade, reporting F1, precision, recall and p50 latency for each",
      "Gradio demo and a JSON-constrained endpoint deployed as a Hugging Face Space",
    ],
    impact: [
      { label: "Parameters", value: "3.82B" },
      { label: "Strict JSON", value: "99.79%" },
      { label: "OOD F1", value: "0.741" },
    ],
    challenges: [
      "The direct-JSON ablation wins on precision (0.872) but recalls only 0.415, so the reasoning sentence buys recall (0.731) at roughly five times the output tokens",
      "Adding that sentence moved p50 latency from 645.6 ms to 2,753.3 ms, and the reported table keeps both columns instead of showing the faster one",
      "Strict JSON compliance has to hold on inputs the model never saw, which is why the number is measured on out-of-distribution data only",
    ],
    tech: ["Python", "QLoRA", "Phi-3.5-mini", "llama.cpp", "GGUF", "Hugging Face"],
    links: {
      live: "https://huggingface.co/spaces/knss12/Aphelion-Judge-3.8B-Demo",
      github: "https://github.com/knsiuss/aphelion-judge",
      model: "https://huggingface.co/knss12/Aphelion-Judge-3.8B",
    },
    status: "Live demo",
  },

  {
    number: "11",
    title: "Agentic RAG",
    category: "AI / ML",
    tagline: "A retrieval loop that grades what came back, rewrites the query when the evidence is thin, and spawns sub-agents only when the question needs more than one hop",
    problem: "Naive retrieval fails in three ways and none of them announce themselves: the right chunk is worded differently and misses the top-k, a multi-hop question needs facts from several places in one call, and the model answers confidently from context that does not support it.",
    solution: [
      "Eleven-document spec first (architecture, prompts, evaluation, build plan), so each milestone has acceptance criteria before any code exists",
      "Single-agent loop implemented in asyncio Python: retrieve, grade each chunk, judge sufficiency, rewrite the query, retrieve again, all inside hard budgets",
      "Orchestrator classifies the question and only decomposes and spawns sub-agents for multi-hop, comparison and aggregation questions, because spawning on a factoid question spends tokens for nothing",
      "No agent frameworks: loop, grader, rewriter, verifier and orchestrator are hand-written, with a fake LLM and embedding path so the test suite runs without a model",
      "Ablation ladder from naive RAG to hybrid retrieval, reranking, the loop, the verifier, always-spawn and auto-spawn, each scored per question type",
    ],
    impact: [
      { label: "Experiments", value: "E0-E6" },
      { label: "Python modules", value: "48" },
      { label: "Frameworks", value: "None" },
    ],
    challenges: [
      "Every invariant needs a test, including no new LLM call after a budget is exhausted and every citation resolving to a chunk id that was in that run's evidence",
      "Spawning has to pay for itself, so the evaluation reports the question types where it costs tokens without adding quality, not only the wins",
      "Retrieved text is treated as data rather than instructions, since a corpus can carry text written to steer the model",
    ],
    tech: ["Python", "asyncio", "Ollama", "Hybrid Retrieval", "RAG", "Evaluation"],
    links: {
      github: "https://github.com/knsiuss/agentic-rag-aphelion",
    },
    status: "Spec + M0 scaffold",
  },

  {
    number: "12",
    title: "Sela",
    category: "AI / ML",
    tagline: "A WhatsApp-first receptionist for appointment businesses that moves a booking into a live slot and refills the one it left behind",
    problem: "A clinic or salon loses money in the gaps. A customer texts to move Thursday's appointment, nobody answers until the evening, and the slot she vacated stays empty. Reminder tools send messages but never touch the calendar.",
    solution: [
      "LangGraph TypeScript runtime that reads a free-text reply, holds a slot, and confirms the reschedule without an agent in the chat",
      "Slot engine keeps one writer per slot, so two conversations cannot book the same time",
      "Handoff gates pass the conversation to a person when the request needs judgment, instead of letting the agent guess",
      "Google Calendar connector exposed as an MCP server, with the dashboard reporting recovered revenue rather than messages sent",
      "Monorepo split by architecture decision records, with the strategy, product, technical and go-to-market docs kept next to the code",
    ],
    impact: [
      { label: "Channel", value: "WhatsApp + SMS" },
      { label: "Runtime", value: "LangGraph TS" },
      { label: "Pilot", value: "Not started" },
    ],
    challenges: [
      "Recovered revenue needs a real calendar connection to be measurable, so it stays unmeasured while the connector is still the next package",
      "Handoff has to fire before the agent commits to a slot, which makes the gates the one place that can decide it",
      "Name, domain and WhatsApp display policy are unverified, so the README files it as a working title",
    ],
    tech: ["TypeScript", "LangGraph", "Turborepo", "pnpm", "MCP", "Google Calendar"],
    links: {
      github: "https://github.com/knsiuss/sela",
    },
    status: "MVP scaffold",
  },
];

const FILTERS = ["All", "AI / ML", "AI Skills", "Web", "Systems"] as const;

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
          <LapKicker lap="01">Selected Work</LapKicker>
          <h2 className="font-lando text-4xl md:text-6xl uppercase mb-4" aria-label="Featured Projects">
            Featured <span aria-hidden="true" className="text-transparent" style={{ WebkitTextStroke: '2px var(--color-foreground)' }}>Projects</span>
          </h2>
          <p className="font-tech text-muted max-w-xl">
            ML systems, agent skill packs, web applications, and 3D vision projects. Open Details for problem, solution, and challenges.
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
              className={`inline-flex min-h-11 items-center font-tech text-xs uppercase tracking-wider px-4 rounded-md border transition-colors ${
                activeFilter === filter
                  ? "bg-accent text-accent-foreground border-accent-soft"
                  : "border-line-strong text-muted hover:border-accent-soft hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid: Lando-style editorial list, title and stats first, details on demand */}
        <div className="border-t border-line">
          {filteredProjects.map((project, index) => {
            const isOpen = expanded === project.title;
            return (
              <motion.article
                key={project.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.05, 0.2) }}
                className="border-b border-line py-8 md:py-10"
              >
                <div className="grid gap-6 md:grid-cols-[112px_1fr] lg:grid-cols-[112px_1fr_auto] items-start">
                  {/* Monogram tile (Lando-style key-card) or real screenshot */}
                  <div
                    aria-hidden="true"
                    className="hidden md:flex relative w-28 h-36 lg:w-32 lg:h-40 flex-col items-center justify-center border border-line bg-panel overflow-hidden select-none"
                  >
                    {project.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={project.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                    ) : (
                      <>
                        <span className="absolute top-1 left-2 font-lando text-6xl lg:text-7xl leading-none text-accent-text">
                          {project.number}
                        </span>
                        <span className="absolute bottom-2 left-2 font-tech text-[10px] uppercase tracking-[0.2em] text-muted">
                          {project.tech[0]}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title / tagline / stats */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-lando text-2xl md:text-4xl uppercase leading-none">
                        {project.title}
                      </h3>
                      {project.status && (
                        <span className="font-tech text-[10px] uppercase tracking-wider px-2.5 py-1 border border-line-strong rounded text-muted">
                          {project.status}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 font-tech text-sm md:text-base text-muted max-w-2xl">
                      {project.tagline}
                    </p>

                    <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
                      {project.impact.map((metric) => (
                        <div key={metric.label}>
                          <dt className="sr-only">{metric.label}</dt>
                          <dd className="font-lando text-xl md:text-2xl text-accent-text leading-none">{metric.value}</dd>
                          <dd className="mt-1 font-tech text-[10px] uppercase tracking-wider text-faint">{metric.label}</dd>
                        </div>
                      ))}
                    </dl>

                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : project.title)}
                      aria-expanded={isOpen}
                      aria-controls={`details-${project.number}`}
                      className="mt-3 inline-flex min-h-11 items-center gap-1.5 font-tech text-xs uppercase tracking-wider text-muted hover:text-accent-text transition-colors"
                    >
                      {isOpen ? 'Hide details' : 'Details'}
                      <ChevronDown aria-hidden="true" className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {/* Primary actions */}
                  <div className="flex flex-wrap items-start gap-2 md:flex-col md:items-end">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1.5 bg-accent text-accent-foreground font-tech text-xs uppercase px-4 rounded-md hover:brightness-110 transition-[filter]"
                      >
                        <ExternalLink aria-hidden="true" className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1.5 border border-line-strong text-foreground font-tech text-xs uppercase px-4 rounded-md hover:bg-foreground hover:text-background transition-colors"
                      >
                        <Github aria-hidden="true" className="w-3.5 h-3.5" />
                        Code
                      </a>
                    )}
                    {project.links.privateNote && (
                      <p className="max-w-[160px] font-tech text-[11px] leading-snug text-faint md:text-right">
                        {project.links.privateNote}
                      </p>
                    )}
                    {project.links.release && (
                      <a
                        href={project.links.release}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1.5 border border-accent-soft text-accent-text font-tech text-xs uppercase px-4 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <Download aria-hidden="true" className="w-3.5 h-3.5" />
                        {project.links.releaseLabel ?? 'Release'}
                      </a>
                    )}
                    {project.links.npm && (
                      <a
                        href={project.links.npm}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1.5 border border-line-strong text-foreground font-tech text-xs uppercase px-4 rounded-md hover:bg-foreground hover:text-background transition-colors"
                      >
                        <Package aria-hidden="true" className="w-3.5 h-3.5" />
                        npm
                      </a>
                    )}
                    {project.links.model && (
                      <a
                        href={project.links.model}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1.5 border border-line-strong text-foreground font-tech text-xs uppercase px-4 rounded-md hover:bg-foreground hover:text-background transition-colors"
                      >
                        <Brain aria-hidden="true" className="w-3.5 h-3.5" />
                        Model
                      </a>
                    )}
                    {project.links.caseStudy && (
                      <Link
                        href={project.links.caseStudy}
                        className="inline-flex min-h-11 items-center gap-1.5 font-tech text-xs uppercase tracking-wider text-muted hover:text-accent-text transition-colors"
                      >
                        <BookOpen aria-hidden="true" className="w-3.5 h-3.5" />
                        Case Study
                      </Link>
                    )}
                    {project.title === 'F1 Race Intelligence' && (
                      <Link
                        href="/blog/f1-analytics-ml"
                        className="inline-flex min-h-11 items-center gap-1.5 font-tech text-xs uppercase tracking-wider text-muted hover:text-accent-text transition-colors"
                      >
                        <BookOpen aria-hidden="true" className="w-3.5 h-3.5" />
                        Read the write-up
                      </Link>
                    )}
                  </div>
                </div>

                {/* Details: problem, solution, challenges, tech, hidden until opened */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="details"
                      id={`details-${project.number}`}
                      initial={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pt-6 md:grid-cols-2">
                        <div>
                          <h4 className="font-tech text-xs uppercase tracking-wider text-faint mb-2">The Problem</h4>
                          <p className="font-tech text-sm text-muted">{project.problem}</p>
                          <h4 className="mt-6 font-tech text-xs uppercase tracking-wider text-faint mb-2">Challenges Solved</h4>
                          <ul className="space-y-1.5">
                            {project.challenges.map((challenge) => (
                              <li key={challenge} className="font-tech text-sm text-muted flex items-start gap-2">
                                <span aria-hidden="true" className="mt-1.5 block h-1 w-1 shrink-0 bg-accent-text" />
                                {challenge}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-tech text-xs uppercase tracking-wider text-faint mb-2">My Solution</h4>
                          <ul className="space-y-1.5">
                            {project.solution.map((item) => (
                              <li key={item} className="font-tech text-sm text-muted flex items-start gap-2">
                                <span aria-hidden="true" className="mt-1.5 block h-1 w-1 shrink-0 bg-accent-text" />
                                {item}
                              </li>
                            ))}
                          </ul>
                          <ul aria-label="Built with" className="mt-6 flex flex-wrap gap-2">
                            {project.tech.map((tech) => (
                              <li
                                key={tech}
                                className="font-tech text-[11px] uppercase px-2.5 py-1 bg-foreground/5 border border-line text-muted rounded"
                              >
                                {tech}
                              </li>
                            ))}
                          </ul>
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
            className="inline-flex min-h-11 items-center gap-2 px-4 border border-line-strong rounded-md font-tech text-xs uppercase tracking-wider text-muted hover:text-accent-text hover:border-accent-soft transition-colors"
          >
            View More on GitHub
            <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
