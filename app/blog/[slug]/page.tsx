import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPost, getRelatedPosts } from "@/lib/blog-posts";
import { ArrowLeftIcon } from "@/components/ui/Icons";
import { SITE_URL } from "@/lib/constants";
import { homeUi } from "@/lib/homeUi";
import { absoluteOgImageUrl } from "@/lib/seo/og";
import { cn } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

const siteBase = SITE_URL.replace(/\/$/, "");
const ogImage = absoluteOgImageUrl();

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Articol negăsit" };
  }

  const canonicalUrl = `${siteBase}/blog/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      locale: "ro_MD",
      url: canonicalUrl,
      publishedTime: post.date,
      siteName: "ElectroInstall",
      images: [{ url: ogImage, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
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
  const canonicalUrl = `${siteBase}/blog/${slug}`;

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
      logo: { "@type": "ImageObject", url: ogImage },
    },
    image: ogImage,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Acasă", item: siteBase },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteBase}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl },
    ],
  };

  return (
    <main id="main-content" className={homeUi.pageMain} role="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className={homeUi.blogSectionIntro}>
        <div className={homeUi.container}>
          <div className="max-w-3xl">
            <Link href="/blog" className={cn(homeUi.blogBackLink, "!mb-6")}>
              <ArrowLeftIcon size="sm" aria-hidden />
              Blog
            </Link>

            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className={homeUi.blogMetaPill}>{post.category}</span>
              <span className={homeUi.blogMetaLine}>
                {post.date} · {post.readTime}
              </span>
            </div>

            <h1 className={cn(homeUi.blogArticleTitle, "text-balance")}>{post.title}</h1>
          </div>
        </div>
      </section>

      <section className={homeUi.blogSectionListing} aria-label="Conținut articol">
        <div className={cn(homeUi.container, "max-w-3xl")}>
          <article className="blog-content" itemScope itemType="https://schema.org/Article">
            <div dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />
          </article>
        </div>
      </section>

      <section className={homeUi.blogSectionFooter}>
        <div className={homeUi.container}>
          <div className={homeUi.blogCtaCard}>
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

      {relatedPosts.length > 0 ? (
        <section className={cn(homeUi.blogSectionListing, "pb-20 sm:pb-24")}>
          <div className={homeUi.container}>
            <h2 className={cn(homeUi.cardTitleLg, "mb-8 text-center")}>Articole similare</h2>
            <div className={cn(homeUi.gridGapWide, "mx-auto grid max-w-3xl grid-cols-1 md:grid-cols-2")}>
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
      ) : null}
    </main>
  );
}

function formatContent(content: string): string {
  return content
    .replace(/^# (.+)$/gm, '<h1 class="blog-h1">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="blog-h2">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="blog-h3">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>")
    .replace(/<\/ul>\s*<ul>/g, "")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hl]|<ul|<li|<p)(.+)$/gm, "<p>$1</p>");
}
