import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://electroinstall.md";

  // Blog posts
  const blogUrls = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: `${baseUrl}/servicii-chisinau`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/politica-confidentialitate`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/termeni-conditii`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    ...blogUrls,
  ];
}
