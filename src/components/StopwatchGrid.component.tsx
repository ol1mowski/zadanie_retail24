import React from 'react';
import type { StopwatchGridProps } from '../types/stopwatch';
import StopwatchItem from './StopwatchItem.component';

const StopwatchGrid: React.FC<StopwatchGridProps> = ({
  stopwatches,
  onRemove,
  onPause,
  onResume,
}) => {
  if (stopwatches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">⏰</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Brak stoperów
        </h3>
        <p className="text-gray-500 max-w-md">
          Dodaj swój pierwszy stoper, aby rozpocząć odliczanie czasu do ważnych
          wydarzeń.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {stopwatches.map(stopwatch => (
              <StopwatchItem
                key={stopwatch.id}
                stopwatch={stopwatch}
                onRemove={onRemove}
                onPause={onPause}
                onResume={onResume}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <p className="text-sm text-gray-500 text-center">
          {stopwatches.length}{' '}
          {stopwatches.length === 1
            ? 'stoper'
            : stopwatches.length < 5
              ? 'stopery'
              : 'stoperów'}
        </p>
      </div>
    </div>
  );
};

export default StopwatchGrid;
