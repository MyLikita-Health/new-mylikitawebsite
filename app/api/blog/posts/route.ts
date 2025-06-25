import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { BlogPost } from "@/lib/blog-models"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const category = searchParams.get("category")
    const tag = searchParams.get("tag")
    const search = searchParams.get("search")
    const featured = searchParams.get("featured") === "true"

    const db = await getDatabase()
    const collection = db.collection<BlogPost>("posts")

    // Build query
    const query: any = { published: true }

    if (category) {
      query.category = category
    }

    if (tag) {
      query.tags = { $in: [tag] }
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ]
    }

    // Get total count
    const total = await collection.countDocuments(query)

    // Get posts
    let posts = await collection
      .find(query)
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    // If featured is requested, get top 3 most viewed posts
    if (featured) {
      posts = await collection.find({ published: true }).sort({ views: -1 }).limit(3).toArray()
    }

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, excerpt, content, author, category, tags, featuredImage, published } = body

    if (!title || !content || !author) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const db = await getDatabase()
    const collection = db.collection<BlogPost>("posts")

    // Generate slug
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()

    // Ensure unique slug
    let slug = baseSlug
    let counter = 1
    while (await collection.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    // Calculate read time
    const readTime = Math.ceil(content.trim().split(/\s+/).length / 200)

    const newPost: Omit<BlogPost, "_id"> = {
      title,
      slug,
      excerpt,
      content,
      author,
      category,
      tags: tags || [],
      featuredImage,
      published: published || false,
      publishedAt: published ? new Date() : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      readTime,
      views: 0,
      likes: 0,
    }

    const result = await collection.insertOne(newPost)

    return NextResponse.json(
      {
        _id: result.insertedId,
        ...newPost,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
