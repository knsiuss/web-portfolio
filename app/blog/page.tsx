import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Clock, Tag } from 'lucide-react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const metadata: Metadata = {
    title: 'Blog | Kanisius Bagaskara',
    description: 'Technical writing on Machine Learning, F1 analytics, Python, and building production ML systems.',
    openGraph: {
        title: 'Blog — Kanisius Bagaskara',
        description: 'Technical writing on ML engineering, F1 analytics, and building production AI systems.',
        url: 'https://kanisius.dev/blog',
    },
};

interface Post {
    slug: string;
    title: string;
    date: string;
    tags: string[];
    excerpt: string;
    readingTime: string;
}

function getPosts(): Post[] {
    const contentDir = path.join(process.cwd(), 'content/blog');
    if (!fs.existsSync(contentDir)) return [];

    return fs
        .readdirSync(contentDir)
        .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
        .map((filename) => {
            const slug = filename.replace(/\.mdx?$/, '');
            const raw = fs.readFileSync(path.join(contentDir, filename), 'utf-8');
            const { data } = matter(raw);
            return {
                slug,
                title: data.title ?? slug,
                date: data.date ?? '',
                tags: data.tags ?? [],
                excerpt: data.excerpt ?? '',
                readingTime: data.readingTime ?? '5 min read',
            };
        })
        .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default function BlogPage() {
    const posts = getPosts();

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
                    <span className="font-mono text-xs tracking-widest text-white/30 uppercase">Blog</span>
                </div>
            </nav>

            {/* Header */}
            <section className="pt-32 pb-16 px-6 border-b border-white/5">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-8 h-[1px] bg-[#DFFF00]" />
                        <span className="font-mono text-xs uppercase tracking-widest text-[#DFFF00]">kanisius.dev/blog</span>
                    </div>
                    <h1 className="font-black text-5xl md:text-6xl uppercase tracking-tight mb-4">
                        Technical<br /><span className="text-[#DFFF00]">Writing</span>
                    </h1>
                    <p className="font-mono text-white/40 text-sm leading-relaxed max-w-md">
                        Deep dives on ML engineering, F1 data pipelines, Python optimization, and building real production AI systems.
                    </p>
                </div>
            </section>

            {/* Posts */}
            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    {posts.length === 0 ? (
                        <div className="text-center py-24 border border-white/5 rounded-2xl">
                            <p className="font-mono text-white/20 text-sm uppercase tracking-widest">Posts incoming</p>
                            <p className="font-mono text-white/10 text-xs mt-2">First post drops soon.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {posts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="group block p-6 border border-white/10 rounded-2xl bg-white/[0.02] hover:border-[#DFFF00]/30 hover:bg-white/[0.04] transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h2 className="font-black text-lg md:text-xl uppercase mb-2 group-hover:text-[#DFFF00] transition-colors">
                                                {post.title}
                                            </h2>
                                            <p className="font-mono text-sm text-white/40 leading-relaxed mb-4">{post.excerpt}</p>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <div className="flex items-center gap-1.5 text-white/25">
                                                    <Clock className="w-3 h-3" />
                                                    <span className="font-mono text-xs">{post.readingTime}</span>
                                                </div>
                                                <span className="text-white/10">·</span>
                                                <span className="font-mono text-xs text-white/25">{post.date}</span>
                                                {post.tags.slice(0, 3).map((tag) => (
                                                    <span key={tag} className="inline-flex items-center gap-1 font-mono text-[10px] uppercase px-2 py-0.5 border border-white/10 rounded-full text-white/30">
                                                        <Tag className="w-2.5 h-2.5" />
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-[#DFFF00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
