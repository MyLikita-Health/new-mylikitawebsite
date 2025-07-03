import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { BlogPost, BlogCategory } from "@/lib/blog-models"
import { generateSlug, calculateReadTime } from "@/lib/blog-utils"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const featured = searchParams.get("featured") === "true"

    const db = await getDatabase()
    const skip = (page - 1) * limit

    // Build query
    const query: any = { published: true }

    if (category) {
      query.category = category
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ]
    }

    if (featured) {
      query.featured = true
    }

    // Get posts
    const posts = await db
      .collection<BlogPost>("posts")
      .find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    // Get total count for pagination
    const total = await db.collection<BlogPost>("posts").countDocuments(query)
    const pages = Math.ceil(total / limit)

    return NextResponse.json({
      posts,
      pagination: {
        page,
        pages,
        total,
        hasNext: page < pages,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      excerpt,
      content,
      featuredImage,
      category,
      tags,
      author,
      published,
      featured,
      seoTitle,
      seoDescription,
      seoKeywords,
    } = body

    // Validation
    if (!title || !content || !category || !author?.name || !author?.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const db = await getDatabase()

    // Generate slug
    const baseSlug = generateSlug(title)
    let slug = baseSlug
    let counter = 1

    // Ensure unique slug
    while (await db.collection("posts").findOne({ slug })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    // Calculate read time
    const readTime = calculateReadTime(content)

    const post: BlogPost = {
      title,
      slug,
      excerpt: excerpt || content.replace(/<[^>]*>/g, "").substring(0, 160) + "...",
      content,
      featuredImage,
      category,
      tags: Array.isArray(tags) ? tags : tags?.split(",").map((t: string) => t.trim()) || [],
      author: {
        name: author.name,
        email: author.email,
        avatar: author.avatar,
      },
      published: Boolean(published),
      featured: Boolean(featured),
      views: 0,
      likes: 0,
      readTime,
      seoTitle,
      seoDescription,
      seoKeywords: Array.isArray(seoKeywords)
        ? seoKeywords
        : seoKeywords?.split(",").map((k: string) => k.trim()) || [],
      publishedAt: published ? new Date() : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection<BlogPost>("posts").insertOne(post)

    // Update category post count
    await db.collection<BlogCategory>("categories").updateOne({ name: category }, { $inc: { postCount: 1 } })

    return NextResponse.json({
      success: true,
      postId: result.insertedId,
      slug: post.slug,
    })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
