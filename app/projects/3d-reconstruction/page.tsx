import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Zap, Target, BarChart3, Code2, ChevronRight, ShieldAlert, Layers } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Progressive Live 3D Reconstruction | Kanisius Bagaskara',
    description:
        'Case study: phone camera in, 3D model out — reconstructed live on the laptop over WiFi or USB. Live Gaussian Splatting rendering measured at 1.59 ms/frame on a 4 GB RTX 2050.',
    openGraph: {
        title: 'Progressive Live 3D Reconstruction — Case Study',
        description: 'Progressive live 3D reconstruction on a 4 GB VRAM budget. 1.59 ms/frame, 5 MiB VRAM peak, 163 tests green.',
        url: 'https://kanisius.dev/projects/3d-reconstruction',
    },
};

const metrics = [
    { label: 'Live Render', value: '1.59ms', desc: 'Per frame, RTX 2050 4 GB' },
    { label: 'VRAM Peak', value: '5MiB', desc: 'Live Gaussian rasterization' },
    { label: 'Tests', value: '163', desc: '159 unit + 4 integration' },
    { label: 'VRAM Floor', value: '4GB', desc: 'RTX 2050 class, the constraint' },
];

const techStack = [
    { name: 'Flutter', role: 'Phone client — capture & pose' },
    { name: 'Python', role: 'Laptop engine' },
    { name: 'gsplat', role: 'Live 3D Gaussian Splatting' },
    { name: 'ARCore / ARKit', role: 'Camera pose on device' },
    { name: 'WebSocket', role: 'JPEG frames over WiFi or USB' },
    { name: 'Open3D', role: 'Geometry and export' },
    { name: 'COLMAP', role: 'Terminal dense stage (gated)' },
    { name: 'Depth Anything V2', role: 'Monocular depth, fast init' },
];

const stages = [
    { phase: '00–05s', title: 'Sparse', desc: 'A rough point cloud and a blurry shape. Enough to prove the loop is alive.' },
    { phase: '10–20s', title: 'Dense', desc: 'Early Gaussians fill in; the object becomes recognisable while you keep moving the phone.' },
    { phase: '30s+', title: 'Refine', desc: 'Detail and texture sharpen. The model is never rebuilt — it keeps improving in place.' },
    { phase: 'Always', title: 'Incremental', desc: 'New frames update the existing model. A restart only happens when tracking is fully lost.' },
];

const measured = [
    'Test suite green — 159 unit tests and 4 integration tests pass, with ruff check and format clean over 168 files.',
    'Live gsplat render measured at 1.59 ms per frame with a 5 MiB VRAM peak on the 4 GB floor machine (driver 566.07, CUDA 12.6, torch 2.14.0+cu126, gsplat 1.5.3).',
    'USB transport proven: the phone reaches the engine through adb reverse with no WiFi, returning {"status":"ok"}.',
];

const openQuestions = [
    'Does the terminal dense stage fit in 4 GB VRAM? No COLMAP binary on the build machine, so the pass reads skipped and ADR-0002 stays open.',
    'Do feed-forward reconstruction models work on these captures, or fail silently? Four papers found so far show degradation on exactly these conditions.',
    'Do ARCore poses hold up at 30–60 cm? We scan below ARCore\'s documented 0.5–5 m depth band.',
];

export default function ThreeDReconstructionPage() {
    return (
        <main className="min-h-screen bg-[#080906] text-white">
            {/* Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b border-white/5 bg-[#080906]/80 backdrop-blur-md">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50 hover:text-[#DFFF00] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Portfolio
                    </Link>
                    <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-white/30 uppercase">
                        <span className="text-[#DFFF00]">05</span>
                        <span>/</span>
                        <span>3D Reconstruction</span>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-20 px-6 border-b border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-8 h-[1px] bg-[#DFFF00]" />
                        <span className="font-mono text-xs uppercase tracking-widest text-[#DFFF00]">Case Study</span>
                    </div>
                    <h1 className="font-black text-5xl md:text-7xl uppercase tracking-tight mb-4 leading-none">
                        Progressive Live<br />
                        <span className="text-[#DFFF00]">3D</span> Reconstruction
                    </h1>
                    <p className="font-mono text-white/50 text-sm md:text-base max-w-xl mt-6 leading-relaxed">
                        Phone camera in, 3D model out — built while you scan, on the laptop, over the
                        local network. No cloud, no upload, no waiting for the scan to finish.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-8">
                        <a
                            href="https://github.com/knsiuss/progressive-live-3d-reconstruction"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#DFFF00] text-black font-mono text-xs uppercase px-5 py-2.5 rounded-full hover:brightness-110 transition-all"
                        >
                            <Github className="w-3.5 h-3.5" />
                            Repository
                        </a>
                        </div>
                    <p className="font-mono text-[11px] text-white/25 mt-4">
                        The repository stays private while the acceptance gates below are open.
                    </p>
                </div>
            </section>

            {/* Metrics */}
            <section className="py-16 px-6 border-b border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {metrics.map((m) => (
                            <div key={m.label} className="p-5 border border-white/10 rounded-2xl bg-white/[0.02]">
                                <div className="font-black text-3xl md:text-4xl text-[#DFFF00] mb-1">{m.value}</div>
                                <div className="font-mono text-xs text-white/40 uppercase tracking-wider">{m.label}</div>
                                <div className="font-mono text-[11px] text-white/25 mt-1">{m.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Problem */}
            <section className="py-16 px-6 border-b border-white/5">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Target className="w-4 h-4 text-[#DFFF00]" />
                            <span className="font-mono text-xs uppercase tracking-widest text-white/40">The Problem</span>
                        </div>
                        <h2 className="font-black text-2xl md:text-3xl uppercase mb-4">Both Camps Leave a Gap</h2>
                        <p className="font-mono text-white/50 text-sm leading-relaxed">
                            Offline photogrammetry produces excellent results — you shoot first and see
                            something minutes to hours later. There is no <em>keep going, it&apos;s getting
                            better</em>, only a wait and then a verdict. On-device scanning is fast, but locks
                            quality to the phone&apos;s hardware and does the heavy work in a thermal- and
                            battery-constrained box.
                        </p>
                        <p className="font-mono text-white/50 text-sm leading-relaxed mt-4">
                            This project asks one question: can the phone stay dumb and the laptop stay busy,
                            so the first shape appears in seconds and the last one is genuinely good?
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Zap className="w-4 h-4 text-[#DFFF00]" />
                            <span className="font-mono text-xs uppercase tracking-widest text-white/40">The Design</span>
                        </div>
                        <h2 className="font-black text-2xl md:text-3xl uppercase mb-4">Constraints, Not Features</h2>
                        <ul className="space-y-2">
                            {[
                                'First visible shape in under 5 seconds on a consumer laptop GPU',
                                'No cloud in the core loop — one WiFi network or a USB tunnel',
                                'A 4 GB VRAM floor (RTX 2050 class) that binds every decision',
                                'Hybrid by necessity: a fast approximate path, then a slower better one',
                            ].map((item, i) => (
                                <li key={i} className="font-mono text-sm text-white/50 flex items-start gap-2">
                                    <ChevronRight className="w-4 h-4 text-[#DFFF00] mt-0.5 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Architecture */}
            <section className="py-16 px-6 border-b border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-2 mb-10">
                        <Layers className="w-4 h-4 text-[#DFFF00]" />
                        <span className="font-mono text-xs uppercase tracking-widest text-white/40">Architecture</span>
                    </div>
                    <p className="font-mono text-white/50 text-sm leading-relaxed mb-10 max-w-2xl">
                        Two halves with one job each. The phone is a thin client: it captures frames,
                        gets pose from ARCore, drops bad frames, and streams. Every heavy operation —
                        reconstruction, rendering, export — happens on the laptop, in one Python process.
                    </p>
                    <div className="space-y-6">
                        {stages.map((stage) => (
                            <div key={stage.title} className="flex gap-6 group">
                                <div className="font-black text-3xl text-white/5 group-hover:text-[#DFFF00]/20 transition-colors w-20 flex-shrink-0 font-mono">
                                    {stage.phase}
                                </div>
                                <div className="border-l border-white/10 pl-6 pb-6">
                                    <h3 className="font-black text-lg uppercase mb-2">{stage.title}</h3>
                                    <p className="font-mono text-sm text-white/40 leading-relaxed">{stage.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Measured status */}
            <section className="py-16 px-6 border-b border-white/5">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <BarChart3 className="w-4 h-4 text-[#DFFF00]" />
                            <span className="font-mono text-xs uppercase tracking-widest text-white/40">Measured</span>
                        </div>
                        <h2 className="font-black text-2xl md:text-3xl uppercase mb-4">Not Asserted</h2>
                        <ul className="space-y-2">
                            {measured.map((item, i) => (
                                <li key={i} className="font-mono text-sm text-white/50 flex items-start gap-2">
                                    <ChevronRight className="w-4 h-4 text-[#DFFF00] mt-0.5 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <ShieldAlert className="w-4 h-4 text-racing-red" />
                            <span className="font-mono text-xs uppercase tracking-widest text-white/40">Still Open</span>
                        </div>
                        <h2 className="font-black text-2xl md:text-3xl uppercase mb-4">Not Production-Ready</h2>
                        <ul className="space-y-2">
                            {openQuestions.map((item, i) => (
                                <li key={i} className="font-mono text-sm text-white/50 flex items-start gap-2">
                                    <span className="text-racing-red mt-1">•</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="py-16 px-6 border-b border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-2 mb-8">
                        <Code2 className="w-4 h-4 text-[#DFFF00]" />
                        <span className="font-mono text-xs uppercase tracking-widest text-white/40">Tech Stack</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {techStack.map((t) => (
                            <div key={t.name} className="p-4 border border-white/10 rounded-xl bg-white/[0.02] hover:border-[#DFFF00]/30 transition-colors">
                                <div className="font-black text-sm uppercase mb-1">{t.name}</div>
                                <div className="font-mono text-[11px] text-white/30">{t.role}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h2 className="font-black text-2xl uppercase mb-1">Measure, Then Claim</h2>
                        <p className="font-mono text-sm text-white/40">Every number on this page came from a benchmark run on the floor machine.</p>
                    </div>
                    <div className="flex gap-3">
                        <a
                            href="https://github.com/knsiuss"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#DFFF00] text-black font-mono text-xs uppercase px-5 py-2.5 rounded-full hover:brightness-110 transition-all"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            See other work
                        </a>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 border border-white/20 text-white font-mono text-xs uppercase px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-all"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Portfolio
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}