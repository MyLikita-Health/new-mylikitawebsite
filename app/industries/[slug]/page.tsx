import IndustryPageClient from "./IndustryPageClient"

interface IndustryPageProps {
  params: {
    slug: string
  }
}

export default function IndustryPage({ params }: IndustryPageProps) {
  return <IndustryPageClient params={params} />
}

export async function generateStaticParams() {
  return [
    { slug: "clinics" },
    { slug: "hospitals" },
    { slug: "labs-diagnostics" },
    { slug: "government-health" },
    { slug: "regulatory-agencies" },
  ]
}
