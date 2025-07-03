import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { BlogPost, BlogView, BlogLike } from "@/lib/blog-models"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const postSlug = searchParams.get("postSlug")
    const days = Number.parseInt(searchParams.get("days") || "30")

    const db = await getDatabase()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    if (postSlug) {
      // Get analytics for specific post
      const post = await db.collection<BlogPost>("posts").findOne({ slug: postSlug })
      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 })
      }

      // Get views over time
      const viewsOverTime = await db
        .collection<BlogView>("views")
        .aggregate([
          {
            $match: {
              postSlug,
              viewedAt: { $gte: startDate },
            },
          },
          {
            $group: {
              _id: {
                $dateToString: { format: "%Y-%m-%d", date: "$viewedAt" },
              },
              views: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ])
        .toArray()

      // Get device breakdown
      const deviceBreakdown = await db
        .collection<BlogView>("views")
        .aggregate([
          {
            $match: {
              postSlug,
              viewedAt: { $gte: startDate },
            },
          },
          {
            $group: {
              _id: "$device",
              count: { $sum: 1 },
            },
          },
        ])
        .toArray()

      // Get referrer breakdown
      const referrerBreakdown = await db
        .collection<BlogView>("views")
        .aggregate([
          {
            $match: {
              postSlug,
              viewedAt: { $gte: startDate },
              referrer: { $ne: "" },
            },
          },
          {
            $group: {
              _id: "$referrer",
              count: { $sum: 1 },
            },
          },
          { $sort: { count: -1 } },
          { $limit: 10 },
        ])
        .toArray()

      return NextResponse.json({
        post: {
          title: post.title,
          slug: post.slug,
          views: post.views,
          likes: post.likes,
          publishedAt: post.publishedAt,
        },
        viewsOverTime,
        deviceBreakdown,
        referrerBreakdown,
      })
    } else {
      // Get overall analytics
      const totalPosts = await db.collection<BlogPost>("posts").countDocuments({ published: true })
      const totalViews = await db.collection<BlogView>("views").countDocuments({
        viewedAt: { $gte: startDate },
      })
      const totalLikes = await db.collection<BlogLike>("likes").countDocuments({
        likedAt: { $gte: startDate },
      })

      // Top posts by views
      const topPosts = await db
        .collection<BlogPost>("posts")
        .find({ published: true }, { sort: { views: -1 }, limit: 10 })
        .toArray()

      // Views over time
      const viewsOverTime = await db
        .collection<BlogView>("views")
        .aggregate([
          {
            $match: {
              viewedAt: { $gte: startDate },
            },
          },
          {
            $group: {
              _id: {
                $dateToString: { format: "%Y-%m-%d", date: "$viewedAt" },
              },
              views: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ])
        .toArray()

      return NextResponse.json({
        overview: {
          totalPosts,
          totalViews,
          totalLikes,
        },
        topPosts,
        viewsOverTime,
      })
    }
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
