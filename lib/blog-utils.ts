export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`
  }
  return views.toString()
}

export function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function getDeviceType(userAgent: string): "desktop" | "mobile" | "tablet" {
  const ua = userAgent.toLowerCase()
  if (ua.includes("tablet") || ua.includes("ipad")) {
    return "tablet"
  }
  if (ua.includes("mobile") || ua.includes("android") || ua.includes("iphone")) {
    return "mobile"
  }
  return "desktop"
}

export function extractExcerpt(content: string, maxLength = 160): string {
  const text = content
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).replace(/\s+\S*$/, "") + "..."
}
