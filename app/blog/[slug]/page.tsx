import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
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
        twitter: {
            card: 'summary_large_image',
            title: post.frontmatter.title,
            description: post.frontmatter.excerpt,
        },
    };
}

// Schema.org Article JSON-LD — helps Google understand the post as an
// article with author, date, and tags (from frontmatter).
function buildArticleJsonLd(slug: string, frontmatter: Record<string, unknown>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: String(frontmatter.title ?? slug),
        description: String(frontmatter.excerpt ?? ''),
        datePublished: String(frontmatter.date ?? ''),
        dateModified: String(frontmatter.date ?? ''),
        url: `https://kanisius.dev/blog/${slug}`,
        author: {
            '@type': 'Person',
            name: 'Kanisius Bagaskara',
            url: 'https://kanisius.dev',
        },
        publisher: {
            '@type': 'Person',
            name: 'Kanisius Bagaskara',
            url: 'https://kanisius.dev',
        },
        keywords: ((frontmatter.tags as string[]) ?? []).join(', '),
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

// Simple markdown-to-HTML renderer for the content. Classes reference the site
// tokens directly instead of literal colours, so the article follows the theme.
function renderContent(content: string): string {
    return content
        .replace(/^### (.+)$/gm, '<h3 class="font-lando text-lg uppercase mt-8 mb-3 text-foreground">$1</h3>')
        .replace(/^## (.+)$/gm, '<h2 class="font-lando text-2xl uppercase mt-12 mb-4 text-foreground">$1</h2>')
        .replace(/^# (.+)$/gm, '<h1 class="font-lando text-3xl uppercase mt-12 mb-4 text-accent-text">$1</h1>')
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em class="text-muted italic">$1</em>')
        .replace(/`([^`]+)`/g, '<code class="font-tech text-accent-text bg-panel border border-line px-1.5 py-0.5 rounded text-sm">$1</code>')
        .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre class="bg-panel border border-line rounded-md p-4 overflow-x-auto my-6"><code class="font-tech text-sm text-foreground whitespace-pre">$1</code></pre>')
        .replace(/^- (.+)$/gm, '<li class="font-tech text-sm text-muted flex items-start gap-2.5 mb-1.5"><span aria-hidden="true" class="mt-1.5 block h-1 w-1 shrink-0 bg-accent-text"></span>$1</li>')
        .replace(/(<li.*<\/li>\n?)+/g, '<ul class="space-y-1 my-4">$&</ul>')
        .replace(/^\d+\. (.+)$/gm, '<li class="font-tech text-sm text-muted mb-1.5 list-decimal ml-5">$1</li>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-accent-text underline underline-offset-2 hover:opacity-80 inline-block py-3 -my-1.5" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/^(?!<[h|u|p|l|c|p|s])(.*\S.*)$/gm, '<p class="font-sans text-base text-muted leading-relaxed my-4">$1</p>')
        .replace(/^---$/gm, '<hr class="border-line my-8" />');
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) notFound();

    const { frontmatter, content } = post;
    const htmlContent = renderContent(content);

    return (
        <main className="min-h-screen bg-background text-foreground">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleJsonLd(slug, frontmatter)) }}
            />
            <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 md:py-4 border-b border-line bg-background/80 backdrop-blur-md">
                <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
                    <Link
                        href="/blog"
                        className="inline-flex min-h-11 items-center gap-2 font-tech text-xs uppercase tracking-widest text-muted hover:text-accent-text transition-colors"
                    >
                        <ArrowLeft aria-hidden="true" className="w-4 h-4" />
                        All posts
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex min-h-11 items-center font-tech text-xs tracking-widest text-faint uppercase hover:text-accent-text transition-colors"
                    >
                        Portfolio
                    </Link>
                </div>
            </nav>

            <header className="pt-28 md:pt-32 pb-10 md:pb-12 px-4 md:px-6 border-b border-line">
                <div className="max-w-3xl mx-auto">
                    {(frontmatter.tags ?? []).length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mb-6">
                            {(frontmatter.tags ?? []).map((tag: string) => (
                                <span
                                    key={tag}
                                    className="border border-line px-2.5 py-1 text-[10px] uppercase tracking-wider text-muted rounded"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    <h1 className="font-lando text-4xl md:text-6xl uppercase leading-[0.88] mb-6">
                        {frontmatter.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 font-tech text-xs text-faint">
                        <span className="inline-flex items-center gap-1.5">
                            <Clock aria-hidden="true" className="w-3.5 h-3.5" />
                            {frontmatter.readingTime}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{frontmatter.date}</span>
                        <span aria-hidden="true">·</span>
                        <span>Kanisius Bagaskara</span>
                    </div>
                </div>
            </header>

            <article className="py-12 md:py-16 px-4 md:px-6">
                <div
                    className="max-w-3xl mx-auto"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            </article>

            <footer className="py-10 md:py-12 px-4 md:px-6 border-t border-line">
                <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-4">
                    <Link
                        href="/blog"
                        className="inline-flex min-h-11 items-center gap-2 font-tech text-xs uppercase tracking-widest text-muted hover:text-accent-text transition-colors"
                    >
                        <ArrowLeft aria-hidden="true" className="w-4 h-4" />
                        All posts
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex min-h-11 items-center font-tech text-xs uppercase tracking-widest text-muted hover:text-accent-text transition-colors"
                    >
                        Portfolio
                    </Link>
                </div>
            </footer>
        </main>
    );
}
