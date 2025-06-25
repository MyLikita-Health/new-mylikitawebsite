import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { BlogPost, BlogView, BlogLike } from "@/lib/blog-models"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "30" // days
    const postId = searchParams.get("postId")

    const db = await getDatabase()
    const postsCollection = db.collection<BlogPost>("posts")
    const viewsCollection = db.collection<BlogView>("views")
    const likesCollection = db.collection<BlogLike>("likes")

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - Number.parseInt(period))

    if (postId) {
      // Get analytics for specific post
      const post = await postsCollection.findOne({ _id: postId })
      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 })
      }

      const views = await viewsCollection.countDocuments({
        postId,
        createdAt: { $gte: startDate },
      })

      const uniqueViews = await viewsCollection.distinct("sessionId", {
        postId,
        createdAt: { $gte: startDate },
      })

      const likes = await likesCollection.countDocuments({
        postId,
        createdAt: { $gte: startDate },
      })

      // Device breakdown
      const deviceStats = await viewsCollection
        .aggregate([
          {
            $match: {
              postId,
              createdAt: { $gte: startDate },
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

      // Daily views
      const dailyViews = await viewsCollection
        .aggregate([
          {
            $match: {
              postId,
              createdAt: { $gte: startDate },
            },
          },
          {
            $group: {
              _id: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$createdAt",
                },
              },
              views: { $sum: 1 },
              uniqueViews: { $addToSet: "$sessionId" },
            },
          },
          {
            $project: {
              date: "$_id",
              views: 1,
              uniqueViews: { $size: "$uniqueViews" },
            },
          },
          { $sort: { date: 1 } },
        ])
        .toArray()

      return NextResponse.json({
        post: {
          title: post.title,
          slug: post.slug,
        },
        period: Number.parseInt(period),
        views,
        uniqueViews: uniqueViews.length,
        likes,
        deviceStats,
        dailyViews,
      })
    } else {
      // Get overall analytics
      const totalPosts = await postsCollection.countDocuments({ published: true })
      const totalViews = await viewsCollection.countDocuments({
        createdAt: { $gte: startDate },
      })
      const totalLikes = await likesCollection.countDocuments({
        createdAt: { $gte: startDate },
      })

      // Top posts
      const topPosts = await postsCollection
        .find({ published: true })
        .sort({ views: -1 })
        .limit(10)
        .project({ title: 1, slug: 1, views: 1, likes: 1 })
        .toArray()

      // Category breakdown
      const categoryStats = await postsCollection
        .aggregate([
          { $match: { published: true } },
          {
            $group: {
              _id: "$category",
              posts: { $sum: 1 },
              totalViews: { $sum: "$views" },
              totalLikes: { $sum: "$likes" },
            },
          },
          { $sort: { posts: -1 } },
        ])
        .toArray()

      // Daily analytics
      const dailyAnalytics = await viewsCollection
        .aggregate([
          {
            $match: {
              createdAt: { $gte: startDate },
            },
          },
          {
            $group: {
              _id: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$createdAt",
                },
              },
              views: { $sum: 1 },
              uniqueViews: { $addToSet: "$sessionId" },
            },
          },
          {
            $project: {
              date: "$_id",
              views: 1,
              uniqueViews: { $size: "$uniqueViews" },
            },
          },
          { $sort: { date: 1 } },
        ])
        .toArray()

      return NextResponse.json({
        period: Number.parseInt(period),
        overview: {
          totalPosts,
          totalViews,
          totalLikes,
          avgViewsPerPost: totalPosts > 0 ? Math.round(totalViews / totalPosts) : 0,
        },
        topPosts,
        categoryStats,
        dailyAnalytics,
      })
    }
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
