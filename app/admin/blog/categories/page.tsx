"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Tag, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { BlogCategory } from "@/lib/blog-models"

export default function CategoriesManagementPage() {
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#3B82F6",
  })

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
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/blog/categories")
      const data = await response.json()
      setCategories(data || [])
    } catch (error) {
      console.error("Error fetching categories:", error)
      setError("Failed to fetch categories")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const url = editingCategory ? `/api/blog/categories/${editingCategory._id}` : "/api/blog/categories"

      const method = editingCategory ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        await fetchCategories()
        setIsDialogOpen(false)
        resetForm()
      } else {
        setError(data.error || "Failed to save category")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    }
  }

  const handleEdit = (category: BlogCategory) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      description: category.description || "",
      color: category.color || "#3B82F6",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (category: BlogCategory) => {
    if (!confirm(`Are you sure you want to delete "${category.name}"?`)) return

    try {
      const response = await fetch(`/api/blog/categories/${category._id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (response.ok) {
        await fetchCategories()
      } else {
        alert(data.error || "Failed to delete category")
      }
    } catch (error) {
      alert("Network error. Please try again.")
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      color: "#3B82F6",
    })
    setEditingCategory(null)
    setError("")
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    resetForm()
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
          <div className="flex items-center space-x-4">
            <Link href="/admin/blog">
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold font-space-grotesk text-gray-900 dark:text-white">
                Category Management
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Organize your blog content with categories</p>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                New Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingCategory ? "Edit Category" : "Create New Category"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div>
                  <Label htmlFor="name">Category Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter category name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of this category"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="color">Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="color"
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData((prev) => ({ ...prev, color: e.target.value }))}
                      className="w-16 h-10"
                    />
                    <Input
                      value={formData.color}
                      onChange={(e) => setFormData((prev) => ({ ...prev, color: e.target.value }))}
                      placeholder="#3B82F6"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={handleDialogClose}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                    {editingCategory ? "Update" : "Create"} Category
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          {categories.length > 0 ? (
            categories.map((category) => (
              <motion.div key={category._id} variants={fadeInUp}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                      </div>
                      <Badge variant="secondary">{category.postCount || 0} posts</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {category.description && (
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{category.description}</p>
                    )}
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(category)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(category)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div className="col-span-full" variants={fadeInUp}>
              <Card>
                <CardContent className="text-center py-12">
                  <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No categories yet</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Create your first category to organize your blog posts.
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create First Category
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
