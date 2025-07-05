"use client";

interface Milestone {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  completedAt?: string;
  order: number;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  estimatedHours: number;
  isActive: boolean;
  milestones: Milestone[];
}

interface LearningPathsProps {
  paths: LearningPath[];
}

export default function LearningPaths({ paths }: LearningPathsProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = (milestones: Milestone[]) => {
    if (milestones.length === 0) return 0;
    const completed = milestones.filter(m => m.isCompleted).length;
    return Math.round((completed / milestones.length) * 100);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Learning Paths</h2>
        <a href="/learning-paths" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All
        </a>
      </div>

      {paths.length === 0 ? (
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No learning paths yet</h3>
          <p className="mt-1 text-sm text-gray-500">Your personalized learning paths will appear here!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {paths.slice(0, 3).map((path) => {
            const progress = calculateProgress(path.milestones);
            return (
              <div key={path.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-gray-900">{path.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(path.difficulty)}`}>
                        {path.difficulty}
                      </span>
                      {path.isActive && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{path.description}</p>
                    <div className="text-sm text-gray-500">
                      Estimated time: {path.estimatedHours} hours
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-500">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Milestones */}
                {path.milestones.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-900">Milestones</h4>
                    <div className="space-y-1">
                      {path.milestones.slice(0, 3).map((milestone) => (
                        <div key={milestone.id} className="flex items-center space-x-2">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            milestone.isCompleted ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {milestone.isCompleted && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <span className={`text-sm ${milestone.isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                            {milestone.title}
                          </span>
                        </div>
                      ))}
                      {path.milestones.length > 3 && (
                        <div className="text-sm text-gray-500 pl-6">
                          +{path.milestones.length - 3} more milestones
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Continue Learning
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
} 