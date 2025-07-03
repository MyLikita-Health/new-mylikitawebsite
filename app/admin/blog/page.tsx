"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Heart,
  Calendar,
  TrendingUp,
  Users,
  FileText,
  BarChart3,
  Tag,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import type { BlogPost } from "@/lib/blog-models"
import { formatDate, formatViews } from "@/lib/blog-utils"

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  useEffect(() => {
    fetchPosts()
    fetchAnalytics()
  }, [currentPage, searchTerm])

  const fetchPosts = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
      })

      if (searchTerm) params.append("search", searchTerm)

      const response = await fetch(`/api/blog/posts?${params}`)
      const data = await response.json()

      setPosts(data.posts || [])
      setTotalPages(data.pagination?.pages || 1)
    } catch (error) {
      console.error("Error fetching posts:", error)
    }
  }

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/blog/analytics?period=30")
      const data = await response.json()
      setAnalytics(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching analytics:", error)
      setLoading(false)
    }
  }

  const handleDeletePost = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      const response = await fetch(`/api/blog/posts/${slug}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchPosts()
        fetchAnalytics()
      }
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchPosts()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="flex justify-between items-center mb-8"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <div>
            <h1 className="text-3xl font-bold font-space-grotesk text-gray-900 dark:text-white">Blog Management</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Manage your blog posts and view analytics</p>
          </div>
          <div className="flex space-x-2">
            <Link href="/admin/blog/categories">
              <Button variant="outline" className="text-blue-600 hover:text-blue-700">
                <Tag className="mr-2 h-4 w-4" />
                Categories
              </Button>
            </Link>
            <Link href="/admin/blog/new">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Analytics Cards */}
        {analytics && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.overview.totalPosts}</div>
                  <p className="text-xs text-muted-foreground">Published articles</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatViews(analytics.overview.totalViews)}</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.overview.totalLikes}</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Views/Post</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.overview.avgViewsPerPost}</div>
                  <p className="text-xs text-muted-foreground">Average engagement</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* Search and Filters */}
        <motion.div className="mb-6" initial="initial" animate="animate" variants={fadeInUp}>
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" variant="outline">
              Search
            </Button>
          </form>
        </motion.div>

        {/* Posts Table */}
        <motion.div initial="initial" animate="animate" variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
            </CardHeader>
            <CardContent>
              {posts.length > 0 ? (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div
                      key={post._id}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{post.title}</h3>
                          <Badge variant={post.published ? "default" : "secondary"}>
                            {post.published ? "Published" : "Draft"}
                          </Badge>
                          <Badge variant="outline">{post.category}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {post.publishedAt ? formatDate(new Date(post.publishedAt)) : "Not published"}
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {formatViews(post.views)} views
                          </div>
                          <div className="flex items-center">
                            <Heart className="h-3 w-3 mr-1" />
                            {post.likes} likes
                          </div>
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {post.author.name}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {post.published && (
                          <Link href={`/blog/${post.slug}`} target="_blank">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                        <Link href={`/admin/blog/${post.slug}/analytics`}>
                          <Button variant="outline" size="sm">
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/blog/${post.slug}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePost(post.slug)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No posts found</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {searchTerm
                      ? "Try adjusting your search criteria."
                      : "Get started by creating your first blog post."}
                  </p>
                  <Link href="/admin/blog/new">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="mr-2 h-4 w-4" />
                      Create First Post
                    </Button>
                  </Link>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    )
                  })}

                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Posts */}
        {analytics?.topPosts && analytics.topPosts.length > 0 && (
          <motion.div className="mt-8" initial="initial" animate="animate" variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topPosts.slice(0, 5).map((post: any, index: number) => (
                    <div key={post._id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{post.title}</h4>
                          <Link href={`/blog/${post.slug}`} className="text-sm text-blue-600 hover:text-blue-700">
                            View Post
                          </Link>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {formatViews(post.views)}
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {post.likes}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
