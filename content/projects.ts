// Single source of truth for all portfolio projects.
// Order = display ranking. `featured: true` marks the curated homepage picks.
export type Project = {
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
  featured?: boolean;
};

export const projects: Project[] = [
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
      github: "https://github.com/knsiuss/f1lab",
      caseStudy: "/projects/f1-dashboard",
    },
    color: "from-[#DFFF00]/20 to-orange-600/10",
    borderColor: "border-[#DFFF00]/30",
    featured: true,
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
    featured: true,
  },

  {
    number: "03",
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
      caseStudy: "/projects/3d-reconstruction",
    },
    status: "Private · WIP",
    color: "from-sky-500/20 to-blue-600/10",
    borderColor: "border-sky-500/30",
    featured: true,
  },

  {
    number: "04",
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
    number: "05",
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
];
