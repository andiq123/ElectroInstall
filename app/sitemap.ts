import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { SITE_URL } from "@/lib/constants";

const baseUrl = typeof SITE_URL === "string" ? SITE_URL : "https://www.electro-install.xyz";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const blogPostUrls: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => {
    const date = post.date ? new Date(post.date) : now;
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: isNaN(date.getTime()) ? now : date,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicii-chisinau`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/politica-confidentialitate`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/termeni-conditii`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    ...blogPostUrls,
  ];
}
