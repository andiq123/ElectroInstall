import { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog | Sfaturi și Noutăți Electrice",
  description:
    "Citește articole despre siguranță electrică, sfaturi utile și cele mai bune practici de la electricieni profesioniști în Chișinău.",
  openGraph: {
    title: "Blog | ElectroInstall",
    description:
      "Sfaturi de la electricieni profesioniști pentru casa și afacerea ta.",
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero */}
      <section className="relative pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="container relative z-10 px-6 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge badge-accent mb-6">Blog ElectroInstall</span>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4"
              style={{ fontFamily: "var(--font-display), system-ui", color: "var(--text-primary)" }}
            >
              Sfaturi Electrice
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
              Articole utile despre siguranță electrică și sfaturi de la profesioniști.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20 sm:pb-28">
        <div className="container px-6 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto">
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

          {/* CTA */}
          <div className="text-center mt-16 p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
              Ai nevoie de un electrician?
            </h3>
            <p className="text-[var(--text-secondary)] mb-4">
              ElectroInstall oferă servicii electrice profesionale în Chișinău.
            </p>
            <Link href="/#contact" className="btn btn-primary">
              Contactează-ne
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
