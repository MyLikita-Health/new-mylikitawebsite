import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { BlogPost, BlogView } from "@/lib/blog-models"
import { getDeviceType } from "@/lib/blog-utils"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const db = await getDatabase()
    const sessionId = request.headers.get("x-session-id")
    const userAgent = request.headers.get("user-agent") || ""
    const referrer = request.headers.get("referer") || ""

    // Find the post
    const post = await db.collection<BlogPost>("posts").findOne({
      slug: params.slug,
      published: true,
    })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Track view if session ID provided
    if (sessionId) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      // Check if already viewed today by this session
      const existingView = await db.collection<BlogView>("views").findOne({
        postSlug: params.slug,
        sessionId,
        viewedAt: { $gte: today },
      })

      if (!existingView) {
        // Record new view
        await db.collection<BlogView>("views").insertOne({
          postSlug: params.slug,
          sessionId,
          userAgent,
          referrer,
          device: getDeviceType(userAgent),
          viewedAt: new Date(),
        })

        // Increment post view count
        await db.collection<BlogPost>("posts").updateOne({ slug: params.slug }, { $inc: { views: 1 } })

        // Update post object for response
        post.views += 1
      }
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const body = await request.json()
    const { title, excerpt, content, category, tags, featuredImage, published } = body

    const db = await getDatabase()
    const collection = db.collection<BlogPost>("posts")

    const existingPost = await collection.findOne({ slug: params.slug })
    if (!existingPost) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    // Calculate read time
    const readTime = Math.ceil(content.trim().split(/\s+/).length / 200)

    const updateData: Partial<BlogPost> = {
      title,
      excerpt,
      content,
      category,
      tags: tags || [],
      featuredImage,
      published,
      updatedAt: new Date(),
      readTime,
    }

    // If publishing for the first time, set publishedAt
    if (published && !existingPost.published) {
      updateData.publishedAt = new Date()
    }

    await collection.updateOne({ slug: params.slug }, { $set: updateData })

    const updatedPost = await collection.findOne({ slug: params.slug })

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const db = await getDatabase()
    const collection = db.collection<BlogPost>("posts")

    const result = await collection.deleteOne({ slug: params.slug })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Blog post deleted successfully" })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
