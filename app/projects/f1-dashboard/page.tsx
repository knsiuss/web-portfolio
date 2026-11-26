import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'F1 Race Intelligence Dashboard | Kanisius Bagaskara',
    description:
        'Case study: an F1 analytics dashboard built on OpenF1 and FastF1, with a walk-forward ridge model scored against the grid-order baseline.',
    openGraph: {
        title: 'F1 Race Intelligence Dashboard',
        description: 'F1 race analysis built on OpenF1 and FastF1, with forecasts scored against a grid-order baseline.',
        url: 'https://kanisius.dev/projects/f1-dashboard',
    },
};

const metrics = [
    { label: 'Dashboard Pages', value: '8', desc: 'Season, race, replay, strategy, rivals' },
    { label: 'Test Files', value: '46', desc: 'Modules covered by the test suite' },
    { label: 'Glossary Terms', value: '30', desc: 'Defined in English and Indonesian' },
    { label: 'Telemetry', value: '4 Hz', desc: 'Speed, throttle, brake, DRS, gear' },
];

const techStack = [
    { name: 'Python', role: 'Core language' },
    { name: 'OpenF1', role: 'Live timing and telemetry feed' },
    { name: 'FastF1', role: 'Session and lap data extraction' },
    { name: 'Streamlit', role: 'Dashboard UI, eight pages' },
    { name: 'Plotly', role: 'Telemetry and pace charts' },
    { name: 'Pandas', role: 'Frame normalisation and joins' },
    { name: 'NumPy', role: 'Ridge fit and feature scaling' },
    { name: 'SQLite', role: 'Local race cache for replay' },
];

const timeline = [
    {
        phase: '01',
        title: 'Data Pipeline',
        desc: 'OpenF1 client with a rate limiter, retries, and a disk cache. A race is downloaded once, then replayed from a local SQLite cache instead of hitting the API again.',
    },
    {
        phase: '02',
        title: 'Feature Construction',
        desc: 'Lagged features only: grid position, team pace, driver form, positions gained, and DNF rate. Every row a race is scored on is built from rounds before it, so the model cannot learn the result it is predicting.',
    },
    {
        phase: '03',
        title: 'Model',
        desc: 'Ridge regression on five z-scored features, with a documented hand-weighted fallback (grid 0.40, team pace 0.35, form 0.25) used when history is too short to fit. The page says which engine produced each forecast.',
    },
    {
        phase: '04',
        title: 'Backtest',
        desc: 'Walk-forward scoring against the naive baseline of "the finishing order equals the grid". F1 grids are strongly predictive, so the model has to beat that baseline to be worth showing.',
    },
    {
        phase: '05',
        title: 'Dashboard',
        desc: 'Eight Streamlit pages: championship standings, race analysis, a broadcast-style replay player, strategy simulator, sector insights, setup fingerprint, and a competitor watchlist.',
    },
];

const solutionPoints = [
    'Eight pages covering season analytics, race centre, and replay',
    'Walk-forward backtest scored against the grid-order baseline',
    'Every derived figure labelled estimated, with the sample size behind it',
    'Bilingual explainer layer so a first-time viewer can read the charts',
];

export default function F1DashboardPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 md:py-4 border-b border-line bg-background/80 backdrop-blur-md">
                <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
                    <Link
                        href="/"
                        className="inline-flex min-h-11 items-center gap-2 font-tech text-xs uppercase tracking-widest text-muted hover:text-accent-text transition-colors"
                    >
                        <ArrowLeft aria-hidden="true" className="w-4 h-4" />
                        Portfolio
                    </Link>
                    <div className="flex items-center gap-2 font-tech text-xs tracking-widest text-faint uppercase">
                        <span className="text-accent-text">01</span>
                        <span aria-hidden="true">/</span>
                        <span>F1 Race Intelligence</span>
                    </div>
                </div>
            </nav>

            <header className="pt-28 md:pt-32 pb-14 md:pb-20 px-4 md:px-6 border-b border-line">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <span aria-hidden="true" className="w-8 h-px bg-accent-text" />
                        <span className="font-tech text-[11px] uppercase tracking-[0.25em] text-accent-text">
                            Case Study
                        </span>
                    </div>
                    <h1 className="font-lando text-5xl md:text-7xl uppercase leading-[0.85] mb-6">
                        F1 Race<br />
                        <span className="text-accent-text">Intelligence</span><br />
                        Dashboard
                    </h1>
                    <p className="font-tech text-muted text-sm md:text-base max-w-xl leading-relaxed">
                        Season analytics, a broadcast-style replay player, and a pace model that
                        publishes its own weakness next to the forecast, built for fans who want to
                        understand strategy beyond the broadcast.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-8">
                        <a
                            href="https://f1-lab.streamlit.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center gap-2 bg-accent text-accent-foreground font-tech text-xs uppercase tracking-wider px-5 rounded-md hover:brightness-110 transition-[filter]"
                        >
                            <ExternalLink aria-hidden="true" className="w-3.5 h-3.5" />
                            Live demo
                        </a>
                        <a
                            href="https://github.com/knsiuss/f1lab"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center gap-2 border border-line-strong font-tech text-xs uppercase tracking-wider px-5 rounded-md hover:bg-foreground/10 transition-colors"
                        >
                            <Github aria-hidden="true" className="w-3.5 h-3.5" />
                            Source code
                        </a>
                    </div>
                </div>
            </header>

            <section className="py-12 md:py-16 px-4 md:px-6 border-b border-line">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        {metrics.map((m) => (
                            <div key={m.label} className="p-5 border border-line bg-panel rounded-md">
                                <div className="font-lando text-3xl md:text-4xl text-accent-text mb-1 leading-none">
                                    {m.value}
                                </div>
                                <div className="font-tech text-[10px] text-muted uppercase tracking-wider mt-2">
                                    {m.label}
                                </div>
                                <div className="font-tech text-[11px] text-faint mt-1 leading-snug">{m.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-14 md:py-16 px-4 md:px-6 border-b border-line">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-12">
                    <div>
                        <span className="font-tech text-[11px] uppercase tracking-[0.25em] text-faint">
                            The problem
                        </span>
                        <h2 className="font-lando text-2xl md:text-3xl uppercase mt-3 mb-4">
                            Strategy is invisible to fans
                        </h2>
                        <p className="font-tech text-sm text-muted leading-relaxed">
                            F1 strategy unfolds in seconds: tire degradation, track position,
                            undercut windows. Broadcasters show you who pitted, not why. The data
                            to answer why is public, but it arrives as raw timing frames and
                            partial telemetry that never becomes readable on its own.
                        </p>
                    </div>
                    <div>
                        <span className="font-tech text-[11px] uppercase tracking-[0.25em] text-faint">
                            The solution
                        </span>
                        <h2 className="font-lando text-2xl md:text-3xl uppercase mt-3 mb-4">
                            A dashboard that explains itself
                        </h2>
                        <ul className="space-y-2.5">
                            {solutionPoints.map((item) => (
                                <li key={item} className="font-tech text-sm text-muted flex items-start gap-2.5">
                                    <ChevronRight aria-hidden="true" className="w-4 h-4 text-accent-text mt-0.5 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="py-14 md:py-16 px-4 md:px-6 border-b border-line">
                <div className="max-w-5xl mx-auto">
                    <span className="font-tech text-[11px] uppercase tracking-[0.25em] text-faint">
                        How it was built
                    </span>
                    <div className="mt-8 border-t border-line">
                        {timeline.map((step) => (
                            <div key={step.phase} className="group grid grid-cols-[64px_1fr] gap-4 md:gap-6 border-b border-line py-6">
                                <span
                                    aria-hidden="true"
                                    className="font-lando text-4xl md:text-5xl leading-none text-transparent self-start"
                                    style={{ WebkitTextStroke: '1.5px var(--foreground)' }}
                                >
                                    {step.phase}
                                </span>
                                <div>
                                    <h3 className="font-lando text-lg md:text-xl uppercase mb-2 transition-colors group-hover:text-accent-text">
                                        {step.title}
                                    </h3>
                                    <p className="font-tech text-sm text-muted leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-14 md:py-16 px-4 md:px-6 border-b border-line">
                <div className="max-w-5xl mx-auto">
                    <span className="font-tech text-[11px] uppercase tracking-[0.25em] text-faint">
                        Tech stack
                    </span>
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                        {techStack.map((t) => (
                            <div
                                key={t.name}
                                className="p-4 border border-line bg-panel rounded-md hover:border-accent-soft transition-colors"
                            >
                                <div className="font-lando text-base uppercase mb-1">{t.name}</div>
                                <div className="font-tech text-[11px] text-faint leading-snug">{t.role}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-20 px-4 md:px-6">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h2 className="font-lando text-2xl md:text-3xl uppercase mb-2">See it live</h2>
                        <p className="font-tech text-sm text-muted">
                            The dashboard is publicly deployed on Streamlit Cloud.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <a
                            href="https://f1-lab.streamlit.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center gap-2 bg-accent text-accent-foreground font-tech text-xs uppercase tracking-wider px-5 rounded-md hover:brightness-110 transition-[filter]"
                        >
                            <ExternalLink aria-hidden="true" className="w-3.5 h-3.5" />
                            Open dashboard
                        </a>
                        <Link
                            href="/"
                            className="inline-flex min-h-11 items-center gap-2 border border-line-strong font-tech text-xs uppercase tracking-wider px-5 rounded-md hover:bg-foreground/10 transition-colors"
                        >
                            <ArrowLeft aria-hidden="true" className="w-3.5 h-3.5" />
                            Portfolio
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
