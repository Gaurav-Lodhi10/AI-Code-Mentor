"use client";

interface ProgressData {
  progress?: {
    category: string;
    level: string;
    score: number;
    problemsSolved: number;
    totalProblems: number;
  };
  submissionCount?: number;
  recentSubmissions?: Array<{
    id: string;
    problemName: string;
    status: string;
    createdAt: string;
    codeAnalysis?: {
      score: number;
      timeComplexity: string;
      spaceComplexity: string;
    };
  }>;
}

interface ProgressStatsProps {
  data: ProgressData | null;
}

export default function ProgressStats({ data }: ProgressStatsProps) {
  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Progress Overview</h2>
        <p className="text-gray-500">No progress data available</p>
      </div>
    );
  }

  const { progress, submissionCount, recentSubmissions } = data;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Progress Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Problems Solved */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-blue-600">{submissionCount || 0}</div>
              <div className="text-sm text-blue-600">Problems Solved</div>
            </div>
          </div>
        </div>

        {/* Average Score */}
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-green-600">{progress?.score || 0}%</div>
              <div className="text-sm text-green-600">Average Score</div>
            </div>
          </div>
        </div>

        {/* Current Level */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-purple-600 capitalize">{progress?.level || 'Beginner'}</div>
              <div className="text-sm text-purple-600">Current Level</div>
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div className="ml-4">
              <div className="text-lg font-bold text-orange-600 capitalize">{progress?.category || 'Algorithms'}</div>
              <div className="text-sm text-orange-600">Focus Area</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {progress && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">{progress.problemsSolved} / {progress.totalProblems || 100}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((progress.problemsSolved / (progress.totalProblems || 100)) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
} 