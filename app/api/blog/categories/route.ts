import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { BlogCategory, BlogPost } from "@/lib/blog-models"

export async function GET() {
  try {
    const db = await getDatabase()
    const categoriesCollection = db.collection<BlogCategory>("categories")
    const postsCollection = db.collection<BlogPost>("posts")

    // Get categories with post counts
    const categories = await categoriesCollection.find({}).toArray()

    // Update post counts
    for (const category of categories) {
      const postCount = await postsCollection.countDocuments({
        category: category.name,
        published: true,
      })

      await categoriesCollection.updateOne({ _id: category._id }, { $set: { postCount } })

      category.postCount = postCount
    }

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    // Check if category already exists
    const existing = await collection.findOne({ slug })
    if (existing) {
      return NextResponse.json({ error: "Category already exists" }, { status: 400 })
    }

    const newCategory: Omit<BlogCategory, "_id"> = {
      name,
      slug,
      description,
      color,
      postCount: 0,
      createdAt: new Date(),
    }

    const result = await collection.insertOne(newCategory)

    return NextResponse.json(
      {
        _id: result.insertedId,
        ...newCategory,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
