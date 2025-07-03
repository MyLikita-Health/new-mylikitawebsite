export interface BlogPost {
  _id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: string
  category: string
  tags: string[]
  author: {
    name: string
    email: string
    avatar?: string
  }
  published: boolean
  featured: boolean
  views: number
  likes: number
  readTime: number
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface BlogCategory {
  _id?: string
  name: string
  slug: string
  description?: string
  color?: string
  postCount: number
  createdAt: Date
  updatedAt: Date
}

export interface BlogView {
  _id?: string
  postSlug: string
  sessionId: string
  userAgent?: string
  referrer?: string
  device: "desktop" | "mobile" | "tablet"
  viewedAt: Date
}

export interface BlogLike {
  _id?: string
  postSlug: string
  sessionId: string
  likedAt: Date
}

export interface BlogAnalytics {
  _id?: string
  postSlug: string
  date: Date
  views: number
  likes: number
  uniqueViews: number
  bounceRate: number
  avgTimeOnPage: number
  devices: {
    desktop: number
    mobile: number
    tablet: number
  }
  referrers: Record<string, number>
}
