"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Calendar, ArrowLeft, Clock, Heart, Eye, Share2, Twitter, Facebook, Linkedin, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import type { BlogPost } from "@/lib/blog-models"
import { formatDate, formatViews, generateSessionId } from "@/lib/blog-utils"
import { useParams } from "next/navigation"

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(0)
  const [sessionId, setSessionId] = useState<string>("")

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  useEffect(() => {
    // Generate session ID for analytics and likes
    const id = generateSessionId()
    setSessionId(id)

    if (params.slug) {
      fetchPost(params.slug as string, id)
    }
  }, [params.slug])

  const fetchPost = async (slug: string, sessionId: string) => {
    try {
      const response = await fetch(`/api/blog/posts/${slug}`, {
        headers: {
          "x-session-id": sessionId,
        },
      })

      if (!response.ok) {
        throw new Error("Post not found")
      }

      const data = await response.json()
      setPost(data)

      // Fetch like status
      const likeResponse = await fetch(`/api/blog/posts/${slug}/like`, {
        headers: {
          "x-session-id": sessionId,
        },
      })

      if (likeResponse.ok) {
        const likeData = await likeResponse.json()
        setLiked(likeData.liked)
        setLikes(likeData.likes)
      }

      // Fetch related posts
      fetchRelatedPosts(data.category, slug)

      setLoading(false)
    } catch (error) {
      console.error("Error fetching post:", error)
      setLoading(false)
    }
  }

  const fetchRelatedPosts = async (category: string, currentSlug: string) => {
    try {
      const response = await fetch(`/api/blog/posts?category=${category}&limit=3`)
      const data = await response.json()

      // Filter out current post
      const filtered = data.posts?.filter((p: BlogPost) => p.slug !== currentSlug) || []
      setRelatedPosts(filtered.slice(0, 3))
    } catch (error) {
      console.error("Error fetching related posts:", error)
    }
  }

  const handleLike = async () => {
    if (!post || !sessionId) return

    try {
      const response = await fetch(`/api/blog/posts/${post.slug}/like`, {
        method: "POST",
        headers: {
          "x-session-id": sessionId,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setLiked(data.liked)
        setLikes(data.likes)
      }
    } catch (error) {
      console.error("Error toggling like:", error)
    }
  }

  const handleShare = (platform: string) => {
    if (!post) return

    const url = window.location.href
    const text = `Check out this article: ${post.title}`

    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
        break
      default:
        navigator.clipboard.writeText(url)
        break
    }
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Article Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Article Header */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="max-w-4xl mx-auto" initial="initial" animate="animate" variants={fadeInUp}>
            <div className="mb-6">
              <Link href="/blog">
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <Badge variant="secondary">{post.category}</Badge>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(new Date(post.publishedAt!))}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime} min read
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Eye className="h-4 w-4 mr-1" />
                {formatViews(post.views)} views
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-6 text-gray-900 dark:text-white">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{post.excerpt}</p>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={post.author.avatar || "/placeholder.svg?height=48&width=48"}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{post.author.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Healthcare Technology Expert</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLike}
                  className={`${liked ? "text-red-600 border-red-600" : ""}`}
                >
                  <Heart className={`h-4 w-4 mr-2 ${liked ? "fill-current" : ""}`} />
                  {likes}
                </Button>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleShare("twitter")}>
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleShare("facebook")}>
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleShare("linkedin")}>
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleShare("copy")}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {post.featuredImage && (
              <div className="relative h-96 rounded-lg overflow-hidden mb-8">
                <Image src={post.featuredImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Social Share */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">Share this article:</span>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleShare("twitter")}>
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleShare("facebook")}>
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleShare("linkedin")}>
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={handleLike}
                  className={`${liked ? "text-red-600 border-red-600" : ""}`}
                >
                  <Heart className={`h-4 w-4 mr-2 ${liked ? "fill-current" : ""}`} />
                  {liked ? "Liked" : "Like"} ({likes})
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-6xl mx-auto"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold font-space-grotesk mb-12 text-gray-900 dark:text-white text-center">
                Related Articles
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost._id}
                    className="bg-white dark:bg-gray-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <Image
                        src={relatedPost.featuredImage || "/placeholder.svg?height=200&width=400"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {relatedPost.category}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          {relatedPost.readTime} min read
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0">
                          Read More
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  )
}
