"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import ProgressStats from "@/components/dashboard/ProgressStats";
import RecentSubmissions from "@/components/dashboard/RecentSubmissions";
import LearningPaths from "@/components/dashboard/LearningPaths";
import Recommendations from "@/components/dashboard/Recommendations";
import StudySession from "@/components/dashboard/StudySession";

interface DashboardData {
  progress: any;
  submissions: any[];
  learningPaths: any[];
  recommendations: any[];
  sessions: any[];
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      fetchDashboardData();
    }
  }, [session]);

  const fetchDashboardData = async () => {
    try {
      const [progressRes, submissionsRes, learningPathsRes, recommendationsRes, sessionsRes] = await Promise.all([
        fetch("/api/progress"),
        fetch("/api/submissions"),
        fetch("/api/learning-paths"),
        fetch("/api/recommendations"),
        fetch("/api/sessions")
      ]);

      const data: DashboardData = {
        progress: progressRes.ok ? await progressRes.json() : null,
        submissions: submissionsRes.ok ? await submissionsRes.json() : [],
        learningPaths: learningPathsRes.ok ? await learningPathsRes.json() : [],
        recommendations: recommendationsRes.ok ? await recommendationsRes.json() : [],
        sessions: sessionsRes.ok ? await sessionsRes.json() : []
      };

      setDashboardData(data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {session?.user?.name}!</p>
        </div>

        {/* Progress Stats */}
        <div className="mb-8">
          <ProgressStats data={dashboardData?.progress} />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Submissions */}
            <RecentSubmissions submissions={dashboardData?.submissions || []} />
            
            {/* Learning Paths */}
            <LearningPaths paths={dashboardData?.learningPaths || []} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Recommendations */}
            <Recommendations recommendations={dashboardData?.recommendations || []} />
            
            {/* Study Session */}
            <StudySession sessions={dashboardData?.sessions || []} />
          </div>
        </div>
      </div>
    </div>
  );
} 