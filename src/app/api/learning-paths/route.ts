import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Temporary mock data until database is set up
    const mockLearningPaths = [
      {
        id: "1",
        title: "Data Structures Fundamentals",
        description: "Master arrays, linked lists, and basic data structures",
        difficulty: "beginner",
        estimatedHours: 20,
        isActive: true,
        milestones: [
          {
            id: "1",
            title: "Arrays and Strings",
            description: "Learn array manipulation and string operations",
            isCompleted: true,
            order: 1,
          },
          {
            id: "2",
            title: "Linked Lists",
            description: "Understand linked list implementation and traversal",
            isCompleted: false,
            order: 2,
          },
        ],
      },
    ];

    return NextResponse.json(mockLearningPaths);
  } catch (error) {
    console.error("Learning paths fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch learning paths" },
      { status: 500 }
    );
  }
} 