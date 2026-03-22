import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPost, getRelatedPosts } from "@/lib/blog-posts";
import { ArrowLeftIcon } from "@/components/ui/Icons";
import { SITE_URL } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Articol negăsit" };
  }

  const canonicalUrl = `${SITE_URL}/blog/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: canonicalUrl,
      publishedTime: post.date,
      siteName: "ElectroInstall",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: { index: true, follow: true },
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
  const canonicalUrl = `${SITE_URL}/blog/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "ElectroInstall", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "ElectroInstall",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` },
    },
    image: `${SITE_URL}/og-image.jpg`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Acasă", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl },
    ],
  };

  return (
    <main className="min-h-screen bg-[var(--bg-base)]" role="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="border-b border-[var(--border-default)] bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-inner">
          <div className="max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[var(--text-small)] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-8"
            >
              <ArrowLeftIcon size="sm" />
              Blog
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1.5 rounded-full bg-[var(--accent-muted)] text-[var(--accent-dark)] text-[var(--text-caption)] font-semibold uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-[var(--text-caption)] text-[var(--text-secondary)] font-medium">
                {post.date} · {post.readTime}
              </span>
            </div>

            <h1 className="font-display text-[1.75rem] sm:text-[2rem] lg:text-[2.25rem] font-bold text-[var(--text-primary)] leading-tight tracking-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--bg-base)]" aria-label="Conținut articol">
        <div className="container-inner max-w-3xl">
          <article className="blog-content" itemScope itemType="https://schema.org/Article">
            <div dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />
          </article>
        </div>
      </section>

      <section className="border-t border-[var(--border-default)] py-16 sm:py-20 lg:py-24 bg-[var(--bg-elevated)]">
        <div className="container-inner text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="font-display text-[1.25rem] font-semibold text-[var(--text-primary)] mb-2">
              Ai nevoie de un electrician?
            </h2>
            <p className="text-[var(--text-body)] text-[var(--text-secondary)] mb-6">
              ElectroInstall – servicii electrice în Chișinău. Preț clar, disponibil 24/7.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-lg text-[1rem] font-semibold text-white bg-[var(--text-primary)] hover:opacity-90 transition-opacity"
            >
              Contactează-ne
            </Link>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="py-16 sm:py-20 lg:py-24 bg-[var(--bg-base)]">
          <div className="container-inner">
            <h2 className="font-display text-[1.5rem] sm:text-[1.75rem] font-bold text-[var(--text-primary)] mb-8 text-center">
              Articole similare
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
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
