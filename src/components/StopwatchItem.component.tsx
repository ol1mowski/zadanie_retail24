import React from 'react';
import type { StopwatchItemProps } from '../types/stopwatch';
import {
  formatTime,
  calculateTimeLeft,
  isStopwatchCompleted,
  formatDate,
} from '../utils/stopwatch.utils';

const StopwatchItem: React.FC<StopwatchItemProps> = ({
  stopwatch,
  onRemove,
  onPause,
  onResume,
}) => {
  const [timeLeft, setTimeLeft] = React.useState<number>(
    calculateTimeLeft(stopwatch.targetDate)
  );
  const [isCompleted, setIsCompleted] = React.useState<boolean>(
    isStopwatchCompleted(stopwatch)
  );

  React.useEffect(() => {
    if (stopwatch.status === 'active' && !isCompleted) {
      const interval = setInterval(() => {
        const remaining = calculateTimeLeft(stopwatch.targetDate);
        setTimeLeft(remaining);

        if (remaining <= 0) {
          setIsCompleted(true);
          clearInterval(interval);
        }
      }, 1);

      return () => clearInterval(interval);
    }
  }, [stopwatch.targetDate, stopwatch.status, isCompleted]);

  const getStatusColor = () => {
    if (isCompleted) return 'bg-red-100 border-red-300 text-red-800';
    if (stopwatch.status === 'paused')
      return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    return 'bg-blue-100 border-blue-300 text-blue-800';
  };

  const getStatusText = () => {
    if (isCompleted) return 'Ukończony';
    if (stopwatch.status === 'paused') return 'Wstrzymany';
    return 'Aktywny';
  };

  return (
    <div
      className={`relative p-6 rounded-lg border-2 ${getStatusColor()} shadow-lg transition-all duration-300 hover:shadow-xl`}
    >
      <div className="absolute top-2 right-2">
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/80 backdrop-blur-sm">
          {getStatusText()}
        </span>
      </div>

      <h3 className="text-xl font-bold mb-4 text-gray-900 truncate">
        {stopwatch.name}
      </h3>

      <p className="text-sm text-gray-600 mb-4">
        Cel: {formatDate(stopwatch.targetDate)}
      </p>

      <div className="mb-6">
        <div className="text-3xl font-mono font-bold text-center bg-white/50 rounded-lg p-4 backdrop-blur-sm">
          {isCompleted ? (
            <span className="text-red-600">Czas minął!</span>
          ) : (
            formatTime(timeLeft)
          )}
        </div>
      </div>

      <div className="flex gap-2 justify-center">
        {!isCompleted && (
          <>
            {stopwatch.status === 'active' ? (
              <button
                onClick={() => onPause(stopwatch.id)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 text-sm font-medium"
              >
                Wstrzymaj
              </button>
            ) : (
              <button
                onClick={() => onResume(stopwatch.id)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm font-medium"
              >
                Wznów
              </button>
            )}
          </>
        )}

        <button
          onClick={() => onRemove(stopwatch.id)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
        >
          Usuń
        </button>
      </div>

      {isCompleted && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700 text-center">
            🎉 Czas minął! Możesz usunąć ten stoper.
          </p>
        </div>
      )}
    </div>
  );
};

export default StopwatchItem;
