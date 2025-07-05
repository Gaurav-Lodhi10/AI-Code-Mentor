"use client";

import { useState } from "react";

interface Session {
  id: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  problemsSolved: number;
}

interface StudySessionProps {
  sessions: Session[];
}

export default function StudySession({ sessions }: StudySessionProps) {
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const startSession = () => {
    setIsActive(true);
    setStartTime(new Date());
  };

  const endSession = () => {
    setIsActive(false);
    setStartTime(null);
    // Here you would typically save the session to the database
  };

  const getSessionDuration = (start: string, end?: string) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    const diff = endDate.getTime() - startDate.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    return minutes;
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getTodaySessions = () => {
    const today = new Date().toDateString();
    return sessions.filter(session => 
      new Date(session.startTime).toDateString() === today
    );
  };

  const todaySessions = getTodaySessions();
  const totalTodayDuration = todaySessions.reduce((total, session) => {
    return total + (session.duration || getSessionDuration(session.startTime, session.endTime));
  }, 0);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Study Session</h2>

      {/* Active Session */}
      {isActive && startTime && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-green-800">Active Session</h3>
              <p className="text-sm text-green-600">
                Started at {startTime.toLocaleTimeString()}
              </p>
            </div>
            <button
              onClick={endSession}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              End Session
            </button>
          </div>
        </div>
      )}

      {/* Start Session Button */}
      {!isActive && (
        <div className="mb-6">
          <button
            onClick={startSession}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Start Study Session
          </button>
        </div>
      )}

      {/* Today's Stats */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Today's Progress</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{todaySessions.length}</div>
            <div className="text-sm text-blue-600">Sessions</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{formatDuration(totalTodayDuration)}</div>
            <div className="text-sm text-green-600">Total Time</div>
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Recent Sessions</h3>
        {sessions.length === 0 ? (
          <p className="text-gray-500 text-sm">No study sessions yet</p>
        ) : (
          <div className="space-y-3">
            {sessions.slice(0, 3).map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">
                    {new Date(session.startTime).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(session.startTime).toLocaleTimeString()} - {session.endTime ? new Date(session.endTime).toLocaleTimeString() : 'Active'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">
                    {formatDuration(session.duration || getSessionDuration(session.startTime, session.endTime))}
                  </div>
                  <div className="text-sm text-gray-500">
                    {session.problemsSolved} problems
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      {sessions.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">
                {Math.round(sessions.reduce((total, session) => 
                  total + (session.duration || getSessionDuration(session.startTime, session.endTime)), 0
                ) / sessions.length)}m
              </div>
              <div className="text-sm text-gray-500">Avg Session</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">
                {Math.round(sessions.reduce((total, session) => total + session.problemsSolved, 0) / sessions.length)}
              </div>
              <div className="text-sm text-gray-500">Avg Problems</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 