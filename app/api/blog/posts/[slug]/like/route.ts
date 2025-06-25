import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { BlogPost, BlogLike } from "@/lib/blog-models"

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const db = await getDatabase()
    const postsCollection = db.collection<BlogPost>("posts")
    const likesCollection = db.collection<BlogLike>("likes")

    // Find the post
    const post = await postsCollection.findOne({
      slug: params.slug,
      published: true,
    })

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    const sessionId = request.headers.get("x-session-id") || "anonymous"
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    // Check if already liked
    const existingLike = await likesCollection.findOne({
      postId: post._id!.toString(),
      sessionId,
    })

    if (existingLike) {
      // Unlike
      await likesCollection.deleteOne({ _id: existingLike._id })
      await postsCollection.updateOne({ _id: post._id }, { $inc: { likes: -1 } })

      return NextResponse.json({
        liked: false,
        likes: Math.max(0, post.likes - 1),
      })
    } else {
      // Like
      await likesCollection.insertOne({
        postId: post._id!.toString(),
        sessionId,
        ipAddress,
        createdAt: new Date(),
      })

      await postsCollection.updateOne({ _id: post._id }, { $inc: { likes: 1 } })

      return NextResponse.json({
        liked: true,
        likes: post.likes + 1,
      })
    }
  } catch (error) {
    console.error("Error toggling like:", error)
    return NextResponse.json({ error: "Failed to toggle like" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const db = await getDatabase()
    const postsCollection = db.collection<BlogPost>("posts")
    const likesCollection = db.collection<BlogLike>("likes")

    const post = await postsCollection.findOne({
      slug: params.slug,
      published: true,
    })

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    const sessionId = request.headers.get("x-session-id") || "anonymous"

    const existingLike = await likesCollection.findOne({
      postId: post._id!.toString(),
      sessionId,
    })

    return NextResponse.json({
      liked: !!existingLike,
      likes: post.likes,
    })
  } catch (error) {
    console.error("Error checking like status:", error)
    return NextResponse.json({ error: "Failed to check like status" }, { status: 500 })
  }
}
