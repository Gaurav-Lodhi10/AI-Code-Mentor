"use client";

interface Submission {
  id: string;
  problemName: string;
  language: string;
  status: string;
  createdAt: string;
  codeAnalysis?: {
    score: number;
    timeComplexity: string;
    spaceComplexity: string;
    strengths: string;
    improvements: string;
  };
}

interface RecentSubmissionsProps {
  submissions: Submission[];
}

export default function RecentSubmissions({ submissions }: RecentSubmissionsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'analyzed':
        return 'bg-green-100 text-green-800';
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLanguageColor = (language: string) => {
    switch (language.toLowerCase()) {
      case 'javascript':
        return 'bg-yellow-100 text-yellow-800';
      case 'python':
        return 'bg-blue-100 text-blue-800';
      case 'java':
        return 'bg-red-100 text-red-800';
      case 'cpp':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recent Submissions</h2>
        <a href="/submissions" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All
        </a>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No submissions yet</h3>
          <p className="mt-1 text-sm text-gray-500">Start by submitting your first code solution!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.slice(0, 5).map((submission) => (
            <div key={submission.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium text-gray-900">{submission.problemName}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLanguageColor(submission.language)}`}>
                      {submission.language}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(submission.status)}`}>
                      {submission.status}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(submission.createdAt).toLocaleDateString()} at {new Date(submission.createdAt).toLocaleTimeString()}
                  </div>

                  {submission.codeAnalysis && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-600">{submission.codeAnalysis.score}%</div>
                        <div className="text-xs text-gray-500">Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-green-600">{submission.codeAnalysis.timeComplexity}</div>
                        <div className="text-xs text-gray-500">Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-purple-600">{submission.codeAnalysis.spaceComplexity}</div>
                        <div className="text-xs text-gray-500">Space</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="ml-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 