import type { MetadataRoute } from "next/dist/lib/metadata/types/metadata-interface"
import { getDatabase } from "@/lib/mongodb"
import type { BlogPost } from "@/lib/blog-models"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mylikita.com"

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/partners`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ]

  // Dynamic blog posts
  let blogPosts: MetadataRoute.Sitemap = []

  try {
    const db = await getDatabase()
    const posts = await db.collection<BlogPost>("posts").find({ published: true }).sort({ publishedAt: -1 }).toArray()

    blogPosts = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error("Error generating blog sitemap:", error)
  }

  // Product pages
  const productSlugs = ["mylikita-hms", "labcore", "scanris", "pharmabooks", "medilinka"]
  const productPages = productSlugs.map((slug) => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  // Industry pages
  const industrySlugs = ["clinics", "hospitals", "labs-diagnostics", "government-health", "regulatory-agencies"]
  const industryPages = industrySlugs.map((slug) => ({
    url: `${baseUrl}/industries/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [...staticPages, ...productPages, ...industryPages, ...blogPosts]
}
