import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { DEFAULT_SITE_URL } from "@/lib/constants";

type Freq = "weekly" | "monthly" | "yearly";

const BASE = DEFAULT_SITE_URL;

const STATIC_ROUTES: { path: string; freq: Freq; priority: number }[] = [
  { path: "", freq: "weekly", priority: 1 },
  { path: "/blog", freq: "weekly", priority: 0.9 },
  { path: "/servicii-chisinau", freq: "monthly", priority: 0.9 },
  { path: "/politica-confidentialitate", freq: "yearly", priority: 0.3 },
  { path: "/termeni-conditii", freq: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map(({ path, freq, priority }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));

  const blogEntries = BLOG_POSTS.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "monthly" as Freq,
    priority: 0.8,
  }));

  return [...staticEntries, ...blogEntries];
}
