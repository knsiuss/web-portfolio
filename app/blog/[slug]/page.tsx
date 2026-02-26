import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ slug: string }>;
}

function getPost(slug: string) {
    const filePath = path.join(process.cwd(), 'content/blog', `${slug}.mdx`);
    const fallback = path.join(process.cwd(), 'content/blog', `${slug}.md`);
    const file = fs.existsSync(filePath) ? filePath : fs.existsSync(fallback) ? fallback : null;
    if (!file) return null;

    const raw = fs.readFileSync(file, 'utf-8');
    const { data, content } = matter(raw);
    return { frontmatter: data, content };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) return {};
    return {
        title: `${post.frontmatter.title} | Kanisius Bagaskara`,
        description: post.frontmatter.excerpt,
        openGraph: {
            title: post.frontmatter.title,
            description: post.frontmatter.excerpt,
            url: `https://kanisius.dev/blog/${slug}`,
        },
    };
}

export async function generateStaticParams() {
    const contentDir = path.join(process.cwd(), 'content/blog');
    if (!fs.existsSync(contentDir)) return [];
    return fs
        .readdirSync(contentDir)
        .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
        .map((f) => ({ slug: f.replace(/\.mdx?$/, '') }));
}

// Simple markdown-to-HTML renderer for the content
function renderContent(content: string): string {
    return content
        .replace(/^### (.+)$/gm, '<h3 class="font-black text-lg uppercase mt-8 mb-3 text-white">$1</h3>')
        .replace(/^## (.+)$/gm, '<h2 class="font-black text-2xl uppercase mt-12 mb-4 text-white">$1</h2>')
        .replace(/^# (.+)$/gm, '<h1 class="font-black text-3xl uppercase mt-12 mb-4 text-[#DFFF00]">$1</h1>')
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em class="text-white/70 italic">$1</em>')
        .replace(/`([^`]+)`/g, '<code class="font-mono text-[#DFFF00] bg-white/5 px-1.5 py-0.5 rounded text-sm">$1</code>')
        .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre class="bg-white/[0.03] border border-white/10 rounded-xl p-4 overflow-x-auto my-6"><code class="font-mono text-sm text-white/70 whitespace-pre">$1</code></pre>')
        .replace(/^- (.+)$/gm, '<li class="font-mono text-sm text-white/50 flex items-start gap-2 mb-1"><span class="text-[#DFFF00] mt-1">→</span>$1</li>')
        .replace(/(<li.*<\/li>\n?)+/g, '<ul class="space-y-1 my-4 pl-1">$&</ul>')
        .replace(/^\d+\. (.+)$/gm, '<li class="font-mono text-sm text-white/50 mb-1 list-decimal ml-4">$1</li>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[#DFFF00] hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/^(?!<[h|u|p|l|c|p|s])(.*\S.*)$/gm, '<p class="font-mono text-sm text-white/50 leading-relaxed my-3">$1</p>')
        .replace(/^---$/gm, '<hr class="border-white/10 my-8" />');
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) notFound();

    const { frontmatter, content } = post;
    const htmlContent = renderContent(content);

    return (
        <main className="min-h-screen bg-[#080906] text-white">
            {/* Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b border-white/5 bg-[#080906]/80 backdrop-blur-md">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50 hover:text-[#DFFF00] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        All Posts
                    </Link>
                    <Link href="/" className="font-mono text-xs tracking-widest text-white/30 uppercase hover:text-[#DFFF00] transition-colors">
                        kanisius.dev
                    </Link>
                </div>
            </nav>

            {/* Header */}
            <section className="pt-32 pb-12 px-6 border-b border-white/5">
                <div className="max-w-3xl mx-auto">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        {(frontmatter.tags ?? []).map((tag: string) => (
                            <span key={tag} className="inline-flex items-center gap-1 font-mono text-[10px] uppercase px-2.5 py-1 border border-white/10 rounded-full text-white/40">
                                <Tag className="w-2.5 h-2.5" />
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="font-black text-4xl md:text-5xl uppercase tracking-tight mb-6 leading-tight">
                        {frontmatter.title}
                    </h1>
                    <div className="flex items-center gap-4 text-white/30">
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="font-mono text-xs">{frontmatter.readingTime}</span>
                        </div>
                        <span>·</span>
                        <span className="font-mono text-xs">{frontmatter.date}</span>
                        <span>·</span>
                        <span className="font-mono text-xs">Kanisius Bagaskara</span>
                    </div>
                </div>
            </section>

            {/* Content */}
            <article className="py-16 px-6">
                <div
                    className="max-w-3xl mx-auto"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            </article>

            {/* Footer */}
            <section className="py-12 px-6 border-t border-white/5">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/40 hover:text-[#DFFF00] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        All Posts
                    </Link>
                    <Link
                        href="/"
                        className="font-mono text-xs uppercase tracking-widest text-white/40 hover:text-[#DFFF00] transition-colors"
                    >
                        Portfolio →
                    </Link>
                </div>
            </section>
        </main>
    );
}
