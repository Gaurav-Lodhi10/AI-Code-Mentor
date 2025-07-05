import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Temporary mock data until database is set up
    const mockRecommendations = [
      {
        id: "1",
        type: "problem",
        title: "Try Two Sum Problem",
        description: "Practice hash map techniques with this classic problem",
        priority: "high",
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        type: "resource",
        title: "Hash Map Fundamentals",
        description: "Review hash map implementation and collision handling",
        priority: "medium",
        isRead: false,
        createdAt: new Date().toISOString(),
      },
    ];

    return NextResponse.json({ recommendations: mockRecommendations });
  } catch (error) {
    console.error("Recommendations fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch recommendations" },
      { status: 500 }
    );
  }
} 