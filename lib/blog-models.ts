export interface BlogPost {
  _id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: {
    name: string
    email: string
    avatar?: string
  }
  category: string
  tags: string[]
  featuredImage?: string
  published: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
  readTime: number
  views: number
  likes: number
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
}

export interface BlogAnalytics {
  _id?: string
  postId: string
  views: number
  uniqueViews: number
  likes: number
  readTime: number
  bounceRate: number
  avgTimeOnPage: number
  referrers: { [key: string]: number }
  countries: { [key: string]: number }
  devices: { [key: string]: number }
  createdAt: Date
  updatedAt: Date
}

export interface BlogView {
  _id?: string
  postId: string
  sessionId: string
  ipAddress: string
  userAgent: string
  referrer?: string
  country?: string
  device: string
  timeSpent: number
  createdAt: Date
}

export interface BlogLike {
  _id?: string
  postId: string
  sessionId: string
  ipAddress: string
  createdAt: Date
}

export interface BlogCategory {
  _id?: string
  name: string
  slug: string
  description?: string
  color?: string
  postCount: number
  createdAt: Date
}
