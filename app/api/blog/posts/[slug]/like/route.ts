import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { BlogPost, BlogLike } from "@/lib/blog-models"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const db = await getDatabase()
    const sessionId = request.headers.get("x-session-id")

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 })
    }

    // Check if user has liked this post
    const existingLike = await db.collection<BlogLike>("likes").findOne({
      postSlug: params.slug,
      sessionId,
    })

    // Get current like count
    const post = await db.collection<BlogPost>("posts").findOne({
      slug: params.slug,
    })

    return NextResponse.json({
      liked: Boolean(existingLike),
      likes: post?.likes || 0,
    })
  } catch (error) {
    console.error("Error checking like status:", error)
    return NextResponse.json({ error: "Failed to check like status" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const db = await getDatabase()
    const sessionId = request.headers.get("x-session-id")

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 })
    }

    // Check if user has already liked this post
    const existingLike = await db.collection<BlogLike>("likes").findOne({
      postSlug: params.slug,
      sessionId,
    })

    let liked: boolean
    let likesChange: number

    if (existingLike) {
      // Unlike the post
      await db.collection<BlogLike>("likes").deleteOne({
        postSlug: params.slug,
        sessionId,
      })
      liked = false
      likesChange = -1
    } else {
      // Like the post
      await db.collection<BlogLike>("likes").insertOne({
        postSlug: params.slug,
        sessionId,
        likedAt: new Date(),
      })
      liked = true
      likesChange = 1
    }

    // Update post like count
    const result = await db
      .collection<BlogPost>("posts")
      .findOneAndUpdate({ slug: params.slug }, { $inc: { likes: likesChange } }, { returnDocument: "after" })

    return NextResponse.json({
      liked,
      likes: result?.likes || 0,
    })
  } catch (error) {
    console.error("Error toggling like:", error)
    return NextResponse.json({ error: "Failed to toggle like" }, { status: 500 })
  }
}
