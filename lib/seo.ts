import type { Metadata } from "next/metadata"

export interface SEOData {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export function generateMetadata(seo: SEOData): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = "/images/og-default.jpg",
    url = "https://mylikita.com",
    type = "website",
    publishedTime,
    modifiedTime,
    author,
    section,
    tags = [],
  } = seo

  const fullTitle = title.includes("MyLikita") ? title : `${title} | MyLikita`

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: author ? [{ name: author }] : [{ name: "MyLikita Team" }],
    creator: "MyLikita",
    publisher: "MyLikita",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: type as any,
      locale: "en_US",
      url,
      title: fullTitle,
      description,
      siteName: "MyLikita",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : ["MyLikita Team"],
        section,
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@mylikita",
      site: "@mylikita",
    },
    alternates: {
      canonical: url,
    },
    other: {
      "article:author": author || "MyLikita Team",
      "article:publisher": "https://www.facebook.com/mylikita",
    },
  }
}

export function generateStructuredData(seo: SEOData) {
  const { title, description, image, url, type, publishedTime, modifiedTime, author, tags = [] } = seo

  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "WebPage",
    headline: title,
    description,
    image,
    url,
    publisher: {
      "@type": "Organization",
      name: "MyLikita",
      logo: {
        "@type": "ImageObject",
        url: "https://mylikita.com/images/logo.png",
      },
    },
  }

  if (type === "article") {
    return {
      ...baseStructuredData,
      "@type": "Article",
      author: {
        "@type": "Person",
        name: author || "MyLikita Team",
      },
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      keywords: tags.join(", "),
      articleSection: "Healthcare Technology",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
    }
  }

  return baseStructuredData
}

export const defaultSEO: SEOData = {
  title: "MyLikita - Powering Digital Healthcare in Africa",
  description:
    "Leading healthcare technology solutions for hospitals, clinics, and medical institutions across Africa. Streamline operations with our comprehensive HMS, Lab, and diagnostic solutions.",
  keywords: [
    "healthcare technology",
    "hospital management system",
    "medical software",
    "healthcare solutions",
    "Africa healthcare",
    "digital health",
    "medical records",
    "patient management",
    "laboratory management",
    "diagnostic solutions",
  ],
  url: "https://mylikita.com",
  type: "website",
}
