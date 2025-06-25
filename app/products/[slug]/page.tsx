import ProductPageClient from "./ProductPageClient"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return <ProductPageClient params={params} />
}

export async function generateStaticParams() {
  return [{ slug: "hms" }, { slug: "labcore" }, { slug: "scanris" }, { slug: "pharmabooks" }, { slug: "medilinka" }]
}
