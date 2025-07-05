"use client";

import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import CodeSubmissionForm from "@/components/CodeSubmissionForm";
import AnalysisDisplay from "@/components/AnalysisDisplay";

interface Analysis {
  strengths: string;
  improvements: string;
  recommendations: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  score?: number;
}

interface Recommendation {
  id: string;
  type: string;
  title: string;
  description: string;
  priority: string;
}

export default function Home() {
  const { data: session, status } = useSession();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    if (session?.user) {
      fetchRecommendations();
    }
  }, [session]);

  const fetchRecommendations = async () => {
    try {
      const response = await fetch("/api/recommendations");
      if (response.ok) {
        const data = await response.json();
        setRecommendations(data.recommendations);
      }
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            CodeMentor AI
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your AI-powered coding mentor for interview preparation
          </p>
          <button
            onClick={() => signIn("google")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to CodeMentor AI
          </h1>
          <p className="text-gray-600 mb-4">
            Submit your code solutions and get personalized AI feedback
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Dashboard
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.slice(0, 3).map((rec) => (
                <div key={rec.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                      rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {rec.priority}
                    </span>
                    <span className="text-xs text-gray-500">{rec.type}</span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{rec.title}</h3>
                  <p className="text-sm text-gray-600">{rec.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Submit Your Code
            </h2>
            <CodeSubmissionForm
              onAnalysisComplete={(analysisData) => {
                console.log("Setting analysis in main page:", analysisData);
                setAnalysis(analysisData);
              }}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Analysis Results
            </h2>
            {analysis ? (
              <AnalysisDisplay analysis={analysis} />
            ) : (
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-500 text-center">
                  Submit your code to get personalized analysis and recommendations
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
