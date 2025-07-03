"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Calendar, User, ArrowRight, Clock, Search, Heart, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import type { BlogPost, BlogCategory } from "@/lib/blog-models"
import { formatDate, formatViews } from "@/lib/blog-utils"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
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
    fetchFeaturedPosts()
    fetchCategories()
  }, [currentPage, selectedCategory, searchTerm])

  const fetchPosts = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "9",
      })

      if (selectedCategory) params.append("category", selectedCategory)
      if (searchTerm) params.append("search", searchTerm)

      const response = await fetch(`/api/blog/posts?${params}`)
      const data = await response.json()

      setPosts(data.posts || [])
      setTotalPages(data.pagination?.pages || 1)
    } catch (error) {
      console.error("Error fetching posts:", error)
    }
  }

  const fetchFeaturedPosts = async () => {
    try {
      const response = await fetch("/api/blog/posts?featured=true&limit=3")
      const data = await response.json()
      setFeaturedPosts(data.posts || [])
    } catch (error) {
      console.error("Error fetching featured posts:", error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/blog/categories")
      const data = await response.json()
      setCategories(data || [])
      setLoading(false)
    } catch (error) {
      console.error("Error fetching categories:", error)
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchPosts()
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category)
    setCurrentPage(1)
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold font-space-grotesk mb-6 text-gray-900 dark:text-white"
            >
              Healthcare <span className="text-gradient">Insights</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Thought leadership, insights, and best practices in digital healthcare transformation across Africa.
            </motion.p>

            {/* Search Bar */}
            <motion.form variants={fadeInUp} onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-full border-gray-300 dark:border-gray-600"
                />
              </div>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-16"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold font-space-grotesk mb-8 text-gray-900 dark:text-white">
                Featured Articles
              </h2>
              <div className="grid lg:grid-cols-3 gap-8">
                {featuredPosts.map((post, index) => (
                  <Card
                    key={post._id}
                    className="overflow-hidden bg-white dark:bg-gray-800 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300"
                  >
                    <div className="relative h-48">
                      <Image
                        src={post.featuredImage || "/placeholder.svg?height=200&width=400"}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-blue-600 text-white">Featured</Badge>
                      </div>
                      <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-white text-sm">
                        <div className="flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
                          <Eye className="h-3 w-3" />
                          <span>{formatViews(post.views)}</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
                          <Heart className="h-3 w-3" />
                          <span>{post.likes}</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <Badge variant="secondary">{post.category}</Badge>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(new Date(post.publishedAt!))}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime} min read
                        </div>
                      </div>
                      <h3 className="text-xl font-bold font-space-grotesk mb-3 text-gray-900 dark:text-white">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{post.author.name}</span>
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            Read Article
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Categories Filter */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp}>
              <Button
                variant={selectedCategory === "" ? "default" : "outline"}
                onClick={() => handleCategoryFilter("")}
                className="rounded-full"
              >
                All Posts
              </Button>
            </motion.div>
            {categories.map((category) => (
              <motion.div key={category._id} variants={fadeInUp}>
                <Button
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  onClick={() => handleCategoryFilter(category.name)}
                  className="rounded-full"
                >
                  {category.name} ({category.postCount})
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <>
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={staggerChildren}
              >
                {posts.map((post) => (
                  <motion.div key={post._id} variants={fadeInUp}>
                    <Card className="h-full bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <Image
                          src={post.featuredImage || "/placeholder.svg?height=200&width=400"}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-white text-sm">
                          <div className="flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
                            <Eye className="h-3 w-3" />
                            <span>{formatViews(post.views)}</span>
                          </div>
                          <div className="flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
                            <Heart className="h-3 w-3" />
                            <span>{post.likes}</span>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {post.category}
                          </Badge>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(new Date(post.publishedAt!))}
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <User className="h-3 w-3 mr-1" />
                            <span>{post.author.name}</span>
                            <span className="mx-2">•</span>
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{post.readTime} min read</span>
                          </div>
                          <Link href={`/blog/${post.slug}`}>
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0">
                              Read More
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  className="flex justify-center mt-12 space-x-2"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
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
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              className="text-center py-20"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">No articles found</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {searchTerm || selectedCategory
                  ? "Try adjusting your search or filter criteria."
                  : "Check back soon for new healthcare insights and articles."}
              </p>
              {(searchTerm || selectedCategory) && (
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("")
                    setCurrentPage(1)
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Clear Filters
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold font-space-grotesk mb-6">
              Stay Informed
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl mb-8 opacity-90">
              Subscribe to our newsletter for the latest insights on healthcare technology and digital transformation in
              Africa.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button size="lg" variant="secondary" className="rounded-full px-8 py-3 font-semibold">
                Subscribe
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// "use client"

// import type React from "react"

// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { motion } from "framer-motion"
// import { Calendar, User, ArrowRight, Clock, Search, Heart, Eye } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// import { useState, useEffect } from "react"
// import type { BlogPost, BlogCategory } from "@/lib/blog-models"
// import { formatDate, formatViews } from "@/lib/blog-utils"

// export default function BlogPage() {
//   const [posts, setPosts] = useState<BlogPost[]>([])
//   const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])
//   const [categories, setCategories] = useState<BlogCategory[]>([])
//   const [loading, setLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState<string>("")
//   const [currentPage, setCurrentPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(1)

//   const fadeInUp = {
//     initial: { opacity: 0, y: 60 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.6 },
//   }

//   const staggerChildren = {
//     animate: {
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   useEffect(() => {
//     fetchPosts()
//     fetchFeaturedPosts()
//     fetchCategories()
//   }, [currentPage, selectedCategory, searchTerm])

//   const fetchPosts = async () => {
//     try {
//       const params = new URLSearchParams({
//         page: currentPage.toString(),
//         limit: "9",
//       })

//       if (selectedCategory) params.append("category", selectedCategory)
//       if (searchTerm) params.append("search", searchTerm)

//       const response = await fetch(`/api/blog/posts?${params}`)
//       const data = await response.json()

//       setPosts(data.posts || [])
//       setTotalPages(data.pagination?.pages || 1)
//     } catch (error) {
//       console.error("Error fetching posts:", error)
//     }
//   }

//   const fetchFeaturedPosts = async () => {
//     try {
//       const response = await fetch("/api/blog/posts?featured=true&limit=3")
//       const data = await response.json()
//       setFeaturedPosts(data.posts || [])
//     } catch (error) {
//       console.error("Error fetching featured posts:", error)
//     }
//   }

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch("/api/blog/categories")
//       const data = await response.json()
//       setCategories(data || [])
//       setLoading(false)
//     } catch (error) {
//       console.error("Error fetching categories:", error)
//       setLoading(false)
//     }
//   }

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault()
//     setCurrentPage(1)
//     fetchPosts()
//   }

//   const handleCategoryFilter = (category: string) => {
//     setSelectedCategory(category === selectedCategory ? "" : category)
//     setCurrentPage(1)
//   }

//   if (loading) {
//     return (
//       <div className="pt-20 min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="pt-20">
//       {/* Hero Section */}
//       <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             className="text-center max-w-4xl mx-auto"
//             initial="initial"
//             animate="animate"
//             variants={staggerChildren}
//           >
//             <motion.h1
//               variants={fadeInUp}
//               className="text-4xl md:text-6xl font-bold font-space-grotesk mb-6 text-gray-900 dark:text-white"
//             >
//               Healthcare <span className="text-gradient">Insights</span>
//             </motion.h1>
//             <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
//               Thought leadership, insights, and best practices in digital healthcare transformation across Africa.
//             </motion.p>

//             {/* Search Bar */}
//             <motion.form variants={fadeInUp} onSubmit={handleSearch} className="max-w-md mx-auto">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                 <Input
//                   type="text"
//                   placeholder="Search articles..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-3 rounded-full border-gray-300 dark:border-gray-600"
//                 />
//               </div>
//             </motion.form>
//           </motion.div>
//         </div>
//       </section>

//       {/* Featured Posts */}
//       {featuredPosts.length > 0 && (
//         <section className="py-20 bg-white dark:bg-gray-900">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <motion.div
//               className="mb-16"
//               initial="initial"
//               whileInView="animate"
//               viewport={{ once: true }}
//               variants={fadeInUp}
//             >
//               <h2 className="text-3xl font-bold font-space-grotesk mb-8 text-gray-900 dark:text-white">
//                 Featured Articles
//               </h2>
//               <div className="grid lg:grid-cols-3 gap-8">
//                 {featuredPosts.map((post, index) => (
//                   <Card
//                     key={post._id}
//                     className="overflow-hidden bg-white dark:bg-gray-800 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300"
//                   >
//                     <div className="relative h-48">
//                       <Image
//                         src={post.featuredImage || "/placeholder.svg?height=200&width=400"}
//                         alt={post.title}
//                         fill
//                         className="object-cover"
//                       />
//                       <div className="absolute top-4 left-4">
//                         <Badge className="bg-blue-600 text-white">Featured</Badge>
//                       </div>
//                       <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-white text-sm">
//                         <div className="flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
//                           <Eye className="h-3 w-3" />
//                           <span>{formatViews(post.views)}</span>
//                         </div>
//                         <div className="flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
//                           <Heart className="h-3 w-3" />
//                           <span>{post.likes}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <CardContent className="p-6">
//                       <div className="flex items-center space-x-4 mb-4">
//                         <Badge variant="secondary">{post.category}</Badge>
//                         <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
//                           <Calendar className="h-4 w-4 mr-1" />
//                           {formatDate(new Date(post.publishedAt!))}
//                         </div>
//                         <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
//                           <Clock className="h-4 w-4 mr-1" />
//                           {post.readTime} min read
//                         </div>
//                       </div>
//                       <h3 className="text-xl font-bold font-space-grotesk mb-3 text-gray-900 dark:text-white">
//                         {post.title}
//                       </h3>
//                       <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                           <User className="h-4 w-4 mr-2 text-gray-500" />
//                           <span className="text-sm text-gray-600 dark:text-gray-400">{post.author.name}</span>
//                         </div>
//                         <Link href={`/blog/${post.slug}`}>
//                           <Button className="bg-blue-600 hover:bg-blue-700 text-white">
//                             Read Article
//                             <ArrowRight className="ml-2 h-4 w-4" />
//                           </Button>
//                         </Link>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </section>
//       )}

//       {/* Categories Filter */}
//       <section className="py-8 bg-gray-50 dark:bg-gray-800">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             className="flex flex-wrap justify-center gap-4"
//             initial="initial"
//             whileInView="animate"
//             viewport={{ once: true }}
//             variants={staggerChildren}
//           >
//             <motion.div variants={fadeInUp}>
//               <Button
//                 variant={selectedCategory === "" ? "default" : "outline"}
//                 onClick={() => handleCategoryFilter("")}
//                 className="rounded-full"
//               >
//                 All Posts
//               </Button>
//             </motion.div>
//             {categories.map((category) => (
//               <motion.div key={category._id} variants={fadeInUp}>
//                 <Button
//                   variant={selectedCategory === category.name ? "default" : "outline"}
//                   onClick={() => handleCategoryFilter(category.name)}
//                   className="rounded-full"
//                 >
//                   {category.name} ({category.postCount})
//                 </Button>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Blog Posts Grid */}
//       <section className="py-20 bg-white dark:bg-gray-900">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           {posts.length > 0 ? (
//             <>
//               <motion.div
//                 className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
//                 initial="initial"
//                 whileInView="animate"
//                 viewport={{ once: true }}
//                 variants={staggerChildren}
//               >
//                 {posts.map((post) => (
//                   <motion.div key={post._id} variants={fadeInUp}>
//                     <Card className="h-full bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
//                       <div className="relative h-48 overflow-hidden rounded-t-lg">
//                         <Image
//                           src={post.featuredImage || "/placeholder.svg?height=200&width=400"}
//                           alt={post.title}
//                           fill
//                           className="object-cover group-hover:scale-105 transition-transform duration-300"
//                         />
//                         <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-white text-sm">
//                           <div className="flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
//                             <Eye className="h-3 w-3" />
//                             <span>{formatViews(post.views)}</span>
//                           </div>
//                           <div className="flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
//                             <Heart className="h-3 w-3" />
//                             <span>{post.likes}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <CardContent className="p-6">
//                         <div className="flex items-center space-x-4 mb-3">
//                           <Badge variant="secondary" className="text-xs">
//                             {post.category}
//                           </Badge>
//                           <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
//                             <Calendar className="h-3 w-3 mr-1" />
//                             {formatDate(new Date(post.publishedAt!))}
//                           </div>
//                         </div>
//                         <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white line-clamp-2">
//                           {post.title}
//                         </h3>
//                         <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
//                             <User className="h-3 w-3 mr-1" />
//                             <span>{post.author.name}</span>
//                             <span className="mx-2">•</span>
//                             <Clock className="h-3 w-3 mr-1" />
//                             <span>{post.readTime} min read</span>
//                           </div>
//                           <Link href={`/blog/${post.slug}`}>
//                             <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0">
//                               Read More
//                               <ArrowRight className="ml-1 h-3 w-3" />
//                             </Button>
//                           </Link>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </motion.div>
//                 ))}
//               </motion.div>

//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <motion.div
//                   className="flex justify-center mt-12 space-x-2"
//                   initial="initial"
//                   whileInView="animate"
//                   viewport={{ once: true }}
//                   variants={fadeInUp}
//                 >
//                   <Button
//                     variant="outline"
//                     onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                     disabled={currentPage === 1}
//                   >
//                     Previous
//                   </Button>

//                   {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                     const page = i + 1
//                     return (
//                       <Button
//                         key={page}
//                         variant={currentPage === page ? "default" : "outline"}
//                         onClick={() => setCurrentPage(page)}
//                       >
//                         {page}
//                       </Button>
//                     )
//                   })}

//                   <Button
//                     variant="outline"
//                     onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                     disabled={currentPage === totalPages}
//                   >
//                     Next
//                   </Button>
//                 </motion.div>
//               )}
//             </>
//           ) : (
//             <motion.div
//               className="text-center py-20"
//               initial="initial"
//               whileInView="animate"
//               viewport={{ once: true }}
//               variants={fadeInUp}
//             >
//               <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">No articles found</h3>
//               <p className="text-gray-600 dark:text-gray-300 mb-8">
//                 {searchTerm || selectedCategory
//                   ? "Try adjusting your search or filter criteria."
//                   : "Check back soon for new healthcare insights and articles."}
//               </p>
//               {(searchTerm || selectedCategory) && (
//                 <Button
//                   onClick={() => {
//                     setSearchTerm("")
//                     setSelectedCategory("")
//                     setCurrentPage(1)
//                   }}
//                   className="bg-blue-600 hover:bg-blue-700 text-white"
//                 >
//                   Clear Filters
//                 </Button>
//               )}
//             </motion.div>
//           )}
//         </div>
//       </section>

//       {/* Newsletter Signup */}
//       <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             className="text-center max-w-4xl mx-auto"
//             initial="initial"
//             whileInView="animate"
//             viewport={{ once: true }}
//             variants={staggerChildren}
//           >
//             <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold font-space-grotesk mb-6">
//               Stay Informed
//             </motion.h2>
//             <motion.p variants={fadeInUp} className="text-xl mb-8 opacity-90">
//               Subscribe to our newsletter for the latest insights on healthcare technology and digital transformation in
//               Africa.
//             </motion.p>
//             <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
//               <input
//                 type="email"
//                 placeholder="Enter your email address"
//                 className="flex-1 px-4 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
//               />
//               <Button size="lg" variant="secondary" className="rounded-full px-8 py-3 font-semibold">
//                 Subscribe
//               </Button>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   )
// }
