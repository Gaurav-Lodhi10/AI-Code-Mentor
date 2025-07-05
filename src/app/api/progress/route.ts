import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Temporary mock data until database is set up
    const mockProgress = {
      progress: {
        category: "algorithms",
        level: "beginner",
        score: 75,
        problemsSolved: 12,
        totalProblems: 50,
      },
      submissionCount: 12,
      recentSubmissions: [
        {
          id: "1",
          problemName: "Two Sum",
          status: "analyzed",
          createdAt: new Date().toISOString(),
          codeAnalysis: {
            score: 85,
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
          },
        },
        {
          id: "2",
          problemName: "Valid Parentheses",
          status: "analyzed",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          codeAnalysis: {
            score: 90,
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
          },
        },
      ],
    };

    return NextResponse.json(mockProgress);
  } catch (error) {
    console.error("Progress fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
} 