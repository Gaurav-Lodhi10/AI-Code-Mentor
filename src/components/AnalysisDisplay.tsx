"use client";

interface Analysis {
  strengths: string;
  improvements: string;
  recommendations: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  score?: number;
}

interface AnalysisDisplayProps {
  analysis: Analysis;
}

export default function AnalysisDisplay({ analysis }: AnalysisDisplayProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Code Quality Score */}
      {analysis.score && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{analysis.score}%</div>
            <div className="text-sm text-gray-600 font-medium">Code Quality Score</div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Strengths
          </h3>
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <p className="text-gray-800 whitespace-pre-wrap">{analysis.strengths}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-orange-700 mb-3 flex items-center">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
            Areas for Improvement
          </h3>
          <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
            <p className="text-gray-800 whitespace-pre-wrap">{analysis.improvements}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Personalized Recommendations
          </h3>
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <p className="text-gray-800 whitespace-pre-wrap">{analysis.recommendations}</p>
          </div>
        </div>

        {/* Complexity Analysis */}
        {(analysis.timeComplexity || analysis.spaceComplexity) && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
              Algorithm Analysis
            </h3>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <div className="grid grid-cols-2 gap-4">
                {analysis.timeComplexity && (
                  <div>
                    <div className="text-sm font-medium text-gray-600">Time Complexity</div>
                    <div className="text-lg font-semibold text-green-600">{analysis.timeComplexity}</div>
                  </div>
                )}
                {analysis.spaceComplexity && (
                  <div>
                    <div className="text-sm font-medium text-gray-600">Space Complexity</div>
                    <div className="text-lg font-semibold text-purple-600">{analysis.spaceComplexity}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 