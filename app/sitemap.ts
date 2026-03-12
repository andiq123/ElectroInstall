import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { DEFAULT_SITE_URL, SITE_URL } from "@/lib/constants";

const baseUrl = typeof SITE_URL === "string" ? SITE_URL : DEFAULT_SITE_URL;

export const dynamic = "force-static";
export const revalidate = 3600;

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.9 },
  { path: "/servicii-chisinau", changeFrequency: "monthly", priority: 0.9 },
  { path: "/politica-confidentialitate", changeFrequency: "yearly", priority: 0.3 },
  { path: "/termeni-conditii", changeFrequency: "yearly", priority: 0.3 },
];

function toSitemapEntry(
  url: string,
  lastModified: Date,
  changeFrequency: "weekly" | "monthly" | "yearly",
  priority: number
): MetadataRoute.Sitemap[number] {
  return { url, lastModified, changeFrequency, priority };
}

function buildStaticEntries(now: Date): MetadataRoute.Sitemap {
  return STATIC_ROUTES.map(({ path, changeFrequency, priority }) =>
    toSitemapEntry(`${baseUrl}${path}`, now, changeFrequency, priority)
  );
}

function buildBlogEntries(now: Date): MetadataRoute.Sitemap {
  return BLOG_POSTS.map((post) => {
    const date = post.date ? new Date(post.date) : now;
    const lastModified = isNaN(date.getTime()) ? now : date;
    return toSitemapEntry(
      `${baseUrl}/blog/${post.slug}`,
      lastModified,
      "monthly",
      0.8
    );
  });
}

function fallbackSitemap(): MetadataRoute.Sitemap {
  return [
    toSitemapEntry(baseUrl, new Date(), "weekly", 1),
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  try {
    const now = new Date();
    return [...buildStaticEntries(now), ...buildBlogEntries(now)];
  } catch {
    return fallbackSitemap();
  }
}
