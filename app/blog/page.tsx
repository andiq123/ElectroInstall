import { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog – Sfaturi și Noutăți Electrice",
  description:
    "Articole despre siguranță electrică, sfaturi utile și ghiduri practice de la ElectroInstall Chișinău. Electrician autorizat, recomandări, reparații și instalații.",
  keywords: [
    "sfaturi electrice",
    "siguranță electrică",
    "electrician Chișinău blog",
    "reparații electrice",
    "instalații electrice",
  ],
  openGraph: {
    title: "Blog | Sfaturi Electrice – ElectroInstall Chișinău",
    description:
      "Sfaturi de la electricieni profesioniști pentru casa și afacerea ta. Siguranță electrică, ghiduri practice, Chișinău.",
    url: `${SITE_URL}/blog`,
    type: "website",
    siteName: "ElectroInstall",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | ElectroInstall – Sfaturi Electrice Chișinău",
    description: "Articole despre siguranță electrică și practici de la electricieni profesioniști.",
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  robots: { index: true, follow: true },
};

export default function BlogPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Blog ElectroInstall – Sfaturi și Noutăți Electrice",
    description: "Articole despre siguranță electrică, reparații și instalații electrice în Chișinău.",
    url: `${SITE_URL}/blog`,
    numberOfItems: BLOG_POSTS.length,
    itemListElement: BLOG_POSTS.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <main className="min-h-screen bg-white" role="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <section className="border-b border-[var(--border-default)] bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="blog-heading">
        <div className="container-inner">
          <div className="max-w-3xl">
            <h1 id="blog-heading" className="font-[var(--font-display)] text-[1.75rem] sm:text-[2.25rem] font-bold text-[var(--text-primary)] leading-tight tracking-tight mb-4">
              Sfaturi electrice
            </h1>
            <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-[1.65]">
              Resurse despre siguranța casei tale, noutăți și ghiduri practice de la ElectroInstall.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--bg-base)]">
        <div className="container-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <article key={post.slug} className="blog-card">
                <div className="blog-card-header">
                  <span className="blog-category">{post.category}</span>
                  <span className="blog-date">{post.date}</span>
                </div>
                <h2 className="blog-title">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-footer">
                  <span className="blog-read-time">⏱ {post.readTime}</span>
                  <Link href={`/blog/${post.slug}`} className="blog-read-more">
                    Citește mai mult →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-16 p-8 sm:p-10 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-default)] shadow-[var(--shadow-md)]">
            <h3 className="font-[var(--font-display)] text-[1.25rem] font-semibold text-[var(--text-primary)] mb-2">
              Ai nevoie de un electrician?
            </h3>
            <p className="text-[var(--text-body)] text-[var(--text-secondary)] mb-6">
              ElectroInstall – servicii electrice în Chișinău. Preț clar, disponibil 24/7.
            </p>
            <Link href="/#contact" className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-lg text-[1rem] font-semibold text-white bg-[var(--text-primary)] hover:opacity-90 transition-opacity">
              Contactează-ne
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
