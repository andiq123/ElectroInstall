import { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { SITE_URL } from "@/lib/constants";
import { homeUi } from "@/lib/homeUi";
import { cn } from "@/lib/utils";

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
    <main id="main-content" className={cn(homeUi.pageMain)} role="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <section className={homeUi.blogSectionIntro} aria-labelledby="blog-heading">
        <div className={homeUi.container}>
          <div className="max-w-3xl">
            <h1
              id="blog-heading"
              className={cn(homeUi.blogArticleTitle, "mb-4 text-balance")}
            >
              Sfaturi electrice
            </h1>
            <p className={homeUi.bodyLead}>
              Resurse despre siguranța casei tale, noutăți și ghiduri practice de la ElectroInstall.
            </p>
          </div>
        </div>
      </section>

      <section className={homeUi.blogSectionListing}>
        <div className={homeUi.container}>
          <div className={cn(homeUi.gridGapWide, "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3")}>
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
                  <span className="blog-read-time">{post.readTime}</span>
                  <Link href={`/blog/${post.slug}`} className="blog-read-more">
                    Citește articolul →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className={cn(homeUi.blogCtaCard, "mt-16")}>
            <h2 className={cn(homeUi.cardTitle, "mb-2")}>Ai nevoie de un electrician?</h2>
            <p className={cn(homeUi.bodyLead, "mb-6")}>
              ElectroInstall — servicii electrice în Chișinău. Preț clar, disponibil pentru urgențe non-stop.
            </p>
            <Link href="/#contact" className={homeUi.pillPrimarySm}>
              Contactează-ne
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
