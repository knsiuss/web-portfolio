import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Zap, Target, BarChart3, Code2, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'F1 2025 Analytics Dashboard | Kanisius Bagaskara',
    description:
        'Case study: Real-time F1 telemetry dashboard with XGBoost ML model predicting optimal pit stop windows at 92% accuracy. Built with FastF1, FastAPI, and Streamlit.',
    openGraph: {
        title: 'F1 2025 Analytics Dashboard — Case Study',
        description: 'Real-time ML-powered F1 strategy predictions. 92% model accuracy, <50ms API response.',
        url: 'https://kanisius.dev/projects/f1-dashboard',
    },
};

const metrics = [
    { label: 'Model Accuracy', value: '92%', desc: 'XGBoost pit window predictions' },
    { label: 'API Response', value: '<50ms', desc: 'FastAPI real-time endpoints' },
    { label: 'Race Tracks', value: '23', desc: 'Full 2025 F1 calendar' },
    { label: 'Data Points', value: '10M+', desc: 'Telemetry frames processed' },
];

const techStack = [
    { name: 'Python', role: 'Core language' },
    { name: 'FastF1', role: 'Official F1 telemetry API' },
    { name: 'XGBoost', role: 'Pit stop prediction model' },
    { name: 'FastAPI', role: 'Real-time REST endpoints' },
    { name: 'Streamlit', role: 'Interactive dashboard UI' },
    { name: 'Pandas', role: 'Data manipulation & cleaning' },
    { name: 'Plotly', role: 'Interactive telemetry charts' },
    { name: 'NumPy', role: 'Feature engineering' },
];

const timeline = [
    { phase: '01', title: 'Data Pipeline', desc: 'Built ingestion layer using FastF1 API — handles missing telemetry with cubic spline interpolation.' },
    { phase: '02', title: 'Feature Engineering', desc: 'Extracted 40+ features: lap delta, tire compound degradation rate, fuel load estimates, sector splits.' },
    { phase: '03', title: 'ML Model', desc: 'XGBoost classifier trained on 3 seasons of historical race data. Hypertuned with Optuna. 92% test accuracy.' },
    { phase: '04', title: 'API Layer', desc: 'FastAPI endpoints serving predictions in <50ms. Async background tasks for live data refresh every 30s during race weekends.' },
    { phase: '05', title: 'Dashboard', desc: 'Streamlit UI: telemetry overlay, driver comparison, tire strategy viz, and live pit window predictions.' },
];

export default function F1DashboardPage() {
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
                        <span className="text-[#DFFF00]">01</span>
                        <span>/</span>
                        <span>F1 Dashboard</span>
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
                        F1 2025<br />
                        <span className="text-[#DFFF00]">Analytics</span><br />
                        Dashboard
                    </h1>
                    <p className="font-mono text-white/50 text-sm md:text-base max-w-xl mt-6 leading-relaxed">
                        Real-time telemetry visualization + XGBoost ML model predicting optimal pit stop windows.
                        Built for F1 fans who want to understand race strategy beyond the TV broadcast.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-8">
                        <a
                            href="https://f1-lab.streamlit.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#DFFF00] text-black font-mono text-xs uppercase px-5 py-2.5 rounded-full hover:brightness-110 transition-all"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Live Demo
                        </a>
                        <a
                            href="https://github.com/knsiuss"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 border border-white/20 text-white font-mono text-xs uppercase px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-all"
                        >
                            <Github className="w-3.5 h-3.5" />
                            Source Code
                        </a>
                    </div>
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
                        <h2 className="font-black text-2xl md:text-3xl uppercase mb-4">Strategy Is Invisible to Fans</h2>
                        <p className="font-mono text-white/50 text-sm leading-relaxed">
                            F1 strategy unfolds in microseconds — tire degradation, fuel loads, undercut windows.
                            Existing tools give you the result, not the prediction. Broadcasters show you who pitted,
                            not <em>why</em> or <em>when they should have</em>.
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Zap className="w-4 h-4 text-[#DFFF00]" />
                            <span className="font-mono text-xs uppercase tracking-widest text-white/40">The Solution</span>
                        </div>
                        <h2 className="font-black text-2xl md:text-3xl uppercase mb-4">ML-Powered Pit Windows</h2>
                        <ul className="space-y-2">
                            {[
                                'Interactive telemetry overlay using FastF1 API',
                                'XGBoost model predicting optimal pit windows (92% acc.)',
                                'Driver vs driver comparison across all 23 race tracks',
                                'Weather integration affecting strategy recommendations',
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

            {/* Build Timeline */}
            <section className="py-16 px-6 border-b border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-2 mb-10">
                        <Code2 className="w-4 h-4 text-[#DFFF00]" />
                        <span className="font-mono text-xs uppercase tracking-widest text-white/40">How It Was Built</span>
                    </div>
                    <div className="space-y-6">
                        {timeline.map((step) => (
                            <div key={step.phase} className="flex gap-6 group">
                                <div className="font-black text-4xl text-white/5 group-hover:text-[#DFFF00]/20 transition-colors w-10 flex-shrink-0">
                                    {step.phase}
                                </div>
                                <div className="border-l border-white/10 pl-6 pb-6">
                                    <h3 className="font-black text-lg uppercase mb-2">{step.title}</h3>
                                    <p className="font-mono text-sm text-white/40 leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="py-16 px-6 border-b border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-2 mb-8">
                        <BarChart3 className="w-4 h-4 text-[#DFFF00]" />
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
                        <h2 className="font-black text-2xl uppercase mb-1">See It Live</h2>
                        <p className="font-mono text-sm text-white/40">The dashboard is publicly deployed on Streamlit Cloud.</p>
                    </div>
                    <div className="flex gap-3">
                        <a
                            href="https://f1-lab.streamlit.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#DFFF00] text-black font-mono text-xs uppercase px-5 py-2.5 rounded-full hover:brightness-110 transition-all"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Open Dashboard
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
