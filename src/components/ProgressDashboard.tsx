"use client";

import { useEffect, useState } from "react";

interface Progress {
  id: string;
  category: string;
  level: string;
  score: number;
  problemsSolved: number;
  totalProblems: number;
}

interface Submission {
  id: string;
  problemName: string;
  status: string;
  createdAt: string;
  codeAnalysis?: {
    score: number;
    timeComplexity: string;
    spaceComplexity: string;
  };
}

interface ProgressDashboardProps {
  userId: string;
}

export default function ProgressDashboard({ userId }: ProgressDashboardProps) {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [recentSubmissions, setRecentSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, [userId]);

  const fetchProgress = async () => {
    try {
      const response = await fetch("/api/progress");
      if (response.ok) {
        const data = await response.json();
        setProgress(data.progress);
        setSubmissionCount(data.submissionCount);
        setRecentSubmissions(data.recentSubmissions);
      }
    } catch (error) {
      console.error("Failed to fetch progress:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{submissionCount}</div>
          <div className="text-sm text-blue-600">Problems Solved</div>
        </div>
        
        {progress && (
          <>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{progress.score}%</div>
              <div className="text-sm text-green-600">Average Score</div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{progress.level}</div>
              <div className="text-sm text-purple-600">Current Level</div>
            </div>
          </>
        )}
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 mb-3">Recent Submissions</h4>
        <div className="space-y-2">
          {recentSubmissions.map((submission) => (
            <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{submission.problemName}</div>
                <div className="text-sm text-gray-500">
                  {new Date(submission.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm px-2 py-1 rounded ${
                  submission.status === 'analyzed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {submission.status}
                </div>
                {submission.codeAnalysis && (
                  <div className="text-xs text-gray-500 mt-1">
                    Score: {submission.codeAnalysis.score}%
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 