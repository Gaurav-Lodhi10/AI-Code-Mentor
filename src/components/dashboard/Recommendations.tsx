"use client";

interface Recommendation {
  id: string;
  type: string;
  title: string;
  description: string;
  priority: string;
  isRead: boolean;
  createdAt: string;
}

interface RecommendationsProps {
  recommendations: Recommendation[];
}

export default function Recommendations({ recommendations }: RecommendationsProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'problem':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'resource':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'concept':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/recommendations/${id}/read`, {
        method: 'PUT',
      });
      // You could add state management here to update the UI
    } catch (error) {
      console.error('Failed to mark recommendation as read:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recommendations</h2>
        <a href="/recommendations" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All
        </a>
      </div>

      {recommendations.length === 0 ? (
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No recommendations yet</h3>
          <p className="mt-1 text-sm text-gray-500">Submit some code to get personalized recommendations!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.slice(0, 5).map((recommendation) => (
            <div 
              key={recommendation.id} 
              className={`border rounded-lg p-4 transition-colors ${
                recommendation.isRead 
                  ? 'border-gray-200 bg-gray-50' 
                  : 'border-blue-200 bg-blue-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  recommendation.isRead ? 'bg-gray-200 text-gray-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {getTypeIcon(recommendation.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className={`font-medium truncate ${
                      recommendation.isRead ? 'text-gray-600' : 'text-gray-900'
                    }`}>
                      {recommendation.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(recommendation.priority)}`}>
                      {recommendation.priority}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">{recommendation.type}</span>
                  </div>
                  
                  <p className={`text-sm mb-2 ${
                    recommendation.isRead ? 'text-gray-500' : 'text-gray-700'
                  }`}>
                    {recommendation.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {new Date(recommendation.createdAt).toLocaleDateString()}
                    </div>
                    
                    <div className="flex space-x-2">
                      {!recommendation.isRead && (
                        <button
                          onClick={() => markAsRead(recommendation.id)}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 