import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, ExternalLink, BookOpen, Github } from 'lucide-react';
import { projects } from '@/content/projects';

export const metadata: Metadata = {
    title: 'All Projects | Kanisius Bagaskara',
    description: 'Full portfolio: ML systems, data science pipelines, 3D reconstruction, and developer tooling — each with its problem, measurable impact, and stack.',
    openGraph: {
        title: 'All Projects — Kanisius Bagaskara',
        description: 'Full portfolio of ML systems, data science, and engineering projects.',
        url: 'https://kanisius.dev/projects',
    },
};

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-[#080906] text-white">
            {/* Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b border-white/5 bg-[#080906]/80 backdrop-blur-md">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50 hover:text-[#DFFF00] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Portfolio
                    </Link>
                    <span className="font-mono text-xs tracking-widest text-white/30 uppercase">Projects</span>
                </div>
            </nav>

            {/* Header */}
            <section className="pt-32 pb-16 px-6 border-b border-white/5">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-8 h-[1px] bg-[#DFFF00]" />
                        <span className="font-mono text-xs uppercase tracking-widest text-[#DFFF00]">kanisius.dev/projects</span>
                    </div>
                    <h1 className="font-black text-5xl md:text-6xl uppercase tracking-tight mb-4">
                        All<br /><span className="text-[#DFFF00]">Projects</span>
                    </h1>
                    <p className="font-mono text-white/40 text-sm leading-relaxed max-w-md">
                        Full archive of shipped and ongoing work — ML systems, data science pipelines,
                        3D reconstruction, and developer tooling. The strongest three are featured on the homepage.
                    </p>
                </div>
            </section>

            {/* Projects */}
            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto space-y-4">
                    {projects.map((project) => (
                        <article
                            key={project.title}
                            className="group border border-white/10 rounded-2xl bg-white/[0.02] p-6 hover:border-[#DFFF00]/30 hover:bg-white/[0.04] transition-all duration-300"
                        >
                            <div className="flex items-center gap-2 mb-2 font-mono text-[10px] uppercase tracking-wider">
                                <span className="text-[#DFFF00]/70">{project.number}</span>
                                {project.featured && (
                                    <span className="px-2 py-0.5 border border-[#DFFF00]/40 rounded-full text-[#DFFF00]">
                                        Featured
                                    </span>
                                )}
                                {project.status && (
                                    <span className="px-2 py-0.5 border border-white/10 rounded-full text-white/30">
                                        {project.status}
                                    </span>
                                )}
                            </div>

                            <h2 className="font-black text-lg md:text-xl uppercase mb-2">{project.title}</h2>
                            <p className="font-mono text-sm text-white/40 leading-relaxed mb-4">{project.tagline}</p>

                            {/* Impact summary */}
                            <div className="font-mono text-xs mb-4">
                                {project.impact.map((metric, i) => (
                                    <span key={metric.label}>
                                        {i > 0 && <span className="text-white/10"> · </span>}
                                        <span className="text-white/70">{metric.value}</span>{' '}
                                        <span className="text-white/30">{metric.label}</span>
                                    </span>
                                ))}
                            </div>

                            {/* Tech tags */}
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="font-mono text-[10px] uppercase px-2 py-0.5 border border-white/10 rounded-full text-white/30"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/5">
                                {project.links.live && (
                                    <a
                                        href={project.links.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 border border-[#DFFF00]/40 rounded-full text-[#DFFF00] hover:bg-[#DFFF00] hover:text-[#080906] transition-all"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        Live Demo
                                    </a>
                                )}
                                {project.links.caseStudy && (
                                    <Link
                                        href={project.links.caseStudy}
                                        className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 border border-white/15 rounded-full text-white/70 hover:border-[#DFFF00]/40 hover:text-[#DFFF00] transition-all"
                                    >
                                        <BookOpen className="w-3.5 h-3.5" />
                                        Case Study
                                    </Link>
                                )}
                                <a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 border border-white/15 rounded-full text-white/70 hover:bg-white hover:text-[#080906] transition-all"
                                >
                                    <Github className="w-3.5 h-3.5" />
                                    Code
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="max-w-3xl mx-auto mt-10 text-center">
                    <a
                        href="https://github.com/knsiuss"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/40 hover:text-[#DFFF00] transition-colors group"
                    >
                        More experiments on GitHub
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </div>
            </section>
        </main>
    );
}
