import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const metadata: Metadata = {
    title: 'Blog | Kanisius Bagaskara',
    description: 'Technical writing on Machine Learning, F1 analytics, Python, and building production ML systems.',
    openGraph: {
        title: 'Blog, Kanisius Bagaskara',
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
        <main className="min-h-screen bg-background text-foreground">
            <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 md:py-4 border-b border-line bg-background/80 backdrop-blur-md">
                <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
                    <Link
                        href="/"
                        className="inline-flex min-h-11 items-center gap-2 font-tech text-xs uppercase tracking-widest text-muted hover:text-accent-text transition-colors"
                    >
                        <ArrowLeft aria-hidden="true" className="w-4 h-4" />
                        Portfolio
                    </Link>
                    <span className="font-tech text-xs tracking-widest text-faint uppercase">Blog</span>
                </div>
            </nav>

            <header className="pt-28 md:pt-32 pb-12 md:pb-16 px-4 md:px-6 border-b border-line">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <span aria-hidden="true" className="w-8 h-px bg-accent-text" />
                        <span className="font-tech text-[11px] uppercase tracking-[0.25em] text-accent-text">
                            Writing
                        </span>
                    </div>
                    <h1 className="font-lando text-5xl md:text-7xl uppercase leading-[0.85] mb-5">
                        Notes on<br />
                        <span className="text-accent-text">Building</span>
                    </h1>
                    <p className="font-tech text-muted text-sm md:text-base leading-relaxed max-w-lg">
                        Deep dives on ML engineering, F1 data pipelines, Python, and the parts of
                        shipping a model that nobody warns you about.
                    </p>
                </div>
            </header>

            <section className="py-12 md:py-16 px-4 md:px-6">
                <div className="max-w-3xl mx-auto">
                    {posts.length === 0 ? (
                        <div className="border border-line bg-panel px-6 py-16 text-center">
                            <p className="font-lando text-2xl uppercase mb-2">Nothing published yet</p>
                            <p className="font-tech text-sm text-muted">
                                The first post is being written. Check back soon.
                            </p>
                        </div>
                    ) : (
                        <ul className="border-t border-line">
                            {posts.map((post) => (
                                <li key={post.slug}>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="group flex items-start justify-between gap-4 border-b border-line py-6 md:py-8 transition-colors hover:bg-panel/60"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <h2 className="font-lando text-xl md:text-3xl uppercase leading-tight mb-2 transition-colors group-hover:text-accent-text">
                                                {post.title}
                                            </h2>
                                            {post.excerpt && (
                                                <p className="font-tech text-sm text-muted leading-relaxed mb-4 max-w-xl">
                                                    {post.excerpt}
                                                </p>
                                            )}
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-tech text-xs text-faint">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Clock aria-hidden="true" className="w-3 h-3" />
                                                    {post.readingTime}
                                                </span>
                                                <span aria-hidden="true">·</span>
                                                <span>{post.date}</span>
                                                {post.tags.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="border border-line px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted rounded"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <ArrowUpRight
                                            aria-hidden="true"
                                            className="w-5 h-5 shrink-0 text-faint transition-colors group-hover:text-accent-text mt-2"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
        </main>
    );
}
