import { notFound } from "next/navigation"
import ProductPageClient from "./ProductPageClient"

const validSlugs = ["hms", "labcore", "scanris", "pharmabooks", "medilinka"]

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params

  if (!validSlugs.includes(slug)) {
    notFound()
  }

  return <ProductPageClient params={{ slug }} />
}

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params

  const products = {
    hms: {
      title: "MyLikita HMS - Hospital Management System",
      description:
        "Comprehensive hospital management system designed specifically for African healthcare facilities with patient records, billing, and prescription management.",
    },
    labcore: {
      title: "LabCore - Laboratory Information System",
      description:
        "Advanced laboratory management system that streamlines test setup, sample tracking, and automated reporting for medical laboratories.",
    },
    scanris: {
      title: "ScanRIS - Radiology Information System",
      description:
        "Complete radiology management system with DICOM image viewer, enabling efficient radiology workflow and advanced image management.",
    },
    pharmabooks: {
      title: "PharmaBooks - Pharmacy Management System",
      description:
        "Comprehensive pharmacy accounting and inventory management system designed for hospital pharmacies and retail outlets.",
    },
    medilinka: {
      title: "MediLinka - Telemedicine & TelePharmacy Platform",
      description:
        "Advanced telemedicine and telepharmacy platform enabling remote patient care, digital consultations, and medication delivery.",
    },
  }

  const product = products[slug as keyof typeof products]

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    }
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
    },
  }
}
