import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPost, getRelatedPosts } from "@/lib/blog-posts";
import { ArrowLeftIcon } from "@/components/ui/Icons";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  
  if (!post) {
    return { title: "Articol negăsit" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug);

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "ElectroInstall" },
    publisher: { "@type": "Organization", name: "ElectroInstall", url: "https://electroinstall.md" },
  };

  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Article Header */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-[var(--bg-secondary)]">
        <div className="absolute inset-0 electricity-pattern opacity-10 pointer-events-none" />
        <div className="container relative z-10 px-6 sm:px-8 max-w-4xl mx-auto">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors mb-12"
          >
            <ArrowLeftIcon size="sm" />
            Echipa ElectroInstall :: Blog
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="px-3 py-1 rounded-md bg-[var(--accent)] text-black text-[10px] font-black uppercase tracking-widest">
              {post.category}
            </span>
            <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-widest">
              {post.date} • {post.readTime}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter italic uppercase text-[var(--text-primary)] leading-[0.9]">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16">
        <div className="container px-6 sm:px-8 md:px-12 lg:px-20 max-w-4xl mx-auto">
          <article className="blog-content prose">
            <div dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[var(--bg-secondary)]">
        <div className="container px-6 sm:px-8 md:px-12 lg:px-20 max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 text-[var(--text-primary)]">
            Ai nevoie de un electrician?
          </h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            ElectroInstall oferă servicii electrice profesionale în Chișinău.
          </p>
          <Link href="/#contact" className="btn btn-primary">
            Contactează-ne
          </Link>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16">
          <div className="container px-6 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-8 text-center text-[var(--text-primary)]">
              Articole Similare
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {relatedPosts.map((related) => (
                <article key={related.slug} className="blog-card">
                  <div className="blog-card-header">
                    <span className="blog-category">{related.category}</span>
                  </div>
                  <h3 className="blog-title">
                    <Link href={`/blog/${related.slug}`}>{related.title}</Link>
                  </h3>
                  <p className="blog-excerpt">{related.excerpt}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

// Simple markdown-like formatting
function formatContent(content: string): string {
  return content
    .replace(/^# (.+)$/gm, '<h1 class="blog-h1">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="blog-h2">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="blog-h3">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
    .replace(/<\/ul>\s*<ul>/g, '')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hl]|<ul|<li|<p)(.+)$/gm, '<p>$1</p>');
}
