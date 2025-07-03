import type { MetadataRoute } from "next/dist/lib/metadata/types/metadata-interface"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: "https://mylikita.com/sitemap.xml",
  }
}
