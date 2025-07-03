import { notFound } from "next/navigation"
import IndustryPageClient from "./IndustryPageClient"

const validSlugs = ["clinics", "hospitals", "labs-diagnostics", "government-health", "regulatory-agencies"]

interface IndustryPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params

  if (!validSlugs.includes(slug)) {
    notFound()
  }

  return <IndustryPageClient params={{ slug }} />
}

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: IndustryPageProps) {
  const { slug } = await params

  const industries = {
    clinics: {
      title: "Healthcare Solutions for Clinics - MyLikita",
      description:
        "Comprehensive digital solutions transforming clinic operations and patient care delivery across Africa.",
    },
    hospitals: {
      title: "Hospital Management Solutions - MyLikita",
      description: "End-to-end digital transformation solutions for hospitals of all sizes across Africa.",
    },
    "labs-diagnostics": {
      title: "Laboratory & Diagnostics Solutions - MyLikita",
      description: "Advanced laboratory management solutions for accurate and efficient diagnostic services.",
    },
    "government-health": {
      title: "Government Health Agency Solutions - MyLikita",
      description: "Scalable solutions for public health management and population health monitoring.",
    },
    "regulatory-agencies": {
      title: "Healthcare Regulatory Solutions - MyLikita",
      description: "Compliance and monitoring solutions for healthcare regulatory bodies and oversight organizations.",
    },
  }

  const industry = industries[slug as keyof typeof industries]

  if (!industry) {
    return {
      title: "Industry Not Found",
      description: "The requested industry could not be found.",
    }
  }

  return {
    title: industry.title,
    description: industry.description,
    openGraph: {
      title: industry.title,
      description: industry.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: industry.title,
      description: industry.description,
    },
  }
}
