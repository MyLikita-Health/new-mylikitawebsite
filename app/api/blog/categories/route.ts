import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { BlogCategory } from "@/lib/blog-models"
import { generateSlug } from "@/lib/blog-utils"

export async function GET() {
  try {
    const db = await getDatabase()
    const categories = await db.collection<BlogCategory>("categories").find({}).sort({ name: 1 }).toArray()

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

    // Check if category already exists
    const existing = await db.collection<BlogCategory>("categories").findOne({ name })
    if (existing) {
      return NextResponse.json({ error: "Category already exists" }, { status: 400 })
    }

    const category: BlogCategory = {
      name,
      slug: generateSlug(name),
      description,
      color: color || "#3B82F6",
      postCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection<BlogCategory>("categories").insertOne(category)

    return NextResponse.json({
      success: true,
      categoryId: result.insertedId,
    })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
