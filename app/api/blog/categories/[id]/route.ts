import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { BlogCategory } from "@/lib/blog-models"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { name, description, color } = body

    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 })
    }

    const db = await getDatabase()
    const collection = db.collection<BlogCategory>("categories")

    // Generate slug
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()

    // Check if another category has this slug
    const existing = await collection.findOne({
      slug,
      _id: { $ne: new ObjectId(params.id) },
    })

    if (existing) {
      return NextResponse.json({ error: "Category name already exists" }, { status: 400 })
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          name,
          slug,
          description,
          color,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    const updatedCategory = await collection.findOne({ _id: new ObjectId(params.id) })
    return NextResponse.json(updatedCategory)
  } catch (error) {
    console.error("Error updating category:", error)
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = await getDatabase()
    const categoriesCollection = db.collection<BlogCategory>("categories")
    const postsCollection = db.collection("posts")

    // Check if category has posts
    const postCount = await postsCollection.countDocuments({
      category: { $exists: true },
    })

    if (postCount > 0) {
      // Get category name for the error message
      const category = await categoriesCollection.findOne({ _id: new ObjectId(params.id) })
      const categoryName = category?.name || "this category"

      return NextResponse.json(
        { error: `Cannot delete category. There are posts using ${categoryName}.` },
        { status: 400 },
      )
    }

    const result = await categoriesCollection.deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting category:", error)
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}
