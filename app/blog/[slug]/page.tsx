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
      <section className="relative pt-16 pb-8 sm:pt-20 sm:pb-12">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="container relative z-10 px-6 sm:px-8 md:px-12 lg:px-20 max-w-4xl mx-auto">
          <Link href="/blog" className="blog-back-link">
            <ArrowLeftIcon size="md" />
            Înapoi la Blog
          </Link>

          <div className="blog-meta mt-6">
            <span className="blog-category">{post.category}</span>
            <span className="blog-date">{post.date}</span>
            <span className="blog-read-time">⏱ {post.readTime}</span>
          </div>

          <h1 className="blog-page-title">{post.title}</h1>
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
